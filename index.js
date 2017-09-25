const server = require('apollo-server-micro');
const {makeExecutableSchema} = require('graphql-tools');
const {formatError} = require('apollo-errors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = server.microGraphql({
  formatError,
  schema
});
