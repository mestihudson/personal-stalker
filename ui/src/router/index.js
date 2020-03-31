import Vue from 'vue'
import Router from 'vue-router'

import Tasks from '@/views/Tasks.vue'
import CompletedTasks from '@/views/CompletedTasks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', redirect: '/tasks' },
    { path: '/tasks', name: 'tasks', component: Tasks },
    { path: '/completeds', name: 'completeds', component: CompletedTasks }
  ]
})
