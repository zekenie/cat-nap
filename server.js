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

  get(subPath) {
    return requester.get(this.base + subPath);
  }

  delete(subPath) {
    return requester.delete(base + subPath);
  }

  post(subPath, body) {
    return requester.post(this.base + subPath, { body });
  }

  put(subPath, body) {
    return requester.put(base + subPath, { body });
  }
}

module.exports = Server;