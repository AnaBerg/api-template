import knex from 'knex';
import knexConfig from '../../knexfile';

const env = process.env.NODE_ENV ||  'development';
const configOptions = knexConfig[env as keyof typeof knexConfig];

export default knex(configOptions);