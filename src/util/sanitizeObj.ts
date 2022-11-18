import sanitize from "./sanitize.js";

export default function (obj: dataLayerObj) { 
    const objInitialValue: dataLayerObj = {...obj}
    try { 
        const objKeys: string[] = Object.keys(obj); 
        for (const key of objKeys) { 
            if (typeof obj[key] === 'string') { 
                obj[key] = sanitize(obj[key]);
            }
        }
    } catch (err) { 
        console.warn('Could not sanitize string properties of the dataLayer')
        obj = objInitialValue
    }
}