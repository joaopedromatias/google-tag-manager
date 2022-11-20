import sanitize from "./sanitize.js";
import isObject from "./isObject.js";

export default function (obj: dataLayerObj) { 
    if (isObject(obj)) { 
        const objInitialValue: dataLayerObj = {...obj}
        try { 
            const objKeys: string[] = Object.keys(obj); 
            for (const key of objKeys) { 
                if (typeof obj[key] === 'string') { 
                    obj[key] = sanitize(obj[key] as string);
                }
            }
        } catch (err) { 
            console.warn('Could not sanitize string properties of the dataLayer')
            obj = objInitialValue
        }
    }
}