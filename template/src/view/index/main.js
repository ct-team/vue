import Vue from 'vue';
import router from '@/router/index';
import Http from '@/assets/js/http.js';
import '../../assets/css/reset.css';
import {Cell, Group, LoadingPlugin} from 'vux';
import app from './APP';

var $path = document.querySelector('meta[name="AppPublic"]');

// eslint-disable-next-line
__webpack_public_path__ = $path ? $path.getAttribute('content') : './';

Vue.use(LoadingPlugin);
Vue.component('cell', Cell);
Vue.component('group', Group);
Http.initHttp(Vue);

new Vue({
    el: '#app',
    router,
    render: h => h(app)
});
