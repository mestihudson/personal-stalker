import LoadTasks from '@/usecases/LoadTasks'
import PauseTask from '@/usecases/PauseTask'

export default class PauseAllStartedTasksService {
  constructor () {
    this.loadTasks = new LoadTasks()
    this.pauseTask = new PauseTask()
  }

  async exec () {
    try {
      await this.findAndPause(await this.loadTasks.exec())
    } catch(e) {
      throw new Error(`PauseAllStartedTasksService.exec (${e.message})`)
    }
  }

  async findAndPause(tasks) {
    try {
      for (let i = 0, l = tasks.length; i < l; i++) {
        if (tasks[i].status === 1) {
          await this.pauseTask.exec(tasks[i].id)
        }
      }
    } catch(e) {
      throw new Error(`PauseAllStartedTasksService.findAndPause (${e.message})`)
    }
  }
}
