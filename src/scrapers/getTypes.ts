import cheerio from "cheerio";
import axios from "axios";

interface ScrapedData {
  [key: string]: string;
}

const getTypes = async (url: string): Promise<ScrapedData | null> => {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);

    const data: any = {};

    $("div.col23width.fl.bcol-white").each((index, parent) => {
      const yearsMatch = $(parent)
        .find("div.years")
        .first()
        .text()
        .trim()
        .toLowerCase()
        .match(/\d* - \d*/g);
        const yearKey = yearsMatch ? yearsMatch[0] : "";

        const localData: any = {};
        
        $(parent)
        .find("div.mot.clearfix")
        .each((index, divContent) => {
          let key = $(divContent)
          .find("strong")
          .first()
          .text()
          .replace(":", "")
          .trim();
          
          const typeData: ScrapedData = {};
          
          $(divContent)
          .find("a")
          .each((index, a) => {
            const typeKey = $(a).text().toLowerCase().trim().replace(/\s{2,}/g, ' ');
            const ref = $(a).attr()?.href;
            if (typeKey && ref) typeData[typeKey] = ref;
          });
          
          localData[key] = typeData;
        });

        data[yearKey] = localData;
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getTypes;