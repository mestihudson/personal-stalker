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
      <tfoot>
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
import Total from '@/components/Total'

export default {
  components: { Actions, Total },
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
