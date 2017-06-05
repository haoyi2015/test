<template>
    <div>
        <transition name="router-fade" mode="out-in">
            <router-view> </router-view>
        </transition>
        <app-modal></app-modal>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';
    import AppModal from './components/AppModal';
    import { getCoords } from './common/lbs';
    import { exchangeLocation } from './service/';

    export default {
        data() {
            return {
            };
        },
        computed: {
            ...mapState([
                'toast',
            ]),
            ...mapGetters([
                'cityCode',
            ]),
        },
        components: {
            AppModal,
        },
        methods: {
            ...mapMutations([
                'LOADING',
                'TOAST',
                'ALERTS',
                'CONFIRMS',
                'GET_LOCATION',
                'CHANGE_CITY',
                'CHANGE_GPSCITY',
            ]),
            loading(isShow, text) {
                this.LOADING({ show: isShow, text: text || '加载中...' });
            },
            tip(text, type) {
                // type  '' => 默认不传，显示普通提示，success => 显示成功（打勾）提示， error => 显示失败（打叉）提示
                if (!text) return;
                this.TOAST({ text, type });
                setTimeout(() => this.$store.state.toast.shift(), 2000);
            },
            alert(text, callback) {
                this.ALERTS({ text, callback });
            },
            confirm(text, confirm, cancel) {
                this.CONFIRMS({ text, confirm, cancel });
            },
            locate() {
                let vm = this;
                getCoords((coords) => {
                    let param = { longitude: coords.longitude, latitude: coords.latitude };
                    exchangeLocation(param)
                        .then(ress => {
                            let data = ress || {};
                            if (data && data.citycode && data.longitude) {
                                vm.GET_LOCATION({ longitude: data.longitude, latitude: data.latitude });
                                vm.CHANGE_CITY({ name: data.cityname, code: data.citycode });
                                vm.CHANGE_GPSCITY({ name: data.cityname, code: data.citycode });
                                vm.$router.push('/');
                            } else {
                                vm.$router.push('/city');
                            }
                        }, () => {
                            vm.GET_LOCATION({ longitude: '', latitude: '' });
                            if (!vm.cityCode) {
                                vm.CHANGE_CITY({ name: '', code: '' });
                                vm.$router.push('/city');
                            }
                        });
                }, () => {
                    vm.GET_LOCATION({ longitude: '', latitude: '' });
                    if (!vm.cityCode) {
                        vm.CHANGE_CITY({ name: '', code: '' });
                        vm.$router.push('/city');
                    }
                });
            },
        },
        mounted() {
            this.locate();
        },
    };

</script>
<style>
    @import './style/common.css';
    @import './style/postcss/animate.css';

    @import './assets/font/font-icon.css';
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
    @import './style/myDialog.css';
    @import './style/theme-day.css';
</style>
