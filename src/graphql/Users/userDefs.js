import { gql } from "apollo-server-core";
import { createUser } from "../../helpers/tasks/users/createUser.js";

export const userSchema = gql `
  input UserInput {
    username: String!
    password: String!
    email: String!
  }

  type User {
    _id: ID
    token: String!
    username: String!
    password: String!
    email: String!
    image: String
  }

  type Query {
    allUsers: [User]
  }

  type Mutation {
    createUser(user: UserInput!): User!
  }
`;

export const userResolvers = {
    Query: {
        allUsers: () => [],
    },

    Mutation: {
        createUser: (root, args) => createUser(args),
    },
};