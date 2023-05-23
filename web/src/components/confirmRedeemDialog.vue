<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <v-card>
        <v-card-title class="font-weight-bold">
          ยืนยันการแลกแต้ม
        </v-card-title>
        <v-card-text class="black--text mb-10">
          คุณแน่ใจว่าต้องการแลกของรางวัลใช่หรือไม่ ?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" text @click="redeemReward">
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <progress-loading ref="progress" :loading="loading" />
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import apiRedeem from '@/axios/put/redeem'
import ProgressLoading from '@/components/ProgressLoading.vue';

export default {
  components: { ProgressLoading },
  data() {
    return {
      dialog: false,
      loading: false,
    }
  },
  computed: {
    ...mapState({
      redeem: (store) => store.redeem.redeem,
    }),
  },
  methods: {
    open() {
      this.dialog = true
    },
    async redeemReward() {
      this.loading = true
      const res = await apiRedeem.getRedeem(this.redeem.itemId, this.redeem)
      this.loading = false
      if (!res.error) {
        this.dialog = false
        this.$emit('submit')
      }
    },
  },
};
</script>
