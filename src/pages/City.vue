<template>
<div class="cityPage app-page">
    <app-header>
        <span slot="left"></span>
        <span slot="right"></span>
        <section class="header-search row">
            <form action="javascript:;" class="search-form col">
                <input type="search" data-aria-clear-label aria-label v-model="keyword" @blur="cancelSearch()" @focus="searchFocus()" @keyup="citySearch($event)" @search="citySearch($event)" style="font-family:'icomoon'"
                    placeholder=" 城市名/城市简拼">
            </form>
            <a class="btn-cancel" @click="cancelSearch()">取消</a>
        </section>
    </app-header>
    <app-layout v-if="!isSearchMode">
        <div class="currentCity" v-if="gpscity && gpscity.name">
            当前定位城市 <a href="javascript:;" @click="setCity(gpscity)">{{gpscity.name}}</a>
        </div>
        <div class="currentCity" v-if="!gpscity || !gpscity.name">
            <i class="icon-ddxq_icon_dingwei"></i>
            定位中...
        </div>
        <div class="app-row cityGrid">
            <div class="app-col-xs-4" v-for="site in hotSite">
                <a href="javascript:;" class="app-ellipsis" @click="setCity(site)">{{site.queryName}}</a>
            </div>
            <div v-if="hotSite.length % 3" class="app-col-xs-4" v-for="i in 3-(hotSite.length % 3)"><a>&nbsp;</a></div>
        </div>
        <div v-for="(city, alph) in alphCitys" :key="alph" class="alphCityList">
            <item-cell link @click="toggleCity(alph)" v-bind:bottomLine="toggleColumn !== alph">
                {{alph}}
            </item-cell>
            <div class="app-row cityGrid fadeIn" v-show="toggleColumn === alph">
                <div class="app-col-xs-4" v-for="cty in city" :key="cty.id">
                    <a href="javascript:;" class="app-ellipsis" @click="setCity(cty)">{{cty.queryName}}</a>
                </div>
                <div v-if="city.length % 3" class="app-col-xs-4" v-for="i in 3-(city.length % 3)"><a href="javascript:;">&nbsp;</a></div>
            </div>
        </div>
    </app-layout>
    <app-layout v-if="isSearchMode" style="background: #f5f5f5;">
        <item-cell bottomLine v-for="city in searchCitys" :key="city.id" @click="setCity(city)">
            {{city.name}}
        </item-cell>
        <div class="noData" v-if="!searchCitys.length && !!keyword">
            <i class="icon-scjd_icon_wujiudian"></i>
            没有找到相关城市数据～
        </div>
    </app-layout>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import AppHeader from '../components/AppHeader';
import ItemCell from '../components/ItemCell';
import AppLayout from '../components/AppLayout';

var services = require('../service/index');

export default {
    components: {
        AppHeader,
        ItemCell,
        AppLayout,
    },
    data() {
        return {
            hotSite: [],
            alphCitys: {},
            toggleColumn: '',
            keyword: '',
            isSearchMode: false,
            searchCitys: [],
            loading: false,
            bounceCancel: false,
        };
    },
    computed: {
        ...mapState([
            'city',
            'gpscity',
        ]),
    },
    methods: {
        ...mapMutations([
            'CHANGE_CITY',
            'CHANGE_AREA',
            'CHANGE_RANGE',
        ]),
        getCityInfo() {
            this.$parent.loading(true);
            services.cityQuery({}).then((res) => {
                let data = [];
                this.$parent.loading(false);
                if (res.success) {
                    if (res.result) {
                        data = JSON.parse(res.result);
                        this.hotSite = data.hots;
                        this.alphCitys = data.datas;
                    }
                } else {
                    this.$parent.tip(res.msg);
                }
            }, (err) => {
                this.$parent.loading(false);
                this.$parent.tip(err);
            });
        },
        toggleCity(cityAlph) {
            this.toggleColumn = this.toggleColumn === cityAlph ? '' : cityAlph;
        },
        setCity(city) {
            if (city) {
                this.CHANGE_RANGE(null);
                this.CHANGE_AREA(null);
                this.CHANGE_CITY({
                    name: city.queryName || city.name,
                    code: city.id || city.code,
                });
            }
            this.$router.push('/index');
        },
        citySearch() {
            this.searchCitys = [];
            if (!this.keyword) return;
            Object.keys(this.alphCitys).forEach((cityAlph) => {
                this.alphCitys[cityAlph].forEach((val) => {
                    if (val.name.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1) {
                        this.searchCitys.push(val);
                    }
                });
            });
        },
        searchFocus() {
            this.isSearchMode = true;
            this.bounceCancel = false;
        },
        cancelSearch() {
            if (this.bounceCancel) {
                this.bounceCancel = false;
                return;
            }
            if (!this.isSearchMode) {
                this.$router.go(-1);
            }
            this.keyword = '';
            this.isSearchMode = false;
            this.bounceCancel = true;
        },
    },
    mounted() {
        this.getCityInfo();
    },
};
</script>

<style scoped>
@import "../style/postcss/_var.css";

.header-search{
    box-sizing: border-box;
    .search-form{
        
        padding: 0 0.5rem;

        > input {
            width: 100%;
            height: 1.4rem;
            border: none;
            border-radius: 2rem;
            outline: none;
            text-align: center;
            line-height: 1.4;
            padding:0 0.5rem;
            vertical-align: middle;
            font-size: .6rem;
        }
    }

    .btn-cancel{
        font-weight: 300;
        font-size: .65rem;
        margin-right:.4rem;
        line-height:2.3rem;
        vertical-align: middle;
        color: #333;
    }
}

.currentCity{
    font-size: .6rem;
    padding: .4rem .6rem;
    background-color: #f5f5f5;
    a{
        font-size:.7rem;
        display: inline-block;
        padding:.1rem .7rem;
        border: 1px solid #aaa;
        border-radius: 1.5rem;
        background-color: #fff;
        margin-left: .6rem;
    }
}

.alphCityList{
    >a{
        background-color:#f5f5f5;
    }
}

.cityGrid{
    background-color: #fff;
    font-size: .7rem;
    border-collapse: collapse;
    border-top: 1px solid #e2e2e2;
    div{
        text-align: center;
        border-right: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        a{
            display: block;
            height: 2rem;
            line-height: 2rem;
            /*padding: .7rem 0;*/
            &:active {
                background: #fafafa;
            }
        }
    }
    :nth-of-type(3n){
        border-right:0;
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
