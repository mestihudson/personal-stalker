import moment from 'moment'

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

const factors = [
  24 * 60 * 60 * 1,
  60 * 60 * 1,
  60 * 1,
  1
]

export default class DatetimeService {
  constructor () {}

  now () {
    return moment()
  }

  nowFormated () {
    return this.now().format('YYYY-MM-DD HH:mm:ss.000000')
  }

  ellipsed (time) {
    return this.now() - time
  }

  elapsed (time, increment = 1) {
    const now = this.now()
    return format(now, time || now, increment)
  }

  seconds (spin) {
    return spin.split(':').reduce((accumulator, current, index) => {
      return parseInt(current) * factors[index] + accumulator
    }, 0)
  }

  spin (seconds) {
    const result = [0, 0, 0, 0]
    factors.reduce((accumulator, current, index) => {
      result[index] += Math.trunc(accumulator / current)
      return accumulator % current
    }, seconds)
    return result
      .map((p, i) => i > 0 && `${p}`.length === 1 ? `0${p}` : `${p}`).join(':')
  }
}
