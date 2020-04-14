module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
        'store': '@/store',
      }
    }
  },
  // devServer: {
  //     public: '0.0.0.0',
  //     // public: '0.0.0.0:8080',
  //     // port: 8080,
  //     // https: false,
  //     // hotOnly: false,
  //     disableHostCheck: true,
  //     hot: true,
  //     open: false // 配置自动启动浏览器
  // }
}