const express = require('express');
const graphqlHTTP = require('express-graphql');
import { makeExecutableSchema } from 'graphql-tools';
const mongoose = require('mongoose');
import typeDefs from './schema.js'
import resolvers from './resolvers.js'
import models from './models'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

const app = express();

mongoose.connect('mongodb://localhost:27017/mern', {useNewUrlParser: true, useCreateIndex: true,}).then(
    () => {
  console.log("conectado a mongoDB");
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    context: {
        models
    }
  }));
  
  app.listen(4000, () => {console.log("graphql server running")});
});
