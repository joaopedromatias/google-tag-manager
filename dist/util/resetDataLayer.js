export default function (obj) {
    try {
        var objKeys = Object.keys(obj);
        for (var _i = 0, objKeys_1 = objKeys; _i < objKeys_1.length; _i++) {
            var key = objKeys_1[_i];
            obj[key] = null;
        }
    }
    catch (err) {
        console.warn('Could not reset dataLayer');
    }
}
