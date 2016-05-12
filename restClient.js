const jsonFetch = require('./jsonFetch');
const _ = require('lodash');
jsonFetch.config({
  credentials: 'include'
});

const symbols = {
  paths: Symbol('paths'),
  dirtyList: Symbol('dirtyList')
};

class RestClient {
  constructor(obj) {    
    // this is a private hashmap of strings for a path to their symbols
    this[symbols.paths] = new Map();

    // set of paths that have changed
    this[symbols.dirtyList] = new Set();
    this.buildSchema();
    this.merge(obj);
  }

  // this will be private
  addPath(path, schemaPath) {
    const sym = Symbol(path);
    this[symbols.paths].set(path, sym);
    Object.defineProperty(this, path, {
      get: () => {
        return this[sym];
      }
    });
    
  }

  merge(changes) {
    Object.keys(changes)
      .forEach(key => {
        const change = changes[key];
        let keySym = this[symbols.paths].get(key);
        if(!keySym && ) {
          if(!this.constructor.schema.strict) {
            this.addPath(key);
            keySym = this[symbols.paths].get(key);
          } else { return; }
        }
        this[keySym] = change;
        this[symbols.dirtyList].add(keySym)
      });
  }

  // this will be private
  buildSchema() {
    for(let [path, schemaPath] of this.constructor.schema) {
      this.addPath(path, schemaPath);
    }
  }

  get primaryIdentifier() {
    return this[this.constructor.schema.primary];
  }

  get url() {
    return this.constructor.path + '/' + this.primaryIdentifier;
  }

  get dirtyValues() {
    const obj = {};
    for(let [key, sym] of this[symbols.dirtyList]) {
      obj[sym.toString()] = this[sym];
    }
    return _.merge({}, obj);
  }

  get values() {
    return _.merge({},this.reduce((holdOver, key, val) => {
      holdOver[key] = val;
      return holdOver;
    }, {}));
  }

  reduce(fn, startingValue) {
    for(let [str, sym] of this[symbols.paths]) {
      startingValue = fn.call(this, startingValue, str, this[sym])
    }
    return startingValue;
  }


  update(changes={}) {
    if(!this.primaryIdentifier) { throw new Error('cannot update document without id'); }
    this.merge(changes)
    const diff = this.dirtyValues;
    this.dirtyList.clear();
    return this.constructor.put(this.url, { body: diff });
  }

  delete() {
    return this.constructor.delete(this.url);
  }

  // this will be private
  static buildFromArray(arr) {
    console.log(arr);
    return arr.map(this.buildFromObj.bind(this));
  }

  // this will be private
  static buildFromObj(obj) {
    return new this(obj);
  }

  static find(query) {
    return jsonFetch.get(this.path)
      .then(this.buildFromArray.bind(this));
  }

  static findById(id) {
    return jsonFetch.get(`${this.path}/${id}`)
      .then(this.buildFromObj.bind(this));
  }

  static create(obj) {
    return jsonFetch.post(this.path, { body: obj })
      .then(this.buildFromObj.bind(this));
  }
}

module.exports = RestClient;
module.exports.Schema = require('./schema');