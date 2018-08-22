import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

export default new vuex.Store({
    state: {
        userId: '',
        inputUserId: '',
        OpenId: '',
        UnionId: ''
    },
    getters: {
        isUserId(state) {
            return state.userId.length > 0;
        }
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id;
        },
        setInputUserId(state, id) {
            state.inputUserId = id;
        },
        setOpenId(state, id) {
            state.OpenId = id;
        },
        setUnionId(state, id) {
            state.UnionId = id;
        }
    }
});
