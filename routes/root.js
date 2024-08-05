/** @param {import('fastify').FastifyInstance} fastify */
export default async function (app, opts) {
  app.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  app.get('/error', async (request, reply) => {
    throw new Error('This is an error');
  });

  app.get('/notfound', async (request, reply) => {
    reply.callNotFound();
  });
}
