export default function (obj: dataLayerObj): dataLayerObj | null { 
    const newObj = {...obj}
    try { 
        const objKeys = Object.keys(newObj); 
        for (const key of objKeys) { 
            newObj[key] = null
        }
        return newObj
    } catch (err) { 
        console.warn('Could not reset dataLayer')
        return null
    }
}