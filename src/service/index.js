import fetch from '../common/fetch';
import config from '../config/config';

const hotelQuery = (params) => {
    let url = `${config.apiHost}search/hotel/query`;
    return fetch('GET', url, params);
};

const locationQuery = (params) => {
    let url = `${config.apiHost}search/pos/area`;
    return fetch('GET', url, params);
};

const cityQuery = (params) => {
    let url = `${config.apiHost}search/pos/citylist`;
    return fetch('GET', url, params);
};

const wechatConfig = (params) => {
    let url = `${config.weixinHost}api/getSignature`;
    return fetch('GET', url, params);
};

const exchangeLocation = (params) => {
    let url = `${config.weixinHost}api/getCallbackCity`;
    return fetch('GET', url, params);
};

const getVerifyCode = (params) => {
    let url = `${config.unapiHost}message/verifycode/send`;
    return fetch('GET', url, params);
}

const fetchUnionMemberRights = (params) => {
    let url = `${config.unapiHost}unionMember/fetchUnionMemberRights`;
    return fetch('GET', url, params);
}

const fetchUnionMemberCenter = (params) => {
    let url = `${config.unapiHost}unionMember/fetchUnionMemberCenter`;
    return fetch('GET', url, params);
}

const login = (params) => {
    let url = `${config.unapiHost}weixin/weixinRegMember`;
    return fetch('GET', url, params);
}

const regCard = (params) => {
    let url = `${config.unapiHost}weixin/weixinRegMember2`;
    return fetch('get', url, params);
}

const regLogin = (par) => {
    let url = `${config.unapiHost}`
}

export {
    hotelQuery,
    locationQuery,
    cityQuery,
    wechatConfig,
    exchangeLocation,
    getVerifyCode,
    fetchUnionMemberRights,
    fetchUnionMemberCenter,
    login,
    regCard
};

