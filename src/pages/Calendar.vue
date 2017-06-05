<template>
  <div class="index">
    <header id="header" class="calendar-header">
        <div>
            <div class="head-nav">
                <i>选择日期</i> <span @click="completeSelect">完成</span>
            </div>
            <nav class="m-flex bg-subNav">
                <div class="border-split2">
                    <i class="font_11 text-detailListWord">入住</i>
                    <p class="font_14 text-nav" v-bind:class="{'on':orderDict.highLight.start}">{{orderDict.start}}</p>
                </div>
                <div class="border-split2">
                    <i class="font_11 text-detailListWord">离店</i>
                    <p class="font_14 text-nav" v-bind:class="{'on':orderDict.highLight.end}">{{orderDict.end}}</p>
                </div>
                <div class="border-split2">
                    <i class="font_11 text-detailListWord">天数</i>
                    <p class="font_14 text-nav">{{orderDict.days}}</p>
                </div>
            </nav>
            <div class="m-flex calendar-title bg-card">
                <div v-for="workDay in dayList"  class="font_13 text-tips">{{workDay}}</div>
            </div>
        </div>
    </header>
    <section style="margin-top:4.6rem">
        <div class="app-content calendar-content">
            <div class="calendar-body bg-card">
                <div v-for="list in dateList">
                    <header class="text-header">{{list.title}}</header>
                    <section>
                        <div v-for="dateOption in list.dateDetail" class="text-nav">
                            <span class="" v-bind:class="{'disabled':dateOption.disabled, 'start':dateOption.checkStateCode==2,'on':dateOption.checkStateCode==3,'end':dateOption.checkStateCode==4 }" @click="setClickDate(dateOption)">{{dateOption.day || '&nbsp;'}}</span>
                        </div>
                        <i></i>
                    </section>
                </div>
            </div>
        </div>    
    </section>
  </div>
