<template>
  <div class='container'>
    <div class='total' v-if='completeds'><total :tasks='tasks'/></div>
    <ul>
      <li class='card' v-for='task in tasks' :key='task.id' data-name='Line'
        :data-id='task.id'
      >
        <div class='name'>
          <action :task='task' @run='open' :name='task.name'/>
        </div>
        <div class='status'>{{task.statusDesc}}</div>
        <div class='time'><app-time :task='task'/></div>
        <a href='#' class='edit' data-trigger='Edit'
          @click.stop.prevent='edit(task.id)' data-name='StatusData'
        ><i class='fa fa-pencil'></i></a>
      </li>
    </ul>
    <!-- <table> -->
    <!--   <thead> -->
    <!--     <tr> -->
    <!--       <th>Tarefa</th> -->
    <!--       <th data-name='StatusHeader'>Status</th> -->
    <!--       <th>Tempo</th> -->
    <!--       <th></th> -->
    <!--     </tr> -->
    <!--   </thead> -->
    <!--   <tbody> -->
    <!--     <tr v-for='task in tasks' :key='task.id' data-name='Line' -->
    <!--       :data-id='task.id' -->
    <!--     > -->
    <!--       <td> -->
    <!--         <a href='#' data-trigger='Edit' @click.stop.prevent='edit(task.id)' -->
    <!--         >{{task.name}}</a> -->
    <!--       </td> -->
    <!--       <td data-name='StatusData'>{{task.statusDesc}}</td> -->
    <!--       <td><app-time :task='task'/></td> -->
    <!--       <td> -->
    <!--         <action :task='task' @run='open' name='Visualizar'/> -->
    <!--       </td> -->
    <!--     </tr> -->
    <!--   </tbody> -->
    <!--   <tfoot v-if='completeds'> -->
    <!--     <tr> -->
    <!--       <th>Tempo Total</th> -->
    <!--       <td><total :tasks='tasks'/></td> -->
    <!--     </tr> -->
    <!--   </tfoot> -->
    <!-- </table> -->
  </div>
</template>

<script>
import Api from '@/services/Api'
import Action from '@/components/Action'
import AppTime from '@/components/Time'
import Total from '@/components/Total'

export default {
  components: { Total, AppTime, Action },
  props: {
    completeds: Boolean,
    default: false
  },
  data () {
    return {
      all: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    open ({ id }) {
      this.$router.push({ name: 'focus', params: { id } })
      window.location.reload()
    },
    showStart (task) {
      return !this.completeds && task.status === 0
    },
    showPause (task) {
      return !this.completeds && task.status === 1
    },
    showResume (task) {
      return !this.completeds && task.status === 2
    },
    showRestart (task) {
      return this.completeds && task.status === 3
    },
    showStop (task) {
      return !this.completeds && (this.showPause(task) || this.showResume(task))
    },
    init () {
      Api.getTasks()
        .then((tasks) => {
          const STATUS_DESC = [
            'Não iniciada', 'Iniciada', 'Suspensa', 'Concluída'
          ]
          this.all = tasks
            .map((task) => {
              return { ...task, statusDesc: STATUS_DESC[task.status] }
            })
        })
    },
    edit (id) {
      this.$router.push({ name: 'edit', params: { id } })
    },
    changeStatus ({ task, newTask }) {
      this.all = this.all
        .map((one) => {
          return one.id === task.id
            ? { ...one, ...newTask }
            : one
        })
    },
    pause (task) {
      Api.pauseTask(task.id)
        .then((newTask) => this.changeStatus({ task, newTask }))
    },
    resume (task) {
      Api.resumeTask(task.id)
        .then((newTask) => {
          this.changeStatus({ task, newTask })
          window.location.reload()
        })
    },
    stop (task) {
      Api.stopTask(task.id)
        .then((newTask) => this.changeStatus({ task, newTask }))
    },
    restart (task) {
      Api.restartTask(task.id)
        .then((newTask) => {
          this.changeStatus({ task, newTask })
          this.$router.push({ name: 'tasks' })
          window.location.reload()
        })
    },
    start (task) {
      Api.startTask(task.id)
        .then((newTask) => this.changeStatus({ task, newTask }))
    },
    resume (task) {
      Api.resumeTask(task.id)
        .then((newTask) => this.changeStatus({ task, newTask }))
    }
  },
  computed: {
    tasks () {
      return this.all
        .filter(({ status }) => this.completeds ? status === 3 : status !== 3)
        .map((task) => {
          const ORDER = [2, 0, 1, 3]
          return { ...task, order: ORDER[task.status] }
        })
        .sort((a, b) => a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
    }
  }
}
</script>
