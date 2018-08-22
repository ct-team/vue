var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');
var config = require('./config');
var list = config.list;

const src = path.join(__dirname, '../dist/dest');
var root = path.resolve(__dirname, '../dist');

var copyNum = 0;

//端口替换
var portReplace = function() {
    console.log('Replace');
    list.forEach(obj => {
        const entryHtml = glob.sync(root + '/' + obj.title + '/*.html');
        var portStr = obj.webPort;

        entryHtml.forEach(f => {
            fs.readFile(f, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                //var result = data.replace(/\[webport\]/g, portStr);
                var baseUrl =
                    config.baseUrl.replace(/\[webport\]/i, portStr) +
                    config.appUrl;
                var currUrl = baseUrl + 'assets';

                var result = data.replace(/(\.)?\/assets/gi, currUrl);

                result = result.replace(/<configBaseUrl>/g, baseUrl);

                // console.log(currUrl);
                fs.writeFile(f, result, 'utf8', function(err) {
                    if (err) return console.log(err);
                });
            });
        });
    });
};

//计算拷贝数量
var jsj = function(callback) {
    setTimeout(function() {
        if (copyNum === list.length) {
            callback();
        } else {
            jsj(callback);
        }
    }, 100);
};

var copy = function() {
    copyNum = 0;
    list.forEach(obj => {
        const url = path.join(__dirname, '../dist/', obj.title);

        fs.remove(url, function(err) {
            if (err) return console.error(err);

            //var result = data.replace(/\[webport\]/g, portStr);

            fs.copy(src, url, function(err) {
                console.log('copy');
                if (err) return console.error(err);
                console.log(obj.title + 'copy success!');
                copyNum++;
            });
        });
    });
};

//替换manifest o.p 路径
var replaceManifest = function() {
    const entryHtml = glob.sync(root + '/assets/js/manifest*.js');

    const op =
        'o.p=typeof configBaseUrl === "undefined" ? "' +
        config.assetsPublicPath +
        '" : configBaseUrl';

    entryHtml.forEach(f => {
        fs.readFile(f, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            var result = data.replace(
                'o.p="' + config.assetsPublicPath + '"',
                op
            );

            fs.writeFile(f, result, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        });
    });
};
// copy();
// jsj(portReplace);
//replaceManifest();
module.exports.init = function() {
    copy();
    jsj(portReplace);
    if (config.chunk) {
        replaceManifest();
    }
};
