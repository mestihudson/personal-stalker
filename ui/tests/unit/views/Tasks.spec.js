jest.mock('@/services/Api')

import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Api from '@/services/Api'
import Tasks from '@/views/Tasks.vue'

describe('@/views/Tasks.vue', () => {
  const TASK_TEMPLATE = { name: '', status: 0, times: [] }
  const mountTasks = async (tasks) => {
    Api.getTasks = jest.fn()
      .mockImplementationOnce(() => Promise.resolve(tasks))
    const wrapper = mount(Tasks)
    await flushPromises()
    return wrapper
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it.each([
    1, 2, 100
  ])('deve carregar %p tarefa(s) recuperada(s) da api',
    async (quant) => {
    const tasks = Array(quant)
      .fill(TASK_TEMPLATE)
      .map((task, id) => {
        return { ...task, id }
      })
    const wrapper = await mountTasks(tasks)
    expect(wrapper.findAll(`[data-name='Line']`)).toHaveLength(quant)
  })

  it('deve carregar apenas tarefas não finalizadas', async () => {
    const tasks = [
      { ...TASK_TEMPLATE, id: 1, status: 0 },
      { ...TASK_TEMPLATE, id: 2, status: 1 },
      { ...TASK_TEMPLATE, id: 3, status: 2 },
      { ...TASK_TEMPLATE, id: 4, status: 3 }
    ]
    const carregadas = 3
    const wrapper = await mountTasks(tasks)
    expect(wrapper.findAll(`[data-name='Line']`)).toHaveLength(carregadas)
  })
})

