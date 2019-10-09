import Vue from 'vue';
import VueRouter from 'vue-router';

const User = () => import('@/pages/index/user');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: User
    },
    {
        path: '/user',
        component: User
    }
    // ,
    // // 404配置
    // {
    //     path: '*',
    //     component: ''
    // }
];

// router实例 在此处可配置滚动行为 scrollBehavior
const router = new VueRouter({
    routes: routes
});

export default router;
