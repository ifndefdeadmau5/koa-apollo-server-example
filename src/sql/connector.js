import knex from 'knex';
import knexfile from '../../Knexfile';

export default knex(knexfile[process.env.NODE_ENV || 'development']);
