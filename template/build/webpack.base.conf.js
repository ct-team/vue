'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vuxLoader = require('vux-loader');
const vueLoaderConfig = require('./vue-loader.conf');
const buildUser = require('../build-user');
var TransformModulesPlugin = require('webpack-transform-modules-plugin');
var PostCompilePlugin = require('webpack-post-compile-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

// module.exports = {
const webpackConfig = {
    context: path.resolve(__dirname, '../'),
    // entry: {
    //   app: './src/main.js'
    // },
    plugins: [new PostCompilePlugin(), new TransformModulesPlugin()],
    entry: buildUser.getEntry(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                // use: [
                //     'url-loader?limit=10000&name=' +
                //         utils.assetsPath('img/[name].[hash:10].[ext]'),
                //     {
                //         loader: 'image-webpack-loader',
                //         options: {
                //             mozjpeg: {
                //                 progressive: true,
                //                 quality: 65
                //             },
                //             // optipng.enabled: false will disable optipng
                //             optipng: {
                //                 enabled: false
                //             },
                //             pngquant: {
                //                 quality: '65-90',
                //                 speed: 4
                //             },
                //             gifsicle: {
                //                 interlaced: false
                //             }
                //         }
                //     }
                // ]
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader' // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: 'sass-loader' // 将 Sass 编译成 CSS
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:10].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:10].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
//vux
module.exports = vuxLoader.merge(webpackConfig, {
    plugins: [
        {
            name: 'vux-ui'
        },
        {
            name: 'less-theme',
            path: 'src/assets/css/vux/theme.less'
        },
        {
            name: 'duplicate-style'
        }
    ]
});
