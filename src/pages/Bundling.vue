<template>
    <section class="bund">
        <div class="login-container">
            <div class="form-row">
                <span><i class="icon-people"></i></span>
                <span class="sHr">|</span>
                <input type="tel" placeholder="请输入手机号" v-model="phone" maxlength="13">
            </div>
            <div class="form-row n">
                <span style="white-space:pre"><i class="icon-icon-jdxq_icon_pingfen"></i></span>
                <span class="sHr">|</span>
                <input type="tel" placeholder="请输入验证码" v-model="code" maxlength="6">
                <a href="javascript:;" style="white-space:pre" class="hqu" @click="getVerifyCode()" v-bind:class="{'on': count>0}">{{getCodeText}}</a>
            </div>
        </div>
        <a class="bdBnt" @click="login">绑定领取会员卡</a>

        <div class="app-modal fadeIn" :style="{'backgroundColor' : 'rgba(0,0,0,.6)' } " v-if="flag">
            <div class="app-modal-box list">
                <ul class="m-container-item">
                   <li class="mint-cell"><b>身份证绑定</b></li>
                   <li class="mint-cell" v-for="item in memberidCard" @click="choice(item)">
                       <div class="mod-list">
                           <div class="m-t-title">{{item.memberId}}</div>
                           <div class="m-t-value">{{item.idCard}}</div>
                       </div>
                   </li> 
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
    var services = require('../service/index');

    var util = require('../common/util');

    export default {
        data() {
            return {
                getCodeText:'获取验证码',
                showLogin: false,
                enableLogin:true,
                phone: '',
                code: '',
                count:0,
                showBox:false,
                flag:false,
                idCard:'',
                memberidCard: [],
                openid:'',
                hotelId:''
            }
        },
        methods: {
            init() {
                let login = util.getStore('m28');
                    if(!login){
                        this.$router.push(`/index`);
                    }
            },
            login() {
                var vm = this;
                if(!vm.enableLogin)
                    return;
                if(util.checkNull(vm.phone))
                    return alert('请输入手机号！');
                if(!util.checkPhone(vm.phone))
                    return alert('手机号码格式不正确！');
                if(util.checkNull(vm.code))
                    return alert('请输入验证码！');
                var ld = loading();
                vm.enableLogin = false;
                var param = {
                    mobile:vm.phone,
                    code:vm.code,
                    openid: vm.openid
                };

                services.login(param).then(function(res){
                    var resp = res || {};
                    vm.enableLogin = true;
                    ld.destroy();
                    if(resp.success == 'F'){
                        if(resp.result.member){
                            vm.memberidCard = resp.result.member?resp.result.member:[];
                            //是否显示身份证层
                            vm.flag = true;
                        }else{
                            vcm.$router.push(`/index`);
                        }
                        vm.setUserInfo(resp.result.userInfo);//用户信息
                        vm.loginSuccess(resp);
                    }else{
                        return alert(resp.codemsg);
                    }
                },function(){
                    vm.enableLogin = true;
                    ld.destroy();
                });
            },
            getVerifyCode() {
                 var vm = this;
                 if(vm.count > 0){
                    return;     
                 }
                 if(util.checkNull(vm.phone))
                    return alert('请输入手机号！');
                if(!util.checkPhone(vm.phone))
                    return alert('手机号码格式不正确！');
                 var param = { mobileNo: vm.phone};
                 services.getVerifyCode(param)
                     .then(function (res) {
                        res=res.data || {};
                        if("F"==res.success)
                            return alert(res.errmsg);
                        vm.startCountDown();
                     },function(res){
                         alert('发送验证码失败，请稍后重试！');
                     });
            },
            loginSuccess(data){
                this.$emit("loginSuccess",data);
            },
            loginFail(data){
                this.$emit("loginFail",{});
            },
            startCountDown(){
                var vm = this;
                vm.count = 61;
                vm.countDown();
            },
            countDown(){
                var vm = this;
                if (vm.count > 1) {
                    vm.count--;
                    vm.getCodeText = vm.count+'秒后可重发';
                    setTimeout(function () {
                        vm.countDown();
                    }, 1000);
                    
                } else {
                    vm.count--;
                    vm.getCodeText = "获取验证码";
                }
            },
            setUserInfo(data){
                util.setStore('m28',data || '');
            },
            cardGet (){
                var vcm = this;
                vcm.$parent.loading(true);
                let parms = {
                    openid: vcm.openid,
                    mobile: vcm.phone,
                    memberId: vcm.idCard
                }
                services.regCard(parms).then((res) => {
                    if (res.success) {
                        vcm.setUserInfo(res.result.userInfo);//用户信息
                        vcm.loginSuccess(res);
                        vcm.$router.push(`/index`);
                    } else {
                        vcm.$parent.tip(res.codemsg);
                    }
                    vcm.$parent.loading(false);
                });
            },
            choice(ops) {
                var _this =this;
                    _this.idCard = ops.memberId;
                    _this.flag =false;
                    _this.cardGet();
            }
        },
        mounted() {
            this.openid = this.$route.params.openid;
            this.hotelId = this.$route.params.hotelId;
            util.setStore('mOpend',this.openid || '');
            util.setStore('mHotelid',this.hotelId || '');
        }
	};

