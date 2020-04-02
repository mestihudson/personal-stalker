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

  it.each([
    [1, '0:00:00:01'],
    [61, '0:00:01:01'],
    [3661, '0:01:01:01'],
    [90061, '1:01:01:01'],
    [184354, '2:03:12:34']
  ])('deve retornar %p segundo(s) para um giro %p', async (
    seconds, spin
  ) => {
    expect(Timer.seconds(spin)).toBe(seconds)
  })

  it.each([
    [1, '0:00:00:01'],
    [61, '0:00:01:01'],
    [3661, '0:01:01:01'],
    [90061, '1:01:01:01'],
    [184354, '2:03:12:34']
  ])('deve retornar, para %p segundo(s), o giro de %p', async (
    seconds, spin
  ) => {
    expect(Timer.spin(seconds)).toBe(spin)
  })
})
