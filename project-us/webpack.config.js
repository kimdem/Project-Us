const path = require('path');

module.exports = {
  entry: './src/index.js', // 시작 파일 (entry point)
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js 파일을 처리
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 최신 JavaScript 변환
        },
      },
      {
        test: /\.css$/, // CSS 파일 로딩 설정
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify")
    }
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    setupMiddlewares: function(middlewares, devServer) {
      console.log("Custom Middleware Setup");
      return middlewares;
    }
  }
};
