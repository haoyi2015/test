<template>
  <div class="facilityPage app-page">
    <app-header>
        详情
    </app-header>
    <app-layout>
        <div class="facilityList">
            <div class="app-table app-table-top" v-if="hotelInfo.facilities && hotelInfo.facilities.length">
                <div>
                    <span class="app-table-pre"><i class="iconFacility icon-jdxq_btn_sheshi"></i>设施</span>
                </div>
                <div class="app-table-full">
                    <span class="breakWord">
                        <i class="tag" v-for="facility in hotelInfo.facilities" :key="facility">{{facility}}</i>
                    </span>
                </div>
            </div>
            <div class="app-table app-table-top" v-if="hotelInfo.introduction">
                <div>
                    <span class="app-table-pre"><i class="icoIntroduction icon-jdxq_btn_jieshao"></i>介绍</span>
                </div>
                <div class="app-table-full">
                    <span class="breakWord">
                        {{hotelInfo.introduction}}
                    </span>
                </div>
            </div>
            <div class="app-table app-table-top" v-if="hotelInfo.retentionTime || hotelInfo.defaultleaveTime">
                <div>
                    <span class="app-table-pre"><i class="iconPolicy icon-jdxq_btn_zhence"></i>政策</span>
                </div>
                <div class="app-table-full">
                    <span class="breakWord">
                        <div v-if="hotelInfo.retentionTime">最晚保留时间: {{hotelInfo.retentionTime}}</div>
                        <div v-if="hotelInfo.defaultleaveTime">默认离店时间: {{hotelInfo.defaultleaveTime}}</div>
                    </span>
                </div>
            </div>
        </div>
        <div class="noData" v-if="(!hotelInfo.facilities || (hotelInfo.facilities && !hotelInfo.facilities.length)) && !hotelInfo.retentionTime && !hotelInfo.defaultleaveTime && !hotelInfo.introduction">
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
        };
    },
    methods: {
        setHotelInfo() {
            var data = {};
            this.$parent.loading(true);
            services.hotelQuery({ id: this.hotelId }).then((res) => {
                if (res.success) {
                    data = res.result.items;
                    if (data.length) {
                        this.hotelInfo = data[0];
                        this.setHotelCache();
                    } else {
                        this.$parent.tip('未找到相关数据～');
                    }
                } else {
                    this.$parent.tip(res.msg);
                }
                this.$parent.loading(false);
            });
        },
        getHotelInfo() {
            var hotelInfo = util.getStore('hotelDetail');
            if (hotelInfo) {
                this.hotelInfo = hotelInfo;
            } else {
                this.setHotelInfo();
            }
        },
        setHotelCache() {
            if (!this.hotelInfo) {
                return;
            }
            util.setStore('hotelDetail', this.hotelInfo);
        },
    },
    mounted() {
        this.hotelId = this.$route.params.id;
        this.getHotelInfo();
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
            .app-table-pre{
                padding-right: .6rem;
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
