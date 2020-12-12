module.exports = {
  devServer: {
    proxy: 'https://fantasy.premierleague.com/'
  },
  publicPath: '/myfpl',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    }
  }
}
