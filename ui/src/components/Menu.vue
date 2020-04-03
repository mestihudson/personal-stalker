<template>
  <div>
    <h1><a href='#' data-trigger='Home' @click.stop.prevent='home'
    >Personal Stalker</a></h1>
    <ul>
      <li>
        <button data-trigger='CompletedTasks' @click.stop='completeds'
        >Concluídas</button>
      </li>
      <li>
        <button data-trigger='Tasks' @click.stop='tasks'
        >Tarefas</button>
      </li>
      <li>
        <button data-trigger='Add' @click.stop='add'
        >Adicionar</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  methods: {
    completeds () {
      this.$router.push({ name: 'completeds' })
    },
    tasks () {
      this.$router.push({ name: 'tasks' })
    },
    home () {
      this.$router.push({ name: 'home' })
    },
    add () {
      this.$router.push({ name: 'add' })
    }
  }
}
</script>
