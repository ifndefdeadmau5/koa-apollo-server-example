import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Comment {
    id: ID
    content: String
    createdAt: String
    userId: String
  }

  extend type Query {
    comments(postId: ID!): [Comment]
  }
`;

export const resolvers = {
  Query: {
    comments: (root, { postId }, { user, models }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      return models.Comment.find({ postId });
    },
  },
};
