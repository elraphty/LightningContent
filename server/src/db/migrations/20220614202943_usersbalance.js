/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usersbalance', (t) => {
    t.increments('id').primary().notNullable();
    t.integer('userId')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users');
    t.float('balance').defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usersbalance');
};
