export default class GoogleTagManager {
    private gtmId;
    private serverSideDomain;
    private resetDataLayer;
    private sanitizeDataLayer;
    private defer;
    private initialized;
    constructor(initGtm: gtmConfig);
    initialize(): void;
    dataLayerPush(obj: dataLayerObj, resetPush?: boolean): void;
    remove(): void;
    private static resetPush;
}
declare global {
    interface Window {
        dataLayer: dataLayerObj[];
    }
}
interface dataLayerObj {
    [parameter: string]: unknown;
}
interface gtmConfig {
    gtmId: string;
    serverSideDomain?: string;
    resetDataLayerObjects?: boolean;
    sanitizeDataLayerObjects?: boolean;
    defer?: boolean;
}
export {};
