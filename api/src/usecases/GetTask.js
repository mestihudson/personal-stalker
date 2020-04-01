import TaskRepository from '@/repositories/TaskRepository'

export default class GetTask {
  constructor () {
    this.repository = new TaskRepository()
  }

  async exec(id) {
    return await this.repository.get(id)
  }
}
