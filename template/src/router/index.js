import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/pages/index/index.vue';
import Result2 from '@/pages/index/result2';

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
    },
    {
        path: '/result2',
        component: Result2
    }

];

export default new VueRouter({
    routes
});
