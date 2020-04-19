import Totalized from '@/services/Totalized'

describe('@/services/Totalized', () => {
  it.each([
    [0, []],
    [1, [{ passed: '1' }]],
    [3 * 24 * 60 * 60 + 31, [{ passed: '' + (3 * 24 * 60 * 60) }, { passed: '31' }]]
  ])('deve retornar o tempo consolidado %p as tarefa(s) %p',
    async (compiled, tasks) => {
    expect(Totalized.get(tasks)).toBe(compiled)
  })
})
