import GoogleTagManager from ".";

declare global { 
    interface Window {
        dataLayer: dataLayerObj[]
    }
}

interface dataLayerObj {
    [parameter: string]: unknown
}

describe('GoogleTagManager', () => { 
    describe('initialize()', () => { 

        beforeEach(() => { 
            window.document.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body></body></html>`)
        })

        afterEach(() => {
            window.document.write(``)
        })

        it('should initialize the google tag manager container if a gtmId is provided', () => { 
            const gtm = new GoogleTagManager({gtmId: 'GTM-0000000'});  

            gtm.initialize();

            const gtmSnippet = document.head.querySelector('script#gtm-snippet')

            const gtmSnippetNoScript = document.body.querySelector('#gtm-snippet-noscript') as HTMLElement;
            const iframe = gtmSnippetNoScript.querySelector('iframe') as HTMLIFrameElement;
            
            expect(gtmSnippet).toBeDefined();
            expect(iframe).toBeDefined();
        })

        it('should initialize the google tag manager with the provided id and with the server side domain (if it is configured)', () => { 
            const gtm = new GoogleTagManager({gtmId: 'GTM-1234567', serverSideDomain: 'data.domain.com'});  
            
            gtm.initialize();

            const gtmSnippet = document.head.querySelector('script#gtm-snippet') as HTMLScriptElement;
            
            const gtmSnippetNoScript = document.body.querySelector('#gtm-snippet-noscript') as HTMLElement;
            const iframe = gtmSnippetNoScript.querySelector('iframe') as HTMLIFrameElement;

            const gtmSnippetSrc = (gtmSnippet || {}).src
            const iframeSrc = (iframe || {}).src;
            
            expect(gtmSnippetSrc).toBe('https://data.domain.com/gtm.js?id=GTM-1234567')
            expect(iframeSrc).toBe('https://data.domain.com/ns.html?id=GTM-1234567')
        })
    
        it('should not initialize the google tag manager container if a gtmId is not provided', () => { 
            const gtm = new GoogleTagManager({gtmId: ''});

            gtm.initialize();
            
            const gtmSnippet = document.head.querySelector('script#gtm-snippet');

            const gtmSnippetNoScript = document.body.querySelector('#gtm-snippet-noscript') as HTMLElement;
            
            expect(gtmSnippet).toBeNull();
            expect(gtmSnippetNoScript).toBeNull();
        })
    })

    describe('dataLayerPush()', () => { 
    
        beforeEach(() => { 
            window.dataLayer = []
        })

        it('should push the object to dataLayer', () => { 
            
            const gtm = new GoogleTagManager({gtmId: 'GTM-0000000'})

            const dataLayerObj = { 
                event: 'click',
                element: 'cta-bottom'
            }

            gtm.dataLayerPush(dataLayerObj);

            expect(window.dataLayer[0].event).toBe('click')
            expect(window.dataLayer[0].element).toBe('cta-bottom')
            
        })

        it('should push the object to dataLayer and then clear if it is passed on the method', () => { 
            
            const gtm = new GoogleTagManager({gtmId: 'GTM-0000000'})

            const dataLayerObj = { 
                event: 'click',
                element: 'cta-bottom',
                ecommerce: { 
                    add: { 
                        infoHere: 'the-info'
                    }
                }
            }

            gtm.dataLayerPush(dataLayerObj, true);

            expect(window.dataLayer[0].event).toBe('click')
            expect(window.dataLayer[0].element).toBe('cta-bottom')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            expect(window.dataLayer[0].ecommerce.add.infoHere).toBe('the-info');

            expect(window.dataLayer[1].event).toBeNull()
            expect(window.dataLayer[1].element).toBeNull()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            expect(window.dataLayer[1].ecommerce.add.infoHere).toBeNull();
        })
    })

    describe('remove()', () => { 

        beforeAll(() => {
            jest.spyOn(GoogleTagManager.prototype, 'remove').mockImplementation(() => {
                const gtmSnippet = document.head.querySelector('#gtm-snippet')
                if (gtmSnippet) { 
                    document.head.removeChild(gtmSnippet);
                }
            });
        });
        
        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should remove the Google Tag Manager Script', () => { 
            const gtm = new GoogleTagManager({gtmId: 'GTM-M4DP6XM'});

            gtm.initialize();

            let gtmSnippet = document.head.querySelector('script#gtm-snippet');

            expect(gtmSnippet).toBeDefined();
            
            gtm.remove();
            
            gtmSnippet = document.head.querySelector('script#gtm-snippet');

            expect(gtmSnippet).toBeNull()
        })
    })

})