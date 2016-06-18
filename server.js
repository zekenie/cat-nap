const JsonFetcher = require('json-fetcher').JsonFetcher;
const requester = new JsonFetcher();

class Server {
  constructor(base) {
    this.base = base;
    this.config({
      credentials: 'include'
    });
  }

  config(obj) {
    requester.config(obj);
  }

  get(subPath, query, options={}) {
    options.query = query;
    return requester.get(this.base + subPath, options);
  }

  delete(subPath, query, options={}) {
    options.query = query;
    return requester.delete(base + subPath, options);
  }

  post(subPath, body, options={}) {
    options.body = body;
    return requester.post(this.base + subPath, options);
  }

  put(subPath, body, options={}) {
    options.body = body;
    return requester.put(base + subPath, options);
  }
}

module.exports = Server;