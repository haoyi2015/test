import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { getStore, setStore } from '../common/util';

Vue.use(Vuex);
const defautCity = getStore('defautCity');

const state = {
    location: null,
    city: defautCity,
    selectCity: null,
    userInfo: null, // 用户信息,
    orderBy: '0',
    keyword: '',
    area: null,  // 位置
    loading: {},
    toast: [],
    alerts: [],
    confirms: [],
    range: null, // 距离
    gpscity: {},
};


const storeState = store => {
    store.subscribe((mutation) => {
        if (mutation.type === 'CHANGE_CITY') {
            setStore('defautCity', mutation.payload);
        }
    });
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [storeState],
});
