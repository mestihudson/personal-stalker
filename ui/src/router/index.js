import Vue from 'vue'
import Router from 'vue-router'

import Tasks from '@/views/Tasks.vue'
import Task from '@/views/Task.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', redirect: { name: 'tasks' } },
    { path: '/tasks', name: 'tasks', component: Tasks },
    {
      path: '/tasks/completeds', name: 'completeds', component: Tasks,
      beforeEnter (to, from, next) {
        to.params.completeds = true
        next(to.params)
      },
      props: true
    },
    { path: '/task/add', name: 'add', component: Task },
    { path: '/task/edit/:id', name: 'edit', component: Task, props: true }
  ]
})
