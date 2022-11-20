export default class GoogleTagManager {
    readonly gtmId: string;
    readonly serverSideDomain: string;
    readonly resetDataLayer: boolean;
    readonly sanitizeDataLayer: boolean;
    readonly defer: boolean;
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
