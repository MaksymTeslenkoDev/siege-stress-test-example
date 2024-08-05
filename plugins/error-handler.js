import fp from 'fastify-plugin';

/** @param {import('fastify').FastifyInstance} fastify */
async function errorHandler(app, opts) {
  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403);
      return err.message;
    }
    request.log.error({ err });
    reply.code(err.statusCode || 500);

    return "I'm sorry, there was an error processing your request.";
  });
}

export default fp(errorHandler);
