const fixGeneralData = (line: string, key: string): string | string[] | number[] | null => {
  if (key === "body style") {
    return line.split("<b>Body style:</b> ")[1];
  } else if (key === "segment") {
    return line.split("<b>Segment:</b> ")[1];
  } else if (key === "infotainment") {
    const data = line.split("<b>Infotainment:</b> ")[1];
    return data
      .split(" &nbsp; ")
      .map((obj: string) => obj.trim())
      .filter((obj: string) => obj !== "");
  } else if(key === 'production years') {
    const data = line.split('<b>Production years:</b> ')[1];
    return data.split(', ')
    .filter((obj: string) => obj !== "")
    .map((obj:string) => Number(obj));
  }

  return null;
};

export default fixGeneralData;
