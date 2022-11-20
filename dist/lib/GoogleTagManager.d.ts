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
