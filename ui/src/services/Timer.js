import moment from 'moment'

import Now from '@/services/Now'

const TIME = 'HH:mm:ss'
const DATETIME = `YYYY-MM-DD hh:mm:ss`

const timeOf = (date) => moment(date, DATETIME)

const diffOf = (a, b, as) => timeOf(a).diff(timeOf(b), as)

const format = (a, b) => {
  const start = timeOf(b)
  const end = timeOf(a).add(1, 'seconds')
  const days = moment.duration(diffOf(end, start, 'days'), 'days').asDays()
  const rest = moment().startOf('days').seconds(diffOf(end, start, 'seconds'))
    .format(TIME)
  return [days, rest].join(':')
}

export default {
  ellipsed (time) {
    const now = Now.get()
    return format(now, time || now)
  }
}
