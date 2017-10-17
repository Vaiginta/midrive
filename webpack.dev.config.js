var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry     : [
      "./src/js/"
    ],
    output    : {
      
      filename: "js/bundle.js",
      path: __dirname + '/public',
      publicPath: '/public/'
  },
    module    : {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' }]
    },
    devServer : { hot: true },
    devtool   : 'cheap-module-eval-source-map',
    plugins   : [ new webpack.HotModuleReplacementPlugin() ]
};
