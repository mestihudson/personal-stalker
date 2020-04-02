<template>
  <div>
    <button data-trigger='Start' v-if='showStart' @click='start'
    >Iniciar</button>
    <button data-trigger='Pause' v-if='showPause' @click='pause'
    >Suspender</button>
    <button data-trigger='Resume' v-if='showResume' @click='resume'
    >Retomar</button>
    <button data-trigger='Stop' v-if='showStop' @click='stop'>Parar</button>
    <button data-trigger='Restart' v-if='showRestart' @click='restart'
    >Reiniciar</button>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  methods: {
    start () {
      this.$emit('start', this.task)
    },
    pause () {
      this.$emit('pause', this.task)
    },
    resume () {
      this.$emit('resume', this.task)
    },
    stop () {
      this.$emit('stop', this.task)
    },
    restart () {
      this.$emit('restart', this.task)
    }
  },
  computed: {
    showStart () {
      return this.task.status === 0
    },
    showPause () {
      return this.task.status === 1
    },
    showResume () {
      return this.task.status === 2
    },
    showStop () {
      return this.showPause || this.showResume
    },
    showRestart () {
      return this.task.status === 3
    }
  }
}
</script>

