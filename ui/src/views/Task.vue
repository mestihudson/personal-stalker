<template>
  <div class='form'>
    <input type='text' data-input='Name' :value='task.name' @change='changeName'
      placeholder='Nome'
    />
    <a href='#' data-trigger='Save' @click.stop.prevent='save'>
      <i class='fa fa-save fa-lg'></i>
    </a>
  </div>
</template>

<script>
import Api from '@/services/Api'
import Notification from '@/services/Notification'

export default {
  props: {
    id: {
      validator (value) {
        return !isNaN(value)
      }
    }
  },
  created () {
    this.clear()
    this.init()
  },
  data () {
    return {
      task: {
        name: ''
      }
    }
  },
  methods: {
    clear () {
      this.task = {
        name: ''
      }
    },
    init () {
      if (this.id !== undefined) {
        Api.getTask(this.id)
          .then(({ name }) => this.task = { ...this.task, name })
          .catch((erros) => console.error(errors))
      }
    },
    beforeUpdate () {
      console.log('Antes de atualizar')
    },
    afterUpdate () {
      console.log('Depois de atualizar')
    },
    save () {
      if (this.id !== undefined) {
        this.beforeUpdate()
        Api.updateTask(this.id, this.task)
          .then(() => {
            Notification.success(`Tarefa atualizada com sucesso.`)
              .then(() => this.afterUpdate())
          })
          .catch((erros) => console.error(errors))
      } else {
        Api.createTask(this.task)
          .then(({ id }) => {
            Notification.success(`Tarefa criada com sucesso.`)
              .then(() => {
                this.$router.push({ name: 'edit', params: { id } })
                window.location.reload()
              })
          })
          .catch((erros) => console.error(errors))
      }
    },
    changeName ({ target }) {
      this.task.name = target.value
    }
  }
}
</script>
