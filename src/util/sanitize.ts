export default (text: string): string => { 
  const allSpaces = /\s/g;
  const allLineBreaks = /\n/g;
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(allSpaces, "-")
    .replace(allLineBreaks, "-")
    .toLowerCase();
}