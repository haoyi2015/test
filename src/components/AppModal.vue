<template>
    <div>
        <app-loading :show="loading.show" :text="loading.text" :maskbg="loading.maskbg"></app-loading>
        <app-toast v-for="t in toast" :key="t.text" :text="t.text" :type="t.type"></app-toast>
        <app-alert v-for="a in alerts" :key="a.text" :text="a.text" :maskbg="'rgba(0,0,0,.5)'" @click="click(a.callback)"></app-alert>
        <app-confirm v-for="c in confirms" :key='c.text' :text="c.text" :maskbg="'rgba(0,0,0,.5)'" @confirm="confirmFn(c.confirm)" @cancel="cancelFn(c.cancel)"></app-confirm>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import AppLoading from './modal/loading';
    import AppToast from './modal/toast';
    import AppAlert from './modal/alert';
    import AppConfirm from './modal/confirm';

    export default {
        data() {
            return {
            };
        },
        computed: {
            ...mapState([
                'loading',
                'toast',
                'alerts',
                'confirms',
            ]),
        },
        components: {
            AppLoading,
            AppToast,
            AppAlert,
            AppConfirm,
        },
        methods: {
            click(callback) {
                this.$store.state.alerts.pop();
                if (callback) {
                    callback();
                }
            },
            confirmFn(callback) {
                this.$store.state.confirms.pop();
                if (callback) {
                    callback();
                }
            },
            cancelFn(callback) {
                this.$store.state.confirms.pop();
                if (callback) {
                    callback();
                }
            },
        },
        mounted() {
        },
    };
</script>

<style>
</style>
