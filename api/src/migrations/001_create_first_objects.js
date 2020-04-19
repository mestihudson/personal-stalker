exports.up = (knex) => {
  return knex.schema.raw(`
    create table personal_stalker.task (
      id bigint not null,
      name character varying(100) not null,
      status integer default 0,
      passed bigint default 0,
      latest_started timestamp with time zone
    );
    alter table personal_stalker.task
      add constraint task_pk primary key (id)
    ;
    create sequence personal_stalker.task_id_seq
      owned by personal_stalker.task.id
    ;
    alter table personal_stalker.task
      alter column id
        set default nextval('personal_stalker.task_id_seq'::regclass)
    ;
  `)
}

exports.down = (knex) => {
  return knex.schema.raw(`
    drop table if exists personal_stalker.task cascade;
    drop sequence if exists personal_stalker.task_id_seq cascade;
  `)
}
