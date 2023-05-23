/* eslint-disable no-self-compare */
/* eslint-disable no-undef */
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import RewardDialog from '@/components/RewardDialog.vue'
// import ProgressLoading from '@/components/ProgressLoading.vue'
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

describe('RewardDialog.vue', () => {
  const itemsPlus = [
    { myPoint: 5, amount: 1, summary: 0, pointPerUnit: 1, resultAmount: 2, resultSummary: 2 },
    { myPoint: 5, amount: 1, summary: 6, pointPerUnit: 1, resultAmount: 2, resultSummary: 6 },
    { myPoint: 2, amount: 1, summary: 0, pointPerUnit: 1, resultAmount: 2, resultSummary: 2 },
  ]
  itemsPlus.forEach((item) => {
    it('test plus', () => {
      const wrapper = mount(RewardDialog, {
        localVue,
        vuetify,
        mocks: {
          $vuetify: { breakpoint: {} },
        },
        store,
      });
      wrapper.vm.summary = item.summary
      wrapper.vm.myPoint = item.myPoint
      wrapper.vm.amount = item.amount
      wrapper.vm.pointPerUnit = item.pointPerUnit
      wrapper.vm.plus()
      expect(wrapper.vm.amount).toEqual(item.resultAmount)
      expect(wrapper.vm.summary).toEqual(item.resultSummary)
    });
  })

  const itemsMinus = [
    { myPoint: 5, amount: 2, summary: 0, pointPerUnit: 1, resultAmount: 1, resultSummary: 1 },
    { myPoint: 5, amount: 1, summary: 6, pointPerUnit: 1, resultAmount: 0, resultSummary: 0 },
    { myPoint: 5, amount: 0, summary: 0, pointPerUnit: 1, resultAmount: 0, resultSummary: 0 },
  ]
  itemsMinus.forEach((item) => {
    it('test minus', () => {
      const wrapper = mount(RewardDialog, {
        localVue,
        vuetify,
        mocks: {
          $vuetify: { breakpoint: {} },
        },
        store,
      });
      wrapper.vm.summary = item.summary
      wrapper.vm.myPoint = item.myPoint
      wrapper.vm.amount = item.amount
      wrapper.vm.pointPerUnit = item.pointPerUnit
      wrapper.vm.minus()
      expect(wrapper.vm.amount).toEqual(item.resultAmount)
      expect(wrapper.vm.summary).toEqual(item.resultSummary)
    });
  })
  // it('props loading', async () => {
  //   const wrapper = mount(ProgressLoading, {
  //     propsData: {
  //       loading: true,
  //     },
  //     localVue,
  //     vuetify,
  //   })
  //   wrapper.vm.dialog = true
  //   expect(wrapper.vm.dialog).toBe(true)
  //   expect(wrapper.props().loading).toEqual(true)
  //   expect(wrapper.vm.dialog).toEqual(wrapper.props().loading)
  // })

  // const items = [
  //   { id: 1, name: 'แก้วน้ำ CDG (สีดำ)', balance: 100, point: 500 },
  //   { id: 2, name: 'แก้วน้ำ CDG (สีขาว)', balance: 100, point: 500 },
  //   { id: 3, name: 'กระเป๋าเซ็ตหมี', balance: 100, point: 2500 },
  //   { id: 4, name: 'หูฟังไร้สายบลูทูธ', balance: 100, point: 3500 },
  // ]
  // it('test data value', () => {
  //   const wrapper = RewardDialog.data()
  //   expect(wrapper).toEqual({
  //     success: false,
  //     value: false,
  //     summary: 0,
  //     amount: 0,
  //     myPoint: 0,
  //     disablePlus: false,
  //     disableBtn: false,
  //     itemLabel: null,
  //     itemDescription: null,
  //     itemAmount: 0,
  //     itemImage: null,
  //     itemId: 0,
  //     pointPerUnit: 0,
  //   })
  // })
});
