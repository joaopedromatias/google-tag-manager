import sanitizeObj from './util/sanitizeObj.js';
import resetDataLayerObj from './util/resetDataLayerObj.js';
import gtmCode from './util/gtmCode.js';
var GoogleTagManager = /** @class */ (function () {
    function GoogleTagManager(initGtm) {
        this.initialized = false;
        var gtmId = initGtm.gtmId, serverSideDomain = initGtm.serverSideDomain, resetDataLayerObjects = initGtm.resetDataLayerObjects, sanitizeDataLayerObjects = initGtm.sanitizeDataLayerObjects, defer = initGtm.defer;
        this.gtmId = typeof gtmId === "string" ? gtmId.trim() : undefined;
        this.serverSideDomain = typeof serverSideDomain === "string" ? serverSideDomain.trim() : '';
        this.resetDataLayer = typeof resetDataLayerObjects === "boolean" ? resetDataLayerObjects : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayerObjects === "boolean" ? sanitizeDataLayerObjects : false;
        this.defer = typeof defer === 'boolean' ? defer : false;
    }
    GoogleTagManager.prototype.initialize = function () {
        if (!this.initialized) {
            if (this.gtmId) {
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
                var noScript = document.createElement('noscript');
                noScript.id = "gtm-snippet-noscript";
                var iframe = document.createElement('iframe');
                iframe.src = "https://".concat(this.serverSideDomain || 'www.googletagmanager.com', "/ns.html?id=").concat(this.gtmId);
                iframe.style.display = "none";
                iframe.style.visibility = "hidden";
                iframe.height = "0";
                iframe.width = "0";
                noScript.appendChild(iframe);
                window.document.body.appendChild(noScript);
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
    GoogleTagManager.prototype.dataLayerPush = function (obj, resetPush) {
        window.dataLayer = window.dataLayer || [];
        if (this.sanitizeDataLayer) {
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (typeof resetPush === 'boolean') {
            var newObj = JSON.parse(JSON.stringify(obj));
            if (resetPush) {
                GoogleTagManager.resetPush(newObj);
            }
        }
        else if (this.resetDataLayer) {
            var newObj = JSON.parse(JSON.stringify(obj));
            GoogleTagManager.resetPush(newObj);
        }
    };
    GoogleTagManager.prototype.remove = function () {
        if (this.initialized) {
            try {
                var gtmSnippet = window.document.querySelector("#gtm-snippet");
                window.document.querySelector('html').removeChild(gtmSnippet);
                this.initialized = false;
            }
            catch (err) {
                console.error('Could not remove Google Tag Manager script');
            }
        }
        else {
            console.warn('Google Tag Manager script is not initialized');
        }
    };
    GoogleTagManager.resetPush = function (obj) {
        var proceed = resetDataLayerObj(obj);
        if (proceed) {
            window.dataLayer.push(obj);
        }
    };
    return GoogleTagManager;
}());
export default GoogleTagManager;
//# sourceMappingURL=index.js.map