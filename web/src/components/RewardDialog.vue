<template>
  <v-flex>
    <v-dialog v-model="value" persistent width="90%">
      <v-card>
        <v-card-text>
          <v-layout :class="`content mx-auto ${$vuetify.breakpoint.smAndDown ? 'column' : 'row'}`">
            <v-img
              :src="itemImage"
              class="mx-auto rounded"
              :max-width="`${$vuetify.breakpoint.xs ? '250px' : '500px'}`"
              width="600px"
              :height="`${$vuetify.breakpoint.xs ? '200px' : '400px'}`"
            />
            <v-layout
              column
              :class="`justify-space-between ${$vuetify.breakpoint.smAndDown ? 'mt-5' : 'ml-10'}`"
            >
              <div class="black--text">
                <span class="display-1 font-weight-bold">{{ itemLabel }}</span>
                <div class="subtitle-1 justify-space-between d-flex mt-5">
                  <div>แต้มที่ใช้ต่อชิ้น</div>
                  <div class="d-flex">
                    <div>{{ pointPerUnit.toLocaleString('en-US') }}</div>
                    <span class="ml-4">แต้ม</span>
                  </div>
                </div>
                <div class="subtitle-1 justify-space-between d-flex mt-5">
                  <div>จำนวนคงเหลือ</div>
                  <div class="d-flex">
                    <div>{{ itemAmount.toLocaleString('en-US') }}</div>
                    <span class="ml-4">ชิ้น</span>
                  </div>
                </div>
                <div v-if="isLoggedIn" class="subtitle-1 justify-space-between d-flex mt-5">
                  <div>แต้มที่มี</div>
                  <div class="d-flex">
                    <div>{{ myPoint.toLocaleString('en-US') }}</div>
                    <span class="ml-4">แต้ม</span>
                  </div>
                </div>
                <div class="subtitle-1 justify-space-between d-flex mt-5">
                  <div>จำนวนที่แลก</div>
                  <div class="d-flex justify-end">
                    <v-btn color="primary" @click="minus">
                      <v-icon> mdi-minus </v-icon>
                    </v-btn>
                    <v-flex xs3 mx-4>
                      <v-text-field
                        v-model.number="amount"
                        :disabled="itemAmount === 0"
                        hide-details
                        outlined
                        dense
                        height="10"
                        type="number"
                        hide-spin-buttons
                      />
                    </v-flex>
                    <v-btn color="primary" :disabled="disablePlus" @click="plus">
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div>
                <div
                  :class="`${summary > myPoint ? 'red--text' : 'black--text'} ${
                    $vuetify.breakpoint.mdAndDown ? 'mt-5' : ''
                  }`"
                  class="subtitle-1 justify-space-between d-flex font-weight-bold"
                >
                  <div>แต้มที่ใช้แลกทั้งหมด</div>
                  <div class="d-flex">
                    <div>{{ summary.toLocaleString('en-US') }}</div>
                    <span class="ml-4">แต้ม</span>
                  </div>
                </div>
                <div class="d-flex justify-end mt-10">
                  <v-btn text color="primary" class="px-4 py-2 subtitle-1" @click="value = false">
                    ยกเลิก
                  </v-btn>
                  <v-btn
                    color="primary"
                    class="px-4 py-2 ml-4 subtitle-1"
                    :disabled="disableBtn"
                    @click="confirmRedeem"
                  >
                    แลก
                  </v-btn>
                </div>
              </div>
            </v-layout>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <confirm-redeem-dialog ref="dialog" @submit="success = true, redeemSuccess()" />
    <v-dialog v-model="success" persistent max-width="450">
      <v-card>
        <v-card-title class="font-weight-bold">
          แจ้งเตือน
        </v-card-title>
        <v-card-text class="black--text mb-10" style="padding:0; padding-left: 2vw;">
          แลกสำเร็จ!
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeDialog">
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'
import ConfirmRedeemDialog from './confirmRedeemDialog.vue';

export default {
  components: {
    ConfirmRedeemDialog,
  },
  data() {
    return {
      success: false,
      value: false,
      summary: 0,
      amount: 0,
      myPoint: 0,
      disablePlus: false,
      disableBtn: false,
      itemLabel: null,
      itemDescription: null,
      itemAmount: 0,
      itemImage: null,
      itemId: 0,
      pointPerUnit: 0,
    };
  },
  computed: {
    ...mapState({
      login: (store) => store.login.login,
    }),
    isLoggedIn() {
      return this.login != null
    },
  },
  watch: {
    summary() {
      if (this.summary === 0) {
        this.disableBtn = true;
        this.disablePlus = false;
      } else {
        this.disableBtn = false;
      }
      if (this.isLoggedIn === true) {
        if (this.summary > this.myPoint) {
          this.disableBtn = true;
        }
      }
    },
    amount() {
      if (this.amount >= this.itemAmount) {
        this.disablePlus = true;
      } else {
        this.disablePlus = false;
      }
      if (this.amount === '') this.amount = 0;
      this.summary = this.pointPerUnit * this.amount;
    },
    value() {
      if (!this.value) {
        this.amount = 0
      }
    },
    isLoggedIn() {
      this.myPoint = this.login.point
      if (this.summary > this.myPoint) {
        this.disableBtn = true;
      }
    },
  },
  mounted() {
    if (this.summary === 0) {
      this.disableBtn = true;
    }
  },
  methods: {
    closeDialog() {
      this.success = false;
      this.value = false;
    },
    plus() {
      this.amount += 1;
      if (this.summary <= this.myPoint) {
        this.summary = this.pointPerUnit * this.amount;
      }
    },
    minus() {
      if (this.amount > 0) {
        this.amount -= 1;
        this.summary = this.pointPerUnit * this.amount;
      }
    },
    open(item) {
      this.value = true;
      this.itemId = item.id
      this.itemLabel = item.name;
      this.itemAmount = item.balance;
      this.itemImage = item.image;
      this.pointPerUnit = item.point;
      this.myPoint = this.login.point;
    },
    confirmRedeem() {
      if (this.isLoggedIn) {
        const payload = {
          tranType: 1,
          customerID: this.login.id,
          volume: this.amount,
          itemId: this.itemId,
        }
        this.$refs.dialog.open();
        this.$store.dispatch('redeem/setRedeem', payload)
      } else {
        this.$emit('sendOpen')
      }
    },
    redeemSuccess() {
      this.$emit('redeemSuccess', {
        volume: this.amount,
        itemId: this.itemId,
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.v-dialog > .v-card > .v-card__text {
  padding: 90px 90px;
}
@media screen and (max-width: 1024px) {
  .v-dialog > .v-card > .v-card__text {
    padding: 40px 40px;
  }
}
/*
.v-dialog > .v-card > .v-card__actions {
  padding: 20px 5%;
} */
.v-btn:not(.v-btn--round).v-size--default {
  height: 36px;
  min-width: 36px;
  padding: 0 0px;
}
.img {
  height: auto;
  width: 100%;
  object-fit: cover;
}
// .cover-img {
//   max-width: 600px;
//   height: 600px;
// }
.content {
  max-width: 1440px;
}
</style>