</script>

<style>
    .login-container{
        background: #fff;
        margin-top: 0.8rem;
    }
    .login-model .login-form {
        z-index: 999;
        position: fixed;
        top: 50%;
        width: 100%;
        max-width: 640px;
        margin-top: -192px;
        left: 0;
        right: 0;
    }
    
    .login-model .login-container {
        border-radius: 1.5rem;
        margin: 2rem;
        background: #fff;
        padding: .1rem 2.5rem 1.5rem 2.5rem;
    }
    
    .login-container h4 {
        font-size: 1.8rem;
        font-weight: 200;
        color: #616161;
    }
    
    .login-container .form-row {
        border-bottom: 1px dashed #4a4a4a;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-flow: row;
        -ms-flex-flow: row;
        flex-flow: row;
        position: relative;
        margin: 0 0.8rem;
    }
    .login-container .form-row.n{
        border-bottom:0;
    }
    .login-container .form-row  * {
        font-size: 0.7rem;
        font-weight: 200;
        text-decoration: none;
        line-height: 2.4rem;
        color: #9e9e9e;
    }
    .login-container .form-row input {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
        flex: 1;
        border:none;
        padding: 0 1rem 0 .6rem;
        color: #000000;
        line-height: 1;
        min-width: 1rem;
    }
    .login-container .form-row a{
        color: #ff7058;
        display: block;
        position: absolute;
        right: 0;
        top:0;
    }
    
    .login-container .form-row a.on{
        color: #999;
    }
    
    .login-container .btn-group {
        margin-top: 2rem;
    }
    
    .login-container .btn-group a {
        display: block;
        text-align: center;
        border-radius: 2rem;
        border: 1px solid #eee;
        margin: 1rem 0;
        font-size: 1.8rem;
        line-height: 5.3rem;
        font-weight: 200;
        color: #9e9e9e;
    }
    
    .login-container .btn-group .btn-ok{
        background: #ffd200;
        color: #653200;
    }
    .login-container .btn-group .btn-ok:active{
        background-color: #d9b200;
    }
    .bdBnt{
        background: #FA2E4A;
        border-radius: 4px;
        color:#fff;
        display: block;
        line-height: 2.2rem;
        margin: 5rem 0.6rem 0 0.6rem;
        font-size: 0.7rem;
        text-align: center;
    }
    .login-container .form-row .hqu{
        background: #efab33;
        border-radius: .2rem;
        height: 1.3rem;
        margin-top: 0.55rem;
        line-height: 1.3rem;
        font-size: 0.6rem;
        padding: 0 0.5rem;
        color: #fff;
    }
    .login-container .form-row span.sHr{
        margin-left: .5rem;
        color: #979797;
    }
    .m-container-item {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        width: 100%;
    }
    .mint-cell {
        box-sizing: border-box;
        color: inherit;
        min-height: 48px;
        display: block;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        border-bottom: 1px solid #d9d9d9;
    }
    .mint-cell:last-child{
        border-bottom: 0;
    }
    .mod-list{
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: .7rem;
        line-height: 1;
        min-height: inherit;
        overflow: hidden;
        padding: 0 0.5rem;
        width: 100%;
        .m-t-title {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }
        .m-t-value {
            color: #888;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }
    }
    .app-modal .app-modal-box.list{
        top: 6rem;
        width: 14rem;
        border-radius: .3rem;
        background-color: #fff;
    }
    .mint-cell{
        b{
            padding: .3rem 0 .3rem .4rem;
            font-size: .6rem;
        }
    }
</style>