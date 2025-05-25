export const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';
import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = ['DATABASE_URL'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const APP_NAME = 'space-start API';

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const APP_VERSION = process.env.APP_VERSION || '0.0.0';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;


export const PORT = process.env.PORT || 4000;

export const HOST = process.env.HOST;
