'use strict';
module.exports.validator = value => !this.required || !!value;

module.exports.error = () => 'Value is required for this path';