import fixUndefined from "./undefined";
import deleteUnused from "./unused";

const BASE_DIMENSIONS = {
  length: null,
  width: null,
  height: null,
  'front track': null,
  'rear track': null,
  wheelbase: null,
  'cargo volume': null,
  'turning circle': null
};

const fixDimensionsData = (data: any) => {
  if(data === null || data === undefined) return BASE_DIMENSIONS;
  fixUndefined(data, BASE_DIMENSIONS);

  data['length'] = fixUnitsData(data['length']);
  data['width'] = fixUnitsData(data['width']);
  data['height'] = fixUnitsData(data['height']);
  data['wheelbase'] = fixUnitsData(data['wheelbase']);


  // deleteUnused(data, BASE_DIMENSIONS);
  return data;
}

const unitRegex = {
  inch: /\d*\ in/g,
  mili: /\d*\ mm/g,
  foot: /\d*\ ft/g,
  meter: /\b\d+\s*m\b(?!m)/g,
  cuft: /\d*\ cuft/g,
  litre: /\d*\ l/g,
};

const fixUnitsData = (text: string): string[] | null => {
  if(text === null) return null;

  const values:string[] = [];
  
  for(let regex of Object.values(unitRegex)) {
    if(regex.test(text)) {
      const matchedValue = text.match(regex)?.[0] || '';
      values.push(matchedValue);
    }
  }

  const error = !values.every((value:string) => value.endsWith(' in') || value.endsWith(' mm') || value.endsWith(' '));

  return error ? null : values;
}


export default fixDimensionsData;