const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package.json')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://teamk1.com',
        secure: false,
        changeOrigin: true,
        ws: false,
        headers: {
          'X-Vue-App-Name': name,
        },
      },
    },
    hot: true,
  },
});
