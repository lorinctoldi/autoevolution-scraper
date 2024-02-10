import fixUndefined from "./undefined";
import deleteUnused from "./unused";

const BASE_FUEL = {
  city: null,
  medium: null,
  highway: null,
  "extra high": null,
  combined: null,
  "co2 emissions": null,
};

const fixFuelData = (data: any) => {
  if (!data) return BASE_FUEL;
  data = fixUndefined(data, BASE_FUEL);

  data["city"] = getConsumption(data["city"]);
  data["medium"] = getConsumption(data["medium"]);
  data["highway"] = getConsumption(data["highway"]);
  data["extra high"] = getConsumption(data["extra high"]);
  data["combined"] = getConsumption(data["combined"]);
  data["co2 emissions"] = getEmission(data["co2 emissions"] || data["co2 emissions (combined)"]);

  deleteUnused(data, BASE_FUEL);
  return data;
};

const getConsumption = (text: string): {} | null => {
  if (!text) return null;
  return {
    mpg: parseFloat(text.match(/\d+(?:[.,]\d+)?\s*mpg/g)?.[0] || "") || null,
    "l/100km":
      parseFloat(text.match(/\d+(?:[.,]\d+)?\s*l\/100km/g)?.[0] || "") || null,
  };
};

const getEmission = (text: string): {} | null => {
  if (!text) return null;
  return {
    'g/km': parseFloat(text.match(/\d+(?:[.,]\d+)?\s*g\/km/g)?.[0] || "") || null,
  }
}

export default fixFuelData;