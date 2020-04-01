import TaskRepository from '@/repositories/TaskRepository'

export default class LoadTasks {
  constructor () {
    this.repository = new TaskRepository()
  }

  async exec() {
    return await this.repository.load()
  }
}
