<template>
  <div class="facilityPage app-page">
    <app-header>
        会员权益
    </app-header>
    <app-layout>
        <div class="facilityList" v-if="dataList.length>=1">
            <ul>
                <li class="app-table" v-for="item in dataList">
                    <div class="table-l"><i class="iconFacility icon-vip" :class="{'yk':item.level=='VIP1','jk':item.level=='VIP2','bjk':item.level=='VIP3','hk':item.level=='VIP4'}"></i>{{item.levelName}}</div>
                    <div class="table-r" style="word-wrap:break-word;word-break:break-all;">{{item.benefit}}</div>
                </li>
            </ul>
        </div>
        <div class="noData" v-else>
            <i class="icon-scjd_icon_wujiudian"></i>
            没有找到相关数据～
        </div>
    </app-layout>
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader';
import ItemCell from '../components/ItemCell';
import AppLayout from '../components/AppLayout';

var services = require('../service/index');
var util = require('../common/util');

export default {
    components: {
        AppHeader,
        ItemCell,
        AppLayout,
    },
    data() {
        return {
            hotelId: '',
            hotelInfo: {},
            dataList: []
        };
    },
    methods: {
    },
    mounted() {
        this.hotelId = this.$route.params.id;
        this.dataList = util.getStore('VipData');
    },
};
</script>

<style scoped>
    .facilityList{
        background-color: #fff;
        font-size: .6rem;
        .app-table{
            padding: .6rem;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            color: #6a6a6a;
            .table-l{
                width: 6rem;
                padding-right: 1rem;
                i{
                    margin-right: .3rem;
                }
            }
        }
        .app-table:last-child{
            border-bottom: 0;
        }
        .tag{
            font-size: .5rem;
            display: inline-block;
            border: 1px solid #616161;
            border-radius: .3rem;
            margin-right: .1rem;
            vertical-align: middle;
            @util padding(.1rem, .2rem);
            margin-bottom: .3rem;
            margin-right: .3rem;
        }
        .breakWord{
            word-break:break-all;
            word-wrap:break-word;
        }
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
