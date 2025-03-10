const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}

module.exports = new Pool({ connectionString: process.env.DATABASE_URL });
