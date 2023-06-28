import sanitizeObj from './util/sanitizeObj.js';
import resetDataLayerObj from './util/resetDataLayerObj.js';
import gtmCode from './util/gtmCode.js';
var GTM = /** @class */ (function () {
    /**
     * Create a Google Tag Manager instance.
     * @param {gtmConfig} initGtm - Google Tag Manager configuration.
     */
    function GTM(initGtm) {
        this.initialized = false;
        var gtmId = initGtm.gtmId, serverSideDomain = initGtm.serverSideDomain, resetDataLayerObjects = initGtm.resetDataLayerObjects, sanitizeDataLayerObjects = initGtm.sanitizeDataLayerObjects, defer = initGtm.defer;
        this.gtmId = typeof gtmId === 'string' ? gtmId.trim() : '';
        this.serverSideDomain = typeof serverSideDomain === 'string' ? serverSideDomain.trim() : '';
        this.resetDataLayer = typeof resetDataLayerObjects === 'boolean' ? resetDataLayerObjects : false;
        this.sanitizeDataLayer =
            typeof sanitizeDataLayerObjects === 'boolean' ? sanitizeDataLayerObjects : false;
        this.defer = typeof defer === 'boolean' ? defer : false;
    }
    /**
     * Load the Google Tag Manager Client Side container.
     * @returns {void}
     */
    GTM.prototype.initialize = function () {
        if (!this.initialized) {
            if (this.gtmId) {
                var gtmAlreadyLoaded = window.document.querySelector("#gtm-snippet");
                var isTheSameId = false;
                if (gtmAlreadyLoaded) {
                    isTheSameId = gtmAlreadyLoaded.src.indexOf("id=".concat(this.gtmId)) !== -1;
                }
                if (!isTheSameId) {
                    var script = document.createElement('script');
                    var snippetInnerHTML = gtmCode.replace('GTM-ID', this.gtmId);
                    if (this.serverSideDomain) {
                        var ssDomainTreated = this.serverSideDomain.replace(/http(|s):\/\/|\/$/g, '');
                        snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', ssDomainTreated);
                    }
                    if (this.defer) {
                        snippetInnerHTML = snippetInnerHTML.replace('async', 'defer');
                    }
                    script.innerHTML = snippetInnerHTML;
                    window.document.head.appendChild(script);
                    this.initialized = true;
                }
            }
            else {
                console.error('No Google Tag Manager ID was assigned');
            }
        }
        else {
            console.warn('Google Tag Manager was already loaded');
        }
    };
    /**
     * Pushes the object to the dataLayer. If the second parameter is passed, it overwrites the instance configuration `resetDataLayerObjects` property.
     * @param {dataLayerObj} obj - Object to be pushed.
     * @param {boolean} [resetPush] - Reset the push by applying null to all of its keys and nested keys.
     * @returns {void}
     */
    GTM.prototype.dataLayerPush = function (obj, resetPush) {
        window.dataLayer = window.dataLayer || [];
        if (this.sanitizeDataLayer) {
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (typeof resetPush === 'boolean') {
            if (resetPush) {
                var newObjMethodConfig = JSON.parse(JSON.stringify(obj));
                GTM.resetPush(newObjMethodConfig);
            }
        }
        else if (this.resetDataLayer) {
            var newObjInstanceConfig = JSON.parse(JSON.stringify(obj));
            GTM.resetPush(newObjInstanceConfig);
        }
    };
    GTM.resetPush = function (obj) {
        var proceed = resetDataLayerObj(obj);
        if (proceed) {
            window.dataLayer.push(obj);
        }
    };
    return GTM;
}());
export default GTM;
//# sourceMappingURL=index.js.map