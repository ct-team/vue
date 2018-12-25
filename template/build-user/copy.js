var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');
var config = require('./config');
var list = config.list;

const src = path.join(__dirname, '../dist/dest');
var root = path.resolve(__dirname, '../dist');

var copyNum = 0;
//
var clearEnv = function(result, env) {
    var s = '<div[^>]*data-hide-env=(' + env + ').*?[^>]*>(.*?)</div>';
    //console.log(s);
    var re = new RegExp(s, 'g');

    return result.replace(re, '');
};

var clearOtherEnv = function(result, env) {
    var envList = [];
    var ruleEnv = '';

    list.forEach(function(item){
        if(item.env != env){
            envList.push(item.env);
        }        
    });

    ruleEnv = envList.join('|');

    var s = '<div[^>]*data-env=(' + ruleEnv + ').*?[^>]*>(.*?)</div>';
    //console.log(s);
    var re = new RegExp(s, 'g');

    return result.replace(re, '');
};
//端口替换
var portReplace = function() {
    //console.log('Replace');
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

                var result = data.replace(/(={1})((\.)?\/assets)/gi, '$1' + currUrl);

                result = result.replace(/(\.)?\/static\//gi, currUrl + '/');

                result = result.replace(/<configBaseUrl>/g, baseUrl);
                result = result.replace(
                    /static\.tcy365\.com\:2505/g,
                    'staticpre.tcy365.com:2505'
                );

                result = result.replace(
                    /static\.tcy365\.com\:2506/g,
                    'staticpre.tcy365.com:2506'
                );

                result = clearEnv(result, obj.env);
                result = clearOtherEnv(result, obj.env);

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
//拷贝项目
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
    // if (config.chunk) {
    //     replaceManifest();
    // }
};
