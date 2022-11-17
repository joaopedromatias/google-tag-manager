import GoogleTagManager from "./GoogleTagManager";

describe('GoogleTagManager', () => { 
    it('should start the gtm object with the provided values', () => { 

        const gtmArgs: gtmConfig = { 
            gtmId: '0',
            dataLayerClear: false,
            loadFromSS: true
        }

        const gtm = new GoogleTagManager(gtmArgs);

        const gtmIdConfig = gtm.gtmId;
        const dataLayerClearConfig = gtm.dataLayerClear;
        const loadFromSSConfig = gtm.loadFromSS;

        expect(gtmIdConfig).toBe(gtmArgs.gtmId)
        expect(dataLayerClearConfig).toBe(gtmArgs.dataLayerClear)
        expect(loadFromSSConfig).toBe(gtmArgs.loadFromSS)
        expect(gtm.initialized).toBe(false)
    })
})