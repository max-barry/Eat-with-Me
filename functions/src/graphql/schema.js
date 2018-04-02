const GraphQLJSON = require('graphql-type-json');

const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const resolvers = require('./resolvers');

const schema = `
  scalar JSON

  type Restaurant {
    id: ID!
    name: String!
    likes: Int!
    slug: String!
  }

  type User {
    id: ID!
    enabled: Boolean!
    likes: JSON
  }

  type RestaurantLikedBy {
    user: User!
    restaurant: Restaurant!
  }

  # the schema allows the following query:
  type Query {
    getRestaurants: [Restaurant]
    getRestaurant(id: ID, slug: String): Restaurant
    getUserProfile(id: ID): User
  }

  # the schema allows the following mutations:
  type Mutation {
    updateLikes(id: ID!, uid: String!, increment: Boolean!): RestaurantLikedBy
  }
`;

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers: {
        JSON: {
            __serialize: value => GraphQLJSON.parseValue(value)
        },
        ...resolvers
    }
});
