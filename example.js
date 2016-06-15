'use strict';

global.fetch = require('node-fetch');

const Server = require('./server');
const server = new Server('http://localhost:4001');
// server.config({
//   headers: {
//     Authorization: 'Bearer foobar.foobar.foobar'
//   }
// });



const Model = require('./model');
class Problem  extends Model {

};

const Schema = require('./schema');
Problem.schema = new Schema({
  id: { type: Number, primary: true, validators: ['required'] },
  title: { type: String, validators: ['required'] }
}, {
  // this makes it impossible to add things not in the schema
  // strict: true
});


const Endpoint = require('./endpoint');

class ProblemEndpoint extends Endpoint {}

ProblemEndpoint.model = Problem;
ProblemEndpoint.server = server;
ProblemEndpoint.path = '/api/problems';


server.post('/api/sessions', { email: 'email@email.com', password: 'this is a test'})
  .then(jwt => {
    server.config({ headers: { Authorization: jwt.token} })
  })
  .then(() => {
    return ProblemEndpoint.create({
      title: 'foobar'
    })
  })
  .then((doc) => console.log(doc.title))
  // .then(console.log)
  .catch(console.error);

// Problem.findById(1)
//   .then(cohort => console.log(cohort.json))
//   .catch(console.error);
// Cohort.find()
// .then(console.log)
// .catch(console.error);