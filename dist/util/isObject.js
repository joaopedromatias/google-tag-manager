export default function isObject(checkVariable) {
    if (typeof checkVariable === 'object' && !Array.isArray(checkVariable) && checkVariable !== null && checkVariable !== undefined) {
        return true;
    }
    return false;
}
//# sourceMappingURL=isObject.js.map