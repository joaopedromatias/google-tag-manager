import sanitizeObj from './util/sanitizeObj.js'
import resetDataLayerObj from './util/resetDataLayerObj.js'
import gtmCode from './util/gtmCode.js'

declare global {
  interface dataLayerObj {
    [key: string]: string | number | boolean | undefined | null | dataLayerObj
  }

  interface Window {
    dataLayer: dataLayerObj[]
  }

  interface gtmConfig {
    /**
     * Google Tag Manager Client Side container ID.
     */
    gtmId: string
    /**
     * Google Tag Manager Server Side domain. If provided, the google tag manager client side library will be loaded from your GTM server side container. In order for this to work properly, you must have the GTM Client Side setted up as a client on your GTMss container.
     */
    serverSideDomain?: string
    /**
     * If true, after each push there will be a new push reseting all the keys with null value. This helps to keep the dataLayer parameters controlled across different pushes. Defaults to false.
     */
    resetDataLayerObjects?: boolean
    /**
     * If true, it sanitizes the object values. It is a good practice to normalize characters to ease future data treatments. Defaults to false.
     */
    sanitizeDataLayerObjects?: boolean
    /**
     * If true, it will load the google tag manager script as a defer HTML script instead of async. Defaults to false.
     */
    defer?: boolean
  }
}

export default class GTM {
  private gtmId: string
  private serverSideDomain: string
  private resetDataLayer: boolean
  private sanitizeDataLayer: boolean
  private defer: boolean
  private initialized = false

  /**
   * Create a Google Tag Manager instance.
   * @param {gtmConfig} initGtm - Google Tag Manager configuration.
   */
  constructor(initGtm: gtmConfig) {
    const { gtmId, serverSideDomain, resetDataLayerObjects, sanitizeDataLayerObjects, defer } =
      initGtm
    this.gtmId = typeof gtmId === 'string' ? gtmId.trim() : ''
    this.serverSideDomain = typeof serverSideDomain === 'string' ? serverSideDomain.trim() : ''
    this.resetDataLayer = typeof resetDataLayerObjects === 'boolean' ? resetDataLayerObjects : false
    this.sanitizeDataLayer =
      typeof sanitizeDataLayerObjects === 'boolean' ? sanitizeDataLayerObjects : false
    this.defer = typeof defer === 'boolean' ? defer : false
  }

  /**
   * Load the Google Tag Manager Client Side container.
   * @returns {void}
   */
  initialize(): void {
    if (!this.initialized) {
      if (this.gtmId) {
        const gtmAlreadyLoaded: HTMLScriptElement | null =
          window.document.querySelector(`#gtm-snippet`)
        let isTheSameId = false
        if (gtmAlreadyLoaded) {
          isTheSameId = gtmAlreadyLoaded.src.indexOf(`id=${this.gtmId}`) !== -1
        }
        if (!isTheSameId) {
          const script: HTMLScriptElement = document.createElement('script')
          let snippetInnerHTML: string = gtmCode.replace('GTM-ID', this.gtmId)
          if (this.serverSideDomain) {
            const ssDomainTreated = this.serverSideDomain.replace(/http(|s):\/\/|\/$/g, '')
            snippetInnerHTML = snippetInnerHTML.replace('www.googletagmanager.com', ssDomainTreated)
          }
          if (this.defer) {
            snippetInnerHTML = snippetInnerHTML.replace('async', 'defer')
          }
          script.innerHTML = snippetInnerHTML
          window.document.head.appendChild(script)
          this.initialized = true
        }
      } else {
        console.error('No Google Tag Manager ID was assigned')
      }
    } else {
      console.warn('Google Tag Manager was already loaded')
    }
  }

  /**
   * Pushes the object to the dataLayer. If the second parameter is passed, it overwrites the instance configuration `resetDataLayerObjects` property.
   * @param {dataLayerObj} obj - Object to be pushed.
   * @param {boolean} [resetPush] - Reset the push by applying null to all of its keys and nested keys.
   * @returns {void}
   */
  dataLayerPush(obj: dataLayerObj, resetPush?: boolean): void {
    window.dataLayer = window.dataLayer || []
    if (this.sanitizeDataLayer) {
      sanitizeObj(obj)
    }
    window.dataLayer.push(obj)
    if (typeof resetPush === 'boolean') {
      if (resetPush) {
        const newObjMethodConfig = JSON.parse(JSON.stringify(obj))
        GTM.resetPush(newObjMethodConfig)
      }
    } else if (this.resetDataLayer) {
      const newObjInstanceConfig = JSON.parse(JSON.stringify(obj))
      GTM.resetPush(newObjInstanceConfig)
    }
  }

  private static resetPush(obj: dataLayerObj) {
    const proceed = resetDataLayerObj(obj)
    if (proceed) {
      window.dataLayer.push(obj)
    }
  }
}
