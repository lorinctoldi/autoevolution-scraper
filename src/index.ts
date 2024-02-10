import fs from 'fs';

import deleteUnused from './helpers/unused';
import fixUndefined from './helpers/undefined';

import carScraper from "./scrapers/carScraper";

import fixEngineData from "./helpers/engine";
import fixPerformanceData from "./helpers/performance";
import fixTransmissionData from "./helpers/transmission";
import fixDimensionsData from "./helpers/dimension";
import fixWeightData from "./helpers/weight";
import fixFuelData from './helpers/fuel';
import fixPowerSystemData from './helpers/power_system';

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
}

const scrape = async (url: string) => {
  const data:any = await carScraper(url);
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
  
  data['description'] = null;
  deleteUnused(data, BASE_PROPERTIES);

  fs.writeFileSync(`${url.split('#')[1].replace('a', '')}.json`, JSON.stringify(data, null, 2));
}

scrape("https://www.autoevolution.com/cars/ariel-atom-500-v8-2011.html#aeng_ariel-atom-500-v8-2011-3l-v8-500-hp")