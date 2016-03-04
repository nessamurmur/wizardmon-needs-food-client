module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: './assets/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.tsx$/, loader: 'ts-loader!ts-jsx-loader' }
    ]
  }
}
