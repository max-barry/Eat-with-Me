const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const resolvers = require('./resolvers');

const schema = `
  type Restaurant {
    id: ID!
    name: String!
    likes: Int!
  }

  # the schema allows the following query:
  type Query {
    restaurants: [Restaurant]
    restaurant(id: ID!): Restaurant
  }

  # the schema allows the following mutations:
  type Mutation {
    like(id: ID!): Restaurant
  }
`;

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers
});

/**

type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}
# the schema allows the following query:
type Query {
  posts: [Post]
  author(id: Int!): Author
}
# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}

*/
