/* eslint-disable no-param-reassign */
const path = require('path');
const proxyPath = 'https://localhost:8000';
// vue.config.js
module.exports = {
  publicPath: '/',
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
    config.resolve.alias = {
      '@': path.resolve('src'),
    };
    
    // 本地开启 source-map
    config.devtool = 'source-map';
  },
  css: {
    loaderOptions: {
      sass: {
        sourceMap: false,
      },
      less: {
        sourceMap: false,
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
