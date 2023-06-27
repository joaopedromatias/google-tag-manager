# `gtm-module`

Facilitates the usage of Google Tag Manager. Supports Google Tag Manager Server Side loading.

## 1. Instance Configuration

```javascript
import GTM from 'gtm-module'

const gtmConfig = {
  gtmId: 'GTM-1234567', // required
  serverSideDomain: 'data.mydomain.com', // optional
  resetDataLayerObjects: true, // optional
  sanitizeDataLayerObjects: true, // optional
  defer: true // optional
}

const gtm = new GTM(gtmConfig)
```

| Option                   | Required? | Type    | Default Value | Description                                                                                                                                                                                                                                                                                                    |
| ------------------------ | --------- | ------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gtmId                    | Yes       | String  | -             | Google Tag Manager Client Side container ID                                                                                                                                                                                                                                                                    |
| serverSideDomain         | No        | String  | -             | Google Tag Manager Server Side domain. If provided, the google tag manager client side library will be loaded from your GTM server side container. In order for this to work properly, you must have the GTM Client Side setted up as a client on your GTMss container, along with the gtmId you want to load. |
| resetDataLayerObjects    | No        | Boolean | false         | If true all the last dataLayer object properties will be pushed again with null value. This helps to keep the dataLayer parameters controlled across different pushes. It will only take effect if an object is pushed                                                                                         |
| sanitizeDataLayerObjects | No        | Boolean | false         | If true it sanitizes the object values. It is a good practice to normalize characters to ease future data treatments. It will only take effect if an object is pushed                                                                                                                                          |
| defer                    | No        | Boolean | False         | If true it will load the google tag manager script as a defer script instead of async                                                                                                                                                                                                                          |

## 2. Methods

```javascript
gtm.initialize() // load the container

const dataLayerObject = {
  event: 'click',
  element: 'cta-bottom',
  text: 'buy-now'
}

gtm.dataLayerPush(dataLayerObject) // Push the object to the dataLayer.

// using the optional second parameter
gtm.dataLayerPush(dataLayerObject, true) // push the object to the dataLayer and then push another object reseting the properties first sent. It has priority over the initial configuration 'resetDataLayerObjects'.
```

| Method        | Parameters        | Description                                                                                                                                          |
| ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialize    | -                 | Load the Google Tag Manager Client Side container                                                                                                    |
| dataLayerPush | object, resetPush | Pushes the object to the dataLayer. If the second parameter is passed, it overwrites the initial `resetDataLayerObjects` configuration for this push |

## Colaborating

In order to collaborate, please link an issue with the pull request.

All the tests must pass in order to merge on **`master`**.
