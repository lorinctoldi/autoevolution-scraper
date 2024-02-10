import fixUndefined from "./undefined";
import deleteUnused from "./unused";
import {
  getLengthUnits,
  getVolumeData,
  getTrackUnits,
} from "./units";

const BASE_DIMENSIONS = {
  length: null,
  width: null,
  height: null,
  "front track": null,
  "rear track": null,
  wheelbase: null,
  "ground clearance": null,
  "cargo volume": null,
  "turning circle": null,
  aerodynamics: null,
};

const fixDimensionsData = (data: any) => {
  if (!data) return BASE_DIMENSIONS;
  fixUndefined(data, BASE_DIMENSIONS);

  data["length"] = getLengthUnits(data["length"]);
  data["width"] = getLengthUnits(data["width"]);
  data["height"] = getLengthUnits(data["height"]);
  data["wheelbase"] = getLengthUnits(data["wheelbase"]);
  data["cargo volume"] = getVolumeData(data["cargo volume"]);
  data["turning circle"] = getLengthUnits(data["turning circle"]);
  data["ground clearance"] = getLengthUnits(data["ground clearance"]);

  if (data["aerodynamics (cd)"])
    data["aerodynamics"] = data["aerodynamics (cd)"];

  const trackUnits = getTrackUnits(data["front/rear track"]);
  if (trackUnits) {
    data["front track"] = trackUnits["front track"];
    data["rear track"] = trackUnits["rear track"];
  }

  deleteUnused(data, BASE_DIMENSIONS);
  return data;
};

export default fixDimensionsData;
