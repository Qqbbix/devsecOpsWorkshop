<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col
          :cols="12" :sm="3" :md="3" :lg="2" :xl="2"
          :class="`pa-0 elevation-4 theme-navigation
            ${$vuetify.breakpoint.smAndUp ? 'sm-and-up' : ''}`"
        >
          <navigation-bar
            @openSignInPage="openSignInPage = true"
            @signOut="user = null, signOut()"
          />
        </v-col>
        <v-col
          :cols="12" :sm="9" :md="9" :lg="10" :xl="10"
          :class="`pa-0 pb-8 scrollable ${$vuetify.breakpoint.smAndUp ? 'sm-and-up' : '' }`"
        >
          <v-main>
            <router-view @openSignInPage="openSignInPage = true" />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
    <sign-in
      :open-dialog="openSignInPage"
      :customer="customer"
      :staff="staff"
      @close="openSignInPage = false"
      @input="lastRenew = new Date()"
    />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import navigationBar from '@/components/NavigationBar.vue'
import signIn from '@/components/SignIn.vue'
import apiLogin from '@/axios/get/login'
import apiRenew from '@/axios/post/renew'

export default {
  name: 'App',
  components: {
    navigationBar,
    signIn,
  },
  data: () => ({
    openSignInPage: false,
    staff: false,
    customer: true,
    toRenew: false,
    lastRenew: null,
  }),
  created() {
    this.checkLogin()
    window.addEventListener('mousemove', () => {
      this.toRenew = true
    })
    window.addEventListener('mousedown', () => {
      this.toRenew = true
    })
    window.addEventListener('keydown', () => {
      this.toRenew = true
    })
    setInterval(() => {
      if (this.lastRenew == null) return
      if (this.toRenew === false) return
      const diff = ((new Date()).getTime() - this.lastRenew.getTime()) / 1000
      if (diff < 120) return
      this.renewToken()
    }, 10000)
  },
  methods: {
    ...mapMutations({
      setLogin: 'login/setLogin',
    }),
    async renewToken() {
      await apiRenew()
      this.toRenew = false
      this.lastRenew = new Date()
    },
    async checkLogin() {
      const { result, error } = await apiLogin.get()
      if (error) return
      this.setLogin(result)
      this.renewToken()
    },
    signOut() {
      this.setLogin(null)
      document.cookie = 'token='
    },
  },
};
</script>

<style lang="scss">
  @font-face {
    font-family: 'anakotmai';
    src: url(@/assets/Font/anakotmai-medium.woff2);
    font-weight: normal;
  }
  @font-face {
    font-family: 'anakotmai';
    src: url(@/assets/Font/anakotmai-light.woff2);
    font-weight: lighter;
  }
  @font-face {
    font-family: 'anakotmai';
    src: url(@/assets/Font/anakotmai-bold.woff2);
    font-weight: bold;
  }
  $font-family: 'anakotmai', sans-serif;
  .v-application, .v-application *,
  .v-application .display-1, .v-application .display-2,
  .v-application .display-3, .v-application .display-4,
  .v-application .headline, .v-application .title,
  .v-application .subtitle-1, .v-application .subtitle-2,
  .v-application .body-1, .v-application .body-2,
  .v-application .caption, .v-application .overline {
    font-family: $font-family, sans-serif !important;
  }
</style>

<style lang="stylus">
  html
    max-height 100vh
    height 100vh
    overflow hidden
  .scrollable
    overflow-y auto
    overflow-x hidden
  .scrollable.sm-and-up
    max-height 100vh
    height 100vh
  .scrollable:not(.sm-and-up)
    max-height calc(100vh - 86px)
    height calc(100vh - 86px)
  .theme-navigation
    position relative
  .theme-navigation.sm-and-up
    height 100vh
    max-height 100vh
  .theme-navigation:not(.sm-and-up)
    height 86px
    max-height 86px
  .theme-navigation.sm-and-up .navigation-user-info
    position absolute
    bottom 0
    left 0
  .theme-navigation:not(.sm-and-up) .navigation-user-info
    position relative
    text-align right
  .theme-navigation.sm-and-up .navigation-user-info img
    width 100%
    max-width 100%
    object-fit cover
  .theme-navigation:not(.sm-and-up) .navigation-user-info img
    height 100%
    max-height 100%
    max-width 3.5rem
    object-fit cover
  .image-circle
    border-radius 50%
  .image-rounded
    border-radius 5%
  .cursor-pointer
    cursor pointer
  .position-relative
    position relative
  .position-absolute
    position absolute
  .position-absolute.absolute--top-left
    top 0
    left 0
  .v-text-field__prefix
    color #FF6F00
</style>
