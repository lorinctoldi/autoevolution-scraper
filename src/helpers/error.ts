const endingError = (array:string[] | null | undefined, acceptable:string[] | null | undefined) => {
  if (!array || !acceptable) return false;


  for (const key of array) {
    if (!acceptable.some(ending => key.endsWith(ending))) {
      return true;
    }
  }

  return false;
}

export default endingError;