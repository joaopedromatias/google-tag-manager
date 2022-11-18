import sanitizeObj from '../util/sanitizeObj.js';
import resetDataLayer from '../util/resetDataLayer.js';
import gtmCode from '../util/gtmCode.js';
var GoogleTagManager = /** @class */ (function () {
    function GoogleTagManager(initGtm) {
        this.initialized = false;
        var gtmId = initGtm.gtmId, ssDomain = initGtm.ssDomain, resetDataLayerObjects = initGtm.resetDataLayerObjects, sanitizeDataLayerObjects = initGtm.sanitizeDataLayerObjects, defer = initGtm.defer;
        this.gtmId = typeof gtmId === "string" ? gtmId : undefined;
        this.ssDomain = typeof ssDomain === "string" ? ssDomain : '';
        this.resetDataLayer = typeof resetDataLayerObjects === "boolean" ? resetDataLayerObjects : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayerObjects === "boolean" ? sanitizeDataLayerObjects : false;
        this.defer = typeof defer === 'boolean' ? defer : false;
    }
    GoogleTagManager.prototype.initialize = function () {
        if (!this.initialized) {
            if (this.gtmId) {
                var script = document.createElement('script');
                var snippetInnerHTML = gtmCode.replace('GTM-ID', this.gtmId);
                if (this.ssDomain) {
                    var ssDomainTreated = this.ssDomain.replace(/http(|s):\/\/|\/$/g, '');
                    snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', ssDomainTreated);
                }
                if (this.defer) {
                    snippetInnerHTML = snippetInnerHTML.replace('async', 'defer');
                }
                script.innerHTML = snippetInnerHTML;
                window.document.head.appendChild(script);
                this.initialized = true;
            }
            else {
                console.error('No Google Tag Manager ID was assigned');
            }
        }
        else {
            console.warn('Google Tag Manager was already loaded');
        }
    };
    GoogleTagManager.prototype.dataLayerPush = function (obj, reset) {
        if (this.sanitizeDataLayer) {
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (typeof reset === 'boolean') {
            if (reset) {
                GoogleTagManager.resetedPush(obj);
            }
        }
        else if (this.resetDataLayer) {
            GoogleTagManager.resetedPush(obj);
        }
    };
    GoogleTagManager.prototype.remove = function () {
        if (this.initialized) {
            try {
                var gtmSnippet = document.head.querySelector("script#gtm-snippet");
                document.head.removeChild(gtmSnippet);
                this.initialized = false;
            }
            catch (err) {
                console.error('Could not remove Google Tag Manager script');
            }
        }
        else {
            console.warn('Google Tag Manager script was not initialized');
        }
    };
    GoogleTagManager.resetedPush = function (obj) {
        var newObj = resetDataLayer(obj);
        if (newObj) {
            window.dataLayer.push(newObj);
        }
    };
    return GoogleTagManager;
}());
export default GoogleTagManager;
