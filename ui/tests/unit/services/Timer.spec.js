jest.mock('@/services/Now')

import Now from '@/services/Now'
import Timer from '@/services/Timer'

describe('@/services/Timer', () => {
  beforeEach(() => {
    const NOW = '2020-03-28 17:00:00'
    Now.get = jest.fn().mockImplementation(() => {
      return NOW
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('deve incrementar a data em 1 segundo', () => {
    expect(Timer.ellipsed()).toBe('0:00:00:01')
    expect(Timer.ellipsed('2020-03-28 16:59:00')).toBe('0:00:01:01')
    expect(Timer.ellipsed('2020-03-27 17:00:00')).toBe('1:00:00:01')
    expect(Timer.ellipsed('2019-03-28 17:00:00')).toBe('366:00:00:01')
  })
})
