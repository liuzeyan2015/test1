const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack =require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry:'./src/main.js', //入口

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
              }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json']//自动添加后缀名
      },
      devServer: {
        overlay: true//报错的时候直接显示在页面上
      },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html' //模版，指定参考文件
        }),
        new webpack.ProvidePlugin({

            $:"jquery",
    
            jQuery:"jquery",
    
            "window.jQuery":"jquery"
    
          }),
          new VueLoaderPlugin()
    ],
   
}