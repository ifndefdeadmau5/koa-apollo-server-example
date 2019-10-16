import { gql } from 'apollo-server-koa';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const typeDef = gql`
  type User {
    id: String!
    password: String!
    username: String
  }

  extend type Query {
    getUser(id: ID!): User
  }

  extend type Mutation {
    login(id: ID!, password: String!): String
    signUp(id: ID!, password: String!): String
  }
`;

export const resolvers = {
  Query: {
    getUser: async (root, { id }, { models }) => {
      return models.User.findById({ id });
    },
  },
  Mutation: {
    signUp: async (root, { id, password }, { models }) => {
      const user = await models.User.create({
        id,
        password: await bcrypt.hash(password, 10),
      });

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    },
    login: async (root, { id, password }, { models }) => {
      const user = await models.User.findById({ id });

      if (!user) {
        throw new Error('No user with that id');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    },
  },
};
