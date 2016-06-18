const Server = require('./server');
// const inflection = require('inflection');


const Model = require('./model');

/** private statics */
const buildFromArray = function(arr, parent) {
  return arr.map(obj => buildFromObj.call(this, obj, parent));
};


const buildFromObj = function(obj, parent) {
  return new this(obj, parent);
};  
/** end private statics */



class Endpoint {
  constructor(obj, parent={}) {
    this.parent = parent;
    this.data = new this.constructor.model(obj, parent.model);
    return new Proxy(this, {
      get: (target, property) => {
        if(target[property]) {
          return target[property];
        }
        return target.data[property];
      }
    });
  }

  // this establishes stable interface
  getRelated(params={}) {
    return Promise.props(params);
  }

  getAllRelated(predicate, allReferences={}, n=0) {
    predicate = predicate || function() { return true; }
    return new Promise((resolve, reject) => {
      if(!predicate(this,n)) { resolve(); }
      this.getRelated()
        .then(related => {
          Object.assign(allReferences, related);
          return Promise.map(Object.keys(related), key => {
            return Promise.map(related[key], doc => {
              return doc.getAllRelated(predicate, allReferences, n+1)
            });
          })
          .then(() => resolve(allReferences))
          .catch(reject);
        });
    });
  }

  get id() {
    return this.data[this.data.primaryIdentifier];
  }

  get parentUrl() {
    if(!!this.parent) {
      return this.parent.url;
    } else {
      return this.constructor.path;
    }
  }

  get url() {
    let subRoute;
    if(this.constructor.parents) {
      subRoute = this.constructor.parents.get(this.parent.constructor);
    }
    return [this.parentUrl,subRoute,this.id]
      .filter(part => !!part)
      .join('/');
  }

  update(changes={}) {
    if(!this.id) { throw new Error('cannot update document without id. try calling create'); }
    this.data.merge(changes);
    const diff = this.data.dirtyValues;
    return this.constructor.server.put(this.url,  diff)
      .then(resp => this.data.merge(resp))
      .then(() => this.data.clearDirtyList());
  }

  create() {
    if(!!this.id) { throw new Error('cannot recreate document that already has identifier'); }
    return this.constructor.create(this.data.values)
      .then(resp => this.data.merge(resp))
      .then(() => this.data.clearDirtyList());
  }

  delete() {
    return this.constructor.delete(this.url);
  }


  static find(query={}) {
    if(!!this.parent) {
      throw new Error(`cannot find on nested route`);
    }
    return this.server.get(this.path, query)
      .then(buildFromArray.bind(this));
  }


  static delete(url) {
    return this.server.delete(url);
  }

  static findById(id) {
    if(!!this.parent) {
      throw new Error(`cannot find by id on nested route`);
    }
    return this.server.get(`${this.path}/${id}`)
      .then(buildFromObj.bind(this));
  }

  static create(obj={}) {
    if(!!this.parent) {
      throw new Error(`cannot create ${this.name} with create method because ${this.name} is a subclass. call create from a parent.`)
    }
    return this.server.post(this.path, obj)
      .then(buildFromObj.bind(this));
  }

  // static nest(otherClass, route) {
  //   route = route || inflection.pluralize(otherClass.name).toLowerCase();
  //   // parents is a map of the class to its mounted route
  //   otherClass.parents = otherClass.parents || new Map();
  //   otherClass.parents.set(this, route);

  //   const pluralName = inflection.pluralize(otherClass.name);
  //   const singularName = otherClass.name;
  //   this.prototype[`get${pluralName}`] = function() {
  //     return this.server.get(`${this.url}/${route}`)
  //       .then(resArr => buildFromArray.call(otherClass, resArr, this));
  //   };

  //   this.prototype[`create${singularName}`] = function(obj={}) {
  //     return this.server.post(`${this.url}/${route}`, obj )
  //       .then(res => buildFromObj.call(otherClass, res, this))
  //   }
  // }
}

module.exports = Endpoint;
module.exports.Schema = require('./schema');