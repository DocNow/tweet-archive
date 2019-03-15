const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: `index.js`,
    path: path.resolve(__dirname, './dist/site/js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/preset-env"
              ]
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      }
    ]
  }
}
