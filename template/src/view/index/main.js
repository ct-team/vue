import Vue from 'vue';
import router from '@/router/index';
import Http from '@/assets/js/http.js';
import '../../assets/css/reset.css';
import {Cell, Group, LoadingPlugin} from 'vux';
import app from './APP';
Vue.use(LoadingPlugin);
Vue.component('cell', Cell);
Vue.component('group', Group);
Http.initHttp(Vue);

new Vue({
    el: '#app',
    router,
    components: {
        app
    }
});
