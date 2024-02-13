const getLengthUnits = (text: string): {} | null => {
  if (!text) return null;
  return fillMissingLengths({
    millimeter:
      parseFloat(text.match(/\d+(?:[.,]\d+)?\s*mm/g)?.[0] || "") || null,
    inch: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*in/g)?.[0] || "") || null,
    feet: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*ft/g)?.[0] || "") || null,
    meter: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*m\b/g)?.[0] || "") || null,
    centimeter:
      parseFloat(text.match(/\d+(?:[.,]\d+)?\s*cm/g)?.[0] || "") || null,
  });
};

const fillMissingLengths = (data: any): {} => {
  const { millimeter, inch, feet, meter, centimeter } = data;
  const newData = { ...data };

  if (!millimeter && (inch || feet || meter || centimeter)) {
    newData.millimeter = inch
      ? parseFloat((inch * 25.4).toFixed(1))
      : feet
      ? parseFloat((feet * 304.8).toFixed(1))
      : meter
      ? parseFloat((meter * 1000).toFixed(1))
      : centimeter
      ? parseFloat((centimeter * 10).toFixed(1))
      : null;
  }
  if (!inch && (millimeter || feet || meter || centimeter)) {
    newData.inch = millimeter
      ? parseFloat((millimeter / 25.4).toFixed(1))
      : feet
      ? parseFloat((feet * 12).toFixed(1))
      : meter
      ? parseFloat((meter * 39.3701).toFixed(1))
      : centimeter
      ? parseFloat((centimeter / 2.54).toFixed(1))
      : null;
  }
  if (!feet && (millimeter || inch || meter || centimeter)) {
    newData.feet = millimeter
      ? parseFloat((millimeter / 304.8).toFixed(1))
      : inch
      ? parseFloat((inch / 12).toFixed(1))
      : meter
      ? parseFloat((meter * 3.28084).toFixed(1))
      : centimeter
      ? parseFloat((centimeter / 30.48).toFixed(1))
      : null;
  }
  if (!meter && (millimeter || inch || feet || centimeter)) {
    newData.meter = millimeter
      ? parseFloat((millimeter / 1000).toFixed(1))
      : inch
      ? parseFloat((inch / 39.3701).toFixed(1))
      : feet
      ? parseFloat((feet / 3.28084).toFixed(1))
      : centimeter
      ? parseFloat((centimeter / 100).toFixed(1))
      : null;
  }
  if (!centimeter && (millimeter || inch || feet || meter)) {
    newData.centimeter = millimeter
      ? parseFloat((millimeter / 10).toFixed(1))
      : inch
      ? parseFloat((inch * 2.54).toFixed(1))
      : feet
      ? parseFloat((feet * 30.48).toFixed(1))
      : meter
      ? parseFloat((meter * 100).toFixed(1))
      : null;
  }

  return newData;
};

const getVolumeData = (text: string): {} | null => {
  if (!text) return null;
  return fillMisingVolumes({
    cuft: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*cuft/g)?.[0] || "") || null,
    liter: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*l/g)?.[0] || "") || null,
    cm3: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*m3/g)?.[0] || "") || null,
    dm3: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*dm3/g)?.[0] || "") || null,
    m3: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*m3/g)?.[0] || "") || null,
  });
};

const fillMisingVolumes = (data: any): {} => {
  const { cuft, liter, cm3, dm3, m3 } = data;
  const newData = { ...data };

  if (!cuft && (liter || cm3 || dm3 || m3)) {
    newData.cuft = liter
      ? parseFloat((liter * 0.0353147).toFixed(1))
      : cm3
      ? parseFloat((cm3 * 0.0000353147).toFixed(1))
      : dm3
      ? parseFloat((dm3 * 0.0353147).toFixed(1))
      : m3
      ? parseFloat((m3 * 35.3147).toFixed(1))
      : null;
  }
  if (!liter && (cuft || cm3 || dm3 || m3)) {
    newData.liter = cuft
      ? parseFloat((cuft * 28.3168).toFixed(1))
      : cm3
      ? parseFloat((cm3 * 0.001).toFixed(1))
      : dm3
      ? parseFloat((dm3 * 1).toFixed(1))
      : m3
      ? parseFloat((m3 * 1000).toFixed(1))
      : null;
  }
  if (!cm3 && (liter || dm3 || m3)) {
    newData.cm3 = liter
      ? parseFloat((liter * 1000).toFixed(1))
      : dm3
      ? parseFloat((dm3 * 1000).toFixed(1))
      : m3
      ? parseFloat((m3 * 1000000).toFixed(1))
      : null;
  }
  if (!dm3 && (liter || cm3 || m3)) {
    newData.dm3 = liter
      ? parseFloat((liter * 1).toFixed(1))
      : cm3
      ? parseFloat((cm3 * 0.001).toFixed(1))
      : m3
      ? parseFloat((m3 * 1000).toFixed(1))
      : null;
  }
  if (!m3 && (liter || cm3 || dm3)) {
    newData.m3 = liter
      ? parseFloat((liter * 0.001).toFixed(1))
      : cm3
      ? parseFloat((cm3 * 0.000001).toFixed(1))
      : dm3
      ? parseFloat((dm3 * 0.001).toFixed(1))
      : null;
  }

  return newData;
};

const getTrackUnits = (text: string | null): Record<string, any> | null => {
  if (!text) return null;

  const regex = /(\d+\.?\d*)\/(\d+\.?\d*)\s*in\s*\(([\d,]+)\/([\d,]+)\s*mm\)/;
  const matches = text.match(regex);

  if (!matches) return null;

  const frontInches = parseFloat(matches[1]);
  const rearInches = parseFloat(matches[2]);
  const frontMillimeters = parseFloat(matches[3].replace(/,/g, ""));
  const rearMillimeters = parseFloat(matches[4].replace(/,/g, ""));

  return {
    "front track": fillMissingLengths({
      millimeter: frontMillimeters,
      inch: frontInches,
      feet: null,
      meter: null,
      centimeter: null,
    }),
    "rear track": fillMissingLengths({
      millimeter: rearMillimeters,
      inch: rearInches,
      feet: null,
      meter: null,
      centimeter: null,
    }),
  };
};

const getWeightUnits = (text: string | null): Record<string, any> | null => {
  if (!text) return null;

  return {
    lbs: parseFloat((text.match(/\d+(?:[.,]\d+)?\s*lbs/g) || [])[0] || "") || null,
    kg: parseFloat((text.match(/\d+(?:[.,]\d+)?\s*kg/g) || [])[0] || "") || null,
  };
};

export { getLengthUnits, getVolumeData, getTrackUnits, getWeightUnits };