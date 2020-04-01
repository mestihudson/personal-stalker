import TaskRepository from '@/repositories/TaskRepository'

export default class UpdateTask {
  constructor () {
    this.repository = new TaskRepository()
  }

  async exec(id, task) {
    if (task.name) {
      await this.repository.updateName(id, task)
    }
  }
}
