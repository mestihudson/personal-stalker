export default class DatetimeService {
  constructor () {}

  now () {
    return new Date().getTime()
  }

  ellipsed (time) {
    return this.now() - time
  }
}
