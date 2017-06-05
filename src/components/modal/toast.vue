<template>
    <modal-box :maskbg="maskbg">
        <div class="app-toast" :class="type">
            <i v-if="type === 'success'" class="icon-home_icon_gou"></i>
            <i v-if="type === 'error'" class="icon-home_btn_qingchu"></i>
            {{text}}
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
            type: {
                type: String,
                default: '',
            },
        },
        data() {
            return {

            };
        },
        components: {
            ModalBox,
        },
    };

</script>

<style scoped>
    .app-toast{
        font-size: .6rem;
        padding: .4rem .6rem;
        color: #fff;
        background: rgba(0,0,0,.7);
        border-radius: .2rem;
        &.success,
        &.error{
            padding-top: .5rem;
            padding-bottom: .5rem;
            i{
                font-size: .7rem;
                color: #fff;
                display: block;
                text-align: center;
                border: .07rem solid #fff;
                line-height: 1.5rem;
                margin: auto;
                margin-bottom: .4rem;
                border-radius: 100%;
                @util size(1.5rem);
            }
        }
    }
</style>
