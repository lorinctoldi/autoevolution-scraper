import { getWeightUnits } from "./units";

const BASE_WEIGHT = {
  "unladen weight": null,
  "gross weight limit": null,
}

const fixWeightData = (data: any): {} => {
  if(!data) return BASE_WEIGHT;

  data["unladen weight"] = getWeightUnits(data["unladen weight"]);
  data["gross weight limit"] = getWeightUnits(data["gross weight limit"]);

  return data;
};


export default fixWeightData;