<template>
  <div>
    <h1><a href='#' data-trigger='Home' @click='home'>Personal Stalker</a></h1>
    <ul>
      <li>
        <button data-trigger='CompletedTasks' @click='completeds'
        >Finalizadas</button>
      </li>
      <li>
        <button data-trigger='Tasks' @click='tasks'
        >Tarefas</button>
      </li>
      <li>
        <button data-trigger='Add' @click='add'
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
