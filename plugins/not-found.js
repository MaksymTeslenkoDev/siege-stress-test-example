import fp from "fastify-plugin";

async function notFound (app, opts) {
  app.setNotFoundHandler(async (_, reply) => {
    reply.code(404);
    return "I'm sorry, I couldn't find what you were looking for.";
  });
};

export default fp(notFound);
