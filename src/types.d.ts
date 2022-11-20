interface Window {
    dataLayer: dataLayerObj[]
}

interface dataLayerObj {
    [parameter: string]: unknown
}

interface gtmConfig {
    gtmId: string
    serverSideDomain?: string
    resetDataLayerObjects?: boolean
    sanitizeDataLayerObjects?: boolean
    defer?: boolean
}