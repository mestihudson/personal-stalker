<template>
  <div data-name='Total'>{{total}}</div>
</template>

<script>
export default {
  props: {
    tasks: Array
  },
  computed: {
    total () {
      return this.tasks
        .reduce((accumulator, { times }) => times[0] + accumulator, 0)
    }
  }
}
</script>

