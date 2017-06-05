<template>
    <div class="index app-page">
        <app-header v-show="!showSearchForm">
            <div slot="left">
                <div class="header-left">
                    <router-link to="/city"><span>{{cityName}}</span>
                        <span class="triangle-down"></span></router-link>
                </div>
            </div>
            <div slot="right">
                <div class="header-right">
                    <span @click="toggleKeyword()"><i class="icon-search"></i></span>
                    <!--<router-link to="/me"><i class="icon-people"></i></router-link>-->
                </div>
            </div>
        </app-header>
        <section class="header-search row"
                 v-show="showSearchForm">
            <form action="javascript:;"
                  class="search-form col">
                <input type="search"
                       data-aria-clear-label
                       aria-label
                       v-model="keyword"
                       @search="keyWordSearch($event)"
                       style="font-family:'icomoon'"
                       placeholder=" 酒店名/地址/关键字">
            </form>
            <a class="btn-cancel"
               @click="toggleKeyword()">取消</a>
        </section>
        <section class="sec-filter row">
            <div class="col text-left">
                <router-link to="/search">
                    <span class="filter-title">{{areaText}}</span>
                    <i class="triangle-down"></i>
                </router-link>
            </div>
            <div class="col text-right hide">
                <a href="javascript:;"
                @click="toggleFilter()">
                    <span class="filter-title">{{orderByText}}</span>
                    <i class="triangle-down"></i>
                </a>
            </div>
        </section>
        <app-layout>
            <div class="warper" :class="{'overFlowHidden': showFilter}">
                <section class="filter-option" v-show="showFilter">
                    <ul class="option-list fadeIn">
                        <li @click.stop="selectFilter(f)"
                            v-for="f in orderBys"
                            :class="{'active':orderBy==f.value}">{{f.text}}
                        </li>
                    </ul>
                </section>
                <div class="filter-bg" v-show="showFilter" @click="toggleFilter()"></div>
                <section class="sec-list">
                    <hotel-item v-for="hotel in hotelList"
                                :hotel="hotel"
                                :key="hotel.id"></hotel-item>
                </section>
                <div class="noData" v-if="!hotelList.length">
                    <i class="icon-scjd_icon_wujiudian"></i>
                    没有找到相关数据～
                </div>
                <load-more :load-promise="loaderMore"
                        :is-load-all="isLoadAll"></load-more>
            </div>
        </app-layout>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import AppHeader from '../components/AppHeader';
import HotelItem from '../components/HotelItem';
import LoadMore from '../components/LoadMore';
import AppLayout from '../components/AppLayout';
import { hotelQuery } from '../service/';

export default {
    components: {
        AppHeader,
        HotelItem,
        AppLayout,
        LoadMore,
    },
    data() {
        return {
            isLoadAll: false,
            showSearchForm: false,
            showFilter: false,
            pageSize: 10,
            pageNo: 1,
            orderBys: [
                { text: '推荐排序', value: '0' },
                { text: '价格低-高', value: '3' },
                { text: '距离近-远', value: '1' },
            ],
            hotelList: [],
        };
    },
    computed: {
        ...mapState([
            'orderBy',
            'area',
            'range',
            'location',
        ]),
        ...mapGetters([
            'areaText',
            'cityCode',
            'cityName',
        ]),
        orderByText() {
            var orderByObj = '';
            this.orderBys.forEach((l) => {
                if (l.value === this.$store.state.orderBy) {
                    orderByObj = l;
                }
            });
            if (!orderByObj) {
                orderByObj = this.orderBys[0];
            }
            return orderByObj.text;
            // return this.orderBys.some(l => l.value === this.$store.state.orderBy).text;
        },
        keyword: {
            get() {
                return this.$store.state.keyword;
            },
            set(value) {
                this.$store.commit('CHANGE_KEYWORD', value);
            },
        },
    },
    methods: {
        ...mapMutations([
            'CHANGE_ORDERBY',
        ]),
        toggleKeyword() {
            this.showSearchForm = !this.showSearchForm;
        },
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },
        selectFilter(orderBy) {
            this.CHANGE_ORDERBY(orderBy.value);
            this.showFilter = false;
        },
        keyWordSearch() {
            this.hotelList = [];
            this.fetchData(1);
        },
        loaderMore() {
            return this.fetchData(this.pageNo + 1);
        },
        fetchData(pageNo) {
            let params = {
                pageNo,
                key: this.keyword,
                cityCode: this.cityCode || '',
                pageSize: this.pageSize,
            };
            let isFirstPage = pageNo === 1;
            if (this.area && this.area.coordinates) {
                params.searchCoordinates = this.area.coordinates;
            } else if (this.location && this.location[0] !== '') {
                if (this.range > 0) {
                    params.range = this.range;
                }
                params.mineCoordinates = this.location;
            }
            if (isFirstPage) {
                this.$parent.loading(true);
            }
            // set page number
            this.pageNo = pageNo;
            return hotelQuery(params)
                .then(res => {
                    if (isFirstPage) {
                        this.$parent.loading(false);
                    }
                    this.isLoadAll = res.success && res.result && (res.result.empty || res.result.lastPage);
                    if (res.success && res.result && res.result.items.length) {
                        // res.result.items.forEach((v) => {
                        //     if (v.facilities.length) {
                        //         console.log(v.id);
                        //     }
                        // });
                        this.hotelList = this.hotelList.concat(res.result.items);
                    }
                    if (!res.success) {
                        this.$parent.tip(res.msg);
                    }
                }, () => {
                    if (isFirstPage) {
                        this.$parent.loading(false);
                    }
                    this.isLoadAll = true;
                });
        },
    },
    mounted() {
        // alert(this.cityCode);
        if (!this.cityCode) {
            this.$router.push('/city');
            return;
        }
        this.fetchData(1);
    },
};
</script>

