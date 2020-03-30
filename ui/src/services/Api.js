export default {
  getTasks () {
    return Promise.resolve([
      { id: 1, name: 'Escrever reademe', status: 0, times: [] }
    ])
  }
}
