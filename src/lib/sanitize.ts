export default (text: string): string => { 

    const allSpaceCharsRegex = /\s/g;
    const allLineBreakRegex = /\n/g;
  
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(allSpaceCharsRegex, "-")
        .replace(allLineBreakRegex, "-");
    }