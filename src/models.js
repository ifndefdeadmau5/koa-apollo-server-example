import knex from './sql/connector';

const models = {
  Post: {
    async findAll() {
      return knex.select().from('Post');
    },
    async find(options) {
      return knex('Post')
        .select([
          'Post.id',
          'Post.title',
          'Post.content',
          'User.email',
          'User.username',
          'User.id as userId',
        ])
        .leftJoin('User', 'Post.authorId', '=', 'user.id')
        .where(options);
    },
    async createPost(args) {
      return knex('Post').insert(args);
    },
  },
  User: {
    async findById({ id }) {
      const users = await knex
        .select()
        .from('User')
        .where({ id });
      if (users && users.length !== 0) return users[0];
      return null;
    },
    async create(data) {
      return knex.insert(data).into('User');
    },
  },
  Comment: {
    async findAll() {
      return knex.select().from('Comment');
    },
    async find(options) {
      return knex('Comment')
        .select([
          'Comment.id',
          'Comment.content',
          'Comment.createdAt',
          'User.email',
          'User.username',
          'User.id as userId',
        ])
        .join('User', 'Comment.userId', '=', 'user.id')
        .where(options);
    },
  },
};

export default models;
