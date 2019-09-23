/**
 * 域名：考虑到一个项目接口存在多个域名的情况，所以需要额外配置各个环境的域名
 */
function getDomain(num) {
    const obj = {
        // 本地模拟数据
        0: {
            userDomain: 'http://yapi.tcy365.org:3000/mock/677'
        },
        1505: {
            userDomain: ''
        },
        1506: {
            userDomain: ''
        },
        1507: {
            userDomain: ''
        },
        2505: {
            userDomain: ''
        },
        80: {
            userDomain: ''
        }
    };

    return obj[num];
}

/**
 * 接口：得到接口列表对象
 */
function Interface(n) {
    return {
        // * user
        userList: getDomain(n).userDomain + '/api/user/list' // 用户列表
    };
}

export default Interface;
