import DatetimeService from '@/services/DatetimeService'
import PauseAllStartedTasksService from '@/services/PauseAllStartedTasksService'
import TaskRepository from '@/repositories/TaskRepository'
import Status from '@/core/Status'

export default class RestartTask {
  constructor () {
    this.repository = new TaskRepository()
    this.service = new DatetimeService()
    this.status = new Status()
    this.pauseAllStartedTasks = new PauseAllStartedTasksService()
  }

  async exec(id) {
    await this.pauseAllStartedTasks.exec()
    const task = await this.repository.get(id)
    if (this.status.stoped(task.status)) {
      const new_task = {
        status: 1,
        latest_started: this.service.nowFormated(),
        passed: task.passed
      }
      await this.repository.updateStatus(id, new_task)
      return new_task
    }
    throw new Error(`Não é possível reiniciar tarefa a partir do estado atual: ${
      this.status.description(task.status)
    }`)
  }
}
