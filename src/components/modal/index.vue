<template>
    <div class="app-modal fadeIn" :style="{'backgroundColor' : maskbg } ">
        <div class="app-modal-box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            maskbg: {
                type: String,
                default: 'rgba(0,0,0,.6)',
            },
        },
        data() {
            return {
            };
        },
        components: {
        },
    };
</script>

<style>
    .app-modal{
        z-index: 99998;
        @util position(fixed, 0, 0, 0, 0);
        .app-modal-box{
            @util center;
            z-index: 99999;
        }
    }
</style>
