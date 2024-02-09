const fixUndefined = (data: any, base: any) => {
  for(let key of Object.keys(base)) 
    if(data[key] === undefined) data[key] = null;
  return data;
}

export default fixUndefined