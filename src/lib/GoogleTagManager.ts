import sanitizeObj from '../util/sanitizeObj.js'
import resetDataLayer from '../util/resetDataLayer.js'
import gtmCode from '../util/gtmCode.js'

export default class GoogleTagManager { 
    readonly gtmId: string
    readonly ssDomain: string
    readonly resetDataLayer: boolean
    readonly sanitizeDataLayer: boolean
    private initialized = false

    constructor(initGtm: gtmConfig) { 
        const { gtmId, ssDomain, resetDataLayer, sanitizeDataLayer } = initGtm;
        this.gtmId = typeof gtmId === "string" ? gtmId : undefined;
        this.ssDomain = typeof ssDomain === "string" ? ssDomain : '';
        this.resetDataLayer = typeof resetDataLayer === "boolean" ? resetDataLayer : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayer === "boolean" ? sanitizeDataLayer : false;
    }

    initialize(): void {
        if (!this.initialized) {
            if (this.gtmId) {
                const script = document.createElement('script');
                let snippetInnerHTML = gtmCode.replace('GTM-ID', this.gtmId) 
                if (this.ssDomain) { 
                    snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', this.ssDomain)
                }
                script.innerHTML = snippetInnerHTML
                window.document.head.appendChild(script);
                this.initialized = true;
            } else { 
                console.warn('No Google Tag Manager ID was assigned');
            }
        } else { 
            console.warn('Google Tag Manager was already loaded');
        }
    }

    dataLayerPush(obj: dataLayerObj, clear?: boolean): void {
        if (this.sanitizeDataLayer) { 
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (clear || this.resetDataLayer) { 
            resetDataLayer(obj);
            window.dataLayer.push(obj);
        }
    }
}