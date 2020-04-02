jest.mock('@/services/Now')

import Now from '@/services/Now'
import Timer from '@/services/Timer'

describe('@/services/Timer', () => {
  const NOW = '2020-03-28 17:00:00'

  beforeEach(() => {
    Now.get = jest.fn().mockImplementation(() => {
      return NOW
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it.each([
    [NOW, NOW, 1, undefined, undefined, '0:00:00:01'],
    [
      '2020-03-28 16:59:00', NOW, 1, '2020-03-28 16:59:00', undefined,
      '0:00:01:01'
    ],
    [
      '2020-03-27 17:00:00', NOW, 1, '2020-03-27 17:00:00', undefined,
      '1:00:00:01'
    ],
    [
      '2019-03-28 17:00:00', NOW, 1, '2019-03-28 17:00:00', undefined,
      '366:00:00:01'
    ],
    [
      '2019-03-28 17:00:00', NOW, 36, '2019-03-28 17:00:00', 36,
      '366:00:00:36'
    ]
  ])('deve incrementar o intervalo entre %p e %p em %p segundo(s)', (
    timeDesc, reference, incrementDesc, time, increment, assert
  ) => {
    expect(Timer.ellipsed(time, increment)).toBe(assert)
  })
})
