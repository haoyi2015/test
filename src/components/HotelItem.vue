<template>
    <div class="hotel-item row" @click="pageToDetail()">
        <div class="item-image">
            <img v-if="!!hotel.mainImage"
                 class="imgCover"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                 v-bind:style="{'backgroundImage': 'url(' + hotel.mainImage + '?imageView/0/w/120)'}">
            <img v-else
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                 class="no-image">

        </div>
        <div class="col">
            <ul class="hotel-info">
                <li>
                    <span class="info-name app-ellipsis">{{hotel.name}}</span>
                </li>
                <li>
                    <label v-if="!!hotel.alliance"
                           class="sign-shuime"><i></i><span>睡么特惠</span></label>
                    <label v-else>&nbsp;</label>
                </li>
                <!--<li><span class="info-tag">免费无线</span><span class="info-tag"> 免费无线</span></li>-->
                <li>
                    <span class="info-distance">距您 {{hotel.distance | distance}}</span>
                </li>
                <li>
                    <span class="info-stars"><i :class="'icon-info-stars star_' + ~~(hotel.commentScore)"></i> {{hotel.commentScore}}分</span>
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
        hotel: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        hotelImage(hotel) {
            let images = getHotelImage(hotel, 'facade');
            if (images.length) {
                return images[0];
            }
            return '';
        },
        pageToDetail() {
            this.setHotelCache();
            this.$router.push(`/hotel/${this.hotel.id}`);
        },
        // 点击后数据缓存，用于显示详情页，因为查询接口返回了全部的数据了
        setHotelCache() {
            if (!this.hotel) {
                return;
            }
            util.setStore('hotelDetail', this.hotel);
        },
    },
    created() {
        this.hotel.mainImage = this.hotelImage(this.hotel.pics);
    },
    mounted() {
    },
};
</script>

<style scoped>
@import "../style/postcss/_var.css";
$item_height:4rem;
.hotel-item {
    height: $item_height;
    margin-bottom: .25rem;
    &:active {
        background-color: #e1e1e1;
        /*left: 1px;
        top: 1px;*/
        position: relative
    }
    .item-image {
        padding-left: $w_page_padding;
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
        border-bottom: 1px solid $color_line;
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
            i {
                display: inline-block;
                background: url(../assets/images/logo_l.png) no-repeat;
                background-size: cover;
                vertical-align: middle;
                @util size(.65rem, .65rem);
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
            .icon-info-stars {
                letter-spacing: 0.07rem;
                color: $color_line;
            }
        }
    }
}
</style>
