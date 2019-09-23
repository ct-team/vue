let codeObj = {}; // code对象
const codeArr = []; // 除了default和notExit的code数组
let codeConst = {}; // code常量
let codeMsgConst = {}; // code常量对应的msg信息
let codeData = {}; // code对象中的data对象

function initCode() {
    Object.keys(codeObj).forEach(function(key) {
        if (key !== 'default' && key !== 'notExit') {
            codeArr.push(key);
        }
        const value = codeObj[key].code;
        const msg = codeObj[key].msg;
        const data = codeObj[key].data;

        codeConst = Object.assign({}, codeConst, {
            [key]: value
        });
        codeMsgConst = Object.assign({}, codeMsgConst, {
            [key]: msg
        });
        codeData = Object.assign({}, codeData, {
            [value]: data
        });
    });
    // codeConst = {SUCCESS: 0, NOT_LOGIN: 1001}
    // codeMsgConst = {SUCCESS: '成功', NOT_LOGIN: '未登录'}
    // codeData = { SUCCESS: { txt1: 'test' } }
}

/**
 * @function 得到Code未约定以及Code不存在的操作
 * @return
 * 1、如果Code不存在，返回为空；
 * 2、如果Code不在约定范围，返回为默认的提示或者自定义的提示；
 * 3、如果Code在约定的范围内，返回未true
 */
function codeError(errCode, tip) {
    if (!errCode && errCode !== codeConst.success) {
        console.log(codeMsgConst.notExit);
        return;
    }
    const matchCode = codeArr.find(val => {
        return val.code === errCode;
    });

    if (!matchCode) {
        return tip || codeMsgConst.default;
    }
    return true;
}

/**
 * @function 得到Code常量对应的Data信息对象
 * @return {Object}
 */
function getCodeData(name) {
    return codeData[name];
}

/**
 * @function 得到Code常量对应的提示信息对象
 * @return {Object}
 */
function getCodeMsgConst() {
    return codeMsgConst;
}

/**
 * @function 得到Code常量对象
 * @return {Object}
 */
function getCodeConst() {
    return codeConst;
}

/**
 * @function setDefaults
 * @param  {Object} t {description}
 * 设置默认参数
 */
const setDefaults = function(obj) {
    codeObj = Object.assign({}, codeObj, obj);
    initCode();
};

export default {
    setDefaults,
    getCodeConst,
    getCodeMsgConst,
    getCodeData, // 暂未使用
    codeError
};
