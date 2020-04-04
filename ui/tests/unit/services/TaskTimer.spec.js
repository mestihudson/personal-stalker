jest.mock('@/services/Timer')

import Timer from '@/services/Timer'

describe('@/services/TaskTimer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  xit('deve retornar chamar o timer intervalado quando status for iniciada',
    async () => {
    const task = { status: 1 }
    TaskTimer.get(task)
    expect(Timer.intervaled).toHaveBeenCalled()
  })
})
