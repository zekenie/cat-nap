'use strict';

const SchemaPath = require('./schemaPath');

class Schema extends Map {
  constructor(props={}, config={}) {
    super();
    Object.keys(props).forEach(key => this.set(key, props[key]));
    Object.assign(this, config);
  }

  set(key, val) {
    if(val.primary) { this.primary = key; }
    super.set(key, new SchemaPath(val));
  }
}

module.exports = Schema;