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
import sanitize from "./sanitize.js";
import isObject from "./isObject.js";
export default function (obj) {
    if (isObject(obj) && obj !== undefined) {
        var objInitialValue = __assign({}, obj);
        try {
            var objKeys = Object.keys(obj);
            for (var _i = 0, objKeys_1 = objKeys; _i < objKeys_1.length; _i++) {
                var key = objKeys_1[_i];
                if (typeof obj[key] === 'string') {
                    obj[key] = sanitize(obj[key]);
                }
            }
        }
        catch (err) {
            console.warn('Could not sanitize string properties of the dataLayer');
            obj = objInitialValue;
        }
    }
}
//# sourceMappingURL=sanitizeObj.js.map