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
    ['0', []],
    [
      '1',
      [
        { times: [1] },
      ]
    ],
    [
      '3',
      [
        { times: [1] },
        { times: [2] }
      ]
    ]
  ])('deve renderizar como consolidado %p dos tempos %j as tarefa(s)',
    async (compiled, tasks) => {
    const wrapper = await mountTotal(tasks)
    expect(wrapper.find(`[data-name='Total']`).text()).toBe(compiled)
  })
})
