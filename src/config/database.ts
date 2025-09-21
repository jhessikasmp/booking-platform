import { Pool } from 'pg';
import { env } from './environment';
import { logger } from '../utils/logger';

export const pool = new Pool({ connectionString: env.DATABASE_URL });

pool.on('connect', () => logger.info('Connected to PostgreSQL'));
pool.on('error', (err: Error) => logger.error(`PostgreSQL error: ${err.message}`));
