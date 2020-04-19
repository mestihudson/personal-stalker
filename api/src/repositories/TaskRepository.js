import { Pool } from 'pg'

export default class TaskRepository {
  constructor () {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    })
  }

  async setSchema (client) {
    await client.query(`set search_path to ${process.env.SCHEMA_DEFAULT}`, [])
  }

  async load () {
    const client = await this.pool.connect()
    await this.setSchema(client)
    const result = await client.query(
      "select id, name, status, passed, latest_started at time zone 'America/Sao_Paulo' as latest_started from task",
      []
    )
    await client.release()
    return result.rows
  }

  async add (task) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    await client.query(
      'insert into task (name) values ($1)', [task.name]
    )
    const result = await client.query(
      'select last_value as id from task_id_seq', []
    )
    await client.release()
    const { id } = result.rows[0]
    return { id }
  }

  async get (id) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    const result = await client.query(
      "select id, name, status, passed, latest_started at time zone 'America/Sao_Paulo' as latest_started from task where id = $1",
      [id]
    )
    await client.release()
    return result.rows[0]
  }

  async updateName (id, task) {
    const client = await this.pool.connect()
    await this.setSchema(client)
    await client.query(
      'update task set name = $2 where id = $1', [id, task.name]
    )
    await client.release()
  }

  async updateStatus (id, task) {
    console.warn(task)
    const client = await this.pool.connect()
    await this.setSchema(client)
    await client.query(`
      update task set status = $2, passed = $3, latest_started = $4
      where id = $1`, [
        id, task.status, task.passed, task.latest_started
      ]
    )
    await client.release()
  }
}
