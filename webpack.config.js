const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './babel/main.js'
  },
  output: {
    filename: '[name].js',
    library: 'Global'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = config;