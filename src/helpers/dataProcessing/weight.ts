import fixUndefined from "../general/undefined";
import deleteUnused from "../general/unused";

import { getWeightUnits } from "./units";

const BASE_WEIGHT = {
  "unladen weight": null,
  "gross weight limit": null,
}

const fixWeightData = (data: any): {} => {
  if(!data) return BASE_WEIGHT;
  fixUndefined(data, BASE_WEIGHT);

  data["unladen weight"] = getWeightUnits(data["unladen weight"]);
  data["gross weight limit"] = getWeightUnits(data["gross weight limit"]);

  deleteUnused(data, BASE_WEIGHT);

  return data;
};


export default fixWeightData;