import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Total from '@/components/Total.vue'

describe('@/components/Total.vue', () => {
  const mountTotal = async (tasks) => {
    const wrapper = mount(Total, {
      propsData: { tasks }
    })
    return wrapper
  }

  it.each([
    ['', []],
    ['1 segundo', [{ passed: 1 }]],
    ['3 dias e 31 segundos', [{ passed: 3 * 24 * 60 * 60 }, { passed: 31 }]]
  ])('deve renderizar como consolidado %p dos tempos %j as tarefa(s)',
    async (compiled, tasks) => {
    const wrapper = await mountTotal(tasks)
    expect(wrapper.find(`[data-name='Total']`).text()).toBe(compiled)
  })
})
