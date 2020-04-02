<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Status</th>
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
          <td>{{task.status}}</td>
          <td>{{tasks.times}}</td>
          <td>
            <actions :task='task' @start='start' @pause='pause' @resume='resume'
              @stop='stop'
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Api from '@/services/Api'
import Actions from '@/components/Actions'

export default {
  components: { Actions },
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
        .then((newTask) => console.warn(newTask))
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
      return this.all.filter((task) => task.status !== 3)
    }
  }
}
</script>
