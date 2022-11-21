import isObject from "./isObject.js";
function resetObj(obj) {
    Object.keys(obj).forEach(function (key) {
        if (isObject(obj[key])) {
            resetObj(obj[key]);
        }
        else {
            obj[key] = null;
        }
    });
}
export default function exec(obj) {
    if (isObject(obj)) {
        try {
            resetObj(obj);
            return true;
        }
        catch (err) {
            console.warn('Could not reset dataLayer');
            return false;
        }
    }
}
//# sourceMappingURL=resetDataLayerObj.js.map