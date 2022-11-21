export default function isObject(checkVariable: unknown): boolean { 
    if (typeof checkVariable === 'object' && !Array.isArray(checkVariable) && checkVariable !== null && checkVariable !== undefined) {
        return true
    }
    return false
}