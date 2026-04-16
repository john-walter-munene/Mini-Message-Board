const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')});
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

// Production
module.exports = new Pool({ connectionString, ssl: { rejectUnauthorized: false, }, });