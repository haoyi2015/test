<template>
    <modal-box v-if="show" :maskbg="maskbg">
        <div class="app-loading">
            <span class="app-loading-circle" :class="{'app-loading-notext': !text}"></span>
            <div class="app-loading-text" v-if="text">{{text}}</div>
        </div>
    </modal-box>
</template>

<script>
    import ModalBox from './index';

    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            text: {
                type: String,
                default: '加载中...',
            },
            maskbg: {
                type: String,
                default: 'transparent',
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
    .app-loading{
        color: #fff;
        background: rgba(0,0,0,.7);
        border-radius: .4rem;
        font-size: .6rem;
        @util size(3.6rem);
        position: relative;
        .app-loading-circle{
            display: block;
            border: .1rem solid #fff;
            border-radius: 50%;
            -webkit-animation: widget_gif 1s infinite linear;
            clip: rect(0 auto .6rem 0);
            margin-left: -.7rem;
            margin-top: -1.2rem;
            @util center;
            @util size(1.4rem);
            &.app-loading-notext{
                margin-top: -.7rem;
            }
        }
        .app-loading-text{
            color: #fff;
            font-size: .6rem;
            text-align: center;
            @util position(absolute, null, 0, .5rem, 0);
        }
    }
    @-webkit-keyframes widget_gif{0%{-webkit-transform:rotate(0deg);}100%{-webkit-transform:rotate(360deg);}}
</style>
