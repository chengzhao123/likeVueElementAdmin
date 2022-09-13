const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  // mode: 'production',
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    sourcePrefix: ' '
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'src/icons')],
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          }
        }]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        exclude: [path.resolve(__dirname, 'src/icons')],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 15 * 1024,
            name: 'img/[name]-[hash:6].[ext]',
            esModule: false
          }
        }]
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'music/[name]-[hash:6].[ext]',
            esModule: false
          }
        }]
      }
    ],
    unknownContextCritical: false,
  },
  amd: {
    toUrlUndefined: true
  },
  performance: { hints: false, },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      title: '主页',
      filename: 'index.html',
      template: './public/index.html',
      inject: 'body'
    }),
    new CopyPlugin([
      { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
      { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
      { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
      { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' }
    ]),
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./')
    }),
  ],
  devServer: {
    host: 'localhost',
    hot: true,
    open: true,
    port: 8080,
    compress: true,
    proxy: {
      '/api': {  // /api 表示拦截以/api开头的请求路径
        target: 'http:localhost:3000', // 跨域的域名
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {  // 重写路径
          '^/api': ''  // 把/api变为空字符
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/'),
      // Cesium module name
      'cesium': path.resolve(__dirname, 'node_modules/cesium/Source')
    }
  }
}