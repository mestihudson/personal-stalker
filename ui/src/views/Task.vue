<template>
  <div>
    <input type='text' data-input='Name' :value='task.name' @change='changeName'
    />
    <button data-trigger='Save' @click='save'>Salvar</button>
  </div>
</template>

<script>
import Api from '@/services/Api'
import Notification from '@/services/Notification'

export default {
  data () {
    return {
      task: {
        name: ''
      }
    }
  },
  methods: {
    save () {
      Api.createTask(this.task)
        .then(({ id }) => {
          Notification.success(`Tarefa criada com sucesso.`)
            .then(() => this.$router.push({ name: 'edit', params: { id } }))
        })
    },
    changeName ({ target }) {
      this.task.name = target.value
    }
  }
}
</script>
