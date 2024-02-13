const deleteUnused = (data: any, base: any): any => {
  for (let key of Object.keys(data)) {
    // if(base[key] === undefined || data[key] === null)
    if (
      base[key] === undefined ||
      data[key] === null ||
      (typeof data[key] === "object" &&
        Object.values(data[key]).every((val: any) => val === null))
    )
      delete data[key];
  }

  return data;
};
export default deleteUnused;
