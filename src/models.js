import knex from './sql/connector';

const models = {
  Post: {
    async findAll() {
      return knex.select().from('Post');
    },
  },
  User: {
    async findById({ id }) {
      const users = await knex.select().from('User').where({ id });
      if (users && users.length !== 0) return users[0];
      return null;
    },
    async create(data) {
      return knex.insert(data).into('User');
    },
  },
};

export default models;
