import cheerio from "cheerio";
import axios from "axios";

interface ScrapedData {
  [key: string]: string;
}

const getHomeRefs = async (): Promise<ScrapedData | null> => {
  try {
    const res = await axios.get('https://www.autoevolution.com/cars/');
    const html = res.data;
    const $ = cheerio.load(html);

    const data: ScrapedData = {};

    $("div.col2width.fl.bcol-white.carman").each((index, divContent) => {
      const key = $(divContent).find('h5').text().toLowerCase();
      const href = $(divContent).find('h5 a').attr('href');

      if (key && href) {
        data[key] = href;
      }
    });
    
    return data;
  } catch (error) {
    console.error("Error during scraping:", error);
    return null;
  }
};

export default getHomeRefs;