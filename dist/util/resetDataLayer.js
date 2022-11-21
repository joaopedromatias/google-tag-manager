var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var newObj = __assign({}, obj);
        try {
            resetObj(newObj);
            return newObj;
        }
        catch (err) {
            console.warn('Could not reset dataLayer');
            return null;
        }
    }
    return null;
}
//# sourceMappingURL=resetDataLayer.js.map