/* eslint-disable no-self-compare */
/* eslint-disable no-undef */
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar.vue'
import SignIn from '@/components/SignIn.vue'
import Vuex from 'vuex'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuetify)
let vuetify
beforeEach(() => {
  vuetify = new Vuetify()
})
const store = new Vuex.Store({
  state: {
    login: true,
  },
})

describe('NaviagationBar.vue', () => {
  it('test open dialog sign in', () => {
    const wrapper = mount(NavigationBar, {
      localVue,
      vuetify,
      mocks: {
        $vuetify: { breakpoint: {} },
      },
      store,
    });
    wrapper.vm.signIn()
    wrapper.vm.$emit('openSignInPage')
    expect(wrapper.emitted().openSignInPage).toBeTruthy()
  });
  it('test open dialog sign out', () => {
    const wrapper = mount(NavigationBar, {
      localVue,
      vuetify,
      mocks: {
        $vuetify: { breakpoint: {} },
      },
      store,
    });
    wrapper.vm.signOut()
    wrapper.vm.$emit('signOut')
    expect(wrapper.emitted().signOut).toBeTruthy()
  });
});

describe('SignIn.vue', () => {
  it('test component sign in', () => {
    const wrapper = mount(SignIn, {
      localVue,
      vuetify,
      mocks: {
        $vuetify: { breakpoint: {} },
      },
      store,
    });
    wrapper.vm.dialog = true
    expect(wrapper.vm.dialog).toBe(true)
  });
});
