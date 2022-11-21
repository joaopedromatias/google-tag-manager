import isObject from "./isObject.js";

export default function (obj: dataLayerObj): dataLayerObj | null { 
    if (isObject(obj)) { 
        const newObj: dataLayerObj = {...obj}
        try { 
            const objKeys: string[] = Object.keys(newObj); 
            for (const key of objKeys) { 
                newObj[key] = null
            }
            return newObj
        } catch (err) { 
            console.warn('Could not reset dataLayer')
            return null
        }
    }
    return null
}