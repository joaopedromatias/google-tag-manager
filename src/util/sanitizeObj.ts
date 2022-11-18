import sanitize from "./sanitize";

export default function (obj: dataLayerObj) { 
    const objInitialValue = {...obj}
    try { 
        const objKeys = Object.keys(obj); 
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