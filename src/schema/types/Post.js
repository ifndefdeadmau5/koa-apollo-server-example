import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Post {
    id: ID
    title: String
    content: String
    createdAt: String
    comments: [Comment]
  }

  extend type Query {
    posts: [Post]
  }
`;

export const resolvers = {
  Query: {
    posts: (root, args, { user, models }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      return models.Post.findAll();
    },
  },
};
