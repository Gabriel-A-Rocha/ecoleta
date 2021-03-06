import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary();

    table.string("image").notNullable(); //store the image url
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable(); //ufs have only 2 characters
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("points");
}
