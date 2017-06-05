<template>
    <div class="app-page">
        <app-header>
            筛选
        </app-header>
        <app-layout>
            <div class="listWarper">
                <div class="app-table locationList">
                    <div class="m-cell first-col">
                        <span>
                            <a href="javascript:;" :class="{'active':activeCol1=='距离我'}" @click="clickFirst(ranges,'距离我')">距离我</a>
                            <a href="javascript:;" :class="{'active':activeCol1==key}" @click="clickFirst(val, key)" v-for="(val, key) in Col1" :key="key">{{key}}</a>
                        </span>
                    </div>
                    <div class="m-cell second-col" :class="{'col2': !Col3.length}">
                        <span ref="secondColumn">
                            <a href="javascript:;" :class="{'active':activeCol2 == l.id}" @click="clickSecond(l)" v-for="l in Col2" :key="l.name">{{l.name}}</a>
                        </span>
                    </div>
                    <div class="m-cell third-col" :class="{'col3': Col3.length}" v-show="!!Col3.length">
                        <span ref="thirdColumn">
                            <a href="javascript:;" @click="clickThird(l)" v-for="l in Col3" :key="l.name">{{l.name}}</a>
                        </span>
                    </div>
                </div>
            </div>
            
        </app-layout>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import AppHeader from '../components/AppHeader';
import AppLayout from '../components/AppLayout';
import { locationQuery } from '../service/';

export default {

    components: {
        AppHeader,
        AppLayout,
    },
    data() {
        return {
            activeCol1: '距离我',
            activeCol2: '',
            Col1: [],
            Col2: [],
            Col3: [],
            ranges: [
                { name: '附近1km', value: 1000, type: -1 },
                { name: '附近3km', value: 3000, type: -1 },
                { name: '附近5km', value: 5000, type: -1 },
                { name: '附近10km', value: 10000, type: -1 },
                { name: '全城', value: -1, type: -1 },
            ],
        };
    },
    computed: {
        ...mapState([
            'area',
            'city',
        ]),

    },
    methods: {
        ...mapMutations([
            'CHANGE_AREA',
            'CHANGE_RANGE',
        ]),
        clickFirst(item, key) {
            this.activeCol1 = key;
            this.Col2 = item;
            if (key !== '地铁路线') {
                this.Col3 = [];
            } else {
                this.clickSecond(item[0]);
            }
            this.setDomTop(true, true);
        },
        clickSecond(item) {
            if (item.type === -1) {
                this.CHANGE_RANGE(item.value);
                this.CHANGE_AREA(null);
                this.$router.push('/');
            } else if (item.type === 3) {
                this.Col3 = item.childs;
                this.activeCol2 = item.id;
            } else {
                this.setArea(item);
            }
            this.setDomTop(false, true);
        },
        clickThird(item) {
            this.setArea(item);
        },
        setArea(item) {
            this.CHANGE_AREA(item);
            this.CHANGE_RANGE(null);
            this.$router.push('/');
        },
        setDomTop(isSecondTop, isThirdTop) {
            if (isSecondTop) {
                this.$refs.secondColumn.scrollTop = 0;
            }
            if (isThirdTop) {
                this.$refs.thirdColumn.scrollTop = 0;
            }
        },
    },
    mounted() {
        let param = { cityCode: this.city.code };
        locationQuery(param)
            .then(res => {
                let data = null;
                if (res.success) {
                    data = JSON.parse(res.result);
                    this.Col1 = data.datas;
                    console.log(data.datas)
                    this.clickFirst(this.ranges, this.activeCol1);
                }
            });
    },
};
</script>

<style scoped>
@import "../style/postcss/_var.css";
.listWarper{
    height: 100%;
    width: 100%;
    position: absolute;
}

::-webkit-scrollbar{
    display: none;
}
.locationList{
    height: 100%;
    background-color: #fff;
    font-size: 0.7rem;
    .m-cell{
        width: 25%;
        background: #f0f0f0;
        span{
            display: block;
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
        }
        a{
            text-decoration: none;
            font-size: .68rem;
            padding: .5rem 0;
            
            display: block;
        }
        &.first-col{
            a{
                padding-left: $w_page_padding;
                &.active {
                    background: #FFF !important;
                }
            }
        }
        &.second-col{
            background-color: #fcfcfc;
        }
        &.third-col{
            background-color: $color_contain_bg;
        }
        &.second-col,
        &.third-col{
            a{
                margin-left: $w_page_padding;
                border-bottom: 1px solid $color_line;
                padding-right: $w_page_padding;
                &.active {
                    color: $color_btn_bg;
                }
            }
        }
        &.col2{
            width: 75%;
        }
        &.col3{
            width: 50%;
        }
    }
}
</style>
