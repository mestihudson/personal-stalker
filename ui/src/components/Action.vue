<template>
  <button v-if='show' @click='run'>{{name}}</button>
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

