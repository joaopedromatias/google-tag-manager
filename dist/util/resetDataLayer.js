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
import isObject from "./isObject";
export default function (obj) {
    if (isObject(obj) && obj !== undefined) {
        var newObj = __assign({}, obj);
        try {
            var objKeys = Object.keys(newObj);
            for (var _i = 0, objKeys_1 = objKeys; _i < objKeys_1.length; _i++) {
                var key = objKeys_1[_i];
                newObj[key] = null;
            }
            return newObj;
        }
        catch (err) {
            console.warn('Could not reset dataLayer');
            return null;
        }
    }
    return null;
}
