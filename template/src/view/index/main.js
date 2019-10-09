import 'babel-polyfill';
import Vue from 'vue';
import app from './APP';
import router from '@/router';
// import store from  '@/store';
// import axios from 'axios';
import '@/assets/css/reset.css';
import '@/assets/js/path.js';
import '@/assets/js/fix-fastclick';

// Vue.prototype
import CODE from '@/config/code';

// 组件
import { LoadingPlugin, ToastPlugin } from 'vux';
import { Landscape, Http, EnvConfig } from 'nat';
import TopHeader from '@/components/top-header';
import CodeConfig from '@/plugins/code-config';

// 插件配置文件
import LandscapeOption from '@/assets/js/option/landscape-option';
import EnvOption from '@/assets/js/option/env-option';
import HttpOption from '@/assets/js/option/http-option';

// vux
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);

// 组件注册
Vue.use(Landscape, LandscapeOption);
Vue.use(Http, HttpOption);
Vue.use(EnvConfig, EnvOption);
Vue.use(TopHeader);
Vue.use(CodeConfig, CODE);

// axios设置：解决跨域携带cookie的设置
// axios.defaults.withCredentials = true;

// Vue-prototype
Vue.prototype.$envData = Vue.$nat.envConfig.getData().data;

// -----------介绍code的使用方式，可删除----------
console.log('code值：' + Vue.prototype.$natCode.success);
console.log('code值提示信息：' + Vue.prototype.$natCodeMsg.success);
console.log('code值不存在，返回默认提示default对应的msg：' + Vue.prototype.$natCodeError(0));
console.log(
    'code值不存在，返回自定义对应的msg：' + Vue.prototype.$natCodeError(100001, '没有权限')
);
// vue单文件组件使用方式：
// this.$natCode.notLogin;
// this.$natCodeMsg.notLogin;
// this.$natCodeError(res.Code);
// this.$natCodeError(res.Code,'自定义文案提示信息');
// -----------介绍code的使用方式，可删除----------

new Vue({
    el: '#app',
    router,
    // store,
    render: h => h(app)
});
