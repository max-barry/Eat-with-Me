const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const resolvers = require('./resolvers');

const schema = `
  type Restaurant {
    id: ID!
    name: String!
    likes: Int!
    slug: String!
  }

  type User {
    id: ID!
    enabled: Boolean!
  }

  # the schema allows the following query:
  type Query {
    getRestaurants: [Restaurant]
    getRestaurant(id: ID, slug: String): Restaurant
  }

  # the schema allows the following mutations:
  type Mutation {
    updateLikes(id: ID!, uid: String!): Restaurant
  }
`;

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers
});
