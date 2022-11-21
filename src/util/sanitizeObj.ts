import sanitize from "./sanitize.js";
import isObject from "./isObject.js";

function sanitizeObj (obj: dataLayerObj) { 
        Object.keys(obj).forEach(key => { 
            if (typeof obj[key] === 'string') { 
                obj[key] = sanitize(obj[key] as string);
            } else if (isObject(obj[key])) { 
                sanitizeObj(obj[key] as dataLayerObj);
            }
        })
}

export default function exec(obj: dataLayerObj) { 
    if (isObject(obj)) { 
        const objInitialValue: dataLayerObj = {...obj};
        try { 
            sanitizeObj(obj);
        } catch (err) { 
            console.warn('Could not sanitize string properties of the dataLayer');
            obj = objInitialValue;
        }
    }
}