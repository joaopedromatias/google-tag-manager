interface dataLayerObj {
    [parameter: string]: unknown
}

interface Window {
    dataLayer: dataLayerObj[]
}

interface gtmConfig {
    gtmId: string
    serverSideDomain?: string
    resetDataLayerObjects?: boolean
    sanitizeDataLayerObjects?: boolean
    defer?: boolean
}