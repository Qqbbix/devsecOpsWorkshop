/* eslint-disable no-self-compare */
/* eslint-disable no-undef */
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import routes from '@/router/index'
import Gallery from '@/views/Gallery.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('App', () => {
  it('renders a child component via routing', async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, {
      localVue,
      router,
    })

    router.push('/')
    // await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(Gallery).exists()).toBe(true)
    console.log(router.currentRoute)
  })
})
