exports.up = function (knex) {
  return knex.schema.createTable("jokes", (table) => {
    table.increments();
    table.string("joke");
    table.string("author");
    table.integer("funnyLevel");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("jokes");
};
