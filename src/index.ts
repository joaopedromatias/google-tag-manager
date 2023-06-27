import sanitizeObj from './util/sanitizeObj.js'
import resetDataLayerObj from './util/resetDataLayerObj.js'
import gtmCode from './util/gtmCode.js'

export default class GTM { 
    private gtmId: string
    private serverSideDomain: string
    private resetDataLayer: boolean
    private sanitizeDataLayer: boolean
    private defer: boolean
    private initialized = false

    constructor(initGtm: gtmConfig) { 
        const { gtmId, serverSideDomain, resetDataLayerObjects, sanitizeDataLayerObjects, defer } = initGtm;
        this.gtmId = typeof gtmId === "string" ? gtmId.trim() : undefined;
        this.serverSideDomain = typeof serverSideDomain === "string" ? serverSideDomain.trim() : '';
        this.resetDataLayer = typeof resetDataLayerObjects === "boolean" ? resetDataLayerObjects : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayerObjects === "boolean" ? sanitizeDataLayerObjects : false;
        this.defer = typeof defer === 'boolean' ? defer : false
    }

    initialize(): void {
        if (!this.initialized) {
            if (this.gtmId) {
                const gtmAlreadyLoaded: HTMLScriptElement = window.document.querySelector(`#gtm-snippet`);
                const hasGtmAlreadyLoaded = !!gtmAlreadyLoaded;
                let isTheSameId = false;
                if (hasGtmAlreadyLoaded) { 
                    isTheSameId = gtmAlreadyLoaded.src.indexOf(`id=${this.gtmId}`) !== -1;
                }
                if (!isTheSameId) {
                    const script: HTMLScriptElement = document.createElement('script');
                    let snippetInnerHTML: string = gtmCode.replace('GTM-ID', this.gtmId);
                    if (this.serverSideDomain) { 
                        const ssDomainTreated = this.serverSideDomain.replace(/http(|s):\/\/|\/$/g, '');
                        snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', ssDomainTreated)
                    }
                    if (this.defer){ 
                        snippetInnerHTML = snippetInnerHTML.replace('async', 'defer');
                    }
                    script.innerHTML = snippetInnerHTML;
                    window.document.head.appendChild(script);
                    this.initialized = true;
                }
            } else { 
                console.error('No Google Tag Manager ID was assigned');
            }
        } else { 
            console.warn('Google Tag Manager was already loaded');
        }
    }

    dataLayerPush(obj: dataLayerObj, resetPush?: boolean): void {
        window.dataLayer = window.dataLayer || []
        if (this.sanitizeDataLayer) { 
            sanitizeObj(obj);
        }
        window.dataLayer.push(obj);
        if (typeof resetPush === 'boolean') { 
            if (resetPush) { 
                const newObjMethodConfig = JSON.parse(JSON.stringify(obj));
                GTM.resetPush(newObjMethodConfig);
            }
        } else if (this.resetDataLayer) {
            const newObjInstanceConfig = JSON.parse(JSON.stringify(obj));
            GTM.resetPush(newObjInstanceConfig);
        }
    }

    remove(): void { 
        if (this.initialized) {
            try { 
                const gtmSnippet: HTMLScriptElement = window.document.querySelector(`#gtm-snippet`);
                const parentElement = gtmSnippet.parentNode;
                parentElement.removeChild(gtmSnippet);
                this.initialized = false;
            } catch (err) { 
                console.error('Could not remove Google Tag Manager script');
            }   
        } else { 
            console.warn('Google Tag Manager script is not initialized');
        }
    }

    private static resetPush(obj: dataLayerObj) { 
        const proceed = resetDataLayerObj(obj);
        if (proceed) {
            window.dataLayer.push(obj);
        }
    }
}

declare global { 
    interface Window {
        dataLayer: dataLayerObj[]
    }
}

interface dataLayerObj {
    [parameter: string]: unknown
}

interface gtmConfig {
    gtmId: string
    serverSideDomain?: string
    resetDataLayerObjects?: boolean
    sanitizeDataLayerObjects?: boolean
    defer?: boolean
}