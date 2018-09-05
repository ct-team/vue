import config from '@/config/index.js';

export default {
    getWebType: function() {
        const webPath = window.location.hostname;
        const port = window.location.port;
        const locationUrl = port === 80 ? webPath : webPath + ':' + port;
        const reUrl = config.list;

        for (let i = 0; i < reUrl.length; i++) {
            const item = reUrl[i].webPort;

            if (locationUrl.indexOf(item) >= 0) {
                return item;
            }
        }
        return '';
    },

    getImgSrc: function(src) {
        const reBase64 = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
        const webUrl = config.baseUrl + config.appUrl + 'assets/';
        const replaceUrl = webUrl.replace('[webport]', this.getWebType());
        let replaceUrl = webUrl.replace('[webport]', this.getWebType());

        replaceUrl = replaceUrl.replace(/static\.tcy365\.com\:2505/g, 'staticpre.tcy365.com:2505');
        if (reBase64.test(src) || this.getWebType() === '') {
            return src;
        }

        return src.replace(config.assetsPublicPath + 'assets/', replaceUrl);
    }
};
