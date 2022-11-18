export default function (obj: dataLayerObj) { 
    try { 
        const objKeys = Object.keys(obj); 
        for (const key of objKeys) { 
            obj[key] = null
        }
    } catch (err) { 
        console.warn('Could not reset dataLayer')
    }
}