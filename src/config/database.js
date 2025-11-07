// config/db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Force IPv4
  host: 'db.emripxpypdhiluqdemje.supabase.co',
  user: 'postgres',
  password: 'teamdb@22cntt1',
  database: 'postgres',
  port: 5432
};

console.log('Database config:', { ...config, password: '****' });

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

export default pool;
