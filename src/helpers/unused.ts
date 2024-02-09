const deleteUnused = (data: any, base: any):any => {
  for(let key of Object.keys(data)) {
    if(base[key] === undefined) 
      delete data[key]
  }

  return data;
}

export default deleteUnused;