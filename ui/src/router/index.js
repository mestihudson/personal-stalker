import Vue from 'vue'
import Router from 'vue-router'

import Tasks from '@/views/Tasks.vue'
import CompletedTasks from '@/views/CompletedTasks.vue'
import Task from '@/views/Task.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', redirect: { name: 'tasks' } },
    { path: '/tasks', name: 'tasks', component: Tasks },
    { path: '/tasks/completed', name: 'completeds', component: CompletedTasks },
    { path: '/task/add', name: 'add', component: Task },
    { path: '/task/edit/:id', name: 'edit', component: Task, props: true }
  ]
})
