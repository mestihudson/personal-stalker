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

  it.each([
      ['0:00:00:01', 'o giro', '1 segundo'],
      ['0:00:01:01', 'o giro', '1 minuto e 1 segundo'],
      ['0:01:01:01', 'o giro', '1 hora e 1 minuto e 1 segundo'],
      ['1:01:01:01', 'o giro', '1 dia e 1 hora e 1 minuto e 1 segundo'],
      ['2:03:12:34', 'o giro', '2 dias e 3 horas e 12 minutos e 34 segundos'],
      [278, 'o(s) segundo(s)', '4 minutos e 38 segundos']
    ])('deve retornar para %p %p de forma amigável %p', async (
      spin, tipo, humanized
    ) => {
    expect(Timer.humanize(spin)).toBe(humanized)
  })
})
