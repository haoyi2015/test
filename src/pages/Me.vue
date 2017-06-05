<template>
<div class="userCenterPage app-page">
    <app-header>
        个人中心
    </app-header>
    <app-layout>
        <div class="userPhoto">
            <img :src="userData.headimgurl" alt="">
            <div>{{userData.mobile}}</div>
            <span>{{userData.nickname}}</span>
        </div>
        <section class="myMenu" v-if="false">
            <item-cell bottomLine>
                <i class="icon-jdxq_btn_xiangqing menuIcon checkinHistory"></i>
                住店历史
            </item-cell>
            <item-cell bottomLine>
                <i class="icon-grzx_icon_kefurexian menuIcon hotLine"></i>
                客服热线
            </item-cell>
            <item-cell bottomLine>
                <i class="icon-grzx_icon_shuime menuIcon aboutUs"></i>
                关于睡么
            </item-cell>
        </section>
        <section class="myVipList" v-if="hotelList.length>=1">
            <hotel-vip-list v-for="hotelVip in hotelList"
                    :hotelVip="hotelVip"
                    :key="hotelVip.hotelId"></hotel-vip-list>
        </section>
        <div class="noData" v-else>
            <i class="icon-scjd_icon_wujiudian"></i>
            没有找到相关酒店数据～
        </div>
    </app-layout>
    <!-- <app-footer>
        <router-link class="findHotel" to="/">去找酒店</router-link>
    </app-footer> -->
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader';
import ItemCell from '../components/ItemCell';
import AppLayout from '../components/AppLayout';
import AppFooter from '../components/AppFooter';
import HotelVipList from '../components/HotelVipList';

var services = require('../service/index');
var util = require('../common/util');

export default {
    components: {
        AppHeader,
        ItemCell,
        AppLayout,
        AppFooter,
        HotelVipList
    },
    data() {
        return {
            hotelList:[],
            userData: util.getStore('m28')
        };
    },
    methods: {
        setUserInfo() {
            var data = {},
                parm = {
                    openId: util.getStore('mOpend'),version:0
                };
            this.$parent.loading(true);
            services.fetchUnionMemberCenter(parm).then((res) => {
                if (res.success) {
                    if (res.result!=null&&res.result.hotelInfoList) {
                        this.hotelList = res.result.hotelInfoList;
                    } 
                }else {
                    this.$parent.tip('未找到相关数据～');
                }
                this.$parent.loading(false);
            });
        }
    },
    mounted() {
        this.setUserInfo();
    }
};
</script>

<style scoped>
@import "../style/postcss/_var.css";

.userCenterPage{
    background-color: #eaeaea;
}

.userPhoto{
    text-align: center;
    margin-bottom: .5rem;
    line-height: 1;
    img{
        border: 1px solid #ccc;
        border-radius: 50%;
        @util size(3rem);
    }
    div{
        margin-top: .3rem;
        font-size: .8rem;
        color: $color_general;
    }
    span{
        font-size: .6rem;
        color: #767676;
    }
}

.myMenu{
    a{
        padding: .4rem 0;
    }
    .menuIcon{
        display: inline-block;
        font-size: .9rem;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        line-height:1.7rem;
        margin-right: .3rem;
        @util size(1.7rem);
    }
    .checkinHistory{
        background-color: #9990E3;
    }
    .hotLine{
        font-size: 1rem;
        background-color: #8ACC27;
    }
    .aboutUs{
        background-color: #F43545;
    }
}

.findHotel{
    margin: .4rem 0;
    font-size: .8rem;
    border-radius: .3rem;
    line-height: 2rem;
    text-align: center;
    color: $color_contain_bg;
    background-color: $color_btn_bg;
    @util center-block;
    @util size(90%, 2rem);
}
.myVipList{
    background: #fff;
    clear: both;
}
.noData{
    font-size: .6rem;
    color: #999;
    text-align:center;
    @util center;
    i{
        color: #bbb;
        display: block;
        font-size: 3rem;
        margin-bottom: .4rem;
    }
}
</style>
