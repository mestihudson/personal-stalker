import moment from 'moment'

import Now from '@/services/Now'

const TIME = 'HH:mm:ss'
const DATETIME = `YYYY-MM-DD HH:mm:ss`

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

export default {
  elapsed (time, increment = 1) {
    const now = Now.get()
    return  format(now, time || now, increment)
  },
  seconds (spin) {
    return spin.split(':').reduce((accumulator, current, index) => {
      return parseInt(current) * factors[index] + accumulator
    }, 0)
  },
  spin (seconds) {
    const result = [0, 0, 0, 0]
    factors.reduce((accumulator, current, index) => {
      result[index] += Math.trunc(accumulator / current)
      return accumulator % current
    }, seconds)
    return result
      .map((p, i) => i > 0 && `${p}`.length === 1 ? `0${p}` : `${p}`).join(':')
  },
  humanize (value = 0) {
    return (typeof value === 'number' ? this.spin(value) : value)
      .split(':')
      .reduce((accumulator, current, index) => {
        const withUnit = (value, position) => {
          const suffix = ['dia', 'hora', 'minuto', 'segundo']
          const plural = (value) => value === 1 ? '' : 's'
          return value + ' ' + suffix[position] + plural(value)
        }
        const positive = (e, i) => e > 0 ? withUnit(e, i) : ''
        return accumulator.concat(positive(parseInt(current), index))
      }, [])
      .filter((e) => e !== '')
      .join( ' e ')
  },
  parse (time) {
    return moment(time, 'YYYY-MM-DDTHH:mm:ss').format(DATETIME)
  }
}
