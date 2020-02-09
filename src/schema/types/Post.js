import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Post {
    id: ID
    title: String
    content: String
    createdAt: String
    comments: [Comment]
    author: User
  }

  extend type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  input CreatePostInput {
    title: String
    content: String
    authorId: String
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Post
  }
`;

export const resolvers = {
  Query: {
    post: async (root, { id }, { user, models }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      const post = (await models.Post.find({ 'Post.id': id }))[0];

      const {
        userId, username, email, ...rest
      } = post;
      return {
        ...rest,
        author: {
          id: userId,
          username,
          email,
        },
      };
    },
    posts: (root, args, { user, models }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      return models.Post.findAll();
    },
  },
  Mutation: {
    createPost: async (root, { input }, { models }) => models.Post.createPost(input),
  },
};
