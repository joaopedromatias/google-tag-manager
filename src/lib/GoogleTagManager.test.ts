import GoogleTagManager from "./GoogleTagManager";

describe('GoogleTagManager', () => { 
    it('should start the gtm object with the provided values', () => { 

        const gtmArgs: any = { 
            gtmId: '0',
            sanitizeDataLayer: false,
            clearDataLayer: false,
            ssDomain: true
        }

        const gtm = new GoogleTagManager(gtmArgs);

        const gtmIdConfig = gtm.gtmId;
        const clearDataLayerConfig = gtm.clearDataLayer;
        const ssDomainConfig = gtm.ssDomain;

        expect(gtmIdConfig).toBe(gtmArgs.gtmId)
        expect(clearDataLayerConfig).toBe(gtmArgs.clearDataLayer)
        expect(ssDomainConfig).toBe(gtmArgs.ssDomain)
    })
})