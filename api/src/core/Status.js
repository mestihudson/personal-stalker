export default class Status {
  constructor () {
    this.descriptions = ['Não iniciada', 'Iniciada', 'Suspensa', 'Finalizada']
  }

  notStarted (status) {
    return status === 0
  }

  started (status) {
    return status === 1
  }

  paused (status) {
    return status === 2
  }

  stoped (status) {
    return status === 3
  }

  description (status) {
    return this.descriptions[status]
  }
}
