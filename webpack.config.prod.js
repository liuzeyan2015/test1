const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack =require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require ("path")

module.exports = {
    entry:'./src/main.js', //入口
    // 输出配置
    output: {
        // 输出文件，路径相对于本文件所在的位置
        // path: path.join(__dirname, 'dist'),
        // // 基于文件的md5生成Hash名称的script来防止缓存
        // filename: 'bundle.js',
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(ttf|woff|svg|eot|jpg|png)$/,
                use: [
                  {
                    loader: 'url-loader'
                  }
                ]
              },
              //vue-loader版本为15.x的才适合使用
            //   https://vue-loader.vuejs.org/zh/migrating.html#loader-%E6%8E%A8%E5%AF%BC
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                  /node_modules/.test(file) &&
                  !/\.vue\.js/.test(file)
                )
              }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json']//自动添加后缀名
      },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html', //模版，指定参考文件
            minify:{
                minifyCSS:true,
                minifyJS:true,
                removeComments:true,
                collapseWhitespace:true,
            }
        }),
        
        new webpack.ProvidePlugin({

            $:"jquery",
    
            jQuery:"jquery",
    
            "window.jQuery":"jquery"
    
          }),
          new VueLoaderPlugin(),

          //设置当前环=环境为生产环境
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
              //压缩js
            compress: {
              warnings: false
            }
          })
    ],
   
}