'use strict';

const SchemaPath = require('./schemaPath');

class Schema {
  constructor(props={}, config={}) {
    this.data = new Map();
    this[Symbol.iterator] = this.data[Symbol.iterator].bind(this.data);
    Object.keys(props).forEach(key => this.set(key, props[key]));
    Object.assign(this, config);
  }

  set(key, val) {
    if(val.primary) { this.primary = key; }
    this.data.set(key, new SchemaPath(val));
  }

  get(key) {
    return this.data.get(key);
  }
}

module.exports = Schema;