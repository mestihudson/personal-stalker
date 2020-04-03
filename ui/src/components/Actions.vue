<template>
  <div>
    <button data-trigger='Start' v-if='showStart' @click='start'
    >Iniciar</button>
    <button data-trigger='Pause' v-if='showPause' @click='pause'
    >Suspender</button>
    <button data-trigger='Resume' v-if='showResume' @click='resume'
    >Retomar</button>
    <button data-trigger='Stop' v-if='showStop' @click='stop'>Concluir</button>
    <button data-trigger='Restart' v-if='showRestart' @click='restart'
    >Reiniciar</button>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    showButtons: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    console.log(this.showButtons)
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
      return this.task.status === 0 &&
        this.showButtons.some((button) => button === 'Start')
    },
    showPause () {
      return this.task.status === 1 &&
        this.showButtons.some((button) => button === 'Pause')
    },
    showResume () {
      return this.task.status === 2 &&
        this.showButtons.some((button) => button === 'Resume')
    },
    showStop () {
      return (this.showPause || this.showResume) &&
        this.showButtons.some((button) => button === 'Stop')
    },
    showRestart () {
      return this.task.status === 3 &&
        this.showButtons.some((button) => button === 'Restart')
    }
  }
}
</script>

