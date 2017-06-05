<template>
    <div class="hotel-item row" @click="pageToDetail()">
        <div class="item-image">

            <img v-if="!!hotelVip.hotelImg"
                 class="imgCover"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                 v-bind:style="{'backgroundImage': 'url(' + hotelVip.hotelImg + '?imageView/0/w/120)'}">
            <img v-else
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                 class="no-image">
        </div>
        <div class="col vipList">
            <ul class="hotel-info">
                <li>
                    <span class="info-name app-ellipsis">{{hotelVip.hotelName}}</span>
                </li>
                <li>
                    <label class="sign-shuime"><i class="vip-top icon-vip" :class="{'yk':hotelVip.levelName=='银卡','hk':hotelVip.levelName=='黑卡','bjk':hotelVip.levelName=='白金卡','jk':hotelVip.levelName=='金卡'}"></i><span class="ka">{{hotelVip.levelName}}</span></label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getHotelImage } from '../common/util';

var util = require('../common/util');

export default {
    props: {
        hotelVip: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        hotelImage(hotelVip) {
            let images = getHotelImage(hotelVip, 'facade');
            if (images.length) {
                return images[0];
            }
            return '';
        },
        pageToDetail() {
            this.setHotelCache();
            this.$router.push(`/hotel/${this.hotelVip.hotelId}`);
        },
        //点击后数据缓存，用于显示详情页，因为查询接口返回了全部的数据了
        setHotelCache() {
            if (!this.hotelVip) {
                return;
            }
            util.setStore('hotelDetail', this.hotelVip);
        },
    },
    created() {
        this.hotelVip.hotelImg = this.hotelImage(this.hotelVip.pics);
    },
    mounted() {
    },
};
</script>

<style scoped>
@import "../style/postcss/_var.css";
$item_height:4rem;
.hotel-item {
    height: 4.5rem;
    padding: .25rem .25rem .25rem 0;
    border-bottom: 1px solid $color_line;
    &:active {
        background-color: #e1e1e1;
        /*left: 1px;
        top: 1px;*/
        position: relative
    }
    .item-image {
        padding-left: .25rem;
        img {
            @util size($item_height, $item_height);
        }
    }
    .no-image {
        width: 100%;
        max-width: 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(../assets/images/hotel_noimg.jpg);
    }
    .hotel-info {
        margin-left: .55rem;
        height: 4.1rem;
        >li {
            line-height: 1;
        }
        .info-name {
            font-size: .7rem;
            vertical-align: middle;
        }
        .info-tag,
        .info-distance,
        .sign-shuime {
            font-size: .45rem;
            color: $color_tag;
            vertical-align: middle;
        }
        .sign-shuime {
            .vip-top{
                position: relative;
                top: .1rem;
            }
            span {
                margin-left: .15rem;
                color: #ED5252;
                border: 1px solid #ED5252;
                border-radius: 0.15rem;
                padding: .115rem 0.1rem .1rem .1rem;
                height: .65rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
        .info-tag {
            border: 1px solid $color_line;
            border-radius: 0.15rem;
            padding: .1rem 0.1rem;
            display: inline-block;
        }
        .info-stars {
            font-size: .48rem;
            .star {
                letter-spacing: 0.07rem;
                color: $color_line;
            }
        }
    }
    .vipList{
        .sign-shuime{
            .ka{
                border: 0;
                color: #000
            }
        }
    }
}
</style>
