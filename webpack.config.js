const autoprefixer = require('autoprefixer');
const JsonIncWebpackPlugin = require('./node_modules/@scvo/common/json-inc-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = (env) => {
  const plugins = [
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './build/',
        context: './assets/'
      }
    ], { debug: 'warning' }),
    new JsonIncWebpackPlugin({
      pattern: './configuration/config.inc.json',
      output: './build'
    }),
  ];

  if (env !== 'prod') {
    plugins.push(new ExtraWatchWebpackPlugin({
      files: ['./configuration/**/*', './assets/**/*']
    }));
  }

  return {
    watchOptions: {
      ignored: ['node_modules', 'build'],
      aggregateTimeout: 300
    },
    entry: [
      './src/main.scss',
      './src/main.js',
    ],
    output: {
      filename: 'build/main.js',
      library: process.env.LIBRARY,
      libraryTarget: 'var'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [{
              loader: 'file-loader',
              options: {
                name: 'build/main.css',
              },
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./node_modules'],
              },
            }
          ],
        },
        {
          test: require.resolve('jquery'),
          use: [
            {
              loader: 'expose-loader',
              options: 'jQuery'
            },
            {
              loader: 'expose-loader',
              options: '$'
            }
          ]
        },
        {
          test: require.resolve('string'),
          use: [
            {
              loader: 'expose-loader',
              options: 'S'
            }
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader' + (!env === 'prod' ? '?cacheLoader' : ''),
          query: {
            presets: ['@babel/preset-env'],
            compact: false
          }
        }
      ]
    },
    plugins: plugins
  };
};
