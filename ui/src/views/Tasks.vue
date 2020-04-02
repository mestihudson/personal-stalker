<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th v-if='!completeds' data-name='StatusHeader'>Status</th>
          <th>Tempo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='task in tasks' :key='task.id' data-name='Line'
          :data-id='task.id'
        >
          <td>
            <a href='#' data-trigger='Edit' @click.stop.prevent='edit(task.id)'
            >{{task.name}}</a>
          </td>
          <td v-if='!completeds' data-name='StatusData'>{{task.status}}</td>
          <td><app-time :task='task'/></td>
          <td>
            <actions :task='task' @start='start' @pause='pause' @resume='resume'
              @stop='stop'
            />
          </td>
        </tr>
      </tbody>
      <tfoot v-if='completeds'>
        <tr>
          <th>Tempo Total</th>
          <td><total :tasks='tasks'/></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Api from '@/services/Api'
import Actions from '@/components/Actions'
import AppTime from '@/components/Time'
import Total from '@/components/Total'

export default {
  components: { Actions, Total, AppTime },
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
    init () {
      Api.getTasks()
        .then((tasks) => {
          this.all = tasks
        })
    },
    edit (id) {
      this.$router.push({ name: 'edit', params: { id } })
    },
    start (task) {
      Api.startTask(task.id)
        .then((newTask) => {
          this.all = this.all.map((one) => {
            return one.id === task.id
              ? { ...one, ...newTask }
              : one
          })
        })
    },
    pause (task) {
      Api.pauseTask(task.id)
        .then((newTask) => console.warn(newTask))
    },
    resume (task) {
      Api.resumeTask(task.id)
        .then((newTask) => console.warn(newTask))
    },
    stop (task) {
      Api.stopTask(task.id)
        .then((newTask) => console.warn(newTask))
    }
  },
  computed: {
    tasks () {
      return this.all
        .filter(({ status }) => this.completeds ? status === 3 : status !== 3)
    }
  }
}
</script>
