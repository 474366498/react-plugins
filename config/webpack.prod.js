
const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const getStyleLoaders = (pre) => {
  return [
    MiniCssExtractPlugin.loader,
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

console.log(24, process.env.NODE_ENV)

// console.log(30, TerserWebpackPlugin)

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:4].js',
    chunkFilename: 'js/[name].[contenthash:4].chunk.js',
    assetModuleFilename: 'assets/[hash:4][ext][query]',  // 静态资源 非js文件
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
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
              plugins: ['@babel/plugin-transform-runtime'
                // 'react-refresh/babel'
              ]
            }
          }
        ]
      }
    ]
  }, // module end 
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      // include: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      // chunks: [ 'react', 'common']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css'
    }),
    new ReactRefreshWebpackPlugin(),
    // 将public下面的资源复制到dist目录去（除了index.html）
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist/assets'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            // ignore: []
          },
          info: {
            minimized: true
          }
        }
      ]
    })
  ], // plugins end 
  optimization: {
    // 压缩的操作
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {},
        }
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割
    splitChunks: {
      chunks: "all",
      cacheGroups: {

        react: {
          name: 'react',
          priority: 1,
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          minSize: 10,
          minChunks: 1,
          reuseExistingChunk: true
        },
        //   "react-router": "^6.3.0",
        // "react-router-dom": "^6.3.0",
        router: {
          name: 'react-router',
          priority: 1,
          test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
          minSize: 10,
          minChunks: 1,
          reuseExistingChunk: true
        },
        antd: {
          name: 'antd',
          priority: 1,
          test: /[\\/]node_modules[\\/]antd/,
          minSize: 10,
          minChunks: 1,
          reuseExistingChunk: true
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 10,
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  mode: 'production',
  devtool: 'source-map'
}









