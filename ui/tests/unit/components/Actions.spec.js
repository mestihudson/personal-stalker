import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Actions from '@/components/Actions.vue'

describe('@/components/Actions.vue', () => {
  const mountActions = async (status) => {
    const task = { status }
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
    expect(wrapper.findAll(`[data-name='Start']`)).toHaveLength(1)
  })

  it('deve renderizar "suspender" quando status for "iniciada"', async () => {
    const wrapper = await mountActions(STATUS['iniciada'])
    expect(wrapper.findAll(`[data-name='Pause']`)).toHaveLength(1)
  })

  it('deve renderizar "retomar" quando status for "suspensa"', async () => {
    const wrapper = await mountActions(STATUS['suspensa'])
    expect(wrapper.findAll(`[data-name='Resume']`)).toHaveLength(1)
  })

  it.each(['iniciada', 'suspensa'])('deve renderizar "parar" quando status for %p', async (name) => {
    const wrapper = await mountActions(STATUS[name])
    expect(wrapper.findAll(`[data-name='Stop']`)).toHaveLength(1)
  })

  it('deve renderizar "reiniciar" quando status for "finalizada"', async () => {
    const wrapper = await mountActions(STATUS['finalizada'])
    expect(wrapper.findAll(`[data-name='Restart']`)).toHaveLength(1)
  })
})
