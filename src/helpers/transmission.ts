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
  if (data === undefined || data === undefined) return BASE_TRANSMISSION;
  fixUndefined(data, BASE_TRANSMISSION);

  data["gearbox"] = fixGearBox(data["gearbox"]);

  data = deleteUnused(data, BASE_TRANSMISSION);
  return data;
};

const fixGearBox = (text: string | null) => {
  if (text === null) return null;

  const geartype_regex =
    /(manual|automatic|continuously variable transmission|continuously variable|cvt|dual-clutch|dual-clutch transmission|dct|semi-automatic|semi-automatic transmission|automated manual|automated manual transmission|amt|tiptronic|tiptronic transmission|direct-shift|direct-shift gearbox|dsg|sequential manual|sequential|sequential manual transmission|smg|electrically variable|electrically|electrically variable transmission|evt)/i;
  const type = text.match(geartype_regex)?.[0] || null;

  const gears_regex = /\d+|\d*\ speed|\d*-speed/g;
  let gears = null;
  if (gears_regex.test(text)) {
    gears = parseInt(text.match(gears_regex)?.[0] || "");
  }

  return {
    type: type,
    gears: gears,
  };
};

export default fixTransmissionData;