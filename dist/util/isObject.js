export default function isObject(checkVariable) {
    if (typeof checkVariable === 'object' && !Array.isArray(checkVariable) && typeof checkVariable !== null) {
        return true;
    }
    return false;
}
//# sourceMappingURL=isObject.js.map