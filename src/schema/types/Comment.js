import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Comment {
    id: ID
    content: String
    createdAt: String
    user: User
  }

  extend type Query {
    comments(postId: ID!): [Comment]
  }
`;

export const resolvers = {
  Query: {
    comments: async (root, { postId }, { user, models }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      const result = await models.Comment.find({ postId });

      if (!result) throw new Error('No comments');

      const refined = result.map(({
        userId, username, email, ...rest
      }) => ({
        ...rest,
        user: {
          id: userId,
          username,
          email,
        },
      }));

      return refined;
    },
  },
};
