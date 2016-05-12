'use strict';
module.exports.validator = value => !!value && value.constructor === this.type;

module.exports.error = val => `${val} does not match correct type`;