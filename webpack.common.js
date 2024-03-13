const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: './src/assets/js/main.js',
        services: './src/assets/js/services.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Index Page',
            template: './src/index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            title: 'Services Page',
            filename: 'services.html',
            template: './src/services.html',
            chunks: ['main', 'services'],
        }),
        new HtmlWebpackPlugin({
            title: 'Services Detail Page',
            filename: 'services-detail.html',
            template: './src/services-detail.html',
            chunks: ['main'],
        }),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join'],
        }),
        new MiniCssExtractPlugin({
            filename: './src/assets/css/[name].css',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ],
    },
};