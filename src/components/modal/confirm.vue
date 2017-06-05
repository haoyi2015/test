<template>
    <modal-box :maskbg="maskbg">
        <div class="app-confirm">
            <div class="app-confirm-text">
                {{text}}
            </div>
            <div class="app-confirm-button">
                <a href="javascript:;" @click="cancel">取消</a>
                <a href="javascript:;" @click="confirm">确定</a>
            </div>
            
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
            cancelCallback: {
                type: Function,
            },
            confirmCallback: {
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
            cancel() {
                this.$emit('cancel');
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
            },
            confirm() {
                this.$emit('confirm');
                if (this.confirmCallback) {
                    this.confirmCallback();
                }
            },
        },
    };

</script>

<style scoped>
    .app-confirm{
        font-size: .6rem;
        color: #000;
        background: #fff;
        border-radius: .2rem;
        @util size(10.2rem, auto);
        .app-confirm-text,
        a{
            padding: .4rem 0;
            text-align: center;
        }
        .app-confirm-text{
            padding: .8rem .5rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .app-confirm-button{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: 100%;
            a{
                flex: 1;
                box-flex: 1;
                color: #00aeef;
                border-right: 1px solid rgba(0,0,0,.1);
                &:last-child{
                    border-right: 0;
                }
            }
        }
    }
</style>
