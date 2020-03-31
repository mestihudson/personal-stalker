import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Menu from '@/components/Menu.vue'

describe('@/components/Menu.vue', () => {
  const mountMenu = async (push) => {
    const wrapper = mount(Menu, {
      mocks: {
        $router: { push }
      }
    })
    await flushPromises()
    return wrapper
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('deve ir para lista de tarefas finalizadas quando clicar em "finalizadas"',
    async () => {
    const push = jest.fn()
    const wrapper = await mountMenu(push)
    wrapper.find(`[data-trigger='CompletedTasks']`).trigger('click')
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'completeds' })
  })

  it('deve ir para lista de tarefas quando clicar em "tarefas"',
    async () => {
    const push = jest.fn()
    const wrapper = await mountMenu(push)
    wrapper.find(`[data-trigger='Tasks']`).trigger('click')
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'tasks' })
  })

  it('deve ir para rota padrão (tarefas) quando clicar em "home"', async () => {
    const push = jest.fn()
    const wrapper = await mountMenu(push)
    wrapper.find(`[data-trigger='Home']`).trigger('click')
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'home' })
  })

  it('deve ir para criar tarefa quando clicar em "adicionar"', async () => {
    const push = jest.fn()
    const wrapper = await mountMenu(push)
    wrapper.find(`[data-trigger='Add']`).trigger('click')
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'add' })
  })
})


