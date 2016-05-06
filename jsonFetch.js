'use strict';

const defaults = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

const jsonFetch = (url, options={}) => {
  options = Object.assign(defaults, options);
  if(!!options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url,options)
    .then(res => res.json());
};

jsonFetch.config = overrides => {
  Object.assign(defaults, overrides);
};

['get', 'post', 'put', 'delete'].reduce((exports, method) => {
  exports[method] = (url, options) => {
    options.method = method.toUpperCase();
    return jsonFetch(url, options);
  }
  return exports;
}, exports);