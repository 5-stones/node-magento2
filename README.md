## Installation
```bash
npm install node-magento2
```

## Overview
 - [Basic Usage](#basic-usage)
 - [Request Helper](#request-helper)
 - [Auth Helper](#auth-helper)

## Basic Usage
```js
"use strict";

const Client = require('node-magento2').Client;
const client = new Client('http://magento.root.url', 'myAuthToken');

//basic usage
client.get('/products', {searchCriteria: { /*...*/ }}) //Get a list of all products
  .then(products => {});

client.put('/products/SKU_123', {visibility: 1}) //update product SKU_123
  .then(product => {});

client.post('/products', { /*A product entity*/}) //Create a new product
  .then(product => {});

client.delete('/products/SKU_123') //delete the product SKU_123
  .then(product => {});
```

## Helper Usage
Helpers add a Javascript style API to generate the URLs.

```javascript
"use strict";

const RequestHelper = require('node-magento2').RequestHelper;
const helper = new RequestHelper();

// build search criteria query object from arrays
var params = helper.buildSearchFilterGroups([
    [ ['name', 'eq', 'foo'] ],
    [ ['sku', 'eq', 'bar'] ],
    [
      ['deleted_at', 'gt', new Date()],
      ['deleted_at', 'null']
    ]
]);

this.client.get('/products', params)
  .then(function (response) {
    res.send(response);
  });
```

## Auth Helper
TODO: Add the ability to retrieve an auth token via an api request


## TODOs
- Build `AuthHelper` for api authentication token retrieval
- Build endpoint specific clients
