jest.mock('@/services/Api')
jest.mock('@/services/Notification')

import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Api from '@/services/Api'
import Notification from '@/services/Notification'
import Task from '@/views/Task.vue'

describe('@/views/Task.vue', () => {
  const mountTask = async (push = jest.fn(), propsData = {}) => {
    const wrapper = mount(Task, {
      propsData,
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

  const updateTask = async ({ id, name }, payload = { name: 'Before' }) => {
    Api.updateTask = jest.fn()
      .mockImplementationOnce(() => Promise.resolve())
    Notification.success = jest.fn()
      .mockImplementationOnce(() => Promise.resolve())
    const wrapper = await loadTask(id, payload)
    const input = wrapper.find(`[data-input='Name']`)
    input.element.value = name
    input.trigger('change')
    wrapper.find(`[data-trigger='Save']`).trigger('click')
    await flushPromises()
  }

  const loadTask = async (id, payload = { name: 'Before' }, push = jest.fn()) => {
    Api.getTask = jest.fn()
      .mockImplementationOnce(() => Promise.resolve(payload))
    const wrapper = await mountTask(push, { id })
    await flushPromises()
    return wrapper
  }

  const id = 1
  const name = 'Tarefa 1'
  const push = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('add', () => {
    beforeEach(async () => {
      await addTask({ id, name }, push)
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

  describe('update', () => {
    it('deve recuperar tarefa da api', async () => {
      await loadTask(id)
      expect(Api.getTask).toHaveBeenCalledWith(id)
    })

    it('deve carregar tarefa com informações recuperadas da api', async () => {
      const wrapper = await loadTask(id, { name })
      expect(wrapper.find(`[data-input='Name']`).element.value).toBe(name)
    })

    it('deve entregar tarefa para ser atualizada pela api', async () => {
      await updateTask({ id, name })
      expect(Api.updateTask).toHaveBeenCalledWith(id, { name })
    })

    it('deve notificar sucesso da ação', async () => {
      await updateTask({ id, name })
      expect(Notification.success)
        .toHaveBeenCalledWith('Tarefa atualizada com sucesso.')
    })
  })
})
