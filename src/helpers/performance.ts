import endingError from "./error";
import fixUndefined from "./undefined";
import deleteUnused from "./unused";

const BASE_PERFORMANCE = {
  "top speed": null,
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

const fixTopSpeed = (text: string | null): string[] | null => {
  if(!text) return null;
  const kmh_regex = /\d+\ km\/h/g;
  const mph_regex = /\d+\ mph/g;

  const kmh = text.match(kmh_regex)?.[0] || '';
  const mph = text.match(mph_regex)?.[0] || '';

  const values:string[] = [mph, kmh].filter(Boolean);
  
  const error = endingError(values, ["km/h", "mph"]);

  return error ? null : values;
}

const fixAcceleration = (text: string | null): string | null => {
  if (!text) return null;
  
  const error = !/\d.\d+\ s|\d+\ s/g.test(text);
  return error ? null : text;
}


export default fixPerformanceData