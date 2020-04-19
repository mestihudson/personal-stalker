<template>
  <div class='focus'>
    <action :task='task' @run='close' class='action close fa fa-times'
      title='Fechar'
    />
    <h2 class='status'>{{status}}</h2>
    <h1 class='time'><app-time :task='task'/></h1>
    <h3 class='name'>{{task.name}}</h3>
    <action :task='task' @run='start' :show='showStart'
      class='action start fa fa-play' title='Iniciar'
    />
    <action :task='task' @run='pause' :show='showPause'
      class='action pause fa fa-pause' title='Suspender'
    />
    <action :task='task' @run='resume' :show='showResume'
      class='action resume fa fa-play' title='Retomar'
    />
    <action :task='task' @run='stop':show='showStop'
      class='action stop fa fa-stop' title='Parar'
    />
    <action :task='task' @run='restart':show='showRestart'
      class='action restart fa fa-undo' title='Reiniciar'
    />
  </div>
</template>

<script>
import AppTime from '@/components/Time'
import Action from '@/components/Action'
import Api from '@/services/Api'

export default {
  components: { AppTime, Action },
  props: ['id'],
  data () {
    return {
      task: { status: 0 }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Api.getTask(this.id)
        .then((task) => this.task = task)
    },
    close () {
      this.$router.push({ name: 'tasks' })
      window.location.reload()
    },
    start () {
      Api.startTask(this.id)
        .then((newTask) => this.task = { ...this.task, ...newTask })
    },
    restart () {
      Api.restartTask(this.id)
        .then((newTask) => this.task = { ...this.task, ...newTask })
    },
    pause () {
      Api.pauseTask(this.id)
        .then((newTask) => this.task = { ...this.task, ...newTask })
    },
    resume () {
      Api.resumeTask(this.id)
        .then((newTask) => this.task = { ...this.task, ...newTask })
    },
    stop () {
      Api.stopTask(this.id)
        .then((newTask) => this.task = { ...this.task, ...newTask })
    }
  },
  computed: {
    status () {
      return ['Não iniciada', 'Iniciada', 'Suspensa', 'Concluída']
        [this.task.status]
    },
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
