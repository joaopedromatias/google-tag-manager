export default function isObject(checkVariable: unknown): boolean { 
    if (typeof checkVariable === 'object' && !Array.isArray(checkVariable) && typeof checkVariable !== null) {
        return true
    }
    return false
}