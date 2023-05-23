<template>
  <div>
    <v-slide-x-transition mode="out-in">
      <v-container v-if="items.length > 0" fluid class="pa-5">
        <v-row>
          <v-col class="display-1">
            แลกของรางวัล
          </v-col>
        </v-row>
        <v-row v-if="login && $vuetify.breakpoint.xs" class="ma-0" align="end" justify="end">
          <span class="pr-2 body-2">
            คะแนนสะสม {{ login.point }}
          </span>
          <v-icon color="amber accent-2">
            mdi-alpha-k-circle
          </v-icon>
        </v-row>
        <v-row>
          <template v-for="item in items">
            <v-col
              :key="item.code" :cols="6" :sm="6" :md="3" :lg="2" :xl="2"
              class="px-0 pt-4 py-0 cursor-pointer"
              @click="openRewardDialog(item)"
            >
              <v-col :cols="12" class="pb-0 text-center position-relative">
                <img
                  :src="item.image"
                  :alt="item.description"
                  class="item-image elevation-1 image-circle position-relative"
                >
                <v-col
                  v-if="item.balance === 0"
                  :cols="12"
                  class="position-absolute absolute--top-left fill-height"
                >
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-col class="subtitle-1">
                      <span class="white--text red px-3 py-2 out-of-stock">
                        ของหมด
                      </span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-col>
              <v-col :cols="12" class="subtitle-1 pa-0 text-center item-label">
                {{ item.name }}
              </v-col>
              <v-col :cols="12" class="body-2 py-0">
                <v-row class="ma-0">
                  <v-col :cols="6" class="pa-0 pr-2">
                    <v-row align="end" justify="end" class="ma-0">
                      <template v-if="item.balance > 0">
                        <v-icon color="teal lighten-2">
                          mdi-archive
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon color="grey">
                          mdi-archive-off
                        </v-icon>
                      </template>
                      <span :class="`pl-1 ${item.balance > 9999 ? 'caption' : 'body-2'}`">
                        {{ item.balance > 0 ? item.balance.toLocaleString('en-US') : '-' }}
                      </span>
                    </v-row>
                  </v-col>
                  <v-col :cols="6" class="pa-0 pl-2">
                    <v-row align="end" justify="start" class="ma-0">
                      <v-icon color="amber accent-3">
                        mdi-alpha-k-circle
                      </v-icon>
                      <span :class="`pl-1 ${item.point > 9999 ? 'caption' : 'body-2'}`">
                        {{ item.point.toLocaleString('en-US') }}
                      </span>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-col>
          </template>
        </v-row>
        <reward-dialog
          ref="rewardDialog"
          @sendOpen="sendOpen"
          @redeemSuccess="redeemSuccess($event)"
        />
      </v-container>
      <v-container v-else fluid class="pa-5" fill-height>
        <v-row
          :class="`gallery-progress${$vuetify.breakpoint.xs ? '-xs' : ''}`"
          justify="center" align="center" fill-height
        >
          <template v-if="loading">
            <v-col class="text-center">
              <v-progress-circular
                class="mb-5" size="100" width="10" indeterminate color="teal lighten-3"
              />
              <p class="title">
                รอสักครู่....
              </p>
            </v-col>
          </template>
          <template v-else-if="error">
            <v-col class="text-center">
              <v-icon size="100" color="error" class="mb-5">
                mdi-alert-circle
              </v-icon>
              <p class="title">
                เกิดความผิดพลาดในการโหลดข้อมูลของรางวัล
              </p>
            </v-col>
          </template>
          <template v-else>
            <v-col class="text-center">
              <v-icon size="100" color="warning" class="mb-5">
                mdi-alert-circle
              </v-icon>
              <p class="title">
                ยังไม่มีรายการของรางวัลในขณะนี้
              </p>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-slide-x-transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RewardDialog from '@/components/RewardDialog.vue'
import apiReward from '@/axios/get/reward'

export default {
  name: 'RewardGallery',
  components: {
    RewardDialog,
  },
  data: () => ({
    items: [],
    loading: true,
    error: false,
  }),
  computed: {
    ...mapState('login', {
      login: (store) => store.login,
    }),
  },
  created() {
    this.getRewardList()
  },
  methods: {
    ...mapMutations({
      setRedeemPoint: 'login/setRedeemPoint',
    }),
    openRewardDialog(item) {
      this.$refs.rewardDialog.open(item)
    },
    notFound() {
      this.error = true
    },
    toBase64(base64) {
      return `data:image/jpeg;base64,${base64}`
    },
    async getRewardList() {
      const { result, error } = await apiReward.get()
      this.loading = false
      if (error) return this.notFound()
      this.items = result.map((item) => {
        return {
          id: item.id,
          name: item.name,
          point: item.point,
          balance: item.balance,
          image: this.toBase64(item.image),
        }
      })
    },
    sendOpen() {
      this.$emit('openSignInPage')
    },
    redeemSuccess(event) {
      const itemIndex = this.items.findIndex((i) => i.id === event.itemId)
      if (itemIndex < 0) return
      this.setRedeemPoint(this.items[itemIndex].point * event.volume)
      this.items[itemIndex].balance -= event.volume
    },
  },
}
</script>

<style lang="stylus" scoped>
  img.item-image
    width 20vh
    max-width 100%
    height auto
    max-height 20vh
    object-fit cover
    object-position center
  .out-of-stock
    opacity .95
    border-radius 6px
  .item-label
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .gallery-progress-xs
    height 80vh
  .gallery-progress
    height 90vh
</style>
