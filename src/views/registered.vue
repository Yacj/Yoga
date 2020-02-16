<template>
    <div id="registered">
        <div id="lump">
            <div class="lump_item">

            </div>
        </div>
        <div class="content_box">
            <div class="address">
                <van-row class="sex">
                    <van-col span="22">
                        <div class="sexBox" @click="sexBtn">{{title[index]}}</div>
                    </van-col>
                    <van-col span="2">
                        <van-icon name="arrow" @click="sexBtn" />
                    </van-col>
                </van-row>
            </div>
            <div class="phone">
        <span>
          <i class="iconfont icon-shouji"></i>
        </span>
                <input type="number" placeholder="请输入手机号" v-model="tel" />
            </div>
            <div class="reg">
        <span>
          <i class="iconfont icon-Verification_code"></i>
        </span>
                <input type="number" class="numbercode" placeholder="请输入验证码" v-model="code" />
                <div class="get" @click="send_msg(tel)" v-show="hanld_msg">获取</div>
                <div class="msg" v-show="!hanld_msg">{{content}}</div>
            </div>
            <div class="password">
                <div>
                    <i class="iconfont icon-yuechi"></i>
                    <input :type="type_style1" placeholder="请输入密码" v-model="pass" />
                </div>
                <i class="iconfont icon-mima-yanjing-guanbi" @click="to_change_style1"></i>
            </div>
            <div class="repassword">
                <div>
                    <i class="iconfont icon-yuechi"></i>
                    <input :type="type_style2" placeholder="请确认密码" v-model="repass" />
                </div>
                <i class="iconfont icon-mima-yanjing-guanbi" @click="to_change_style2"></i>
            </div>
            <div class="color_btn" @click="reg(tel,pass,repass,code)">注册</div>
            <p class="fon">
                点击注册，表示同意
                <span @click="toAgreement">《瑜伽网用户协议》</span>
            </p>
            <van-action-sheet v-model="sexShow" title="请选择手机区号">
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell
                                :title="item"
                                v-for="(item,index) in title"
                                :key="index"
                                clickable
                                @click="to_xuanze(index)"
                        >
                            <van-radio slot="right-icon" :name="index" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-action-sheet>
        </div>
    </div>
</template>

