import sanitizeObj from '../util/sanitizeObj.js'
import resetDataLayer from '../util/resetDataLayer.js'
import gtmCode from '../util/gtmCode.js'

export default class GoogleTagManager { 
    readonly gtmId: string
    readonly ssDomain: string
    readonly resetDataLayer: boolean
    readonly sanitizeDataLayer: boolean
    readonly defer: boolean
    private initialized = false

    constructor(initGtm: gtmConfig) { 
        const { gtmId, ssDomain, resetDataLayer, sanitizeDataLayer, defer } = initGtm;
        this.gtmId = typeof gtmId === "string" ? gtmId : undefined;
        this.ssDomain = typeof ssDomain === "string" ? ssDomain : '';
        this.resetDataLayer = typeof resetDataLayer === "boolean" ? resetDataLayer : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayer === "boolean" ? sanitizeDataLayer : false;
        this.defer = typeof defer === 'boolean' ? defer : false
    }

    initialize(): void {
        if (!this.initialized) {
            if (this.gtmId) {
                const script = document.createElement('script');
                let snippetInnerHTML = gtmCode.replace('GTM-ID', this.gtmId) 
                if (this.ssDomain) { 
                    snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', this.ssDomain)
                }
                if (this.defer){ 
                    snippetInnerHTML = snippetInnerHTML.replace('async', 'defer')
                }
                script.innerHTML = snippetInnerHTML
                window.document.head.appendChild(script);
                this.initialized = true;
            } else { 
                console.error('No Google Tag Manager ID was assigned');
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
            const newObj = resetDataLayer(obj);
            if (newObj) { 
                window.dataLayer.push(newObj);
            } 
        }
    }

    remove(): void { 
        if (this.initialized) {
            try { 
                const gtmSnippet = document.head.querySelector(`script#gtm-snippet`);
                document.head.removeChild(gtmSnippet);
                this.initialized = false;
            } catch (err) { 
                console.error('Could not remove Google Tag Manager script');
            }   
        } else { 
            console.warn('Google Tag Manager script was not initialized');
        }
    }
}