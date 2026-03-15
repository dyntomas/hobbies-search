
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

const mode = process.env.NODE_ENV || "production";
const config = {
    mode,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: '[name].js'
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
            filename: "[name].css"
        }),
        // new PurgeCSSPlugin({
        //     paths: glob.sync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
        //     safelist: []
        // }),
        new GenerateSW({
            swDest: "../sw.js",
            runtimeCaching: [{
                handler: "CacheFirst",
                urlPattern: new RegExp("/*"),
                options: {
                    cacheName: `app-${require("./package.json").version}`
                }
            }],
            exclude: ["main.js", "main.css"],
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
