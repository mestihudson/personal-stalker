import TaskRepository from '@/repositories/TaskRepository'
import DatetimeService from '@/services/DatetimeService'
import Status from '@/core/Status'

export default class StopTask {
  constructor () {
    this.service = new DatetimeService()
    this.repository = new TaskRepository()
    this.status = new Status()
  }

  async exec(id) {
    const task = await this.repository.get(id)
    if (this.status.started(task.status)) {
      const new_task = {
        status: 3,
        latest_started: null,
        passed: this.service.seconds(
          this.service.elapsed(task.latest_started, task.passed)
        )
      }
      await this.repository.updateStatus(id, new_task)
      return new_task
    }
    if (this.status.paused(task.status)) {
      const new_task = {
        status: 3,
        latest_started: null,
        passed: task.passed
      }
      await this.repository.updateStatus(id, new_task)
      return new_task
    }
    throw new Error(`Não é possível parar tarefa a partir do estado atual: ${
      this.status.description(task.status)
    }`)
  }
}