</template>
<script>
import widgetDate from '../common/widget-date';
export default {
    data() {
        return {
            msg: '请输入值',
            showCalendarCount: 2,//设置月分数
            curDate: new Date(),
            dateList: [],
            orderDict:{start:'06月01日 周四',end:'06月02日 周五',days:'共1晚',highLight:{start:false,end:false}},
            dayList: widgetDate._dicts.workDayName.cn_1,
        }
    },
    methods: {
        //完成按钮返回主页（传递参数开始时间和结束时间）
        completeSelect(){
            var vm=this,
                data=vm.checkSelected();
                vm.$emit('listenToChilEvent',11)
                
            if(!data.status)
                return alert(data.msg);
            (function(d){
                vm.$root.startDate=d.startdate;
                vm.$root.endDate=d.enddate;
            })(data.data);
            
            //vm.backToPrevPage();
            
            // vm.$route.router.go({path:'/detail', query:data.data});
        },
        backToPrevPage(){
            var vm = this,
                params = vm.queryParam;
            delete params.startdate;
            delete params.enddate;
            delete params.ref;
            if(vm.refPage){
                vm.$route.router.replace({path:'/'+vm.refPage, query: params})                    
            }else{
                window.history.go(-1);                    
            }
        },
        //验证时间
        checkSelected(){
            var vm=this,
                res={status:false, msg:'', data:{}},
                _start=vm.curStartDate,
                _end=vm.curEndDate;
            if(!_start && !_end){
                res.msg="请选择入住时间";
            }else if(_start && !_end){
                res.msg="请选择退房时间";
            }else{
               res.status=true;
               res.data={
                    startdate: _start,
                    enddate: _end
               }; 
            }
            return res;
        },
        //设置开始时间和结束时间
        setCurDate(startDate, endDate){
            var vm=this;
            //如果开始时间和结束时间都有值，那么页面的起始时间为入参的两个时间
            if(startDate && endDate){
                vm.curStartDate=widgetDate._plainDate(startDate);
                vm.curEndDate=widgetDate._plainDate(endDate);
            }else{
                //当时间在 0点到1点半之间，相当于今入明离的适配
                var _curDate= new Date(vm.curDate);
                if(vm.isInPeriod){
                    vm.curEndDate = new Date(vm.curDate);
                    vm.curStartDate = widgetDate._unixToDate(_curDate.setDate(_curDate.getDate() - 1));
                }else{
                    vm.curStartDate = new Date(vm.curDate);
                    vm.curEndDate = widgetDate._unixToDate(_curDate.setDate(_curDate.getDate() + 1));
                }
            } 
            vm.curStartDate=widgetDate._dateToStr(vm.curStartDate,'yyyyMMdd',true);
            vm.curEndDate=widgetDate._dateToStr(vm.curEndDate,'yyyyMMdd',true);
        },
        //设置用于显示的数据列表
        setDateList(){
            var vm=this,
                dateDict={},
                startDate=new Date(vm.curDate);
            if(vm.isInPeriod)
                widgetDate._unixToDate(startDate.setDate(startDate.getDate() - 1));
            var startDateFirstDay=widgetDate._curMonth(startDate);
            var _dateList=[];
            for(var i=0; i < vm.showCalendarCount; i++){
                if(i > 0){
                    startDateFirstDay = widgetDate._nextMonth(startDateFirstDay);
                }
                dateDict = {
                    firstDay: startDateFirstDay,
                    days: widgetDate._monthHaveDays(startDateFirstDay),
                    dateDay: startDateFirstDay.getDay(),
                    year: startDateFirstDay.getFullYear(),
                    month: startDateFirstDay.getMonth()+1,
                    title: '',
                    loopDays: 0,
                    dateDetail: []
                };
                dateDict.loopDays=(dateDict.days+((dateDict.dateDay>0 && dateDict.dateDay<7)?
                                    dateDict.dateDay:0))<=35?35:42;
                dateDict.title=widgetDate._monthName(startDateFirstDay,'cn_1') + ' '+ dateDict.year;
                dateDict.dateDetail=vm._getListDateDetail(dateDict);
                _dateList.push(dateDict);
                dateDict={};
            }
            vm.dateList=_dateList;
            console.log(_dateList)
        },
        //时间的0点到1点半的判断
        _checkTimePeriod(date){
            var period = date.getHours() + date.getMinutes()/60;
            return (period > 0 && period <= 1.5);
        },
        //根据是否在0点到1点半区间，获取当前可用时间字符串形式
        _getCurDateStr(date, _isInPeriod){
            if(_isInPeriod){
                var _d=new Date(date);
                return widgetDate._unixToStr(_d.setDate(_d.getDate() - 1), 'yyyyMMdd', true);
            }else{
                return widgetDate._dateToStr(date, 'yyyyMMdd', true);
            }
        },
        //获取用于显示的时间的列表
        _getListDateDetail(dateObj){
            var vm=this,
                dateResource=0,
                resList=[],
                resDict={},
                diff=dateObj.dateDay;
            if(7==diff) diff=0;
            for(var i=0; i < dateObj.loopDays; i++){
                if(i >= diff && dateResource < dateObj.days){
                    dateResource++;
                    resDict={
                        day: widgetDate._dateTwoNum(dateResource),
                        date: ''+dateObj.year+widgetDate._dateTwoNum(dateObj.month)+widgetDate._dateTwoNum(dateResource),
                        checkStateCode: 1, //checkStateCode => 1 normal 2 start  3 on  4 end 
                        disabled: false
                    };
                    if(resDict.date < vm.curDateStr || vm.showCalendarDays <= 0){
                        resDict.disabled=true;
                    }else{
                        vm.showCalendarDays--;
                    }
                    
                }
                resList.push(resDict);
                resDict={};
            }
            return resList;
        },
        //设置显示状态
        setDataCheckStateCode(){
            var vm=this;
            if(!vm.curStartDate) return;
            var stateCode=0;
            vm.dateList.forEach(function(dateOptionList, i){
                dateOptionList.dateDetail.forEach(function(dateOption, j){
                    if(!dateOption.disabled && dateOption.date){
                        //checkStateCode => 1 normal 2 start  3 on  4 end 
                        if(dateOption.date == vm.curStartDate){
                            //开始时间
                            stateCode=2;
                        }else if(dateOption.date == vm.curEndDate){
                            //结束时间
                            stateCode=4;
                        }else if(vm.curStartDate && vm.curStartDate && dateOption.date > vm.curStartDate && dateOption.date < vm.curEndDate){
                            //开始/结束之间的
                            stateCode=3;
                        }else{
                            //正常状态
                            stateCode=1;
                        }
                        vm.dateList[i]['dateDetail'][j].checkStateCode=stateCode;
                    }  
                })
            })
        },
        //点击设置日期
        setClickDate(obj){
            if(obj.disabled || (!obj.date && !obj.checkStateCode)) return;
            var vm=this;
            if(!vm.curEndDate && vm.curStartDate && vm.curStartDate < obj.date){
                vm.curEndDate=obj.date;
            }else{
                vm.curStartDate=obj.date;
                vm.curEndDate='';
            }
            vm.setDataCheckStateCode();
            vm.setTopTip(true);
        },
        //设置顶部时间
        setTopTip(isHighlight){
            var vm=this;
            var startDate=null, endDate=null;
            vm.orderDict={start:'',end:'',days:'',highLight:{start:false,end:false}};
            if(vm.curEndDate || vm.curStartDate){
                startDate=widgetDate._plainDate(vm.curStartDate);
                if(isHighlight)
                    vm.orderDict.highLight.start=true;
                if(vm.curEndDate){
                    endDate=widgetDate._plainDate(vm.curEndDate);
                    if(isHighlight){
                        vm.orderDict.highLight.start=false;
                        vm.orderDict.highLight.end=true;   
                    }
                }
            }
            vm.orderDict.start=startDate?vm.getTopDateTip(startDate):'';
            vm.orderDict.end=endDate?vm.getTopDateTip(endDate):'';
            
            if(endDate)
                vm.orderDict.days='共'+widgetDate._diff(startDate, endDate, 'd')+'晚';
        },
        //根据Date获取用于顶部显示的日期数据
        getTopDateTip(date){
            return widgetDate._dateToStr(date, 'MM月dd日 ', true) + widgetDate._workDayName(date,'cn_1');
        }
    },
    mounted (){
        console.log(0)
        var vm=this;
        vm.isInPeriod=vm._checkTimePeriod(vm.curDate);
        vm.curDateStr=vm._getCurDateStr(vm.curDate, vm.isInPeriod);
        vm.setDateList();
        
        vm.setCurDate(vm.$root.startDate, vm.$root.endDate);
        vm.setDataCheckStateCode();
        vm.setTopTip();
        //logPV("MainSelectDate");
        // console.log(JSON.stringify(vm.dateList));
        
    }
};
</script>

<style scoped>
@import "../style/postcss/_var.css";
@import "../style/calendar.css";

h1, h2 {
    font-weight: normal;
    color: $text_color;
}
.circle{
    @util center;
    @util circle(5rem,#00ff00);
}
 .head-nav{
    font-size: 0.6rem;
    padding: 0.4rem 0;
    overflow: hidden;
    background: #fff;
    span{
        float: right;
        margin-right: 0.4rem;
        padding: .2rem .5rem;
        border:1px solid #ff7508;
        border-radius: 0.2rem;
        background: #ffffff;
    }
    i{
        padding-left: .5rem;
        padding-top: .2rem;
        position: relative;
        top: 0.2rem
    }
}
</style>
