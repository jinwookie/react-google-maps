const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

const publicPath = '/'; // IS_PROD ? '/dist/' : 'http://localhost:8080/dist/';

let optimization = {};

let plugins = [
  new DefinePlugin({
    'process.env.GOOGLE_MAPS_EMBED_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_EMBED_API_KEY),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new MiniCssExtractPlugin({
    filename: IS_PROD ? '[name].[chunkhash].css' : '[name].css',
    chunkFilename: IS_PROD ? '[id].[chunkhash].css' : '[id].css',
    hmr: !IS_PROD,
    reloadAll: true,
  }),
  new HtmlPlugin({
    title: 'React JAM',
    template: 'src/views/index.html',
  }),
];

if (IS_PROD) {
  optimization = {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  };
}

let resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
};

if (!IS_PROD) {
  resolve.alias = { 'react-dom': '@hot-loader/react-dom' };
}

module.exports = {
  target: 'web',
  entry: {
    app: './src/client/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    filename: IS_PROD ? 'app.[chunkhash].js' : 'app.js',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins,
  resolve,
  watch: !IS_PROD,
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? false : 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  },
};