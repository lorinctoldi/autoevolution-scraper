import cheerio from "cheerio";
import axios from "axios";

const carScraper = async (url: string) => {
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

export default carScraper;