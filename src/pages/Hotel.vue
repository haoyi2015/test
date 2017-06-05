<template>
  <div class="hotelPage app-page">
    <app-header>
        {{hotelInfo.name}}
    </app-header>
    <app-layout>
        <div class="hotelImg">
            <swiper v-if="swiperSlides.length > 1" :options="swiperOption">
                <swiper-slide v-for="(slide, $index) in swiperSlides" :key="$index" style="width:100%;">
                    <img @click="doImagePreview($index)" class="imgCover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" v-bind:style="{'backgroundImage': 'url(' + slide + ')'}">
                </swiper-slide>
                <div class="swiper-pagination" style="display:none;" slot="pagination"></div>
            </swiper>
            <img v-else-if="swiperSlides.length == 1" @click="doImagePreview(0)" class="imgCover noImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" v-bind:style="{'backgroundImage': 'url(' + swiperSlides[0] + ')'}">
            <img v-else class="imgCover noImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=">
            <span class="tag" v-if="hotelInfo.alliance === 1">
                <i></i>已加入睡么酒店联盟，订房省更多！
            </span>
        </div>
        <section class="hotelMenu">
            <!-- <item-cell link bottomLine>
                <i class="icon-jdxq_icon_pingfen menuIcon"></i>
                <i class="star" v-bind:class="'star_' + ~~(hotelInfo.commentScore)"></i>
                {{hotelInfo.commentScore}}分
            </item-cell> -->
            <item-cell link bottomLine @click="pageToFacility()">
                <i class="icon-jdxq_btn_xiangqing menuIcon"></i>
                <!-- <span v-if="hotelInfo.showFacility && hotelInfo.showFacility.length" class="tag" v-for="facility in hotelInfo.showFacility" :key="facility">{{facility}}</span>
                <span v-if="!hotelInfo.showFacility || !hotelInfo.showFacility.length">暂无相关信息</span> -->
                <span>{{hotelInfo.introduction || '暂无相关信息'}}</span>
            </item-cell>
            <item-cell link bottomLine @click="pageToMap()">
                <i class="icon-jdxq_btn_daohang menuIcon"></i>
                {{hotelInfo.address || '暂无相关信息'}}
            </item-cell>
            <!-- <item-cell link bottomLine v-if="hotelInfo.telephone && hotelInfo.alliance !== 1" :href="'tel:' + hotelInfo.telephone">
                <i class="icon-grzx_icon_kefurexian menuIcon"></i>
                {{hotelInfo.telephone}}
            </item-cell> -->
            <item-cell link bottomLine @click="pageToInterests()">
                <i class="icon-vip menuIcon" :class="{'yk':vipList.memberLevelName=='银卡','hk':vipList.memberLevelName=='黑卡','bjk':vipList.memberLevelName=='白金卡','jk':vipList.memberLevelName=='金卡'}"></i>
                <span>{{vipList.memberLevelName}} <font class="bank-more">查看全部会员权益</font></span>
            </item-cell>
        </section>
        <section class="bankCont">
            <span>{{vipList.memberBenefit}}</span>
        </section>
    </app-layout>
    <app-footer class="bgColor" v-if="hotelInfo.telephone && hotelInfo.alliance === 1">
        <div class="hotelCall">
            <a :href="'tel:'+hotelInfo.telephone">
                <i class="icon-grzx_icon_kefurexian"></i>
                咨询睡么特惠价
            </a>
        </div>
    </app-footer>
    <image-preview :images.sync="swiperSlides" :start.sync="clickedImageIndex" :show.sync="isShowImgPreview" @click="hideImagePreview"></image-preview>
    <!-- <div class="vue-calendar-backdrop" v-if="calFlag"></div> -->
    <section class="fix-box-cal" v-if="calFlag">
        <calendar-box></calendar-box>
    </section>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import ItemCell from '../components/ItemCell';
import AppLayout from '../components/AppLayout';
import ImagePreview from '../components/ImagePreview';
import CalendarBox from '../pages/Calendar.vue';

var services = require('../service/index');
var util = require('../common/util');

