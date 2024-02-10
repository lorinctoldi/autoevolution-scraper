const getLengthUnits = (text:string): {} | null => {
  if(!text) return null;
  return {
    milimeter: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*mm/g)?.[0] || "") || null,
    inch: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*in/g)?.[0] || "") || null,
    feet: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*ft/g)?.[0] || "") || null,
    meter: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*m\b/g)?.[0] || "") || null,
    centimeter: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*cm/g)?.[0] || "") || null,
  }
}

const getCubicUnits = (text:string): {} | null => {
  if(!text) return null;
  return {
    cuft: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*cuft/g)?.[0] || "") || null,
    liter: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*l/g)?.[0] || "") || null,
    cm3: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*m3/g)?.[0] || "") || null,
    dm3: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*dm3/g)?.[0] || "") || null,
    m3: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*m3/g)?.[0] || "") || null,
  }
}

const getTrackUnits = (text:string | null): Record<string, any> | null => {
  if(!text) return null;
  
  const regex = /(\d+\.?\d*)\/(\d+\.?\d*)\s*in\s*\(([\d,]+)\/([\d,]+)\s*mm\)/;
  const matches = text.match(regex);

  if (!matches) return null;

  const frontInches = parseFloat(matches[1]);
  const rearInches = parseFloat(matches[2]);
  const frontMillimeters = parseFloat(matches[3].replace(/,/g, ''));
  const rearMillimeters = parseFloat(matches[4].replace(/,/g, ''));

  return {
    'front track': {
      millimeter: frontMillimeters,
      inch: frontInches,
      feet: null,
      meter: null,
      centimeter: null
    },
    'rear track': {
      millimeter: rearMillimeters,
      inch: rearInches,
      feet: null,
      meter: null,
      centimeter: null,
    }
  };
}

export { getLengthUnits, getCubicUnits, getTrackUnits};