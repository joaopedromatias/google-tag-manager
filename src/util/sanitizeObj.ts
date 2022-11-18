import sanitize from "./sanitize.js";

export default function (obj: dataLayerObj) { 
    if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) { 
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