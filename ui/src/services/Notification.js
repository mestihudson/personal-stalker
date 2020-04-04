export default {
  success (message) {
    return new Promise((resolve) => {
      console.log(message)
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
}