<style scoped>
@import "../style/postcss/_var.css";
.index {
    background: $color_contain_bg;
}

.header-search {
    background: $color_header_bg;
    line-height: 2.2rem;
    height: 2.2rem;
    .search-form {
        height: 2.2rem;
        padding: 0 0.5rem;
        >input {
            width: 100%;
            border: none;
            border-radius: 2rem;
            outline: none;
            text-align: center;
            line-height: 1.4rem;
            padding: 0 0.5rem;
            vertical-align: middle;
            font-size:.6rem;
        }
    }
    .btn-cancel {
        font-size: .65rem;
        margin-right: .4rem;
        line-height: 2.2rem;
        vertical-align: middle;
    }
}

.header-left {
    span {
        display: inline-block;
        font-size: .75rem;
    }
    .triangle-down {
        vertical-align: middle;
        @util triangle(.23rem, #9e9e9e, down);
    }
}

.header-right {
    font-size: .8rem;
    >* {
        display: inline-block;
        margin-left: .4rem;
    }
}

.sec-filter {
    height: $h_header;
    line-height: $h_header;
    padding: 0 $w_page_padding;
    border-bottom: 1px solid $color_line;
    background-color:#fff;
    .filter-title {
        font-size: .6rem;
        color: $color_subtitle;
    }
    .triangle-down {
        vertical-align: middle;
        display: inline-block;
        margin-top:.1rem;
        @util triangle(.23rem, #9e9e9e, down);
    }
}

.sec-list {
    background-color:#fff;
    padding: .2rem 0;
}

.filter-option {
    position: absolute;
    z-index: 120;
    width: 100%;
    background: $color_contain_bg;
    .option-list {
        >li {
            border-bottom: 1px solid $color_line;
            line-height: $h_header;
            padding: 0 $w_page_padding;
            font-size: 0.7rem;
        }
        >li.active {
            color: rgb(255, 117, 8);
            &::after {
                content: '\e904';
                font-family: 'mikeFonts' !important;
                float: right;
                border-radius: 50%;
                line-height: .9rem;
                text-align: center;
                font-size: .4rem;
                margin-top: .6rem;
                margin-right: .5rem;
                color: #ff7508;
                background-color: transparent;
                border: 1px solid #ff7508;
                @util size(.9rem);
            }
        }
    }
}

.filter-bg {
    z-index: 110;
    position: absolute;
    background-color: rgba(17, 25, 41, 0.8);
    @util size(100%, 100%);
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

.warper{
    position: absolute;
    width: 100%;
    height: 100%;
    &.overFlowHidden{
        overflow: hidden;
    }
}
</style>
