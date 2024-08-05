export default async function (app, opts) {
  app.post(
    '/add',
    {
      schema: {
        body: {
          $ref: 'movie',
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const id = await app.pg.transact(async (client) => {
        const {
          title,
          year,
          director: { firstName, lastName },
        } = request.body;
        const directorId = await client
          .query(
            'INSERT INTO directors (first_name, last_name) VALUES ($1, $2) RETURNING id',
            [firstName, lastName],
          )
          .then((res) => res.rows[0].id);

        return await client
          .query(
            'INSERT INTO movies (title, year, director_id) VALUES ($1, $2, $3) RETURNING id',
            [title, year, directorId],
          )
          .then((res) => res.rows[0].id);
      });

      return { id };
    },
  );
}
