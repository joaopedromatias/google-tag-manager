import sanitizeObj from './sanitizeObj'

describe('sanitizeObj()', () => { 
    it('should return an object where the string property values are sanitized', () => { 
        const obj = { 
            name: 'João Pedro',
            age: 22,
            city: 'São Paulo',
            dev: true,
            contact: { 
                email: 'EMAIL@HERE.COM'
            }
        }

        sanitizeObj(obj);

        expect(obj.name).toBe('joao-pedro')
        expect(obj.age).toBe(22)
        expect(obj.city).toBe('sao-paulo')
        expect(obj.dev).toBe(true)
        expect(obj.contact.email).toBe('email@here.com')
    })
})