<template>
    <div id="login">
        <div id="lump">
            <div class="lump_item">
            </div>
        </div>
        <div class="content_box">
            <div class="inp">
                <div class="inpBox">
                    <div class="username">
                        <span><i class="iconfont icon-shouji"></i></span>
                        <input type="text" autocomplete="off" placeholder="请输入用户名" v-model="tel"
                               style="line-height: 20px;"/>
                    </div>
                    <div class="password">
                        <span>
                             <i class="iconfont icon-yuechi"></i>
                             </span>
                        <input :type="type_style" autocomplete="off" placeholder="请输入密码" v-model="pass"
                               style="line-height: 20px;"/>
                        <span>
                             <i class="iconfont icon-mima-yanjing-guanbi" v-if="hideShow" @click="to_change_style"></i>
                             <i class="iconfont icon-xianshi" v-if="!hideShow" @click="to_change_style"></i>
                         </span>
                    </div>
                </div>
            </div>
            <div class="btn">
                <van-button class="color_btn" :loading="isLoginLoading" round @click="login(tel, pass)">立即登录</van-button>
            </div>
            <div class="forgetFont">
                <span @click="toForgotPassword">忘记密码？</span>
                <span @click="toRegistered">立即注册</span>
            </div>
        </div>
    </div>

</template>

<script>
   import {loginService} from "../assets/js/http/login/login";
   import {getCookie, setCookie, setStorage} from "../assets/js/util";

   let last_router;
    let lastCon;
    export default {
        name: "login",
        data() {
            return {
                tel: '',
                pass: '',
                type_style: "password",
                hideShow: true,
                isLoginLoading: false,
            }
        },
        created() {

        },
        beforeRouteEnter(to,from,next){
            lastCon = from;
            last_router = from.path;
            next()
        },
        methods: {
            to_change_style() {
                if (this.type_style === "password") {
                    this.type_style = "text";
                    this.hideShow = false;
                } else {
                    this.type_style = "password";
                    this.hideShow = true;
                }
            },
            login(tel,pass){
                let that = this
                if (tel === "" || tel === null) {
                    this.$toast.fail({
                        message: '请输入正确的账号',
                        overlay:true,
                        closeOnClickOverlay :true
                    })
                } else if (pass === "" || pass === null) {
                    this.$toast.fail({
                        message: '请输入正确的密码',
                        overlay:true,
                        closeOnClickOverlay :true
                    })
                }else{
                    let data = {
                        tel:tel,
                        pass:pass
                    }
                    this.isLoginLoading = true;
                    loginService.loginData(data).then(res=>{
                        let status = res.data.status;
                        if(status === "ok"){
                            this.$toast.success({
                                message: res.data.msg,
                                overlay:true,
                                closeOnClickOverlay :true
                            })
                            that.isLoginLoading = true;
                            that.figure = res.data.figure;
                            // 把是否供应商信息存入本地存储localstorage
                            let loginInfo = {
                                uid: res.data.uid
                            };
                            let uid = res.data.uid;
                            //在此判断有无fnid   有的话走分销链接接口
                            if (getCookie("fnid")) {
                                let fnid = getCookie("fnid");
                                that.add_fenxiao_log(fnid);
                            }

                           setStorage("figure", that.figure);
                            setStorage("loginInfo", loginInfo);
                            setStorage("uid", res.data.uid);
                            // 设置一天
                            setCookie("isLogin", true, 1);
                            // setCookie("loginInfo", loginInfo, 1);

                            // 判断是否有上一个页面，无登录成功跳转至首页，有跳转至上一个页面
                            if(last_router == '/'){
                                that.$router.push("/home");
                                console.log("1")
                            }else{
                                if(last_router == '/forgotPassword' || last_router == '/registered'){
                                    that.$router.push("/home");
                                    console.log("2")
                                }else{
                                    that.$router.push(lastCon.fullPath);
                                }
                            }
                        }
else {
                            this.$toast.fail({
                                message: '请输入正确的账号密码！',
                                overlay:true,
                                closeOnClickOverlay :true
                            })
                            _this.isLoginLoading = false;
                        }
                    })
                }
            },
            toForgotPassword(){

            },
            toRegistered(){
                this.$router.push("/registered");
            }
        },
    }
</script>
<style scoped lang="scss">
    #login{
        width: 100%;
        background-color: #f5f5f5;
        height: 100%;
        .content_box{
            padding-top: 70px;
            width: 80%;
            margin: 0 auto;
            .inp{
                width: 100%;
                .inpBox{
                    .username,.password{
                        border-bottom: 1px solid #eee;
                        height: 45px;
                        line-height: 50px;
                        span{
                            padding-left: 10px;
                            i{
                                font-size: 20px;
                            }
                        }
                        input{
                            margin-left: 10px;
                            border: 0;
                            outline: none;
                            background-color: transparent;
                        }
                        .icon-mima-yanjing-guanbi{
                            float: right;
                            color: red;
                            font-size: 20px;
                        }
                        .icon-xianshi{
                            font-size: 28px;
                            float: right;
                            color: red;
                        }
                    }
                    .password{
                        margin-top: 15px;
                    }
                }
            }
            .forgetFont{
                height: 20px;
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                span{
                    padding: 20px 5px;
                    color: #999;
                    &:nth-child(2){
                        color: red;
                    }
                }
            }
        }
        .btn{
            text-align: center;
            margin-top: 10px;
            .color_btn{
                width: 70%;
                background: linear-gradient(180deg,#fc6785,red);
                line-height: 40px;
                font-size: 17px;
                color: #fff;
                text-align: center;
                margin: 40px auto;
                border-radius: 30px;
            }
        }
    }
    #lump {
        height: 120px;
        padding-bottom: 25%;
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        margin: 0 auto;
        background: linear-gradient(to right, #f80e2d, #fc6785);
        .lump_item {
            height: 100%;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            width: 100%;
            left: 0;
            margin: 0 auto;
            background: linear-gradient(90deg,#f80e2d,#fc6785);
        }
    }

</style>