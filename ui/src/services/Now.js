import moment from 'moment'

const DATETIME = `YYYY-MM-DD HH:mm:ss`

export default {
  get () {
    return moment().format(DATETIME)
  }
}
