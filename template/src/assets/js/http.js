import axios from 'axios';

export default {
    initHttp(Vue) {
        axios.defaults.timeout = 5000;
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.interceptors.request.use(
            config => {
                if (config.method === 'post') {
                    config.data = {
                        ...config.data,
                        _t: Date.parse(new Date()) / 1000
                    };
                } else if (config.method === 'get') {
                    config.params = {
                        _t: Date.parse(new Date()) / 1000,
                        ...config.params
                    };
                }
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );
        Vue.prototype.$http = axios;
    }
};
