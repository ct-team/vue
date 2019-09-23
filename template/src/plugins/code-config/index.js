import codeConfig from './code-config';

codeConfig.install = function(Vue, opts) {
    const arr = ['$nat', '$natCode', '$natCodeMsg', '$natCodeIsExit'];

    arr.forEach((item) => {
        if (!Vue[item]) {
            Vue[item] = {};
        }
    });
    codeConfig.setDefaults(opts);
    Vue.$nat.codeConfig = codeConfig;
    Vue.prototype.$nat = Vue.$nat;
    Vue.prototype.$natCode = codeConfig.getCodeConst(); // 得到code对应的常量
    Vue.prototype.$natCodeMsg = codeConfig.getCodeMsgConst(); // 得到code对应的常量信息
    Vue.prototype.$natCodeError = codeConfig.codeError; // code错误处理
};

export default codeConfig;
