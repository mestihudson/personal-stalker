export default {
  getTasks () {
    return Promise.resolve([
      { id: 1, name: 'Tarefa 1', status: 0, times: [] },
      { id: 2, name: 'Tarefa 2', status: 1, times: [] },
      { id: 3, name: 'Tarefa 3', status: 2, times: [] },
      { id: 4, name: 'Tarefa 4', status: 3, times: [] }
    ])
  }
}
