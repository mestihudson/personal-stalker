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
          <td>
            <a href='#' data-trigger='Edit' :data-id='task.id'
              @click='edit(task.id)'
            >{{task.name}}</a>
          </td>
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
    },
    edit (id) {
      this.$router.push({ name: 'edit', params: { id } })
    }
  },
  computed: {
    tasks () {
      return this.all.filter((task) => task.status !== 3)
    }
  }
}
</script>

<style>
</style>
