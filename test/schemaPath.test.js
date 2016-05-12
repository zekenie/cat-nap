'use strict';
const assert = require('assert');
const sinon = require('sinon');
const SchemaPath = require('../schemaPath');
const validators = require('../validators');

describe('SchemaPath', () => {
  let schemaPath;

  describe('constructor', () => {
    it('adopts the properties the first argument', () => {
      const path = new SchemaPath({ foo: 'bar' });
      assert(path.foo === 'bar');
    });

    it('has validators even if none are passed', () => {
      const path = new SchemaPath();
      assert(!!path.validators);
      assert(path.validators instanceof Array);
    });

    describe('validation construction', () => {
      it('passes through objects', () => {
        const validator = {};
        const path = new SchemaPath({ validators: [validator] });
        assert(path.validators[0] === validator);
      });

      it('ignores strings if they are not regestered validators', () => {
        const path = new SchemaPath({ validators: ['foo'] });
        assert(!path.validators.length);
      });

      it('looks up validators by string', () => {
        validators.test = function() {};
        const path = new SchemaPath({ validators: ['test', 'foo'] });
        assert(path.validators.length === 1);
        assert(path.validators.includes(validators.test));
        delete validators.test;
      })
    });
  });

 

  describe('validate', () => {
    it('returns a promise', () => {
      assert(new SchemaPath().validate() instanceof Promise);
    });

    it('promise resolves to a boolean',  () => {
      schemaPath = new SchemaPath();
      return schemaPath.validate('foo')
        .then(val => assert(val));
    });
  });
});