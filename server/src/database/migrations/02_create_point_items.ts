import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();

    table.integer("point_id").notNullable().references("id").inTable("points"); //foreign key reference
    table.integer("item_id").notNullable().references("id").inTable("items"); //foreign key reference
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("point_items");
}
