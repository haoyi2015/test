<template>
    <div class="image-preview-component" v-show="show" @click="click">
        <div class="preview-warper">
            <swiper v-if="images.length > 1" :options="swiperOption">
                <swiper-slide v-for="slide in images" :key="slide" style="width:100%;">
                    <img :src="slide">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        var initSliderIndex = this.start;
        return {
            swiperOption: {
                notNextTick: false,
                loop: true,
                // autoplay: 3500,
                initialSlide: initSliderIndex,
                setWrapperSize: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                mousewheelControl: true,
                observeParents: true,
            },
        };
    },
    props: {
        images: {
            type: Array,
            default: [],
        },
        start: {
            type: Number,
            default: 1,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        click() {
            this.$emit('click');
        },
    },
    created() {
    },
    beforeDestroy() {
    },
};
</script>

<style scoped>
    .image-preview-component{
        background-color: rgba(0,0,0,0.9);
        z-index: 99;
        @util size(100%);
        @util position(fixed, 0, 0, 0, 0);
        .preview-warper{
            width: 100%;
            @util center;
            .swiper-wrapper{
                @util center;
                .swiper-slide{
                    text-align: center;
                    /*vertical-align: middle;*/
                    img{
                        max-width: 100%;
                        max-height: 100%;
                        margin: auto;
                    }
                }
            }
        }
    }
</style>
