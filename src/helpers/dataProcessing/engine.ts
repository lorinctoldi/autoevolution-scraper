import fixUndefined from "../general/undefined";
import deleteUnused from "../general/unused";

const BASE_ENGINE = {
  cylinders: null,
  displacement: null,
  power: null,
  'electrical motor power': null,
  torque: null,
  'electrical motor torque': null,
  "fuel system": null,
  fuel: null,
  "fuel capacity": {
    gallons: null,
    liter: null,
  },
};

const fixEngineData = (data: any) => {
  if (!data) return BASE_ENGINE;
  data = fixUndefined(data, BASE_ENGINE);

  data.displacement = fixDisplacement(data.displacement);
  data.power = fixPower(data.power || data["total maximum power"]);
  data['electrical motor power'] = fixPower(data["electrical motor power"]);
  data.torque = fixTorque(data.torque || data["total maximum torque"]);
  data['electrical motor torque'] = fixTorque(data["electrical motor torque"]);
  data["fuel capacity"] = fixFuelCapacity(data["fuel capacity"]);

  deleteUnused(data, BASE_ENGINE);
  return data;
};

const fixDisplacement = (text: string): number | null => {
  if (!text) return null;

  return parseFloat(text.match(/\d+(?:[.,]\d+)?\s*cm3/g)?.[0] || "") || null;
};

const fixPower = (text: string | null): {} | null => {
  if (!text) return BASE_ENGINE.power;

  const kw = parseFloat(text.match(/\d+(?:[.,]\d+)?\s*kw/g)?.[0] || "") || null;
  const hp = parseFloat(text.match(/\d+(?:[.,]\d+)?\s*hp/g)?.[0] || "") || null;
  const bhp =
    parseFloat(text.match(/\d+(?:[.,]\d+)?\s*bhp/g)?.[0] || "") || null;

  return {
    kw: kw,
    hp: hp,
    bhp: bhp,
  };
};

const fixTorque = (text: string | null): {} | null=> {
  if (!text) return null;

  const lb_ft =
    parseFloat(text.match(/\d+(?:[.,]\d+)?\s*lb-ft/g)?.[0] || "") || null;
  const nm = parseFloat(text.match(/\d+(?:[.,]\d+)?\s*nm/g)?.[0] || "") || null;

  return {
    "lb-ft": lb_ft,
    nm: nm,
  };
};

const fixFuelCapacity = (text: string | null): {} => {
  if (!text) return BASE_ENGINE["fuel capacity"];

  const liter =
    parseFloat(text.match(/\d+(?:[.,]\d+)?\s*l/g)?.[0] || "") || null;
  const gallons =
    parseFloat(text.match(/\d+(?:[.,]\d+)?\s*gallons/g)?.[0] || "") || null;

  return {
    gallons: gallons,
    liter: liter,
  };
};

export default fixEngineData;
