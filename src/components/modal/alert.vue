<template>
    <modal-box :maskbg="maskbg">
        <div class="app-alert">
            <div>
                {{text}}
            </div>
            <a href="javascript:;" @click="click">确定</a>
        </div>
    </modal-box>
</template>

<script>
    import ModalBox from './index';

    export default {
        props: {
            text: {
                type: String,
                default: '加载中...',
            },
            maskbg: {
                type: String,
                default: 'transparent',
            },
            callback: {
                type: Function,
            },
        },
        data() {
            return {

            };
        },
        components: {
            ModalBox,
        },
        methods: {
            click() {
                this.$emit('click');
                if (this.callback) {
                    this.callback();
                }
            },
        },
    };

</script>

<style scoped>
    .app-alert{
        font-size: .6rem;
        color: #000;
        background: #fff;
        border-radius: .2rem;
        @util size(10.2rem, auto);
        div,
        a{
            padding: .4rem 0;
            text-align: center;
        }
        div{
            padding: .8rem .5rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
        }
        a{
            display: block;
            color: #00aeef;
        }
    }
</style>
