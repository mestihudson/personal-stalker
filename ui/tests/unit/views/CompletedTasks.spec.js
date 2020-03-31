jest.mock('@/services/Api')

import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Api from '@/services/Api'
import CompletedTasks from '@/views/CompletedTasks.vue'

describe('@/views/CompletedTasks.vue', () => {
  const TASK_TEMPLATE = { name: '', status: 0, times: [] }
  const mountCompletedTasks = async (tasks) => {
    Api.getTasks = jest.fn()
      .mockImplementationOnce(() => Promise.resolve(tasks))
    const wrapper = mount(CompletedTasks)
    await flushPromises()
    return wrapper
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('deve carregar apenas tarefas finalizadas', async () => {
    const tasks = [
      { ...TASK_TEMPLATE, id: 1, status: 0 },
      { ...TASK_TEMPLATE, id: 2, status: 1 },
      { ...TASK_TEMPLATE, id: 3, status: 2 },
      { ...TASK_TEMPLATE, id: 4, status: 3 }
    ]
    const carregadas = 1
    const wrapper = await mountCompletedTasks(tasks)
    expect(wrapper.findAll(`[data-name='Line']`)).toHaveLength(carregadas)
  })
})

