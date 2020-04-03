import TaskRepository from '@/repositories/TaskRepository'

export default class LoadTasks {
  constructor () {
    this.repository = new TaskRepository()
  }

  async exec() {
    try {
      return await this.repository.load()
    } catch(e) {
      throw new Error(`LoadTasks.exec (${e.message})`)
    }
  }
}
