/* eslint-disable no-param-reassign */
const path = require('path');
const proxyPath = 'https://localhost:8000';
// vue.config.js
module.exports = {
  publicPath: '/panorama/',
  devServer: {
    port: '8083',
    https: true, // 默认本地启动 https
    proxy: {
      '^/api': {
        target: proxyPath,
        changeOrigin: true,
        ws: false,
        headers: {
          host: proxyPath,
          origin: proxyPath,
        },
      },
      '^/filerisk': {
        target: proxyPath,
        changeOrigin: true,
        ws: false,
        headers: {
          host: proxyPath,
          origin: proxyPath,
          referer: proxyPath,
        },
      },
      '^/cas': {
        target: proxyPath,
        changeOrigin: true,
        ws: false,
        headers: {
          host: proxyPath,
          origin: proxyPath,
        },
      },
      '^/usercenter': {
        target: proxyPath,
        changeOrigin: true,
        ws: false,
        headers: {
          host: proxyPath,
          origin: proxyPath,
        },
      },
    },
  },
  // 生产打包时不输出map文件，增加打包速度
  productionSourceMap: false,
  // 需要开启语法转化
  transpileDependencies: [
    // 编译 view-design
    'view-design',
  ],
  pwa: {
    name: '系统',
    themeColor: '#007DF1',
    msTileColor: '#333333',
    /* iconPaths: {
      favicon32: 'static/icon/favicon-32x32.png',
      favicon16: 'static/icon/favicon-16x16.png',
      appleTouchIcon: 'static/icon/apple-icon-152x152.png',
      maskIcon: 'static/icon/safari-pinned-tab.svg',
      msTileImage: 'static/icon/apple-icon-144x144.png',
    }, */
  },
  configureWebpack: (config) => {
    // 子模块路径别名
    // config.resolve.alias['@zj'] = path.resolve(__dirname, 'src/.zj/src');
    config.resolve.alias = {
      '@': path.resolve('src'),
    };

    // 设置生产版本去掉 console.log debugger 保留 warn
    if (process.env.NODE_ENV === 'production') {
      // config.entry.app = ['babel-polyfill', './src/main.js'];
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
    }
  },
  chainWebpack: (config) => {
    // 增加 javascriptEnabled 配置，否则定制 view-design 时，less会报错
    config.module
      .rule('less')
      .oneOf('normal')
      .use('less-loader')
      .tap((options) => ({
        ...options,
        javascriptEnabled: true,
      }));
  },
};
