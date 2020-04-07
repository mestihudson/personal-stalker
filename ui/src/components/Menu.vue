<template>
  <header class='cabecalho'>
    <a href='#' data-trigger='Home' @click.stop.prevent='home'>
      <h1 class='logo'>Personal Stalker</h1>
    </a>
    <button class='btn-menu' @click.stop.prevent='show'>
      <i class='fa fa-bars fa-lg'></i>
    </button>
    <nav class='menu' v-if='visible'>
      <button class='btn-close' @click.stop.prevent='hide'>
        <i class='fa fa-times fa-lg'></i>
      </button>
      <ul>
        <li>
          <a href='#' data-trigger='CompletedTasks'
            @click.stop.prevent='completeds'
          >Concluídas</a>
        </li>
        <li>
          <a href='#' data-trigger='Tasks' @click.stop.prevent='tasks'
          >Tarefas</a>
        </li>
        <li>
          <a href='#' data-trigger='Add' @click.stop.prevent='add'
          >Adicionar</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    home () {
      this.$router.push({ name: 'home' })
    },
    completeds () {
      this.$router.push({ name: 'completeds' })
      this.hide()
    },
    tasks () {
      this.$router.push({ name: 'tasks' })
      this.hide()
    },
    add () {
      this.$router.push({ name: 'add' })
      this.hide()
    },
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>
