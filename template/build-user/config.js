module.exports = {
    version:'1.22.1',//(不用修改)
    chunk: true, //是否开启动态chunk
    check: true,//是否增加错误收集
    isHttps: false,//是否使用https true 的话1505 1507 2505资源将使用https资源地址
    appID: 'test', //项目服务代号（错误收集使用）
    appVersion:'1.0.0', //项目版本 会显示在页面meta内
    baseUrl: '//static.tcy365[webport]', //项目资源根目录 [webport] 后缀标识符 默认不修改
    appUrl: '/test/', //项目路径  如   /mobile/test/    
    /* px2rem: null,//px2rem 转换内容 如 { rootValue: 100 } 非rem项目 使用null */
    px2rem: {
        rootValue: 100, //比例
        selectorBlackList: ['vux','weui'] //不进行rem转换的样式
    },
    list: [
        { title: '1505-stable', webPort: '.org:1505', env: 1505 },
        { title: '1507-test', webPort: '.org:1507', env: 1507 },
        { title: '1506-develop', webPort: '.org:1506', env: 1506 },
        { title: '2505-pre', webPort: '.com:2505', env: 2505 },
        { title: '80-static', webPort: '.com', env: 80 }
    ],
    proxy: {
        '/api': {
            //印射为/api
            target: 'http://yapi.tcy365.org:3000/mock/123/', // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/api': '/api' //需要rewrite的,
            }
        }
    },
    host: 'localhost', // 测试版host
    port: 8013 // 测试版端口号
};
