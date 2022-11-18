export default function (obj: dataLayerObj): dataLayerObj | null { 
    if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) { 
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
}