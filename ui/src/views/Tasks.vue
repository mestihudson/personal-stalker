<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Status</th>
          <th>Tempo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='task in tasks' :key='task.id' data-name='Line'>
          <td>{{task.name}}</td>
          <td>{{task.status}}</td>
          <td>{{tasks.times}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Api from '@/services/Api'

export default {
  data () {
    return {
      tasks: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Api.getTasks()
        .then((tasks) => {
          this.tasks = tasks
        })
    }
  },
  computed: {}
}
</script>

<style>
</style>
