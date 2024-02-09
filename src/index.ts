import axios from "axios";
import cheerio from "cheerio";

import fixEngineData from "./helpers/engine";
import fixPerformanceData from "./helpers/performance";
import fixTransmissionData from "./helpers/transmission";
import fixDimensionsData from "./helpers/dimension";

const getData = async (url: string) => {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);

    const firstDiv = $('div.enginedata.engine-inline').first();

    const extractedData: {[key: string]: any} = {};

    const description = $('div.fl.newstext p').map((index, element) => $(element).text().trim()).get().filter(Boolean);

    extractedData['description'] = description;

    firstDiv.find('table').each((index, tableElement) => {
      const title = $(tableElement).find('.title div').text().split(' - ')[0].replace('SPECS','').trim().toLowerCase();

      const tableData: {[key: string]: string} = {};
      
      if(title == 'engine specs') 
        tableData['type'] = $(tableElement).find('.title div').text().split(' - ')[1].trim();

      $(tableElement).find('tr').each((rowIndex, rowElement) => {
        const leftColumn = $(rowElement).find('.left').text().trim().replace(':','').toLowerCase();       
        const rightColumn = $(rowElement).find('.right').text().trim().toLowerCase();

        if (leftColumn)
          tableData[leftColumn] = rightColumn;
      });

      extractedData[title] = tableData;
    });

    return extractedData;
  } catch (error) {
    console.error('Error:', error);
  }
}

const scrape = async (url: string) => {
  const data:any = await getData(url);

  data['engine'] = fixEngineData(data['engine']);
  data['performance'] = fixPerformanceData(data['performance']);
  data['transmission'] = fixTransmissionData(data['transmission']);
  data['dimensions'] = fixDimensionsData(data['dimensions']);
  
  data['description'] = null;

  console.log(data)
}

scrape('https://www.autoevolution.com/cars/volkswagen-touareg-2023.html#aeng_volkswagen-touareg-2023-30l-v6-4motion-8at-awd-340-hp');
// scrape('https://www.autoevolution.com/cars/pagani-huayra-2012.html#aeng_pagani-huayra-2012-60-v12-7at-730-hp');
// scrape('https://www.autoevolution.com/cars/audi-a4-2019.html#aeng_audi-a4-2019-35-tsfi-s-tronic-7at-150-hp')