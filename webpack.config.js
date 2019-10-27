var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require("path");

module.exports = {
  // 本地测试服务器配置
  devServer: {
    contentBase: path.join(__dirname, "app"),
    port: 9000
  },
  // css压缩插件
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    })
  ],
  // 多入口配置,2d对应手机,3d对应pc web,按需加载代码在index.html
  entry: {
    main_2D: "./app/src/js/main2D.js",
    main_3D: "./app/src/js/main3D.js"
  },
  // vendor 分离
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  // 输出路径
  output: {
    path: __dirname + "/app/dist",
    filename: "[name].js",
    publicPath: "dist/"
  },
  // 打包过后代码大小警告
  performance: {
    hints: "warning",
    maxEntrypointSize: 5000000,
    maxAssetSize: 3000000
  },
  // 别名,public用来存放静态资源,src放js和css代码
  resolve: {
    extensions: [".js", ".json", ".jsx", ".less", ".css"],
    alias: {
      Public: path.resolve(__dirname, "app/public"),
      Src: path.resolve(__dirname, "app/public")
    }
  },
  // loaders配置
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "jQuery"
          },
          {
            loader: "expose-loader",
            options: "$"
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/images/"
            }
          }
        ]
      },
      {
        test: /\.(mp3|ogg|wav)$/, // 音乐资源
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/sounds/"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|tff|woff|woff2)$/, // 字体资源
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/fonts/"
            }
          }
        ]
      }
    ]
  }
};
