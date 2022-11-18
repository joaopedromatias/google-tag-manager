import resetDataLayer from './resetDataLayer'

describe('resetDataLayer()', () => { 
    it('should reset the dataLayer object', () => { 
        const object = {
            event: 'click',
            element: 'cta-bottom'
        }

        resetDataLayer(object);

        expect(object.event).toBe(null)
        expect(object.element).toBe(null)
    })
})