/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import store from '@/store'
import router from '@/router'
import Gallery from '@/views/Gallery.vue'
import axios from 'axios'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)
let vuetify
beforeEach(() => {
  vuetify = new Vuetify()
})

jest.mock('axios')

describe('Gallery.vue', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const wrapper = shallowMount(Gallery, {
    store,
    router,
    vuetify,
    mocks: {
      $vuetify: {
        breakpoint: {},
      },
    },
  })
  it('Method: getRewardList - fail', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ error: true }))
    await wrapper.vm.getRewardList()
    wrapper.vm.notFound()
    expect(wrapper.vm.error).toEqual(true)
  })

  it('Method: getRewardList - success', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ result: mockReward, error: undefined }))
    const reward = mockReward.map((item) => {
      return {
        id: item.id,
        name: item.name,
        point: item.point,
        balance: item.balance,
        image: wrapper.vm.toBase64(item.image),
      }
    })

    await wrapper.vm.getRewardList()
    expect(wrapper.vm.loading).toEqual(false)
    expect(wrapper.vm.items).toEqual(reward)
  })

  it('Method: toBase64', () => {
    const base64 = `data:image/jpeg;base64,${mockReward[0].image}`
    expect(wrapper.vm.toBase64(mockReward[0].image)).toEqual(base64)
  })

  it('Method: notFound', () => {
    wrapper.vm.notFound()
    expect(wrapper.vm.error).toEqual(true)
  })
})
