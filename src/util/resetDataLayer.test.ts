import resetDataLayer from './resetDataLayer'

describe('resetDataLayer()', () => { 
    it('should reset the dataLayer object', () => { 
        const object = {
            event: 'click',
            element: 'cta-bottom',
            ecommerce: { 
                add: { 
                    actionField: { 
                        test: true,
                        list: 'main-home-showcase'
                    }
                }
            }
        }

        const newObj = resetDataLayer(object);

        expect(newObj.event).toBe(null)
        expect(newObj.element).toBe(null)
        expect(newObj.ecommerce.add.actionField.test).toBe(null)
        expect(newObj.ecommerce.add.actionField.list).toBe(null)
    })
})