import endingError from "./error";

const UNIT_REGEX = {
  inch: /\d*\ in/g,
  mili: /\d*\ mm/g,
  centi: /\d*\ cm/g,
  foot: /\d*\ ft/g,
  meter: /\b\d+\s*m\b(?!m)/g,
  cuft: /\d*\ cuft/g,
  litre: /\d*\sl\b/g,
  kg: /\d*\ kg/g,
  lbs: /\d*\slbs\b/g,
};

const DOUBLE_REGEX= {
  inch_double: /\d+(?:\.\d+)?\/\d+(?:\.\d+)? in/g,
  mili_double: /\d+(?:\,\d+)?\/\d+(?:\,\d+)? mm/g,
  centi_double: /\d+(?:\,\d+)?\/\d+(?:\,\d+)? cm/g,
  foot_double: /\d+(?:\.\d+)?\/\d+(?:\.\d+)? ft/g,
  meter_double: /\d+(?:\.\d+)?\/\d+(?:\.\d+)? m(?!m)/g,
  cuft_double: /\d+(?:\.\d+)?\/\d+(?:\.\d+)? cuft/g,
  litre_double: /\d+(?:\,\d+)?\/\d+(?:\,\d+)? l/g,
  kg_double: /\d+(?:\,\d+)?\/\d+(?:\,\d+)? kg/g,
  lbs_double: /\d+(?:\,\d+)?\/\d+(?:\,\d+)? lbs/g,
}

const UNIT_ENDINGS = [" in", " m", " mm", " m", " l", " ft", " cuft", " foot", " liter", " litre", " inch", " milimeter", " meter", " lbs", " kg"]

const fixUnitsData = (text: string, single:boolean = true): string[] | null => {
  if(!text) return null;

  const values:string[] = [];
  
  for(let regex of Object.values(single ? UNIT_REGEX : DOUBLE_REGEX)) {
    if(regex.test(text)) {
      const matchedValue = text.match(regex)?.[0] || '';
      values.push(matchedValue);
    }
  }

  const error = endingError(values, UNIT_ENDINGS);

  return error ? null : values;
}

export default fixUnitsData;