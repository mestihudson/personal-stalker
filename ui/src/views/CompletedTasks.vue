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
        <tr v-for='task in tasks' :key='task.id' data-name='Line'>
          <td>{{task.name}}</td>
          <td>{{task.status}}</td>
          <td>{{tasks.times}}</td>
          <td><actions :task='task'/></td>
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
    }
  },
  computed: {
    tasks () {
      return this.all.filter((task) => task.status === 3)
    }
  }
}
</script>

<style>
</style>
