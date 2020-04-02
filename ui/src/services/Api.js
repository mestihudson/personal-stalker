import axios from 'axios'

export default {
  getTasks () {
    return axios.get('/api/tasks')
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  createTask (task) {
    return axios.post('/api/task', task)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  updateTask (id, task) {
    return axios.patch(`/api/task/${id}`, task)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  getTask (id) {
    return axios.get(`/api/task/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  startTask (id) {
    return axios.patch(`/api/task/start/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  pauseTask (id) {
    return axios.patch(`/api/task/pause/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  resumeTask (id) {
    return axios.patch(`/api/task/resume/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  }
}
