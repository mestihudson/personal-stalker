import TaskRepository from '@/repositories/TaskRepository'

export default class CreateTask {
  constructor () {
    this.repository = new TaskRepository()
  }

  async exec(task) {
    return await this.repository.add(task)
  }
}
