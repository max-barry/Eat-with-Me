import { makeExecutableSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import { PointObject } from 'graphql-geojson';

import resolvers from './resolvers';

const schema = `
  scalar JSON
  scalar Coordinates

  input CollectionAmend {
    id: ID!
    should_add: Boolean!
  }

  type Collection {
    id: ID!
    user: String!
    username: String!
    restaurants: [Restaurant]
    private: Boolean!
    is_all_favourites: Boolean!
  }

  type Location {
    address1: String!
    address2: String
    address3: String
    city: String!
    country: String!
    state: String
    zip_code: String!
  }

  type Restaurant {
    id: ID!
    name: String!
    slug: String!
    yelp: String!
    is_restaurant: Boolean!
    likes: Int
    yelp_rating: Float
    yelp_review_count: Int
    yelp_url: String
    price_bracket: Int
    display_phone: String
    category_aliases: JSON
    category_titles: JSON
    location: Location
    permanently_closed: Boolean
    coordinates: Coordinates
    yelp_photos: [String]
  }

  type Username {
    user: User!
  }

  type User {
    id: ID!
    enabled: Boolean!
    likes: JSON
    username: String
  }

  type RestaurantLikedBy {
    user: User!
    restaurant: Restaurant!
  }

  # the schema allows the following query:
  type Query {
    restaurants (
      after: String = null,
      orderBy: String = "-yelp_review_count",
      limit: Int = 20,
      includeClosed: Boolean = false
      includeLandmarks: Boolean = false
    ): [Restaurant]
    restaurant(id: ID, slug: String): Restaurant
    user(id: ID): User
    collections(user: String, username: String): [Collection]
    usernameExists(username: String!): Boolean
  }

  # the schema allows the following mutations:
  type Mutation {
    updateLikes(id: ID!, uid: String!, increment: Boolean!): RestaurantLikedBy
    updateCollection(id: ID!, owner: String!, restaurants: [CollectionAmend]): Collection
    setUsername(user: String!, username: String!): Boolean
  }
`;

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers: {
        JSON: {
            __serialize: value => GraphQLJSON.parseValue(value)
        },
        Coordinates: PointObject,
        ...resolvers
    }
});
