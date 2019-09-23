/**
 * user 用户列表接口
 */
export default (self, options) => {
    return new Promise((resolve, reject) => {
        self.$nat.http
            .ajax({
                url: self.$Interface.userList,
                method: 'get',
                ...options
            })
            .then(res => {
                return resolve(res);
            })
            .catch(e => {
                return reject(e);
            });
    });
};
