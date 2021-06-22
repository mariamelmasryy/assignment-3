module.exports = {
  database: process.env.POSTGRES_DB_NAME || 'task',
  username: process.env.POSTGRES_DB_USER || 'root',
  password: process.env.POSTGRES_DB_PASSWORD || '1234',
  host: process.env.POSTGRE_DB_HOST || '127.0.0.1',
  port: process.env.POSTGRES_DB_PORT || 5432,
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  debug: true,
  sync: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
