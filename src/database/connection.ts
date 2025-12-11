import knex from "knex";

export const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "lobato",
    password: "1234",
    database: "cinema_db",
  },
});
