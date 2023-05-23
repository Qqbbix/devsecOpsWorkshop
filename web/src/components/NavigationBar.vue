<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <v-container
    fill-height
    :class="`primary white--text ${$vuetify.breakpoint.xs ? 'align-center' : 'align-start'}`"
  >
    <v-row :align="$vuetify.breakpoint.smAndUp ? 'start' : 'center'">
      <v-col
        :cols="3" :sm="12"
        :class="`title font-weight-bold
          ${$vuetify.breakpoint.smAndUp ? ' primaryDark elevation-4' : ''}`"
      >
        Team K1
      </v-col>
      <v-col
        :cols="9" :sm="12"
        :class="`navigation-user-info
          ${$vuetify.breakpoint.smAndUp ? 'primaryDark elevation-4' : ''}`"
      >
        <v-row :justify="$vuetify.breakpoint.xs ? 'end' : 'start'" align="center">
          <template v-if="$vuetify.breakpoint.smAndUp && user">
            <v-col :cols="12" class="pa-0">
              <v-divider class="primaryDark" />
            </v-col>
            <v-col :sm="3" class="pb-2">
              <img :src="profileImage" class="image-circle elevation-2" alt="profile">
            </v-col>
          </template>
          <v-col :cols="5" :sm="9" class="py-0">
            <template v-if="user">
              <div>
                {{ user.name }}
              </div>
              <v-row v-if="$vuetify.breakpoint.smAndUp" class="ma-0" align="end">
                <v-icon color="amber accent-2">
                  mdi-alpha-k-circle
                </v-icon>
                <span class="pl-1 body-2">
                  {{ user.point }}
                </span>
              </v-row>
              <template v-if="$vuetify.breakpoint.xs">
                <div>
                  <v-divider class="primaryDark mt-1" />
                </div>
                <div class="cursor-pointer subtitle-2" @click="signOut()">
                  ออกจากระบบ
                </div>
              </template>
            </template>
          </v-col>
          <template v-if="user">
            <v-col v-if="$vuetify.breakpoint.xs" class="shrink">
              <img :src="profileImage" class="image-circle elevation-2" alt="profile">
            </v-col>
          </template>
          <template v-else>
            <template v-if="$vuetify.breakpoint.xs">
              <v-col class="cursor-pointer subtitle-2" @click="signIn()">
                ลงชื่อเข้าใช้งาน
              </v-col>
            </template>
          </template>
        </v-row>
        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-row v-if="user">
            <v-divider class="primary" />
          </v-row>
          <v-row>
            <template v-if="user">
              <v-col v-ripple class="text-center cursor-pointer subtitle-1" @click="signOut()">
                ออกจากระบบ
              </v-col>
            </template>
            <template v-else>
              <v-col v-ripple class="text-center cursor-pointer subtitle-1" @click="signIn()">
                ลงชื่อเข้าใช้งาน
              </v-col>
            </template>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import profileImage from '@/assets/profileImage.jpg'

export default {
  name: 'NavigationBar',
  data: () => ({
    profileImage,
  }),
  computed: {
    ...mapState({
      user: (state) => state.login.login,
    }),
  },
  methods: {
    signIn() {
      this.$emit('openSignInPage')
    },
    signOut() {
      this.$emit('signOut')
    },
  },
}
</script>
