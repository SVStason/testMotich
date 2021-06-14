const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use:['file-loader']
            }
        ]
    }
}