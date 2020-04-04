export default {
  get (tasks = []) {
    return tasks.reduce((accumulator, { passed }) => parseInt(passed) + accumulator, 0)
  }
}
