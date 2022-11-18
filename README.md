# `Google Tag Manager Library`

Facilitates the usage of Google Tag Manager. Supports Google Tag Manager Server Side loading.

# 1. Configuration

```javascript
const gtmConfig = { 
    gtmId: 'GTM-1234567', // required - string
    // google tag manager container ID

    ssDomain: 'data.mydomain.com', // optional - string
    // If provided, the google tag manager client side library will be loaded from your GTM server side container. In order for this to work properly, you must have the GTM Client Side setted up as a client on your GTMss container, along with the gtmId you want to load.

    resetDataLayerObjects: true, // optional - boolean. 
    // Default is false
    // If provided, all the last dataLayer push object properties will be pushed again with no value. This helps to keep the dataLayer parameters controlled across different pushes. 
    // It will only take effect if an object is pushed

    sanitizeDataLayerObjects: true, // optional - boolean. 
    // Default is false
    // If provided it sanitizes the string object values. It is a good practice to normalize characters to ease future data treatments.
    // It will only take effect if an object is pushed

    defer: true // optional - boolean. 
    // Default is false
    // If provided it will load the google tag manager script as a defer script instead of async.
}

const gtm = new GTM(gtmConfig); // creates the instance 
```

# 2. Methods

```javascript
const gtm = new GTM(gtmConfig); // creates the instance 

if (userOptedIn) { 
    gtm.initialize() // load the container
}

if (userOptedOut) { 
    gtm.remove() // remove the GTM container
}

const dataLayerObject = { 
    event: 'click',
    element: 'cta-bottom',
    text: 'buy-now'
}

gtm.dataLayerPush(dataLayerObject) // push the object to the dataLayer

gtm.dataLayerPush(dataLayerObject, true) // push the object to the dataLayer and then push another object reseting the properties first sent on dataLayerObject. It has priority over the initial configuration.
```

Feel free to collabore. To do so please link an issue with a pull request.

All the tests must pass in order to merge on `master`.

Project build is automatically generated before every commit.