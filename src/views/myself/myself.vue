<template>
    <div id="myself">
        <wave class="wave"></wave>
        <loading v-if="isLoading" css="background:#fff;top:0;"></loading>
        <div class="content_box">
            <div :class="!is_tel ? 'header':'header head_bottom_60'">
                <div class="left" @click="headerSide">
                    <i class="iconfont icon-huangguan-jin" v-if="is_card"></i>
                    <div class="headPortrait">
                        <svg class="icon iconimg" aria-hidden="true" v-if="!figure">
                            <use xlink:href="#icon-yonghu-touxiang" />
                        </svg>
                        <img :src="figure" alt v-if="!figure_url" />
                        <img :src="img_path + figure_url" alt v-if="figure_url" />
                    </div>
                    <div class="information">
                        <p class="top">{{nickname}}</p>
                        <p class="bottom">
                            <span class="icon">
                                <i class="iconfont icon-shouji"></i>
                            </span>
                            <span class="phoneNum">
                                {{acount}}
                            </span>
                        </p>
                    </div>
                    <i class="iconfont icon-bianji"></i>
                </div>
                <div class="box" v-if="!is_tel">
                    <div class="box_line">
                        <div class="bang">
                            <div>
                                <i class="iconfont icon-bangdingshoujihao">
                                    <span>
                                        绑定手机号
                                    </span>
                                </i>
                            </div>
                            <p>
                                去绑定>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="theZone">
                <div>
                    <div class="tubiao0">
                        <i class="iconfont icon-haopingfanxian"></i>
                    </div>
                    <span>每日返现</span>
                </div>
                <div>
                    <div class="tubiao1">
                        <i class="iconfont icon-youhuiquan"></i>
                    </div>
                    <span>优惠券</span>
                </div>
                <div>
                    <div class="tubiao2">
                        <i class="iconfont icon-jifen6"></i>
                    </div>
                    <span>积分</span>
                </div>
                <div @click="to_qiandao">
                    <div class="tubiao3">
                        <i class="iconfont icon-daqia"></i>
                    </div>
                    <span>打卡</span>
                </div>
            </div>
            <div class="more">
                <div class="members">
                    <div class="left">
                        <span class="Ico">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-huiyuan" />
                            </svg>
                        </span>
                        <span class="font">
                            我的年卡会员
                        </span>
                    </div>
                    <div class="right">
                        <span class="font" v-if="dredgeShow">已开通</span>
                        <span class="font" v-if="!dredgeShow">未开通</span>
                    </div>
                </div>
                <div class="members">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-huiyuan2" style="color:#ffc107"></i>
                        </span>
                        <span class="font">折扣卡</span>
                    </div>
                    <div class="right">
                        <span class="font" v-if="is_card">已开通</span>
                        <span class="font" v-if="!is_card">未开通</span>
                    </div>
                </div>
                <div class="members">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-gouwudai"></i>
                        </span>
                        <span class="font">已购课程</span>
                    </div>
                    <div class="right">
                        <span class="font">
                            共
                            <span>{{ke_num}}</span> 部
                            <!-- > -->
                        </span>
                        <span>
                            <i class="iconfont icon-xiangyou"></i>
                        </span>
                    </div>
                </div>
                <div class="members">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-shoucang2"></i>
                        </span>
                        <span class="font">我的收藏</span>
                    </div>
                    <div class="right">
                        <span class="font">查看</span>
                    </div>
                </div>
                <div class="members">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-dingdan"></i>
                        </span>
                        <span class="font">我的订单</span>
                    </div>
                    <div class="right">
                        <span class="font">
                            共
                            <span>{{order_num}}</span> 条订单
                        </span>
                        <span>
                            <i class="iconfont icon-xiangyou"></i>
                        </span>
                    </div>
                </div>
                <div class="members"  @click="to_shopCar">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-gouwuche-copy"></i>
                        </span>
                        <span class="font">购物车</span>
                    </div>
                    <div class="right">
                        <span class="font">更多好物在这里</span>
                        <span>
                            <i class="iconfont icon-xiangyou"></i>
                        </span>
                    </div>
                </div>
                <div class="members"  v-if="is_dist == true?true:false ">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-fenxiao1"></i>
                        </span>
                        <span class="font">我的分销</span>
                    </div>
                    <div class="right">
                        <span class="font">推广收益</span>
                    </div>
                </div>
                <div class="members" v-if="is_dist == false?true:false">
                    <div class="left">
                        <span class="Ico">
                            <i class="iconfont icon-fenxiao1"></i>
                        </span>
                        <span class="font">申请分销</span>
                    </div>
                    <div class="right">
                        <span class="font">推广收益</span>
                    </div>
                </div>
                <div class="footerBox">
                    <van-button round @click="loginBtn">退出登录</van-button>
                </div>
            </div>
            <div class="copy_banner">
                <p>关注“瑜伽网Yogis”，获取最新瑜伽资讯~</p>
                <div
                        type="button"
                        class="color_btn"
                        v-clipboard:copy="copy_message"
                        v-clipboard:success="oncopy"
                        v-clipboard:error="onerror"
                >点击复制</div>
            </div>
            <div class="copy_toast" v-if="copy_tit">公众号已复制，请粘贴至微信搜索添加~</div>
        </div>
        <app-footer :active="3"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../../components/AppFooter/AppFooter";
    import Wave from "../../components/wave/wave";
    import Loading from "../../components/loading/loading";
    import {
        getStorage
    } from "../../assets/js/util";
    import {
        myselfService
    } from "../../assets/js/http/myself/myself";

    export default {
        name: "myself",
        components: {
            Loading,
            Wave,
            AppFooter
        },
        data() {
            return {
                img_path: "http://img.yujia.com/",
                isLoading: false,
                is_card: false,
                is_tel: true, //是否绑定手机号
                figure: "",
                figure_url: "",
                nickname: "",
                acount: "",
                dredgeShow: true,
                ke_num: 0,
                order_num:0,
                is_dist: false,
                //复制的文本
                copy_tit: false,
                copy_message: "瑜伽网Yogis",
            }
        },
        created() {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                console.log('微信浏览器')
                // if (PARAMS.islogin == 1 && !getCookieStorage("loginInfo")) {
                //     axios.get("/mobile/wx_login").then(function(res) {
                //         if (res.data.errcode == 1000) {
                //             setCookie("isLogin", true, 1);
                //             let loginInfo = {
                //                 uid: res.data.data.uid
                //             };
                //             setCookieStorage("loginInfo", loginInfo);
                //             setCookieStorage("figure", res.data.data.figure);
                //             window.location.reload();
                //             return false;
                //         }
                //     });
                // } else if (getCookieStorage("loginInfo")) {
                //     this.getUserinfor();
                // } else {
                //     this.$router.push({
                //         path: "/login",
                //         query: { redirect: location.hostname }
                //     });
                // }
            } else {
                if (!getStorage("loginInfo")) {
                    this.$router.push({
                        path: "/login",
                        query: {
                            redirect: location.hostname
                        }
                    });
                } else {
                    // this.imgPatn = global.img_path;
                    this.getUserinfor();
                }
            }
        },
        methods: {
            getUserinfor() {
                let that = this;
                let data = {
                    uid: getStorage("loginInfo").uid
                }
                that.isLoading = true
                myselfService.getUserInfo(data).then(res => {
                    console.log(res)
                    let code = res.errcode
                    if (code === 1000) {
                        that.isLoading = false;
                        that.is_tel = res.data.is_tel
                        that.nickname = res.data.nickname;
                        that.acount = res.data.acount;
                    }
                })
            },
            headerSide() {

            },
            loginBtn(){

            },
            oncopy(e) {
                let that = this;
                that.copy_tit = true;
                setTimeout(function() {
                    that.copy_tit = false;
                }, 1500);
            },
            onerror(e) {
                let that = this;
                that.copy_tit = true;
                setTimeout(function() {
                    that.copy_tit = false;
                }, 1500);
            },
            to_qiandao(){
                this.$router.push("/myself/punchCard");
            },
            to_shopCar(){
              this.$router.push({
                  name:'cart'
              })
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #myself {
        width: 100%;
        overflow: hidden;
        background: #fff;
        height: 128%;
        position: relative;

        .wave {
            height: 200px !important;
        }

        .content_box {
            width: 100%;
            position: absolute;

            .head_bottom_60 {
                padding-bottom: 60px;
            }

            .header {
                width: 100%;
                padding-top: 70px;

                .left {
                    width: 85%;
                    color: #fff;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    position: relative;

                    div {
                        display: inline-block;
                    }

                    .headPortrait {
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        overflow: hidden;
                        border: 1px solid #fff;
                    }

                    .information {
                        width: 70%;
                        margin-left: 10px;

                        .top {
                            font-size: 18px;
                            color: #fff;
                            font-style: normal;
                        }
                    }
                }
            }

            .theZone {
                width: 94%;
                margin: 20px auto 30px;
                display: flex;
                align-items: center;

                div {
                    width: 25%;
                    margin: 0 auto;
                    text-align: center;

                    div {
                        width: 35px;
                        height: 35px;
                        line-height: 35px;
                        border-radius: 50%;
                        color: #fff;
                        margin-bottom: 5px;
                    }

                    .tubiao0 {
                        background: linear-gradient(left top, #ffdc83, #ff5a63);
                    }

                    .tubiao1 {
                        background: linear-gradient(left top, #ffe576, #f98c53);
                    }

                    .tubiao2 {
                        background: linear-gradient(left top, #fff071, #45cdd8);
                    }

                    .tubiao3 {
                        background: linear-gradient(left top, #ffd2d4, #84a4e9);
                    }
                }
            }
            .more{
                width: 94%;
                .members{
                    background-color: #fff;
                    margin-top: 10px;
                    padding: 15px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .left{
                        .Ico{
                            margin-right: 5px;
                            i{
                                font-size: 18px;
                            }
                            .icon-gouwudai{
                                color: rgba(67,67,235,.418);
                            }
                            .icon-shoucang2 {
                                color: #ffc107;
                            }
                            .icon-dingdan {
                                color: #3cc43c;
                            }
                            .icon-gouwuche-copy {
                                color: #ffc107;
                            }
                            .icon-fenxiao1 {
                                color: rgba(67,67,235,.418);
                            }
                        }
                        .font{
                            font-size: 16px;
                        }
                    }
                    .right{
                        font-size: 14px;
                        color: #757575;
                        span{
                            font-size: 14px;
                            color: #757575;
                            span{
                                color: #f60;
                            }
                        }
                    }
                }
                .footerBox{
                    height: 80px;
                    margin: 30px auto 0;
                    text-align: center;
                    line-height: 80px;
                    padding-bottom: 140px;
                    background: #fff;
                    .van-button{
                        width: 50%;
                        background: linear-gradient(180deg,#ff4671,red);
                        color: #fff;
                        font-size: 15px;
                    }
                }
            }
        }

        .icon {
            font-size: 18px;
        }

        .iconimg {
            width: 100%;
            height: 100%;
        }

        .icon-bianji {
            font-size: 25px;
        }

        .box {
            margin-top: 35px;
            overflow: hidden;

            .box_line {
                width: 150%;
                height: 100px;
                border-radius: 100%;
                margin: -40px 0 0 -25%;
                border: 2px solid #eee;
                overflow: hidden;
                background: linear-gradient(to right,red, #ff567d)
            }
        }

        .bang {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 58%;
            margin: -10px auto 0;
            border-radius: 10px;
            background: #fff;
            padding: 20px 15px;
            top: 48px;

            p {
                color: #ff0000
            }

            div {
                span {
                    margin-left: 5px;
                }
            }
        }
        .copy_banner{
            width: 100%;
            position: fixed;
            bottom: 50px;
            left: 0;
            background: rgba(0,0,0,.5);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 12px!important;
            div{
                background: red;
                border-radius: 15px;
                margin: 5px 0;
                padding: 5px 10px;
                font-size: 12px!important;
            }
        }
        .copy_toast {
            width: 80%;
            margin: 0 auto;
            height: 35px;
            font-size: 13px;
            line-height: 35px;
            background: rgba(0,0,0,0.7);
            position: fixed;
            top: calc(50% - 35px);
            left: 10%;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            z-index: 2
        }
    }
    @media screen and (max-width: 310px) {
        #myself {
            .copy_banner{
                div{
                    padding:5px 5px !important
                }
            }
        }
    }
</style>