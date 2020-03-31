<template>
  <div>
    <button data-name='Start' v-if='showStart'>Iniciar</button>
    <button data-name='Pause' v-if='showPause'>Suspender</button>
    <button data-name='Resume' v-if='showResume'>Retomar</button>
    <button data-name='Stop' v-if='showStop'>Parar</button>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
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
    }
  }
}
</script>

