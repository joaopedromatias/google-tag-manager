declare global {
    interface dataLayerObj {
        [key: string]: string | number | boolean | undefined | null | dataLayerObj;
    }
    interface Window {
        dataLayer: dataLayerObj[];
    }
    interface gtmConfig {
        /**
         * Google Tag Manager Client Side container ID.
         */
        gtmId: string;
        /**
         * Google Tag Manager Server Side domain. If provided, the google tag manager client side library will be loaded from your GTM server side container. In order for this to work properly, you must have the GTM Client Side setted up as a client on your GTMss container.
         */
        serverSideDomain?: string;
        /**
         * If true, after each push there will be a new push reseting all the keys with null value. This helps to keep the dataLayer parameters controlled across different pushes. Defaults to false.
         */
        resetDataLayerObjects?: boolean;
        /**
         * If true, it sanitizes the object values. It is a good practice to normalize characters to ease future data treatments. Defaults to false.
         */
        sanitizeDataLayerObjects?: boolean;
        /**
         * If true, it will load the google tag manager script as a defer HTML script instead of async. Defaults to false.
         */
        defer?: boolean;
    }
}
export default class GTM {
    private gtmId;
    private serverSideDomain;
    private resetDataLayer;
    private sanitizeDataLayer;
    private defer;
    private initialized;
    /**
     * Create a Google Tag Manager instance.
     * @param {gtmConfig} initGtm - Google Tag Manager configuration.
     */
    constructor(initGtm: gtmConfig);
    /**
     * Load the Google Tag Manager Client Side container.
     * @returns {void}
     */
    initialize(): void;
    /**
     * Pushes the object to the dataLayer. If the second parameter is passed, it overwrites the instance configuration `resetDataLayerObjects` property.
     * @param {dataLayerObj} obj - Object to be pushed.
     * @param {boolean} [resetPush] - Reset the push by applying null to all of its keys and nested keys.
     * @returns {void}
     */
    dataLayerPush(obj: dataLayerObj, resetPush?: boolean): void;
    private static resetPush;
}
