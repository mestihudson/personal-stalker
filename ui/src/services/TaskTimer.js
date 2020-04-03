import Timer from '@/services/Timer'

export default {
  get (task) {
    if (task.status) {
      const { status } = task
      if (status === 1) {
        const { latest_started, passed } = task
        return Timer.intervaled(latest_started, passed)
      }
    }
  }
}
