
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
    // 这里只写了两个，你可以自己再加，按这种格式.set('', resolve(''))
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/dev-api': {
        target: `https://weixin.abzc.net`,
        // target: 'http://119.3.232.60:34100',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/dev-api": "" // 去掉接口地址中的api字符串
        }
      }
    }
  },
}