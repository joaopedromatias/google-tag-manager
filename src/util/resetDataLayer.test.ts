import resetDataLayer from './resetDataLayer'

describe('resetDataLayer()', () => { 
    it('should reset the dataLayer object', () => { 
        const object = {
            event: 'click',
            element: 'cta-bottom'
        }

        const newObj = resetDataLayer(object) as dataLayerObj;

        expect(newObj.event).toBe(null)
        expect(newObj.element).toBe(null)
    })
})