<template>
  <a v-if='show' class='action' @click.stop.prevent='run'>{{name}}</a>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    run () {
      this.$emit('run', this.task)
    }
  }
}
</script>

