const symbols = {
  paths: Symbol('paths'),
  dirtyList: Symbol('dirtyList'),
  parent: Symbol('parent')
}

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

class Model {
  constructor(obj, parent) {
    this[symbols.parent] = parent;

    // this is a private hashmap of strings for a path to their symbols
    this[symbols.paths] = new Map();

    // set of paths that have changed
    this[symbols.dirtyList] = new Set();

    buildSchema.call(this);
    this.merge(obj);
  }

  clearDirtyList() {
    this[symbols.dirtyList].clear();
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
        this[symbols.dirtyList].add(key)
      });
    return this;
  }

  reduce(fn, startingValue) {
    for(let [str, sym] of this[symbols.paths]) {
      startingValue = fn.call(this, startingValue, str, this[sym])
    }
    return startingValue;
  }

  get values() {
    return Object.assign({},this.reduce((holdOver, key, val) => {
      holdOver[key] = val;
      return holdOver;
    }, {}));
  }

  get dirtyValues() {
    const obj = {};
    for(let key of this[symbols.dirtyList]) {
      obj[key] = this[key];
    }
    return Object.assign({}, obj);
  }

  get parentDoc() {
    return this[symbols.parent];
  }

  get primaryIdentifier() {
    return this[this.constructor.schema.primary];
  }

}

module.exports = Model;