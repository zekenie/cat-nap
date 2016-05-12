if(typeof window !== 'undefined') {
  if(window.fetch) {
    exports.fetch = window.fetch;
  } else {
    exports.fetch = require('whatwg-fetch');
  }
} else {
  exports.fetch = require('node-fetch');
}