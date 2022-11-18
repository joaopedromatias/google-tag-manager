import sanitizeObj from '../util/sanitizeObj';
import resetDataLayer from '../util/resetDataLayer';
import gtmCode from '../util/gtmCode';
var GoogleTagManager = /** @class */ (function () {
    function GoogleTagManager(initGtm) {
        this.initialized = false;
        var gtmId = initGtm.gtmId, ssDomain = initGtm.ssDomain, resetDataLayer = initGtm.resetDataLayer, sanitizeDataLayer = initGtm.sanitizeDataLayer;
        this.gtmId = typeof ssDomain === "string" ? gtmId : undefined;
        this.ssDomain = typeof ssDomain === "string" ? ssDomain : '';
        this.resetDataLayer = typeof resetDataLayer === "boolean" ? resetDataLayer : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayer === "boolean" ? sanitizeDataLayer : false;
    }
    GoogleTagManager.prototype.initialize = function () {
        if (!this.initialized) {
            if (this.gtmId) {
                var script = document.createElement('script');
                var snippetInnerHTML = gtmCode.replace('GTM-ID', this.gtmId);
                if (this.ssDomain) {
                    snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', this.ssDomain);
                }
                script.innerHTML = snippetInnerHTML;
                window.document.head.appendChild(script);
                this.initialized = true;
            }
            else {
                console.warn('No Google Tag Manager ID was assigned');
            }
        }
        else {
            console.warn('Google Tag Manager was already loaded');
        }
    };
    GoogleTagManager.prototype.dataLayerPush = function (obj, clear) {
        if (this.sanitizeDataLayer) {
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (clear || this.resetDataLayer) {
            resetDataLayer(obj);
            window.dataLayer.push(obj);
        }
    };
    return GoogleTagManager;
}());
export default GoogleTagManager;
