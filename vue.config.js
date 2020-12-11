module.exports = {
  devServer: {
    proxy: 'https://fantasy.premierleague.com/'
  },
  publicPath: '/my-fpl',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    }
  }
}
