/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('usersdetails', (t) => {
      t.increments('id').primary().notNullable();
      t.integer('userId')
        .notNullable()
        .unique()
        .references('id')
        .inTable('users');
      t.string('firstname');
      t.string('lastname');
      t.string('image');
      t.string('url');
      t.text('bio');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('usersdetails');
  };
