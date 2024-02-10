import axios from "axios";
import cheerio from "cheerio";

import fixEngineData from "./helpers/engine";
import fixPerformanceData from "./helpers/performance";
import fixTransmissionData from "./helpers/transmission";
import fixDimensionsData from "./helpers/dimension";
import fixWeightData from "./helpers/weight";

const getData = async (url: string) => {
  try {
    const part = url.split('#')[1].replace('a', '');

    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);

    const firstDiv = $(`#${part}`).find('div.enginedata.engine-inline').first();

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

  data.engine = fixEngineData(data.engine);
  data.performance = fixPerformanceData(data.performance);
  data.transmission = fixTransmissionData(data.transmission);
  data.dimensions = fixDimensionsData(data.dimensions);
  data.weight = fixWeightData(data.weight);
  
  data['description'] = null;
  console.log(url)
  console.log(data);
}

// scrape('https://www.autoevolution.com/cars/audi-a4-2019.html#aeng_audi-a4-2019-35-tsfi-s-tronic-7at-150-hp');
// scrape('https://www.autoevolution.com/cars/ferrari-f8-tributo-2019.html#aeng_ferrari-f8-tributo-2019-v8-turbo-7at-720-hp');
// scrape('https://www.autoevolution.com/cars/bentley-bentayga-s-2021.html#aeng_bentley-bentayga-s-2021-40l-v8-awd-542-hp');
// scrape('https://www.autoevolution.com/cars/bmw-3-series-touring-f31-lci-2016.html#aeng_bmw-3-series-touring-f31-lci-2016-xdrive320i-6mt-184-hp');
scrape('https://www.autoevolution.com/cars/volkswagen-touareg-2023.html#aeng_volkswagen-touareg-2023-30l-tdi-v6-4motion-8at-awd-231-hp');