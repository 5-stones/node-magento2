/**
 *  Magento 2 Promise API library
 *  File: index.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const request = require('request-promise');

class Client {
  constructor(apiUrl, accessToken, apiRoot) {
    this.baseUrl = apiUrl;
    this.rootPath = apiRoot || 'rest/V1';
    this.authToken = accessToken;
  }


  get(path, params) {
    return this._send(path, 'GET', params);
  }

  delete(path, params) {
    return this._send(path, 'DELETE', params);
  }

  post(path, params, data) {
    if(!data) {
      data = params;
      params = null;
    }
    return this._send(path, 'POST', params, data);
  }

  put(path, params, data) {
    if(!data) {
      data = params;
      params = null;
    }
    return this._send(path, 'PUT', params, data);
  }

  _send(url, method, params, data, options) {
    let uri = [this.baseUrl,this.rootPath,url].join('/').replace(/\/\//g,'/').replace(':/', '://');

    //check if there's any missing parameters
    let missingFields = uri.match(/(\{[a-zA-Z0-9_]+\})/g)
    if(missingFields && missingFields.length > 0) {
      return Promise.reject('URL missing parameters: '+missingFields.join(", "));
    }

    let headers = {}
    headers['Content-Type'] = 'application/json';
    if(this.authToken) {
      headers.Authorization = 'Bearer ' + this.authToken;
    }

    return request({
      uri: uri,
      method: method,
      headers: headers,
      qs: params,
      body: JSON.stringify(data)
    });
  }
}

module.exports = Client;
