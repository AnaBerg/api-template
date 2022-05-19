import Knex from 'knex';

export const up = (knex: Knex) => knex.schema.createTable("users", (table) => {
  table.uuid("id").notNullable().unique();
  table.string("name").notNullable();
  table.string("email").notNullable().unique();
  table.string("password").notNullable();
  table.string("type").notNullable();
  table.string("token");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("update_at").defaultTo(knex.fn.now());
});

export const down = (knex: Knex) => knex.schema.dropTableIfExists("users");