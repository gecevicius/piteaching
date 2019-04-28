
const path = require('path')
const fs = require('fs')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const SizePlugin = require('size-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProductionEnvFlag = process.env.NODE_ENV === 'production'
const CssUrlRelativePlugin = require('css-url-relative-plugin')

function resolveRealPath(dir) {
  return path.join(__dirname, dir)
}

function loadGlobalStyles() {
  const variables = fs.readFileSync('src/assets/styles/variables.scss', 'utf-8')
  const mixins = fs.readFileSync('src/assets/styles/mixins.scss', 'utf-8')
  return variables + mixins
}

// https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/config.md
module.exports = {

  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: '/',

  // where to output built files

  outputDir: 'dist',
  module: {
    rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: '/static/img',
        },
      },
      ],
    },
    ],
  },
  plugins:[
  new CssUrlRelativePlugin()
  ],

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: true,

  // https://cli.vuejs.org/config/#runtimecompiler
  runtimeCompiler: false,

  // babel-loader skips `node_modules` deps by default.
  // explicitly transpile a dependency with this option.
  transpileDependencies: [
  /* string or regex */
  ],

  // generate sourceMap for production build?
  productionSourceMap: process.env.NODE_ENV !== 'production',

  // https://github.com/vuejs/vue-cli/blob/dev/docs/css.md (#Need to put the top)
  css: {
    loaderOptions: {
      sass: {
        data: loadGlobalStyles()
      }
    }
  },

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
    .set('vue$', 'vue/dist/vue.esm.js')
    .set('@helper', resolveRealPath('src/helper'))
    .set('@pages', resolveRealPath('src/pages'))
    .set('@assets', resolveRealPath('src/assets'))
    .set('@router', resolveRealPath('src/router'))
    .set('@mixins', resolveRealPath('src/mixins'))
    .set('@components', resolveRealPath('src/components'))

    // remove the old loader & add new one
    config.module.rules.delete('svg')
    config.module
    .rule('svg')
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      name: '[name]-[hash:7]',
      prefixize: true
    })

    const splitOptions = config.optimization.get('splitChunks')
    config.optimization.splitChunks(
      Object.assign({}, splitOptions, {
        maxAsyncRequests: 16,
        maxInitialRequests: 16,
        minChunks: 1,
        minSize: 30000,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          default: false,
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          element: {
            name: 'element',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: 'initial',
            // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
            priority: -30
          }
        }
      })
      )

    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    if (process.env.npm_config_report) {
      config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },

  configureWebpack: {
    plugins: [
    isProductionEnvFlag ? new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: ['/']
      }) : () => {},
      // NEED FIX 🚧 : HardSourceWebpackPlugin Will Cause Error.
      // new HardSourceWebpackPlugin(),
      isProductionEnvFlag ? new SizePlugin() : () => {}
      ]
    },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,


  // configure webpack-dev-server behavior
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: null, // string | Object
    before: app => {}
  },

  // options for 3rd party plugins
  pluginOptions: {}
}