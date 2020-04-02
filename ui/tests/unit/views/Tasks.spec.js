jest.mock('@/services/Api')
jest.mock('@/services/Timer')

import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Api from '@/services/Api'
import Timer from '@/services/Timer'
import Tasks from '@/views/Tasks.vue'

describe('@/views/Tasks.vue', () => {
  const TASK_TEMPLATE = { name: '', status: 0, times: [] }
  const mountTasks = async (tasks, push = jest.fn(), completeds = false) => {
    Api.getTasks = jest.fn()
      .mockImplementationOnce(() => Promise.resolve(tasks))
    const wrapper = mount(Tasks, {
      propsData: { completeds },
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

  const load = async (completeds) => {
    return await mountTasks([
      { ...TASK_TEMPLATE, id: 1, status: 0 },
      { ...TASK_TEMPLATE, id: 2, status: 1 },
      { ...TASK_TEMPLATE, id: 3, status: 2 },
      { ...TASK_TEMPLATE, id: 4, status: 3 }
    ], jest.fn(), completeds)
  }

  it.each([
    ['não', 3, false],
    ['', 1, true]
  ])('deve carregar apenas tarefas %p finalizadas', async (
    situacao, carregadas, completeds
  ) => {
    const wrapper = await load(completeds)
    expect(wrapper.findAll(`[data-name='Line']`)).toHaveLength(carregadas)
  })

  it.each([
    ['deve', 'não finalizadas', false, 1, 3],
    ['não deve', 'finalizadas', true, 0, 0]
  ])('%p apresentar coluna de status para %p', async (
    should, situacao, completeds, header, data
  ) => {
    const wrapper = await load(completeds)
    expect(wrapper.findAll(`[data-name='StatusHeader']`))
      .toHaveLength(header)
    expect(wrapper.findAll(`[data-name='StatusData']`))
      .toHaveLength(data)
  })

  it.each([
    ['deve', 'finalizadas', true, 1],
    ['não deve', 'não finalizadas', false, 0]
  ])('%p apresentar totalizador para %p', async (
    should, situacao, completeds, length
  ) => {
    const wrapper = await load(completeds)
    expect(wrapper.findAll(`[data-name='Total']`))
      .toHaveLength(length)
  })

  it('deve ser encaminhado para editar tarefa selecionada', async () => {
    const id = 3
    const tasks = [
      { ...TASK_TEMPLATE, id: 1, status: 0 },
      { ...TASK_TEMPLATE, id, status: 1 },
      { ...TASK_TEMPLATE, id: 5, status: 3 }
    ]
    const push = jest.fn()
    const wrapper = await mountTasks(tasks, push)
    wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-trigger='Edit']`).trigger('click')
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'edit', params: { id } })
  })

  const click = async (
    id, button, api, mockImpl = () => Promise.resolve({})
  ) => {
    Api[api] = jest.fn().mockImplementationOnce(mockImpl)
    const wrapper = await mountTasks([
      { ...TASK_TEMPLATE, id: 1, status: 0 },
      { ...TASK_TEMPLATE, id: 2, status: 1 },
      { ...TASK_TEMPLATE, id: 3, status: 2 }
    ])
    wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-trigger='${button}']`).trigger('click')
    await flushPromises()
  }

  it.each([
    ['iniciar', 'iniciar', 1, 'Start', 'startTask'],
    ['suspender', 'suspender', 2, 'Pause', 'pauseTask'],
    ['retomar', 'retomar', 3, 'Resume', 'resumeTask'],
    ['parar', 'parar', 3, 'Stop', 'stopTask']
  ])('deve disparar api para %p tarefa quando pressionar %p', async (
    apiDesc, buttonDesc, id, button, api
  ) => {
    await click(id, button, api)
    expect(Api[api]).toHaveBeenCalledWith(id)
  })

  it(`deve inicializar um crônometro quando iniciar for acionado`, async () => {
    Timer.ellipsed = jest.fn()
    const task = { status: 1, passed: 0, latest_started: '2020-04-02 00:00:00' }
    await click(1, 'Start', 'startTask', () => Promise.resolve(task))
    expect(Timer.ellipsed)
      .toHaveBeenCalledWith(task.latest_started, task.passed)
  })

  const mountTaskToStart = async (
    api = 'startTask', mockImpl = {}
  ) => {
    Api[api] = jest.fn().mockImplementationOnce(() => Promise.resolve(mockImpl))
    const wrapper = await mountTasks([
      { ...TASK_TEMPLATE, id: 1, status: 0 },
      { ...TASK_TEMPLATE, id: 2, status: 1 },
      { ...TASK_TEMPLATE, id: 3, status: 2 }
    ])
    return wrapper
  }

  it(`deve alterar status para iniciada quando iniciar for acionado`,
    async () => {
    const id = 1
    const wrapper = await mountTaskToStart('startTask', { status: 1 })
    expect(wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-name='StatusData']`).text()).toBe('0')
    wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-trigger='Start']`).trigger('click')
    await flushPromises()
    expect(wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-name='StatusData']`).text()).toBe('1')
  })

  it(`deve alterar tempo para diferente de vazio quando iniciar for acionado`,
    async () => {
    const id = 1
    const ellipsed = '0:00:00:01'
    Timer.ellipsed = jest.fn().mockReturnValue(ellipsed)
    const wrapper = await mountTaskToStart('startTask', { status: 1 })
    expect(wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-name='TimeData']`).text()).toBe('')
    wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-trigger='Start']`).trigger('click')
    await flushPromises()
    expect(wrapper.find(`[data-name='Line'][data-id='${id}']`)
      .find(`[data-name='TimeData']`).text()).toBe(ellipsed)
  })
})

