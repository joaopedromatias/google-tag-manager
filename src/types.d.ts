interface dataLayerObj {
    [parameter: string]: string | number | null | boolean | object | Array <string | null | number | object | boolean>
}

interface Window {
    dataLayer: dataLayerObj[]
}

interface gtmConfig {
    gtmId: string
    ssDomain?: string
    resetDataLayerObjects?: boolean
    sanitizeDataLayerObjects?: boolean
    defer?: boolean
}