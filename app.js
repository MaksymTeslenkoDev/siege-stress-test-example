import fastify from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import path from 'node:path';

export async function build(opts) {
  const app = fastify(opts);

  app.addSchema({
    $id: 'movie',
    type: 'object',
    properties: {
      title: { type: 'string' },
      year: { type: 'number' },
      director: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
        },
      },
    },
    required: ['title', 'year', 'director'],
  });

  app.register(import('@fastify/postgres'), {
    connectionString: `postgres://${opts.db.user}:${opts.db.password}@${opts.db.host}:${opts.db.port}/${opts.db.database}`,
  });

  app.register(fastifyAutoload, {
    dir: `${opts.appPath}/plugins`,
  });

  app.register(fastifyAutoload, {
    dir: `${opts.appPath}/routes`,
  });

  return app;
}
