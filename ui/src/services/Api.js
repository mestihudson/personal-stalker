import axios from 'axios'

const URL = process.env.NODE_ENV === 'production'
  ? process.env.VUE_APP_API_URL
  : ''

export default {
  getTasks () {
    return axios.get(`${URL}/api/tasks`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  createTask (task) {
    return axios.post(`${URL}/api/task`, task)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  updateTask (id, task) {
    return axios.patch(`${URL}/api/task/${id}`, task)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  getTask (id) {
    return axios.get(`${URL}/api/task/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  restartTask (id) {
    return axios.patch(`${URL}/api/task/restart/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  startTask (id) {
    return axios.patch(`${URL}/api/task/start/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  pauseTask (id) {
    return axios.patch(`${URL}/api/task/pause/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  resumeTask (id) {
    return axios.patch(`${URL}/api/task/resume/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  },
  stopTask (id) {
    return axios.patch(`${URL}/api/task/stop/${id}`)
      .then((response) => Promise.resolve(response.data))
      .catch((errors) => Promise.reject(errors))
  }
}
