// Description: This file is used to create the database and tables in the PostgreSQL database.
import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST || 'localhost',
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT || 5432,
    },
});

async function createTablesStructure(db){
    try {
        await db.schema.createTable('directors', (table) => {
            table.increments('id').primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
        });

        await db.schema.createTable('movies', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.integer('year').notNullable();
            table.integer('director_id').unsigned().notNullable();
            table.foreign('director_id').references('directors.id');
        });
    } catch (err) {
        throw err;
    } finally {
        await db.destroy();
    }
}

async function initializeDatabase() {
    try {
        await createTablesStructure(db);
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await db.destroy();
    }
}

initializeDatabase();

