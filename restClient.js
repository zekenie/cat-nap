const jsonFetch = require('./jsonFetch');

const symbols = {
  paths: Symbol('paths'),
  getters: Symbol('getters')
};

class RestClient {
  constructor(obj) {
    // Object.assign(this, obj);

    // this is a private hashmap of strings for a path to their symbols
    this[symbols.paths] = new Map();
    this[symbols.getters] = new Map();
    this.buildSchema();
    this.merge(obj);
  }

  buildSchema() {
    for(let [path, description] of this.constructor.schema) {
      const sym = Symbol(path);
      this[symbols.paths].set(path, sym);

      Object.defineProperty(path, {
        get: () => {
          return this[sym];
        }
      })
    }
  }

  reduce(fn, startingValue) {
    for(let [str, sym] of this[symbols.paths]) {
      startingValue = fn.call(this, startingValue, str, this[sym])
    }
    return startingValue;
  }

  map(fn) {
    return this.reduce((previous, strKey, current) => fn(strKey, current));
  }

  forEach(fn) {
    this.map(fn.bind(this));
  }

  get valid() {
    return this.reduce((previous, key, val) => {
      if(!previous) { return false; }
      return this.constructor.schema[key].validate(val);
    }, true);
  }

  merge(changes) {
    for(let [key, change] of changes) {
      keySym = this[symbols.paths][key];
      if(!keySym) { throw new ReferenceError(`${key} is not defined on the schema`) }
      if(validateChange.call(this, keySym, change)) {
        this[keySym] = change;
      } else {
        throw new Error(`${key} failed validation`);
      }
    }
  }

  update() {

  }

  static buildFromArray(arr) {
    return arr.map(this.buildFromObj.bind(this));
  }

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
    return jsonFetch.post(this.path)
      .then(this.buildFromObj.bind(this));
  }
}