export default {
    components: {
        AppHeader,
        ItemCell,
        AppLayout,
        AppFooter,
        swiper,
        swiperSlide,
        ImagePreview,
        CalendarBox
    },
    data() {
        return {
            hotelId: '',
            hotelInfo: {},
            mapLink: '',
            calFlag: false,
            swiperOption: {
                notNextTick: false,
                loop: true,
                autoplay: 3500,
                setWrapperSize: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                mousewheelControl: true,
                observeParents: true,
            },
            swiperSlides: [],
            clickedImageIndex: 1,
            isShowImgPreview: false,
            vipData: [],
            vipList: {}
        };
    },
    computed: {
        ...mapState([
            'location',
        ]),
    },
    methods: {
        setHotelInfo(fn) {
            var data = {};
            this.$parent.loading(true);
            services.hotelQuery({ id: this.hotelId }).then((res) => {
                if (res.success) {
                    data = res.result.items;
                    if (data.length) {
                        this.hotelInfo = data[0];
                        if (fn) {
                            fn();
                        }
                    } else {
                        this.$parent.tip('未找到相关数据～');
                    }
                } else {
                    this.$parent.tip(res.msg);
                }
                this.$parent.loading(false);
            });
        },
        getHotelInfo(fn) {
            var hotelInfo = util.getStore('hotelDetail');
            if (hotelInfo) {
                this.hotelInfo = hotelInfo;
                if (fn) {
                    fn();
                }
            } else {
                this.setHotelInfo(fn);
            }
        },
        setHotelFacility(limit) {
            var previewHotelList = [];
            limit = limit || 4;
            if(this.hotelInfo.facilities){
                if (this.hotelInfo.facilities.length <= limit) {
                    previewHotelList = this.hotelInfo.facilities;
                } else {
                    previewHotelList = this.hotelInfo.facilities.slice(0, limit);
                }
                this.hotelInfo.showFacility = previewHotelList;
            }
        },
        setHotelCache() {
            if (!this.hotelInfo) {
                return;
            }
            util.setStore('hotelDetail', this.hotelInfo);
        },
        pageToFacility() {
            this.$router.push(`/facility/${this.hotelId}`);
        },
        pageToInterests() {
            this.hotelId = this.$route.params.id;
            this.setVipInfo(true);
        },
        getMapLink(args) {
            var param = [];
            var linkParam = '';
            var url = 'http://m.amap.com/navi/';
            if (!args.dest) {
                return '';
            }
            args = args || {};
            args.naviBy = 'car';
            args.key = '3fa67c4e45505b429c4bf056773071d8';
            Object.keys(args).forEach((key) => {
                if (args[key]) {
                    param.push(`${key}=${args[key]}`);
                }
            });
            linkParam = param.join('&');
            return `${url}?${linkParam}`;
        },
        pageToMap() {
            if (!this.mapLink) return;
            window.location.href = this.mapLink;
        },
        doImagePreview(index) {
            var vm = this;
            // this.$parent.tip(index);
            if (typeof window.WeixinJSBridge !== 'undefined') {
                window.WeixinJSBridge.invoke('imagePreview', { current: vm.swiperSlides[index], urls: vm.swiperSlides });
            } else {
                this.clickedImageIndex = index;
                this.isShowImgPreview = true;
            }
        },
        hideImagePreview() {
            this.isShowImgPreview = false;
        },
        calendarPoup() {//日历
            this.calFlag = true;
        },
        //初始化开始时间和结束时间
        detaTime(startTime,endTime){
            console.log(startTime, endTime, 1);
            var vm=this,
                _startTime=null,
                _endTime=null;
            if(!startTime || !endTime){
                var curTime=new Date(),
                    // curHour=curTime.getHours(),
                    period = curTime.getHours() + curTime.getMinutes()/60;
                if (period > 0 && period < 1.5) {
                    _startTime=new Date((curTime.getTime()/1000-86400*1)*1000);
                    _endTime=new Date(curTime);
                }else{
                    _startTime=new Date(curTime);
                    _endTime=new Date((curTime.getTime()/1000+86400*1)*1000);
                }
                startTime=widgetDate._dateToStr(_startTime, 'yyyyMMdd', true);
                endTime=widgetDate._dateToStr(_endTime, 'yyyyMMdd', true);
            }else{
                _startTime=widgetDate._plainDate(startTime);
                _endTime=widgetDate._plainDate(endTime);
            }
            vm.days=widgetDate._diff(_startTime, _endTime, 'd') || 1;
        },
        setVipInfo(s) {//会员权益
            var data = {},
                parm = {
                    hotelId: this.hotelId,memberId: 5,version:0
                };
            this.$parent.loading(true);
            services.fetchUnionMemberRights(parm).then((res) => {
                if (res.success) {
                    data = res.result.settingList;
                    this.vipList =res.result;
                    if (data) {
                        this.vipData = data;
                    } else {
                        this.vipData = [];
                        //this.$parent.tip('未找到相关数据～');
                    }
                    util.setStore('VipData', this.vipData);
                    if(s){
                        this.$router.push(`/interest`);
                    }
                } else {
                    this.$parent.tip(res.msg);
                }
                this.$parent.loading(false);
            });
        }
    },
    mounted() {
        this.hotelId = this.$route.params.id;
        this.getHotelInfo(() => {
            this.setHotelCache();
            this.swiperSlides = util.getHotelImage(this.hotelInfo.pics, '');
            this.setHotelFacility();
            this.mapLink = this.getMapLink({
                start: this.location ? this.location.join(',') : '',
                dest: (this.hotelInfo.longitude && this.hotelInfo.latitude) ? `${this.hotelInfo.longitude},${this.hotelInfo.latitude}` : '',
                destName: this.hotelInfo.name,
            });
            // console.log(JSON.stringify(this.hotelInfo));
        });
        this.setVipInfo(false);
    },
    created() {
    },
    beforeDestroy() {
    },
};
</script>

