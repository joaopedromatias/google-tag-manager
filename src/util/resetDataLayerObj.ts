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

export default function exec (obj: dataLayerObj): boolean { 
    if (isObject(obj)) { 
        try { 
            resetObj(obj);
            return true
        } catch (err) { 
            console.warn('Could not reset dataLayer')
            return false
        }
    }
}