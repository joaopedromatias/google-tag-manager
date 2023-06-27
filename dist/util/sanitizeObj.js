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
import sanitize from './sanitize.js';
import isObject from './isObject.js';
function sanitizeObj(obj) {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'string') {
            obj[key] = sanitize(obj[key]);
        }
        else if (isObject(obj[key])) {
            sanitizeObj(obj[key]);
        }
    });
}
export default function exec(obj) {
    if (isObject(obj)) {
        var objInitialValue = __assign({}, obj);
        try {
            sanitizeObj(obj);
        }
        catch (err) {
            console.warn('Could not sanitize string properties of the dataLayer');
            obj = objInitialValue;
        }
    }
}
//# sourceMappingURL=sanitizeObj.js.map