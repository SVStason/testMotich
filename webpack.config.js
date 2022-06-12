const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `./js/${filename('.js')}`,
        publicPath: '',
        assetModuleFilename: `[path]${filename('[ext]')}`    // name: `./img/${filename('[ext]')}`
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('.css')}`
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, "dist/assets")
            }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: (resourcePath, context) => {
                            return path.relative(path.dirname(resourcePath), context) + '/';
                        }
                    }
                },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(?:|gif|jpg|jpeg|png|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(?:|woff2)$/,
                type: 'asset/resource'
            },
        ]
    }
}