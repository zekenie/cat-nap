'use strict';
const validators = require('./validators');
const ValidationError = require('./errors/validationError');

const buildValidators = function() {
  if(!!this.type) {
    this.validators.push('type');
  }
  this.validators = this.validators
    .map(validator => {
      if(typeof validator === 'string') {
        return validators[validator];
      }
      return validator;
    })
    .filter(validator => !!validator);
};

class SchemaPath {
  constructor(props={}) {
    Object.assign(this, props);
    this.validators = this.validators || [];
    buildValidators.call(this);
  }

  validate(value) {

    const promises = this.validators
      .map(validator => validator.validator(value))

    return Promise.all(promises)
      .then(validationResults => {
        return validationResults.map((result, i) => {
          if(result) {
            return new ValidationError(this.validators[i].error(value));
          }
        });
      })
      .then(errors => errors.filter(err => !!err));
    
  }
}

module.exports = SchemaPath;