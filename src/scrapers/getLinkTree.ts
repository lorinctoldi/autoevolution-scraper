import fs from 'fs';

import getBrands from './getBrands';
import getModels from './getModels';
import getTypes from './getTypes';

interface ScrapedData {
  [key: string]: string;
}

const getLinkTree = async () => {
  const data: any = {};

  const brands: ScrapedData | null = await getBrands();
  if (brands !== null) {
    for (const [brandKey, brandValue] of Object.entries(brands)) {
      console.log(`|- ${brandKey}`)
      const models = await getModels(brandValue);
      data[brandKey] = {};
      if(!models) continue;
      
      for (const [modelKey, modelValue] of Object.entries(models)) {
        console.log(`|--- ${modelKey}`)
        const types = await getTypes(modelValue);
        data[brandKey][modelKey] = types;
      }
    }
    console.log("writing done")
  } else {
    console.error("Error: Unable to fetch home references.");
  }
  fs.writeFileSync('url-list.json', JSON.stringify(data, null, 2));
}

export default getLinkTree;