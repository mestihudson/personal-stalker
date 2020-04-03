import DatetimeService from '@/services/DatetimeService'
import TaskRepository from '@/repositories/TaskRepository'
import Status from '@/core/Status'

export default class PauseTask {
  constructor () {
    this.repository = new TaskRepository()
    this.service = new DatetimeService()
    this.status = new Status()
  }

  async exec(id) {
    const task = await this.repository.get(id)
    if (this.status.started(task.status)) {
      const new_task = {
        status: 2,
        time: {
          passed: this.service.seconds(
            this.service.elapsed(task.latest_started, task.passed)
          ),
          latest_started: null
        }
      }
      await this.repository.updateStatus(id, new_task)
      return new_task
    }
    throw new Error(`Não é possível suspender tarefa a partir do estado atual: ${
      this.status.description(task.status)
    }`)
  }
}
