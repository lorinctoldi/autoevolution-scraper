import fixUndefined from "./undefined";
import deleteUnused from "./unused";

const BASE_ENGINE = {
  cylinders: null,
  displacement: null,
  power: null,
  torque: null,
  'fuel system': null,
  fuel: null,
  'fuel capacity': null
}

const fixEngineData = (data: any) => {
  if(data === null || data === undefined) return BASE_ENGINE;
  data = fixUndefined(data, BASE_ENGINE);

  data["power"] = fixPower(data["power"]);
  data["torque"] = fixTorque(data["torque"]);
  data["fuel capacity"] = fixFuelCapacity(data["fuel capacity"]);

  deleteUnused(data, BASE_ENGINE);
  return data;
};

const fixPower = (text: string | null): string[] | null => {
  if (text === null) return null;

  const regex = / @ - rpm|@ -? ?\d+(?:-\d+)? rpm/gi;
  const values = text
    .split(regex)
    .map((value: string) => value.trim())
    .filter(Boolean);

  const error = !values?.every(
    (value: string) =>
      value.endsWith(" kw") || value.endsWith(" hp") || value.endsWith(" bhp")
  );
  return error ? null : values;
};

const fixTorque = (text: string | null): string[] | null => {
  if (text === null) return null;

  const regex = / @ - rpm|@ -? ?\d+(?:-\d+)? rpm/gi;
  const values = text
    .split(regex)
    .map((value: string) => value.trim())
    .filter(Boolean);

  const error = !values?.every(
    (value: string) => value.endsWith(" lb-ft") || value.endsWith(" nm")
  );
  return error ? null : values;
};

const fixFuelCapacity = (text: string | null): string[] | null => {
  if (text === null) return null;
  const litre = text.match(/(\d+\.\d+ l)/g)?.[0].replace("l", "litre") || "";
  const gallon = text.match(/\d+\.\d gallons/g)?.[0] || "";
  const values = [gallon, litre].filter(Boolean);

  const error = !values?.every(
    (value: string) => value.endsWith(" litre") || value.endsWith(" gallons")
  );

  return error ? null : values;
};

export default fixEngineData;