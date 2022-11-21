export default (function (text) {
    var allSpaces = /\s/g;
    var allLineBreaks = /\n/g;
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(allSpaces, "-")
        .replace(allLineBreaks, "-")
        .toLowerCase()
        .trim();
});
//# sourceMappingURL=sanitize.js.map