const requiredEnvVars = ['VITE_API_URL'];

requiredEnvVars.forEach((envVar) => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const API_URL = import.meta.env.VITE_API_URL;
