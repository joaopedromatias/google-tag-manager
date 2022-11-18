export default class GoogleTagManager {
    readonly gtmId: string;
    readonly ssDomain: string;
    readonly resetDataLayer: boolean;
    readonly sanitizeDataLayer: boolean;
    readonly defer: boolean;
    private initialized;
    constructor(initGtm: gtmConfig);
    initialize(): void;
    dataLayerPush(obj: dataLayerObj, reset?: boolean): void;
    remove(): void;
    private static resetedPush;
}
