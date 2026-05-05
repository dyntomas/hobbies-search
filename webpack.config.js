
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

const mode = process.env.NODE_ENV || "production";
const config = {
    mode,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'assets/[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    }
                ]
            },
            {
                test: /\.base64$/i,
                type: "asset/source"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // hash: true
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, "src/static"),
                            destination: path.resolve(__dirname, "public")
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new GenerateSW({
            swDest: "sw.js",
            runtimeCaching: [{
                handler: "CacheFirst",
                urlPattern: new RegExp("/*"),
                options: {
                    cacheName: `app-${require("./package.json").version}`
                }
            }],
            skipWaiting: true
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                }
            }),
            new TerserPlugin({
                terserOptions: { mangle: true }
            })
        ]
    }
}

module.exports = config;