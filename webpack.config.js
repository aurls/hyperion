const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modes = {
  DEV: 'development',
  PROD: 'production'
};

const paths = {
  DEV: 'src',
  PROD: 'dist',
  SERVER: 'server',
  CLIENT: 'client',
  ASSETS: 'assets'
};

const ports = {
  CLIENT: 9000,
  SERVER: 9100
};

module.exports = (env = {}) => {
  const { mode = modes.DEV } = env;
  const isDevelopment = mode === modes.DEV;
  const isProduction = mode === modes.PROD;

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: Path.join(paths.DEV, paths.CLIENT, 'index.html')
      })
    ];

    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: Path.join(paths.ASSETS, 'style', 'style-[contenthash:5].css')
        })
      );
    }

    return plugins;
  };

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ];
  };

  return {
    mode: isDevelopment ? modes.DEV : modes.PROD,
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    entry: Path.join(process.cwd(), paths.DEV, paths.CLIENT, 'index.tsx'),
    output: {
      path: Path.join(process.cwd(), paths.PROD, paths.CLIENT),
      filename: Path.join(paths.ASSETS, 'js', 'script-[contenthash:5].js')
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
    },

    devServer: {
      static: {
        directory: Path.join(__dirname, paths.PROD, paths.CLIENT),
      },
      port: ports.CLIENT,
      open: true,
      compress: true,
      historyApiFallback: true,
    },

    plugins: getPlugins(),

    module: {
      rules: [

        // loading js/ts
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },

        // loading styles
        {
          test: /\.(scss|sass)$/,
          use: getStyleLoaders()
        }
      ]
    }
  };
};
