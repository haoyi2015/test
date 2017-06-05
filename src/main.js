// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router/router';
import store from './store/';
import './common/rem';
import * as filters from './filters';
import './common/widget-myDialog';


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => { FastClick.attach(document.body); }, false);
}

Vue.config.productionTip = true;

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
