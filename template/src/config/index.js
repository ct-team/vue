export default {
    assetsPublicPath: './', // 只能为 ‘/’ 或 ‘./’
    baseUrl: '//static.tcy365[webport]', //项目资源根目录 [webport] 后缀标识符 默认不修改
    appUrl: '/mobile/test/20180821/', //项目路径  如   /mobile/test/
    list: [
        { title: '1505-stable', webPort: '.org:1505' },
        { title: '1507-test', webPort: '.org:1507' },
        { title: '1506-develop', webPort: '.org:1506' },
        { title: '2505-pre', webPort: '.com:2505' },
        { title: '80-static', webPort: '.com' }
    ]
};
