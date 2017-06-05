import Vue from 'vue';
import Router from 'vue-router';

/* eslint-disable */
// last param for chunk name
const Index = r => require.ensure([], () => r(require('../pages/Index.vue')), 'index');
const City = r => require.ensure([], () => r(require('../pages/City.vue')), 'city');
const History = r => require.ensure([], () => r(require('../pages/History.vue')), 'history');
const Hotel = r => require.ensure([], () => r(require('../pages/Hotel.vue')), 'hotel');
const Me = r => require.ensure([], () => r(require('../pages/Me.vue')), 'me');
const Search = r => require.ensure([], () => r(require('../pages/Search.vue')), 'search');
const Calendar = r => require.ensure([], () => r(require('../pages/Calendar.vue')), 'calendar');
const Facility = r => require.ensure([], () => r(require('../pages/Facility.vue')), 'facility');
const Interest = r => require.ensure([], () => r(require('../pages/Interest.vue')), 'interest');
const Bundling = r => require.ensure([], () => r(require('../pages/Bundling.vue')), 'bundling');
/* eslint-enable */

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
        },
        {
            path: '/city',
            name: 'city',
            component: City,
        },
        {
            path: '/hotel/:id',
            name: 'hotel',
            component: Hotel,
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
        },
        {
            path: '/history',
            name: 'history',
            component: History,
        },
        {
            path: '/me',
            name: 'me',
            component: Me,
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
        },
        {
            path: '/facility/:id',
            name: 'facility',
            component: Facility,
        },
        {
            path: '/interest',
            name: 'interest',
            component: Interest,
        },
        {
            path: '/bundling/:openid/:hotelId',
            name: 'bundling',
            component: Bundling,
        }
    ],
});
