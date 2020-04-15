exports.up = (knex) => {
  return knex.schema.raw(`
    create schema personal_stalker;
  `)
}

exports.down = (knex) => {
  return knex.schema.raw(`
    drop schema if exists personal_stalker cascade;
  `)
}
