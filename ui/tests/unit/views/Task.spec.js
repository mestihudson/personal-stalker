import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Api from '@/services/Api'
import Notification from '@/services/Notification'
import Task from '@/views/Task.vue'

describe('@/views/Task.vue', () => {
  const mountTask = async (push = jest.fn()) => {
    const wrapper = mount(Task, {
      mocks: {
        $router: { push }
      }
    })
    await flushPromises()
    return wrapper
  }

  const addTask = async ({ id, name }, push = jest.fn()) => {
    Api.createTask = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({ id }))
    Notification.success = jest.fn()
      .mockImplementationOnce(() => Promise.resolve())
    const wrapper = await mountTask(push)
    const input = wrapper.find(`[data-input='Name']`)
    input.element.value = name
    input.trigger('change')
    wrapper.find(`[data-trigger='Save']`).trigger('click')
    await flushPromises()
  }
  const id = 1
  const name = 'Tarefa 1'
  const push = jest.fn()

  beforeEach(async () => {
    await addTask({ id, name }, push)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('deve entregar tarefa para ser criada pela api', async () => {
    expect(Api.createTask).toHaveBeenCalledWith({ name })
  })

  it('deve notificar sucesso da ação', async () => {
    expect(Notification.success)
      .toHaveBeenCalledWith('Tarefa criada com sucesso.')
  })

  it('deve ser encaminhado para editar tarefa recém-criada', async () => {
    expect(push).toHaveBeenCalledWith({ name: 'edit', params: { id } })
  })
})


