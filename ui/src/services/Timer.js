import moment from 'moment'

import Now from '@/services/Now'

const TIME = 'HH:mm:ss'
const DATETIME = `YYYY-MM-DD hh:mm:ss`

const timeOf = (date) => moment(date, DATETIME)

const diffOf = (a, b, as) => timeOf(a).diff(timeOf(b), as)

const format = (a, b, increment) => {
  const start = timeOf(b)
  const end = timeOf(a).add(increment, 'seconds')
  const days = moment.duration(diffOf(end, start, 'days'), 'days').asDays()
  const rest = moment().startOf('days').seconds(diffOf(end, start, 'seconds'))
    .format(TIME)
  return [days, rest].join(':')
}

export default {
  ellipsed (time, increment = 1) {
    const now = Now.get()
    return format(now, time || now, increment)
  },
  seconds (spin) {
    return spin.split(':').reduce((accumulator, current, index) => {
      const factors = [
        24 * 60 * 60 * 1,
        60 * 60 * 1,
        60 * 1,
        1
      ]
      return parseInt(current) * factors[index] + accumulator
    }, 0)
  }
}
