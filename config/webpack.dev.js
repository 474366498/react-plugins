
const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')  // https://www.npmjs.com/package/node-polyfill-webpack-plugin
const webpack = require('webpack')
const { CKEditorTranslationsPlugin } = require('@ckeditor/ckeditor5-dev-translations')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

const getStyleLoaders = (pre) => {
  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugin: ['postcss-preset-env']
        }
      }
    },
    pre
  ].filter(Boolean)
}

const resolve = dir => path.join(__dirname, '../' + dir)

console.log(24, process.env.NODE_ENV, __dirname)

module.exports = {
  entry: './src/index.js',
  output: {
    path: undefined,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'asset/[hash:4][ext][query]'  // 静态资源
  },
  externals: {
    "BMap": "BMap"
  },
  module: {
    rules: [

      {
        oneOf: [

          {
            test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            use: ['raw-loader']
          },
          {
            test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  injectType: 'singletonStyleTag',
                  attributes: {
                    'data-cke': true
                  }
                }
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: styles.getPostCssConfig({
                    themeImporter: {
                      themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                    },
                    minify: true
                  })
                }
              }
            ]
          },


          {
            test: /\.css$/,
            use: getStyleLoaders()
          },
          {
            test: /\.less$/,
            use: getStyleLoaders('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders('sass-loader')
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders('stylus-loader')
          },
          {
            test: /\.(jpe?g|png|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              }
            }
          },
          {
            test: /\.svg$/,
            use: ['raw-loader']
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource'
          },
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              plugins: ['react-refresh/babel']
            }
          },
          {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, '../src'),
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              }
            ]
            // loader: 'awesome-typescript-loader'
          }
        ]
      }
    ]
  }, // module end 
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_module',
      // include: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: path.resolve(__dirname, '../dist'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: []
          },
          info: {
            minimized: true
          }
        }
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        isWatch: true
      }
    }),
    new ReactRefreshWebpackPlugin(),
    new NodePolyfillPlugin(),
    new CKEditorTranslationsPlugin({
      // The UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
      // language: 'de',
      // addMainLanguageTranslationsToAllAssets: true
    }),
  ], // plugins end 
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: entry => `runtime~${entry.name}`
    }
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    https: true,
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/dss0': {
        target: 'https://dss0.bdstatic.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/dds0': '/dds0'
        }
      },
      '/vd3': {
        target: 'https://vd3.bdstatic.com',
        changeOrigin: true,
        pathRewrite: {
          '^/vd3': '/vd3'
        }
      },
      '/m801': {
        target: 'https://m801.music.126.net',
        changeOrigin: true,
        pathRewrite: {
          '^/m801': '/m801'
        }
      },
      '/baidu': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/baidu': '/baidu'
        }
      },
      '/qq': {
        target: 'http://map.qq.com',
        changeOrigin: true
      },
      '/apis': {
        target: 'http://apis.map.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '/apis'
        }
      }
    }
  },
  mode: 'development',
  // devtool: 'cheap-module-source-map',
  devtool: 'source-map',
  performance: { hints: false }
}









