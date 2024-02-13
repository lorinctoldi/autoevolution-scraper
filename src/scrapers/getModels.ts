import cheerio from "cheerio";
import axios from "axios";

interface ScrapedData {
  [key: string]: string;
}

const getModels = async (url: string): Promise<ScrapedData | null> => {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);

    const data: ScrapedData = {};

    $("div.carmod.clearfix ").each((index, divContent) => {
      const key = $(divContent).find("a").text().toLowerCase().trim().replace(/\s{2,}/g, ' ');
      const href = $(divContent).find("a").attr("href");

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
export default getModels;
