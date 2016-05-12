'use strict';
const jsonFetch = require('./jsonFetch');

jsonFetch.config({
  headers: {
    Authorization: 'Bearer foobar.foobar.foobar'
  }
});

const RestClient = require('./restClient');

class Cohort extends RestClient {}

Cohort.path = 'https://learn.fullstackacademy.com/api/cohorts';
Cohort.schema = new RestClient.Schema({
  _id: { type: String, primary: true, validators: ['required'] },
  name: { type: String, validators: ['required'] }
}, {
  // this makes it impossible to add things not in the schema
  // strict: true
});


Cohort.findById('572d1079306d520300575068')
  .then(cohort => console.log(cohort.json))
  .catch(console.error);
// Cohort.find()
// .then(console.log)
// .catch(console.error);