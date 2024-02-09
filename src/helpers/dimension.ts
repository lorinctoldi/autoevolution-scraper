import endingError from "./error";
import fixUndefined from "./undefined";
import deleteUnused from "./unused";
import fixUnitsData from "./units";

const BASE_DIMENSIONS = {
  length: null,
  width: null,
  height: null,
  'front/rear track': null,
  wheelbase: null,
  'ground clearance': null,
  'cargo volume': null,
  'turning circle': null,
  aerodynamics: null
};

const fixDimensionsData = (data: any) => {
  if(!data) return BASE_DIMENSIONS;
  fixUndefined(data, BASE_DIMENSIONS);

  data['length'] = fixUnitsData(data['length']);
  data['width'] = fixUnitsData(data['width']);
  data['height'] = fixUnitsData(data['height']);
  data['front/rear track'] = fixUnitsData(data['front/rear track'], false);
  data['wheelbase'] = fixUnitsData(data['wheelbase']);
  data['cargo volume'] = fixUnitsData(data['cargo volume']);
  data['turning circle'] = fixUnitsData(data['turning circle']);
  data['ground clearance'] = fixUnitsData(data['ground clearance']);

  if(data['aerodynamics (cd)'])
    data['aerodynamics'] = data['aerodynamics (cd)'];

  deleteUnused(data, BASE_DIMENSIONS);
  return data;
}

export default fixDimensionsData;