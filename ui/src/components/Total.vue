<template>
  <div data-name='Total'>{{total}}</div>
</template>

<script>
import Timer from '@/services/Timer'
import Totalized from '@/services/Totalized'

export default {
  props: { tasks: Array },
  computed: {
    total () {
      return Timer.humanize(Totalized.get(this.tasks))
    }
  }
}
</script>

