const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {	
                test: /\.(png|woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,	
                use: [{	
                    loader: "file-loader",
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                }]	
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                include: [
                    path.join(__dirname, 'src'),
                    /node_modules/
                ],
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin(),
    ]
};