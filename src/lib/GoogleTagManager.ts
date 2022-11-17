import sanitize from './sanitize'
export default class GoogleTagManager { 
    readonly gtmId: string
    readonly ssDomain: string
    public clearDataLayer: boolean
    public sanitizeDataLayer: boolean
    private initialized = false

    constructor(initGtm: gtmConfig) { 
        const { gtmId, ssDomain, clearDataLayer, sanitizeDataLayer } = initGtm;
        this.gtmId = String(gtmId) || '';
        this.ssDomain = typeof ssDomain === "string" ? ssDomain : '';
        this.clearDataLayer = typeof clearDataLayer === "boolean" ? clearDataLayer : false;
        this.sanitizeDataLayer = typeof sanitizeDataLayer === "boolean" ? sanitizeDataLayer : false;
    }

    initialize(): void {
        if (!this.initialized) {
            if (this.gtmId) {
                const script = document.createElement('script');
                script.innerHTML = `${this.gtmId} ${this.ssDomain}`;
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
            const initialObj = {...obj};
            try { 
                const objKeys = Object.keys(obj); 
                objKeys.forEach(property => { 
                    if (typeof obj[property] === 'string') return sanitize(obj[property] as string) });
            } catch (err) { 
                console.warn('Could not sanitize string properties')
                obj = initialObj;
            }
        }
        window.dataLayer.push(obj);
        if (clear || this.clearDataLayer) { 
            try { 
                const objKeys = Object.keys(obj); 
                objKeys.forEach(property => obj[property] = null);
                window.dataLayer.push(obj);
            } catch (err) { 
                console.warn('Could not reset dataLayer variables')
            }
            
        }
    }
}