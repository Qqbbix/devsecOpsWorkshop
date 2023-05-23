import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.darken2,
        primaryLight: colors.teal.lighten2,
        primaryDark: colors.teal.darken3,
        tableHeader: colors.lightBlue.darken3,
        success: colors.green.accent4,
        error: colors.red.darken1,
        warning: colors.orange.accent4,
      },
      dark: {
        primary: colors.teal,
        primaryLight: colors.teal.lighten2,
        primaryDark: colors.teal.darken3,
        tableHeader: colors.lightBlue.darken3,
        success: colors.green.accent4,
        error: colors.red.darken1,
        warning: colors.orange.accent4,
      },
    },
  },
});
