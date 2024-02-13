import fixUndefined from "../general/undefined";
import deleteUnused from "../general/unused";

const BASE_POWER_SYSTEM = {
  'power pack': null,
  'nominal capacity': null,
  'maximum capacity': null,
  'range': null,
};

const fixPowerSystemData = (data: any) => {
  if(!data) return BASE_POWER_SYSTEM;
  data = fixUndefined(data, BASE_POWER_SYSTEM);

  data['nominal capacity'] = fixCapacity(data['nominal capacity'])
  data['maximum capacity'] = fixCapacity(data['maximum capacity'])
  data['range'] = fixRange(data['range']);
  
  data = deleteUnused(data, BASE_POWER_SYSTEM);
  return data;
}

const fixCapacity = (text: string | null) => {
  if(!text) return null;
  
  return parseFloat(text.match(/\d+(?:[.,]\d+)?\s*kwh/g)?.[0] || "") || null;
}

const fixRange = (text: string | null) => {
  if(!text) return null;

  return {
    km: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*km/g)?.[0] || "") || null,
    miles: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*miles/g)?.[0] || "") || null,
  }
}

export default fixPowerSystemData;