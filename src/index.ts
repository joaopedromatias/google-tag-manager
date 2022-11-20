import sanitizeObj from './util/sanitizeObj.js'
import resetDataLayer from './util/resetDataLayer.js'
import gtmCode from './util/gtmCode.js'

export default class GoogleTagManager { 
    readonly gtmId: string
    readonly serverSideDomain: string
    readonly resetDataLayer: boolean
    readonly sanitizeDataLayer: boolean
    readonly defer: boolean
    private initialized = false

    constructor(initGtm: gtmConfig) { 
        const { gtmId, serverSideDomain, resetDataLayerObjects, sanitizeDataLayerObjects, defer }: gtmConfig = initGtm;
        this.gtmId = typeof gtmId === "string" ? gtmId.trim() : undefined;
        this.serverSideDomain = typeof serverSideDomain === "string" ? serverSideDomain.trim() : '';
        this.resetDataLayer = typeof resetDataLayerObjects === "boolean" ? resetDataLayerObjects : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayerObjects === "boolean" ? sanitizeDataLayerObjects : false;
        this.defer = typeof defer === 'boolean' ? defer : false
    }

    initialize(): void {
        if (!this.initialized) {
            if (this.gtmId) {
                const script: HTMLScriptElement = document.createElement('script');
                let snippetInnerHTML: string = gtmCode.replace('GTM-ID', this.gtmId) 
                if (this.serverSideDomain) { 
                    const ssDomainTreated = this.serverSideDomain.replace(/http(|s):\/\/|\/$/g, '');
                    snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', ssDomainTreated)
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

    dataLayerPush(obj: dataLayerObj, resetPush?: boolean): void {
        if (this.sanitizeDataLayer) { 
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (typeof resetPush === 'boolean') { 
            if (resetPush) { 
                GoogleTagManager.resetPush(obj);
            }
        } else if (this.resetDataLayer) {
            GoogleTagManager.resetPush(obj);
        }
    }

    remove(): void { 
        if (this.initialized) {
            try { 
                const gtmSnippet: HTMLScriptElement = document.head.querySelector(`script#gtm-snippet`);
                document.head.removeChild(gtmSnippet);
                this.initialized = false;
            } catch (err) { 
                console.error('Could not remove Google Tag Manager script');
            }   
        } else { 
            console.warn('Google Tag Manager script is not initialized');
        }
    }

    private static resetPush(obj: dataLayerObj) { 
        const newObj: dataLayerObj | null = resetDataLayer(obj);
        if (newObj) {
            window.dataLayer.push(newObj);
        }
    }
}