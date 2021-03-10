const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { index: path.resolve(__dirname, 'src', 'index.js') },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 8080
  },
  module: {
    rules: [
        {
        // scss loader
        test: /\.scss$/,
        use: [
            // MINICSSPLUGIN: generate a style.css file inside dist folder with better performance (not through js). I added the public path because of an error
            {
                loader: MiniCssExtractPlugin.loader,
                options : {
                    publicPath:'./dist'
                },
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'sass-loader',
            }
        ],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            minimize: true,
          }
        },
        { 
            // fonts loader
            test: /\.(woff|woff2|eot|ttf)$/,
            type: 'asset/resource'
        },
      
        // video
      // images asset/resouce: take all the images and put them to destination folder images
      { test: /\.(png|svg|jpg|gif|webp|mp4|webp)$/,
        use: [
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/',
          } 
        }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
};