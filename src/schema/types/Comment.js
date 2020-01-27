import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Comment {
    id: ID
    content: String
    createdAt: String
    userId: String
  }

  extend type Query {
    Comments: [Comment]
  }
`;

export const resolvers = {
  Comment: {
    content: () => 'Sample comment',
  },
  Query: {
    Comments: (root, args, { user, models }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      return models.Comment.findAll();
    },
  },
};