<style scoped>
    @import "../style/postcss/_var.css";
    .hotelImg{
        position: relative;
        @util size(100%, 10rem);
        img{
            height: inherit;
        }
        .tag{
            font-size: .7rem;
            color: #fff;
            display: block;
            line-height:1rem;
            vertical-align: middle;
            z-index: 2;
            background-color: $color_cover_bg;
            @util position(absolute, null, 0, 0 0);
            @util padding(.4rem, .6rem);
            i{
                display: inline-block;
                vertical-align: middle;
                border: 1px solid #fff;
                overflow: hidden;
                background-image: url('../assets/images/logo_l.png');
                background-position:center;
                background-repeat: no-repeat;
                background-size: 100%;
                @util size(.7rem);
            }
        }
    }

    .hotelMenu{
        .menuIcon{
            font-size: .7rem;
            margin-right: .4rem;
        }
        .star{
            font-size: .6rem;
            &:after{
                color: #e1e1e1;
                letter-spacing: .2rem;
            }
            &:before{
                letter-spacing: .2rem;
            }
        }
        .tag{
            font-size: .5rem;
            display: inline-block;
            border: 1px solid $color_tag_border;
            border-radius: .3rem;
            margin-right: .1rem;
            vertical-align: middle;
            @util padding(.1rem, .2rem);
        }
    }
    
    .hotelCall{
        width: 100%;
        padding: .4rem 0;
        background-color: $color_header_bg;
        a{
            display: block;
            font-size: .8rem;
            border-radius: .3rem;
            line-height: 2rem;
            text-align: center;
            color: $color_contain_bg;
            background-color: $color_btn_bg;
            @util center-block;
            @util size(90%, 2rem);
            i{
                font-size: .8rem;
                line-height: 1rem;
                color: inherit;
                display: inline-block;
                border: 1px solid $color_contain_bg;
                border-radius: 50%;
                padding: .1rem;
                @util size(1.2rem);
            }
        }
    }

    .swiper-container{
        @util size(100%, 10rem);
        .swiper-slide{
            img{
                height: inherit;
            }
        }
    }

    .noImage{
        @util size(100%, 10rem);
        background-image: url('../assets/images/hotel_noimg.jpg');
    }
    .bank-more{
        float: right;
        color: #8E8E8E;
        font-size: 0.6rem
    }
    .bankCont{
        span{
            color: #8E8E8E;
            font-size: 0.6rem;
        }
        padding: 0.3rem 0.5rem;
    }
    .fix-box-cal{
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 75%;
        overflow: hidden;
        z-index: 1000;
        font-size: .3rem;
        z-index: 99999;
        max-height: 9999px;
        overflow-y: auto;
    }
    .vue-calendar-backdrop{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.7);
        z-index: 999;
    }
</style>
