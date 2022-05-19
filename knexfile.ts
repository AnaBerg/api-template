require('dotenv').config();

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: "samurai",
      password: "samurai",
      database: "postgres"
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    }
  },
  staging: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    }
  }
};

export default knexConfig;