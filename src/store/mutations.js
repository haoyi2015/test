import {
    GET_LOCATION,
    GET_USERINFO,
    CHANGE_ORDERBY,
    CHANGE_CITY,
    CHANGE_RANGE,
    CHANGE_KEYWORD,
    CHANGE_AREA,
    LOADING,
    TOAST,
    ALERTS,
    CONFIRMS,
    CHANGE_GPSCITY,
    IS_LOGIN,
} from './mutation-types';

export default {
    [LOADING](state, loading) {
        state.loading = loading;
    },
    [TOAST](state, toast) {
        state.toast.push(toast);
    },
    [ALERTS](state, alerts) {
        state.alerts.push(alerts);
    },
    [CONFIRMS](state, confirms) {
        state.confirms.push(confirms);
    },
    [GET_LOCATION](state, {
        latitude,
        longitude,
     }) {
        state.location = [longitude, latitude];
    },
    [CHANGE_ORDERBY](state, orderBy) {
        state.orderBy = orderBy;
    },
    [CHANGE_CITY](state, city) {
        if (!city.name || !city.code) return;
        state.city = {
            name: city.name,
            code: city.code,
        };
    },
    [CHANGE_GPSCITY](state, gpscity) {
        if (!gpscity.name || !gpscity.code) return;
        state.gpscity = {
            name: gpscity.name,
            code: gpscity.code,
        };
    },
    [GET_USERINFO](state, userinfo) {
        state.userInfo = userinfo;
    },
    [CHANGE_KEYWORD](state, keyword) {
        state.keyword = keyword;
    },
    [CHANGE_AREA](state, area) {
        state.area = area;
    },
    [CHANGE_RANGE](state, range) {
        state.range = range;
    },
    [IS_LOGIN](state, range) {
        state.islogin = range;
        return state.islogin
    }
};

