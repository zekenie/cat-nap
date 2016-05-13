const jsonFetch = require('./jsonFetch');
const _ = require('lodash');
jsonFetch.config({
  credentials: 'include'
});

const symbols = {
  paths: Symbol('paths'),
  dirtyList: Symbol('dirtyList')
};

/** Private instance methods */
const addPath = function(path, schemaPath) {
  const sym = Symbol(path);
  this[symbols.paths].set(path, sym);
  Object.defineProperty(this, path, {
    get: () => {
      return this[sym];
    }
  });
};

const buildSchema = function() {
  for(let [path, schemaPath] of this.constructor.schema) {
    addPath.call(this, path, schemaPath);
  }
}
/** /end private instance methods */

/** private statics */
const buildFromArray = function(arr) {
  return arr.map(buildFromObj.bind(this));
};


const buildFromObj = function(obj) {
  return new this(obj);
};
/** end private statics */

class RestClient {
  constructor(obj) {    
    // this is a private hashmap of strings for a path to their symbols
    this[symbols.paths] = new Map();

    // set of paths that have changed
    this[symbols.dirtyList] = new Set();
    buildSchema.call(this);
    this.merge(obj);
  }

  merge(changes) {
    Object.keys(changes)
      .forEach(key => {
        const change = changes[key];
        let keySym = this[symbols.paths].get(key);
        if(!keySym) {
          if(!this.constructor.schema.strict) {
            addPath.call(this,key);
            keySym = this[symbols.paths].get(key);
          } else { return; }
        }
        this[keySym] = change;
        this[symbols.dirtyList].add(keySym)
      });
    return this;
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
    if(!this.primaryIdentifier) { throw new Error('cannot update document without id. try calling create'); }
    this.merge(changes);
    const diff = this.dirtyValues;
    this.dirtyList.clear();
    return this.constructor.put(this.url, { body: diff })
      .then(resp => this.merge(resp));
  }

  create() {
    if(!!this.primaryIdentifier) { throw new Error('cannot recreate document that already has identifier'); }
    return this.constructor.create(this.values)
      .then(resp => this.merge(resp))
  }

  delete() {
    return this.constructor.delete(this.url);
  }

  static find(query) {
    return jsonFetch.get(this.path)
      .then(buildFromArray.bind(this));
  }

  static findById(id) {
    return jsonFetch.get(`${this.path}/${id}`)
      .then(buildFromObj.bind(this));
  }

  static create(obj) {
    return jsonFetch.post(this.path, { body: obj })
      .then(buildFromObj.bind(this));
  }
}

module.exports = RestClient;
module.exports.Schema = require('./schema');