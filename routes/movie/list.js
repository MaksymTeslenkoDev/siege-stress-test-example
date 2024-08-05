export default async function (app, opts) {
  app.get(
    '/list',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: {
              ref: 'movie',
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { page, limit } = request.query;

      const offset = page * limit - limit;
      const movies = await app.pg.query(
        `SELECT m.id, m.title, m.year, d.id as "director.id", d.first_name as "director.firstName", d.last_name as "director.lastName"
            FROM movies m
            JOIN directors d ON m.director_id = d.id
            ORDER BY m.id
            OFFSET $1
            LIMIT $2`,
        [offset, limit],
      );

      return movies.rows;
    },
  );
}
