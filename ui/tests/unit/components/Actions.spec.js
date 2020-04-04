import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Actions from '@/components/Actions.vue'

describe('@/components/Actions.vue', () => {
  const mountActions = async (status, id = 1) => {
    const task = { status, id }
    const wrapper = mount(Actions, {
      propsData: { task }
    })
    await flushPromises()
    return wrapper
  }

  const STATUS = {
    'não iniciada': 0, 'iniciada': 1, 'suspensa': 2, 'finalizada': 3
  }

  it('deve renderizar "iniciar" quando status for "não iniciada"', async () => {
    const wrapper = await mountActions(STATUS['não iniciada'])
    expect(wrapper.findAll(`[data-trigger='Start']`)).toHaveLength(1)
  })

  it('deve renderizar "suspender" quando status for "iniciada"', async () => {
    const wrapper = await mountActions(STATUS['iniciada'])
    expect(wrapper.findAll(`[data-trigger='Pause']`)).toHaveLength(1)
  })

  it('deve renderizar "retomar" quando status for "suspensa"', async () => {
    const wrapper = await mountActions(STATUS['suspensa'])
    expect(wrapper.findAll(`[data-trigger='Resume']`)).toHaveLength(1)
  })

  it.each(['iniciada', 'suspensa'])
  ('deve renderizar "parar" quando status for %p', async (name) => {
    const wrapper = await mountActions(STATUS[name])
    expect(wrapper.findAll(`[data-trigger='Stop']`)).toHaveLength(1)
  })

  it('deve renderizar "reiniciar" quando status for "finalizada"', async () => {
    const wrapper = await mountActions(STATUS['finalizada'])
    expect(wrapper.findAll(`[data-trigger='Restart']`)).toHaveLength(1)
  })

  it('deve disparar ação iniciar', async () => {
    await click('Start', 'start', STATUS['não iniciada'], 7)
  })

  it('deve disparar ação suspender', async () => {
    await click('Pause', 'pause', STATUS['iniciada'], 6)
  })

  it('deve disparar ação retomar', async () => {
    await click('Resume', 'resume', STATUS['suspensa'], 5)
  })

  const click = async (button, event, status, id) => {
    const wrapper = await mountActions(status, id)
    wrapper.find(`[data-trigger='${button}']`).trigger('click')
    await flushPromises()
    expect(wrapper.emitted(event)[0]).toMatchObject([{ id }])
  }

  it.each(['iniciada', 'suspensa'])
  ('deve disparar ação parar quando estiver %p', async (name) => {
    await click('Stop', 'stop', STATUS[name], 4)
  })

  it('deve disparar ação reiniciar', async () => {
    await click('Restart', 'restart', STATUS['finalizada'], 3)
  })
})
