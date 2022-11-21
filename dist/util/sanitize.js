export default (function (text) {
    var allSpaces = /\s/g;
    var allLineBreaks = /\n/g;
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(allSpaces, "-")
        .replace(allLineBreaks, "-")
        .toLowerCase();
});
//# sourceMappingURL=sanitize.js.map