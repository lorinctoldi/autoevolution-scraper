import cheerio from "cheerio";
import axios from "axios";

import deleteUnused from '../helpers/general/unused';
import fixUndefined from '../helpers/general/undefined';

import {fixEngineData, fixPerformanceData, fixTransmissionData, fixWeightData, fixFuelData, fixDimensionsData, fixPowerSystemData, fixGeneralData } from '../helpers/dataProcessing';

const BASE_PROPERTIES = {
  description: null,
  engine: null,
  performance: null,
  transmission: null,
  dimensions: null,
  'brakes': null,
  'tires': null,
  weight: null,
  'fuel economy': null,
  'power system': null,
  'body style': null,
  'segment': null,
  'infotainment': null,
  'production years': null,
}

const scrape = async (url: string) => {
  try {
    const part = url.split("#")[1].replace("a", "");

    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);

    const firstDiv = $(`#${part}`).find("div.enginedata.engine-inline").first();

    
    const data: { [key: string]: any } = {};
    
    const description = $("div.fl.newstext p")
    .map((index, element) => $(element).text().trim())
    .get()
    .filter(Boolean);
    
    data["description"] = description;

    firstDiv.find("table").each((index, tableElement) => {
      const title = $(tableElement)
        .find(".title div")
        .text()
        .split(" - ")[0]
        .replace("SPECS", "")
        .trim()
        .toLowerCase();

      const tableData: { [key: string]: string } = {};

      if (title == "engine specs")
        tableData["type"] = $(tableElement)
          .find(".title div")
          .text()
          .split(" - ")[1]
          .trim();

      $(tableElement)
        .find("tr")
        .each((rowIndex, rowElement) => {
          const leftColumn = $(rowElement)
            .find(".left")
            .text()
            .trim()
            .replace(":", "")
            .toLowerCase();
          const rightColumn = $(rowElement)
            .find(".right")
            .text()
            .trim()
            .toLowerCase();

          if (leftColumn) tableData[leftColumn] = rightColumn;
        });

      data[title] = tableData;
    });

    $(".col23width.fr.bcol-white.agatasort .newstext.modelbox .nomgtop").each(
      (index, element) => {
        $(element).find("img").remove();
        const lines: string[] | undefined = $(element)
          .html()
          ?.toString()
          .trim()
          .split("<br>");
        if (!lines) return;

        lines.forEach((line: string) => {
          const key: string = $(`<div>${line}</div>`)
            .find("b")
            .text()
            .toLowerCase()
            .replace(':', '');

          data[key] = fixGeneralData(line, key);
        });
      }
    );

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getCars = async (url:string) => {
  const data:any = await scrape(url);
  fixUndefined(data, BASE_PROPERTIES);

  for (const key in data)
    if (key.includes("fuel economy"))
      data["fuel economy"] = data[key];

  data.engine = fixEngineData(data.engine);
  data.performance = fixPerformanceData(data.performance);
  data.transmission = fixTransmissionData(data.transmission);
  data.dimensions = fixDimensionsData(data.dimensions);
  data.weight = fixWeightData(data.weight);
  data['fuel economy'] = fixFuelData(data['fuel economy'])
  data['power system'] = fixPowerSystemData(data['power system']);

  deleteUnused(data, BASE_PROPERTIES);

  return data;
}

export default getCars;