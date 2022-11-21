import resetDataLayerObj from './resetDataLayerObj'

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

        resetDataLayerObj(object);

        expect(object.event).toBe(null)
        expect(object.element).toBe(null)
        expect(object.ecommerce.add.actionField.test).toBe(null)
        expect(object.ecommerce.add.actionField.list).toBe(null)
    })
})