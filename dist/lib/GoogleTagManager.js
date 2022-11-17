var GoogleTagManager = /** @class */ (function () {
    function GoogleTagManager(initGtm) {
        this.initialized = false;
        var gtmId = initGtm.gtmId, loadFromSS = initGtm.loadFromSS, dataLayerClear = initGtm.dataLayerClear;
        this.gtmId = String(gtmId) || '';
        this.loadFromSS = typeof loadFromSS === "boolean" ? loadFromSS : false;
        this.dataLayerClear = typeof dataLayerClear === "boolean" ? dataLayerClear : false;
    }
    GoogleTagManager.prototype.initialize = function () {
        if (!this.initialized) {
            if (this.gtmId) {
                var script = document.createElement('script');
                script.innerHTML = "".concat(this.gtmId, " ").concat(this.loadFromSS);
                window.document.head.appendChild(script);
                this.initialized = true;
            }
            else {
                console.warn('No Google Tag Manager ID was assigned');
            }
        }
        else {
            console.warn('Google Tag Manager is already loaded');
        }
    };
    GoogleTagManager.prototype.dataLayerPush = function (obj, clear) {
        window.dataLayer.push(obj);
        if (this.dataLayerClear || clear) {
            this.dataLayerResetPush(obj);
        }
    };
    GoogleTagManager.prototype.dataLayerResetPush = function (obj) {
        var objKeys = Object.keys(obj);
        objKeys.forEach(function (property) { return obj[property] = null; });
        window.dataLayer.push(obj);
    };
    return GoogleTagManager;
}());
export default GoogleTagManager;
