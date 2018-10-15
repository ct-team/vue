import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/pages/index/index.vue';
//import Result from '@/pages/index/result';
const Result = resolve => require(['@/pages/index/result'], resolve);

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/result',
        component: Result
    }
];

export default new VueRouter({
    routes
});
