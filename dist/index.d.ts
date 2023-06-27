export default class GTM {
    private gtmId;
    private serverSideDomain;
    private resetDataLayer;
    private sanitizeDataLayer;
    private defer;
    private initialized;
    constructor(initGtm: gtmConfig);
    initialize(): void;
    dataLayerPush(obj: dataLayerObj, resetPush?: boolean): void;
    private static resetPush;
}
declare global {
    type dataLayerObj = {
        [key: string]: string | number | boolean | dataLayerObj;
    };
    interface Window {
        dataLayer: dataLayerObj[];
    }
}
