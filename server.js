import { build } from './app.js';
import closeWithGrace from 'close-with-grace';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

const opts = {
  appPath: path.join(process.cwd(), './'),
  db:{
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  logger: {
    level: 'info',
  },
};

if (process.stdout.isTTY) {
  opts.logger.transport = { target: 'pino-pretty' };
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const app = await build(opts);
await app.listen({ port, host });

closeWithGrace(async ({ err }) => {
  if (err) {
    app.log.error({ err }, 'server closing due to error');
  } else {
    app.log.info('shutting down gracefully');
  }
  await app.close();
});
