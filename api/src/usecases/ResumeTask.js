import DatetimeService from '@/services/DatetimeService'
import TaskRepository from '@/repositories/TaskRepository'
import Status from '@/core/Status'

export default class ResumeTask {
  constructor () {
    this.repository = new TaskRepository()
    this.service = new DatetimeService()
    this.status = new Status()
  }

  async exec(id) {
    const task = await this.repository.get(id)
    if (this.status.paused(task.status)) {
      const new_task = {
        status: 1,
        time: {
          passed: task.passed,
          latest_started: this.service.nowFormated()
        }
      }
      await this.repository.updateStatus(id, new_task)
      return new_task
    }
    throw new Error(`Não é possível retomar tarefa a partir do estado atual: ${
      this.status.description(task.status)
    }`)
  }
}
