const jsonFetch = require('../jsonFetch');
const fetch = require('../fetch');
const assert = require('assert');
const sinon = require('sinon');
const methods = ['get', 'post', 'put', 'delete'];
let originalFetch = fetch.fetch;

describe('jsonFetch', () => {
  it('has the correct methods', () => {
    methods.forEach(m => assert(typeof jsonFetch[m] === 'function'));
  });

  methods.forEach(m => {
    describe(m, () => {

      beforeEach(() => {
        fetch.fetch = sinon.stub();
        fetch.fetch.returns(Promise.resolve());
      });

      after(() => {
        fetch.fetch = originalFetch;
      });

      let response;

      beforeEach(() => {
        response = jsonFetch[m]('/someUrl');
      });

      it('returns a promise', () => {
        assert(response instanceof Promise);
      });

      it('has default options', () => {
        fetch.fetch.calledWith('/someUrl', {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
      });


    });
  });
});