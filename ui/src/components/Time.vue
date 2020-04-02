<template>
  <div data-name='TimeData'>{{time}}</div>
</template>

<script>
import Timer from '@/services/Timer'

export default {
  props: { task: Object },
  computed: {
    time () {
      const result = this.task.status && this.task.status === 1
         ? Timer.ellipsed(this.task.latest_started, parseInt(this.task.passed))
         : ''
      return result
    }
  }
}
</script>
