'use strict';
module.exports.validator = val => {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(val);
};

module.exports.error = v => `${v} is not an email address`;