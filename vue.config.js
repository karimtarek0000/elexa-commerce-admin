module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/style.scss";`
      }
    }
  }
};
