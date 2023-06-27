import sanitizeObj from '../util/sanitizeObj.js'

describe('sanitizeObj()', () => { 
    it('should return an object where the string property values are sanitized', () => { 
        const obj = { 
            name: 'João Pedro',
            age: 22,
            city: 'São Paulo',
            dev: true,
            contact: { 
                email: 'EMAIL@HERE.COM',
                someInfo: { 
                    infoHere: 'Text',
                    moreInfo: 'Other Text'
                }
            }
        }

        sanitizeObj(obj);

        expect(obj.name).toBe('joao-pedro')
        expect(obj.age).toBe(22)
        expect(obj.city).toBe('sao-paulo')
        expect(obj.dev).toBe(true)
        expect(obj.contact.email).toBe('email@here.com')
        expect(obj.contact.email).toBe('email@here.com')
        expect(obj.contact.someInfo.infoHere).toBe('text')
        expect(obj.contact.someInfo.moreInfo).toBe('other-text')
    })
})