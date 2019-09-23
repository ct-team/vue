import Interface from '@/api/interface';

export default {
    // 本地 使用YApi
    isLocal: {
        type: '8013',
        data: {
            home: '',
            ...Interface(0)
        }
    },
    is1505: {
        type: 'org:1505',
        data: {
            home: '',
            ...Interface(1505)
        }
    },
    is1506: {
        type: 'org:1506',
        data: {
            home: '',
            ...Interface(1506)
        }
    },
    is1507: {
        type: 'org:1507',
        data: {
            home: '',
            ...Interface(1507)
        }
    },
    isPre: {
        type: 'lycpspre.tcy365.com',
        data: {
            home: '',
            ...Interface(2505)
        }
    },
    isRelease: {
        type: 'lycps.tcy365.com',
        data: {
            home: '',
            ...Interface(80)
        }
    }
};
