module.exports = {
  connection: {
    host: '127.0.0.1',
    port: 3000,
    tls: null
  },
  joi: {
    allowUnknown: false,
    abortEarly: false
  },
  database: {
    database: process.env.POSTGRES_DB_NAME || 'task',
    username: process.env.POSTGRES_DB_USER || 'root',
    password: process.env.POSTGRES_DB_PASSWORD || '1234',
    host: process.env.POSTGRE_DB_HOST || '127.0.0.1',
    port: process.env.POSTGRES_DB_PORT || 5432,
    dialect: 'postgres',
    debug: true,
    sync: false,
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
};
