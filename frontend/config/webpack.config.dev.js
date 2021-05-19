var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".vue"],
        // was added because of vue runtime dependency
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    useBuiltIns: "usage",
                                    corejs: 3
                                },
                            ],
                        ],
                        plugins: [
                            "@babel/plugin-proposal-optional-chaining"
                        ]
                    }
                }
            },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "vue-style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.template.html",
            filename: "index.html",
            inject: true
        }),
    ],
    devServer: {
        open: true,
        port: 4000
    }
}