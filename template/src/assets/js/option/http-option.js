import Vue from 'vue';

// 全局请求拦截器
const requestInterceptor = function(res) {
    Vue.$vux.loading.show();
};

// 全局响应成功拦截器
const interceptorSuccess = function(res) {
    Vue.$vux.loading.hide();
};

// 全局响应失败拦截器'
const interceptError = function(res) {
    Vue.$vux.loading.hide();
};

export default {
    interceptError: interceptError,
    interceptorSuccess: interceptorSuccess,
    requestInterceptor: requestInterceptor,
    timeout: 20000
};
