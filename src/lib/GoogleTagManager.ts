export default class GoogleTagManager { 
    gtmId: string
    loadFromSS: boolean
    dataLayerClear: boolean
    initialized = false

    constructor(initGtm: gtmConfig) { 
        const { gtmId, loadFromSS, dataLayerClear } = initGtm;
        this.gtmId = String(gtmId) || '';
        this.loadFromSS = typeof loadFromSS === "boolean" ? loadFromSS : false;
        this.dataLayerClear = typeof dataLayerClear === "boolean" ? dataLayerClear : false;
    }

    initialize() {
        if (!this.initialized) { 
            if (this.gtmId) { 
                const script = document.createElement('script');
                script.innerHTML = `${this.gtmId} ${this.loadFromSS}`;
                window.document.head.appendChild(script);
                this.initialized = true;
            } else { 
                console.warn('No Google Tag Manager ID was assigned');
            }
        } else { 
            console.warn('Google Tag Manager is already loaded');
        }
    }

    dataLayerPush(obj: dataLayerObj, clear?: boolean) {
        window.dataLayer.push(obj);
        if (this.dataLayerClear || clear) { 
            this.dataLayerResetPush(obj);
        }
    }

    dataLayerResetPush(obj: dataLayerObj) { 
        const objKeys = Object.keys(obj); 
        objKeys.forEach(property => obj[property] = null);
        window.dataLayer.push(obj);
    }
}