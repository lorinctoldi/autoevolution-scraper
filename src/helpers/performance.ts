import fixUndefined from "./undefined";
import deleteUnused from "./unused";

const BASE_PERFORMANCE = {
  "top speed": {
    mph: null,
    kmh: null,
  },
  acceleration: null,
}

const fixPerformanceData = (data: any) => {
  if(!data) return BASE_PERFORMANCE;
  data = fixUndefined(data, BASE_PERFORMANCE);
  
  data['top speed'] = fixTopSpeed(data['top speed']);
  data['acceleration'] = fixAcceleration(data['acceleration 0-62 mph (0-100 kph)'])

  data = deleteUnused(data, BASE_PERFORMANCE);

  return data
}

const fixTopSpeed = (text: string | null): {} => {
  if(!text) return BASE_PERFORMANCE["top speed"];

  const mph = parseFloat(text.match(/\d+(?:[.,]\d+)?\s*mph/g)?.[0] || "") || null;
  const kmh = parseFloat(text.match(/\d+(?:[.,]\d+)?\s*km\/h/g)?.[0] || "") || null;

  return {
    mph: mph,
    kmh: kmh,
  };
}

const fixAcceleration = (text: string | null): number | null => {
  if (!text) return null;

  return parseFloat(text.match(/\d+(?:[.,]\d+)?\s*s/g)?.[0] || "") || null;
}


export default fixPerformanceData