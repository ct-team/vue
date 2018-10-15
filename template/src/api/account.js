export function getLoadUserInfo(Vue, data) {
    const pargmTcyUserId = { TcyUserId: data };

    return Vue.$http.post(
        '/api/WeixinSilverRecharge/LoadUserInfo',
        pargmTcyUserId
    );
}
