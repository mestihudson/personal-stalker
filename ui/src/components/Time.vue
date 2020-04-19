<template>
  <div data-name='TimeData'>{{time}}</div>
</template>

<script>
import Timer from '@/services/Timer'

export default {
  props: { task: Object },
  data () {
    return {
      interval: null,
      begin: 0,
      value: '',
      debug: null
    }
  },
  computed: {
    time () {
      const task = this.task
      if (task.status) {
        if (task.status === 1) {
          if (this.interval === null) {
            const { latest_started, passed } = task
            this.begin = Timer.seconds(
              Timer.elapsed(Timer.parse(latest_started), parseInt(passed))
            )
            this.interval = setInterval(() => {
              this.value = Timer.spin(this.begin++)
            }, 1000)
          }
        } else {
          if (this.interval !== null) {
            clearInterval(this.interval)
            this.interval = null
          }
          if (task.status === 2 || task.status === 3) {
            this.value = Timer.spin(parseInt(task.passed))
          }
        }
      }
      return this.value
    }
  }
}
</script>
