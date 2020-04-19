export default {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: process.env.MIGRATIONS || 'migrations'
  }
}
