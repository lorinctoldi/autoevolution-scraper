import fixUndefined from "./undefined";
import deleteUnused from "./unused";

const BASE_TRANSMISSION = {
  "drive type": null,
  gearbox: {
    type: null,
    gears: null,
  },
};

const fixTransmissionData = (data: any) => {
  if (!data) return BASE_TRANSMISSION;
  fixUndefined(data, BASE_TRANSMISSION);

  data["gearbox"] = fixGearBox(data["gearbox"]);

  data = deleteUnused(data, BASE_TRANSMISSION);
  return data;
};

const fixGearBox = (text: string | null) => {
  if (!text) return null;

  const geartype_regex =
    /(manual|automatic|continuously variable transmission|continuously variable|cvt|dual-clutch|dual-clutch transmission|dct|semi-automatic|semi-automatic transmission|automated manual|automated manual transmission|amt|tiptronic|tiptronic transmission|direct-shift|direct-shift gearbox|dsg|sequential manual|sequential|sequential manual transmission|smg|electrically variable|electrically|electrically variable transmission|evt)/i;
  const type = text.match(geartype_regex)?.[0] || null;

  let gears = parseInt(text.match(/\d+|\d*\ speed|\d*-speed/g)?.[0] || "") || null;
  
  return {
    type: type,
    gears: gears,
  };
};

export default fixTransmissionData;