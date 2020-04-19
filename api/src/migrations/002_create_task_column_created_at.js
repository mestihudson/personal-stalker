exports.up = (knex) => {
  return knex.schema.raw(`
    alter table personal_stalker.task
      add column created_at timestamp with time zone default current_timestamp
    ;
  `)
}

exports.down = (knex) => {
  return knex.schema.raw(`
    alter table personal_stalker.task drop column if exists created_at;
  `)
}
