const jsonFetch = require('./jsonFetch');
const inflection = require('inflection');
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
const buildFromArray = function(arr, parent) {
  return arr.map(buildFromObj.bind(this));
};


const buildFromObj = function(obj, parent) {
  return new this(obj, parent);
};
/** end private statics */

class RestClient {
  constructor(obj, parent) {
    this.parent = parent;    
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

  get parentUrl() {
    return this.parent.url || this.constructor.path;
  }

  get url() {
    const subRoute = this.constructor.parents.get(this.parent.constructor);

    return [this.parentUrl,subRoute,this.primaryIdentifier]
      .filter(part => !!part)
      .join('/');
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

  static find(query={}) {
    if(!!this.parent) {
      throw new Error(`cannot find on nested route`)
    }
    return jsonFetch.get(this.path)
      .then(buildFromArray.bind(this));
  }

  static findById(id) {
    if(!!this.parent) {
      throw new Error(`cannot find by id on nested route`)
    }
    return jsonFetch.get(`${this.path}/${id}`)
      .then(buildFromObj.bind(this));
  }

  static create(obj={}) {
    if(!!this.parent) {
      throw new Error(`cannot create ${this.name} with create method because ${this.name} is a subclass. call create from a parent.`)
    }
    return jsonFetch.post(this.path, { body: obj })
      .then(buildFromObj.bind(this));
  }

  static nest(otherClass, route) {
    route = route || inflection.pluralize(otherClass.name).toLowerCase();
    // parents is a map of the class to its mounted route
    otherClass.parents = otherClass.parents || new Map();
    otherClass.parents.set(this, route);

    const name = inflection.pluralize(otherClass.name);
    this.prototype[`get${name}`] = function() {
      jsonFetch.get(`${this.url}/${route}`)
        .then(resArr => buildFromArray.call(otherClass, resArr, this));
    };

    this.prototype[`create${name}`] = function(obj={}) {
      jsonFetch.post(`${this.url}/${route}`)
        .then(res => buildFromObject.call(otherClass, res, this))
    }
  }
}

module.exports = RestClient;
module.exports.Schema = require('./schema');