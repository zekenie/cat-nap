'use strict';
const Schema = require('../schema');
const SchemaPath = require('../schemaPath');
const assert = require('assert');
describe('schema', () => {
  let schema;
  beforeEach(() => schema = new Schema());

  describe('constructor', () => {
    it('is a map', () => assert(schema instanceof Map));

    it('makes schema paths with what is passed', () => {
      schema = new Schema({ foo: { type: String } });
      assert(schema.get('foo') instanceof SchemaPath);
      assert(schema.get('foo').type === String);
    });
  });

  describe('set', () => {
    it('builds SchemaPaths', () => {
      schema.set('someNum', { type: Number });
      assert(schema.get('someNum') instanceof SchemaPath);
      assert(schema.get('someNum').type === Number);
    })
  })
});