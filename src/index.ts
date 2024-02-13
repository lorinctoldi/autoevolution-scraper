import { getHomeRefs, getModels } from "./scrapers";

interface ScrapedData {
  [key: string]: string;
}

const main = async () => {
  const homeRefs: ScrapedData | null = await getHomeRefs();
  if (homeRefs !== null) {
    for (const url of Object.values(homeRefs)) {
      console.log(url);
      const models = await getModels(url);
      console.log(models);
    }
  } else {
    console.error("Error: Unable to fetch home references.");
  }
}

main()