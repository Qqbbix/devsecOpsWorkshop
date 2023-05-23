<template>
  <v-dialog
    v-model="dialog"
    :width="dialogWidth"
    scrollable persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="display-1 py-5">
        <v-col :cols="12" class="pa-0">
          ลงชื่อเข้าใช้งาน
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-slide-y-transition mode="out-in">
          <v-col v-if="errorMessage" :cols="12" class="red lighten-5 errorMessage">
            <v-row class="ma-0" align="center">
              <v-icon color="error" large>
                {{ messageIcon }}
              </v-icon>
              <span class="pl-2 title">
                {{ errorMessage }}
              </span>
            </v-row>
          </v-col>
        </v-slide-y-transition>
        <v-col :cols="12" class="pt-8 pb-7">
          <v-row justify="center">
            <v-col :cols="12" :sm="10" :md="8" :lg="6">
              <v-text-field
                v-model.number="id"
                label="ชื่อผู้ใช้งาน"
                outlined hide-details
                prefix="*" color="primaryDark"
                type="number"
                hide-spin-buttons
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col :cols="12" :sm="10" :md="8" :lg="6">
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                label="รหัสผ่าน"
                outlined hide-details
                prefix="" color="primaryDark"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
          </v-row>
          <v-row justify="center" class="pt-10 ma-0">
            <v-btn text class="pa-5 mr-5" @click="close()">
              ยกเลิก
            </v-btn>
            <v-btn :disabled="notEmpty === false" color="primary" class="pa-5" @click="verify()">
              ยืนยัน
            </v-btn>
          </v-row>
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import apiLogin from '@/axios/post/login'
import apiInfo from '@/axios/get/login'
import { mapMutations } from 'vuex'

export default {
  name: 'SignIn',
  props: {
    signed: {
      type: Boolean,
      default: false,
    },
    staff: {
      type: Boolean,
      default: false,
    },
    customer: {
      type: Boolean,
      default: true,
    },
    openDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      id: null,
      password: null,
      showPassword: false,
      errorMessage: null,
      messageIcon: null,
    }
  },
  computed: {
    dialogWidth() {
      if (this.$vuetify.breakpoint.xs) return '90vw'
      if (this.$vuetify.breakpoint.sm) return '75vw'
      if (this.$vuetify.breakpoint.md) return '55vw'
      if (this.$vuetify.breakpoint.lg) return '45vw'
      return '35vw'
    },
    notEmpty() {
      if (this.id == null) return false

      return this.id.toString().trim() !== ''
    },
  },
  watch: {
    openDialog() {
      this.dialog = this.openDialog
    },
  },
  methods: {
    ...mapMutations({
      setLogin: 'login/setLogin',
    }),
    loginFailed(error) {
      console.log(error)
      const { status } = error.response
      if (status === 401) {
        this.errorMessage = 'ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง'
        this.messageIcon = 'mdi-close-circle'
      } else {
        this.errorMessage = 'เกิดความผิดพลาดขึ้นที่เซิฟเวอร์'
        this.messageIcon = 'mdi-alert-circle'
      }
    },
    async verify() {
      if (this.notEmpty === false) return
      const body = {
        id: this.id,
        password: this.password || '',
      }
      const res = await apiLogin.getLogin(body)
      if (res.error) return this.loginFailed(res.error)
      document.cookie = `token=${res.result.token}`
      const resInfo = await apiInfo.get()
      if (resInfo.error) return this.loginFailed(resInfo.error)
      this.setLogin(resInfo.result)
      this.$emit('input', resInfo.result)
      this.$emit('close')
    },
    close() {
      this.id = null
      this.password = null
      this.errorMessage = null
      this.messageIcon = null
      this.showPassword = false
      this.$emit('close', false)
    },
  },
}
</script>

<style lang="stylus">
  .v-text-field .v-input__append-inner .v-icon
    color #00000 !important
  .errorMessage
    border-radius 8px
</style>