<script>
    import {registeredService} from "../assets/js/http/registered/registered";
    import {getCookie,setCookie} from "../assets/js/util";

    export default {
        name: "registered",
        data() {
            return {
                title: [
                    "0086   中国大陆",
                    "00852  中国香港",
                    "00852  中国澳门",
                    "00886  中国台湾"
                ],
                index:0,
                tel:'',
                hanld_msg: true,
                code:'',
                content:'',
                type_style1: "password",
                type_style2: "password",
                pass:'',
                repass:'',
                sexShow: false,
                radio: "1",
                totalTime: 120,
                from_iden: "",
            }
        },
        mounted() {
            if (getCookie("to_login")) {
                // setCookie("index", false, -1);
                this.from_iden = getCookie("to_login");
            }
        },
        methods:{
            sexBtn() {
                this.sexShow = true;
            },
            send_msg(tel){
                if (tel === "")
                {
                    this.$toast.fail({
                        message: '请输入手机号',
                        overlay:true,
                        closeOnClickOverlay :true
                    })
                    return true
                }
                this.hanld_msg = false;
                // if()
                this.handle_time();
                let data = {
                    mobile:tel,
                    type:"reg"
                }
                registeredService.send_msg(data).then(res=>{
                    let code = res.errcode
                    if(code === 1000){
                        let status = res.data.status;
                        if (status != "ok") {
                            this.hanld_msg = true;
                            let msg = res.data.msg;
                            this.$toast.fail({
                                message: msg,
                                overlay:true,
                                closeOnClickOverlay :true
                            })
                        }
                    }
                    console.log(res)
                })
            },
            to_change_style1() {
                if (this.type_style1 === "password") {
                    this.type_style1 = "type";
                } else {
                    this.type_style1 = "password";
                }
            },
            to_change_style2() {
                if (this.type_style2 === "password") {
                    this.type_style2 = "type";
                } else {
                    this.type_style2 = "password";
                }
            },
            reg(tel, pass, repass, code){
                if (tel === "" || pass === "" || repass === "" || code === "") {
                    this.$toast.fail({
                        message: '请输入正确的数据',
                        overlay:true,
                        closeOnClickOverlay :true
                    })
                }
                let data = {
                    tel: tel,
                    pass: pass,
                    repass: repass,
                    code: code
                };
                registeredService.reg(data).then(res=>{
                   console.log(res)
                    console.log(res.data)
                    let code = res.errcode
                    if(code === 1000){
                        let status = res.data.status;
                        let msg = res.data.msg;
                        if(status == "ok"){
                            let loginInfo = {
                                uid: res.data.uid
                            };
                            setCookie("figure", this.figure);
                            setCookie("loginInfo", loginInfo);
                            setCookie("isLogin", true, 1);
                            if (this.from_iden == "home") {
                                this.$router.push("/home");
                            } else if (this.from_iden == "aoyi") {
                                this.$router.push("/aoyi");
                            } else if (this.from_iden == "qingniao") {
                                this.$router.push("/qingniao");
                            }else{
                                this.$router.push("/hata");
                            }
                        }else {
                            this.$dialog.confirm({
                                title: "温馨提示",
                                message: msg
                            })
                                .then(() => {
                                    // on confirm
                                    this.$router.push("/login");
                                })
                                .catch(() => {
                                    // on cancel
                                    this.$router.push("/registered");
                                });
                        }
                    }
                })
            },
            toAgreement(){

            },
            to_xuanze(index) {
                this.radio = index;
                this.index = index;
            },
            //获取验证码之后  显示时间
            handle_time() {
                this.hanld_msg = false;
                this.content = this.totalTime + "s后重新发送";
                let clock = window.setInterval(() => {
                    this.totalTime--;
                    this.content = this.totalTime + "s后重新发送";
                    if (this.totalTime < 0) {
                        window.clearInterval(clock);
                        this.content = "重新发送验证码";
                        this.totalTime = 120;
                        this.hanld_msg = true; //这里重新开启
                    }
                }, 1000);
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#registered{
    width: 100%;
    background-color: #f5f5f5;
    height: 100%;
    .content_box{
        padding-top: 70px;
        width: 80%;
        margin: 0 auto;
        .address{
            height: 44px;
            border-bottom: 1px solid #e5e5e5;
            .sex{
                line-height: 44px;
                position: relative;
                font-size: 16px;
            }
        }
        .password,.repassword{
            display: flex;
            justify-content: space-between;
            .icon-mima-yanjing-guanbi,.icon-mingshizaixian{
                color: red;
                margin-right: 8px;
            }
        }
        .phone,.reg,.password,.repassword{
            border-bottom: 1px solid #eee;
            height: 45px;
            line-height: 50px;
            input{
                margin-left: 10px;
                border: 0;
                outline: none;
                background-color: transparent;
            }
            .get{
                float: right;
                text-align: center;
                border-radius: 10px;
                width: 50px;
                height: 25px;
                line-height: 25px;
                border: 1px solid red;
                color: red;
                margin-top: 10px;
            }
            .msg{
                float: right;
                text-align: center;
                height: 25px;
                line-height: 25px;
                margin-top: 10px;
            }
        }
        .color_btn{
            width: 50%;
            background: linear-gradient(180deg,#fc6785,red);
            line-height: 40px;
            font-size: 17px;
            color: #fff;
            text-align: center;
            margin: 40px auto 10px;
            border-radius: 30px;
        }
        .fon{
            font-size: 12px;
            text-align: center;
            color: #999;
            span{
                color: #000;
            }
        }
    }
}
    #lump{
        padding-bottom: 25%;
        position: relative;
        top: 0;
        width: 100%;
        left: 0;
        margin: 0 auto;
        background: linear-gradient(90deg,#f80e2d,#fc6785);
        height: 120px;
        .lump_item{
            width: 100%;
            left: 0;
            margin: 0 auto;
            background: linear-gradient(90deg,#f80e2d,#fc6785);
            border-radius: 50%;
            position: absolute;
            top: 90px;
            height: 60px;
        }
    }
</style>