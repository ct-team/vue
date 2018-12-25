var path = require('path');
var glob = require('glob');
var root = path.resolve(__dirname, '../src/view');
var entryRoot = './src/view/';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var copy = require('./copy');
var config = require('./config');

var getMulu = function(filePath) {
    var filename1 = filePath.substring(0, filePath.lastIndexOf('/'));
    var filename2 = filename1.substring(filename1.lastIndexOf('/') + 1);

    return filename2;
};

module.exports.getEntry = function() {
    var entryFiles = glob.sync(root + '/*/main.js');
    var map = {};

    entryFiles.forEach(filePath => {
        var filename = getMulu(filePath);

        map[filename] = entryRoot + filename + '/main.js';
    });
    return map;
};

module.exports.getProdHtmlPlugin = function(env, tconfig) {
    const entryHtml = glob.sync(root + '/*/index.ejs');
    const arr = [];

    entryHtml.forEach(filePath => {
        const filename = getMulu(filePath);
        const conf = {
            // 模板来源
            template: filePath,
            currenv:env,
            // 文件名称
            filename:
                env === 'testing' ? filename + '.html' : tconfig.build[filename],
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            inject: false,
            isLocal: true,
            buildConfig: config,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        };

        arr.push(new HtmlWebpackPlugin(conf));
    });
    return arr;
};

module.exports.getDevHtmlPlugin = function(env) {
    const entryHtml = glob.sync(root + '/*/index.ejs');
    const arr = [];

    entryHtml.forEach(filePath => {
        const filename = getMulu(filePath);
        const conf = {
            // 模板来源
            template: filePath,
            currenv:'development',
            // 文件名称
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            buildConfig: config,
            inject: false,
            isLocal: true
        };

        arr.push(new HtmlWebpackPlugin(conf));
    });
    return arr;
};
module.exports.getBuild = function(path, dirname) {
    const entryHtml = glob.sync(root + '/*/index.ejs');
    const map = { build: {} };

    entryHtml.forEach(filePath => {
        var filename = getMulu(filePath);

        map.build[filename] = path.resolve(
            dirname,
            '../dist/dest/' + filename + '.html'
        );
    });
    return map;
};

module.exports.buildOver = function() {
    copy.init();
};

module.exports.assetsPublicPath = function() {
    // console.log(config.baseUrl + config.app);
    return config.assetsPublicPath;
};

module.exports.px2rem = function() {
    // console.log(config.baseUrl + config.app);

    return config.px2rem;
};
module.exports.config = function() {
    // console.log(config.baseUrl + config.app);

    return config;
};
