import isObject from "./isObject.js";

function resetObj (obj: dataLayerObj) {
    Object.keys(obj).forEach(key => { 
        if (isObject(obj[key])) { 
            resetObj(obj[key] as dataLayerObj)
        } else { 
            obj[key] = null;
        }
    })
}

export default function exec (obj: dataLayerObj): dataLayerObj | null { 
    if (isObject(obj)) { 
        const newObj: dataLayerObj = {...obj}
        try { 
            resetObj(newObj);
            return newObj
        } catch (err) { 
            console.warn('Could not reset dataLayer')
            return null
        }
    }
    return null
}