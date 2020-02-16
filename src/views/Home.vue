<template>
    <div id="home">
        <!-- 头部背景 -->
        <wave></wave>
        <!-- 客服按钮 -->
        <kefu-btn></kefu-btn>
        <div class="content_box">
            <!--            <div class="font">-->
            <!--                <van-notice-bar text="通知内容" left-icon="volume-o"/>-->
            <!--            </div>-->
            <!--            头部-->
            <div class="head">
                <head-all
                        :show_logo="true"
                        :show_share="true"
                        style="position:relative;top:0;margin:10px 0;"
                ></head-all>
                <div class="head_m" @click="to_search">
                    <span>{{getword}}</span>
                    <i class="iconfont icon-fangdajing"></i>
                </div>
                <div class="head_b"></div>
            </div>
            <!--轮播图-->
            <div class="swiper_load" v-if="ads.length <= 1">
                <van-loading color="white" size="40px"/>
            </div>
            <swipe :ads="ads" v-if="ads.length > 1"></swipe>
            <!--导航-->
            <div class="iconBox">
                <div class="top">
                    <div class="fir" @click="to_yuketang">
                        <span class="tubiao tubiao0">
                            <i class="iconfont icon-ketang"></i>
                        </span>
                        <span class="font">瑜课堂</span>
                    </div>
                    <div @click="to_introduce(1)">
                         <span class="tubiao tubiao1">
                        <i class="iconfont icon-zixun"></i>
                         </span>
                        <span class="font">资讯</span>
                    </div>
                    <div @click="to_introduce(7)">
                     <span class="tubiao tubiao4">
                         <i class="iconfont icon-hotel"></i>
                    </span>
                        <span class="font">会馆</span>
                    </div>
                    <div @click="to_introduce(5)">
                         <span class="tubiao tubiao5">
                        <i class="iconfont icon-yezhudahui"></i>
                     </span>
                        <span class="font">大会</span>
                    </div>
                </div>
                <div class="bottom" style="position: relative;margin-right: 66%;">
                    <div @click="to_introduce(6)" style="width: 100%">
            <span class="tubiao tubiao5">
              <i class="iconfont icon-mingshizaixian"></i>
            </span>
                        <span class="font">名師</span>
                    </div>
                </div>
            </div>
            <!-- vip -->
            <div class="vip_info" @click="to_vip">
                <div>
                    <h3>VIP视频年卡</h3>
                    <span>“精选私课”内容 全部名师视频课程</span>
                </div>
                <img src="../assets/img/vip_logo.4fde462.png" alt/>
            </div>
            <div class="wrap">
                <!-- 咨询 tab -->
                <div class="consultingBox">
                    <van-tabs
                            v-model="Active"
                            sticky
                            :line-width="25"
                            :line-height="1"
                            title-active-color="#ff0000"
                            @click="click"
                    >
                        <van-tab :title="item" v-for="(item,index) in title" :key="index">
                            <div class="listBox"
                                 @click="to_articleDetails(item.id,item.model_id)"
                                 v-for="item in tab_list"
                                 :key="item.id">
                                <div class="left">
                                    <img :src="img_path+item.figure"/>
                                </div>
                                <div class="right">
                                    <div class="right_con">
                                        <div class="top">
                                             <span class="fontBox">
                                              <span class="iconAtlas">{{model_name}}</span>
                                                {{item.title}}
                                             </span>
                                        </div>
                                        <div class="bottom">
                                            <span class="fontGreen">{{item.class_name}}</span>
                                            <span class="timeBox">{{creat_time}}</span>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <!-- 瑜伽士 -->
                <div class="yujiashiBox">
                    <div class="personnel">
                        <div class="top">
              <span class="left">
                <b>瑜伽仕</b>
              </span>
                            <span class="right" @click="to_introduce(6)">查看更多>></span>
                        </div>
                        <div class="bottom">
                            <div v-for="item in coach" :key="item.id" @click="to_teacherInfo(item.id)">
                <span class="per">
                  <img :src="img_path+item.figure" alt=""/>
                </span>
                                <span>{{item.title}}</span>
                                <span class="gray yichu1">{{item.style}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 活动 -->
                    <div class="activityBox">
                        <div class="top">
                        <span class="left">
                            <b>活动排期</b>
                        </span>
                            <span class="right"></span>
                        </div>
                        <div class="con">
                            <div class="line"></div>
                            <div class="con_box">
                                <ul class="roll-ul">
                                    <li
                                            v-for="item in notice"
                                            ref="rollul"
                                            :key="item.id"
                                            @click="to_articleDetails(item.id)"
                                    >
                                        <p class="time">{{item.start_time}} — {{item.end_time}}</p>
                                        <p class="title yichu1">{{item.title}}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <!-- 瑜课堂 -->
                    <div class="yogaketang">
                        <div class="top">
                        <span class="left">
                            <b>瑜课堂</b>
                        </span>
                            <span class="right">
                            查看更多>>
                        </span>
                        </div>
                        <div class="bottom">
                            <div class="listBox"
                                 v-for="item in ke"
                                 :key="item.id"
                            >
                                <div class="left">
                                    <img :src="img_path+item.figure" alt=""/>
                                    <!-- 限时折扣 -->
                                    <div v-if="item.sale_info.model_id == 2" class="angle1">
                                        <div>
                                            <img src="../assets/img/zhe.png" alt/>
                                        </div>
                                    </div>
                                    <!-- 立减 -->
                                    <div class="angle1" v-if="item.sale_info.model_id == 3">
                                        <div>
                                            <img src="../assets/img/jian.png" alt/>
                                        </div>
                                        <!-- 限时减价 -->
                                        <!-- <span style="margin-left:10px;">{{item.sale_info.down}}元</span> -->
                                    </div>
                                    <!-- 秒杀 -->
                                    <div class="angle1" v-if="item.sale_info.model_id == 4">
                                        <div>
                                            <img src="../assets/img/miao.png" alt/>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="top">
                                        <span class="fontBox">{{item.title}}</span>
                                    </div>
                                    <div class="middle">{{item.viewed}}人已关注</div>
                                    <div class="bottom">
                                        <span class="price">￥{{item.day_price}}</span>
                                        <span class="ori_price">￥{{item.price}}</span>
                                        <img
                                                src="../assets/img/vip_mark1.gif"
                                                alt
                                                class="vip_card"
                                                v-show="isGroup=='是'"
                                                @click="to_vip"
                                        />
                                        <img src="../assets/img/vip.svg" alt="" v-show="isGroup=='否'"
                                             style="width: 22px">
                                    </div>

                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 功能需求 -->
                    <div class="xuqiu">
                        <div class="top">
                            <span class="left">
                                     <b>{{virtue}}</b>
                            </span>
                            <span class="right">查看更多>></span>
                        </div>
                        <div class="bottom">
                            <div class="item" v-for="item in xu" :key="item.id">
                                <div class="top" v-show="item.label != null">{{item.label}}</div>
                                <div class="img">
                                    <img :src="img_path+item.figure" alt=""/>
                                </div>
                                <div class="fon">{{item.title}}</div>
                                <div class="bottomFon">
                                    <span class="left">免费</span>
                                    <span class="right">{{item.viewed}} 人已关注</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="b-m">
            <router-link to="/wechats/message" style="color:#999;">· 平台信息</router-link>
            <router-link to="/wechats/privacy" style="color:#999;">· 用户隐私条款</router-link>
            <router-link to="/wechats/protocol" style="color:#999;">· 平台服务协议 ·</router-link>
        </div>
        <div style="width: 100%;">
            <img    style="width: 100%;"
                    src="../assets/img/f2fe6fc080a5d7fa51f24f6f375d8856.jpg" alt="">
        </div>
        <red-packet :price="price" v-if="is_show && isActivity == -1"></red-packet>
        <app-footer :active="0" class="footer"></app-footer>
    </div>
</template>

<script>
    import Wave from "../components/wave/wave";
    import KefuBtn from "../components/kefu/kefuBtn";
    import Swipe from "../components/swipe/swipe";
    import AppFooter from "../components/AppFooter/AppFooter";

    import {mobileService} from "../assets/js/http/home/home";
    import RedPacket from "../components/redPacket/redPacket";
    import {getCookie} from "../assets/js/util";
    export default {
        name: 'home',
        data() {
            return {
                getword: '请输入搜索内容',
                ads: [],
                Active: 0,
                title: ["最新", "热推", "专题"],
                tab_list: [],
                model_name: "",
                creat_time: "",
                img_path: "http://img.yujia.com/",
                coach: [],
                notice: [],
                ke: [],
                isGroup: "",
                xu: [],
                virtue: "功效需求",
                price:0,
                is_show: false,
                isActivity:false,
                loading: true
            }
        },
        created() {
            setInterval(this.scroll, 2000)
        },
        mounted() {
            this.loading = false;
            this.get_index()
            this.get_tui_list(1)
        },
        methods: {
            get_index() {
                let that = this;
                mobileService.index().then(res => {
                    let code = res.errcode
                    if (code === 1000) {
                        let is_new = res.data.is_new;
                        that.isActivity = res.data.is_double11;
                        that.ads = res.data.ads.list;
                        that.coach = res.data.coach.list;
                        that.notice = res.data.notice.list;
                        that.ke = res.data.ke.list;
                        that.xu = res.data.xu.list;
                        if (!is_new) {
                            if (!getCookie("loginInfo")) {
                                this.is_show = true;
                            }
                        } else {
                            that.is_show = false;
                        }
                    }
                    that.price = res.data.price;
                })
            },
            to_search() {
                this.$router.push({
                    name: "search",
                });
            },
            to_yuketang() {
                this.$router.push({
                    name:"yuketang"
                })
            },
            to_introduce() {
                this.$router.push({
                    name: "introduce",
                    params: {
                        id: '2',
                        class_id: '3'
                    },
                    query: {
                        id: '5',
                        class_id: '2'
                    }
                });
            },
            to_vip() {

            },
            click(e) {
                let index = e + 1
                this.get_tui_list(index)
            },
            to_teacherInfo() {

            },
            get_tui_list(index) {
                let that = this;
                let data = {
                    type: index
                }
                mobileService.get_tui_list(data).then(res => {
                    let code = res.errcode
                    if (code === 1000) {
                        that.tab_list = res.data.list
                        that.tab_list.forEach(res => {
                            that.creat_time = res.creat_time.substr(0, 10);
                            that.model_name = res.model_name
                        })
                    }
                })
            },
            scroll() {
                this.animate = !this.animate;
                setTimeout(() => {
                    this.notice.push(this.notice[0]);
                    this.notice.shift()
                    this.animate = !this.animate;
                }, 0)
            }
        },
        components: {
            RedPacket,
            AppFooter,
            Swipe,
            KefuBtn,
            Wave,
        }
    }
</script>

<style scoped lang="scss">
    #home {
        width: 100%;
        height: auto;
        background: #fff;

        .van-notice-bar .van-icon {
            color: black;
        }

        .van-popup {
            width: 80%;
            border-radius: 5px;
        }

        #wave {
            height: 300px;
            top: 0;
        }

        .content_box {
            position: relative;

            .head {
                width: 100%;

                .head_m {
                    width: 68%;
                    margin: 2px auto;
                    color: #fff;
                    background: hsla(0, 0%, 100%, .5);
                    height: 35px;
                    padding-left: 20px;
                    line-height: 35px;
                    border-radius: 50px;
                    position: relative;

                    i {
                        position: absolute;
                        right: 15px;
                    }
                }

                .head_b {
                    display: block;
                    margin: 10px auto 15px;
                }
            }

            .swiper_load {
                position: relative;
                left: calc(50% - 25px);
                overflow: hidden;
                width: 100%;
                height: 0;
                padding-bottom: 50.6%
            }

            .iconBox {
                width: 100%;
                background: #fff;

                .top, .bottom {
                    padding: 0 16px;
                    height: 40%;
                    justify-content: center;
                    align-items: center;
                    display: flex;

                    div {
                        width: 24%;

                        span {
                            display: block;
                            border-radius: 10px;
                            text-align: center;
                            line-height: 45px;
                            color: #ffffff;
                        }

                        .tubiao {
                            width: 45px;
                            height: 45px;
                            margin: 5px auto;
                            border-radius: 15px;

                            i {
                                font-size: 24px;
                            }

                        }

                        .tubiao0 {
                            background: linear-gradient(to left top, #ff5a63, #ffdc83);
                        }

                        .tubiao1 {
                            background: linear-gradient(to left top, #f98c53, #ffe576)
                        }

                        .tubiao4 {
                            background: linear-gradient(to left top, #84a4e9, #ffd2d4);
                        }

                        .tubiao5 {
                            background: linear-gradient(to left top, #45cdd8, #fff071);
                        }

                        .font {
                            font-size: 13px;
                            margin-top: -14px;
                            color: #b4b3b3;
                        }
                    }
                }
            }
        }

        .vip_info {
            width: 88%;
            height: 60px;
            border-radius: 100px;
            margin: 12px auto;
            background: -webkit-gradient(linear, left top, right bottom, from(#ff6958), to(red));
            background: -webkit-linear-gradient(to left top, #ff6958, red);
            background: linear-gradient(to left top, #ff6958, red);
            color: #fff;
            position: relative;
            box-shadow: 0 0 10px rgba(243, 7, 15, 0.6);

            div {
                width: 78%;
                text-align: center;
                padding: 9px 0;

                span {
                    font-size: 12px
                }
            }

            img {
                width: 18%;
                position: absolute;
                right: 24px;
                bottom: 12px
            }
        }
    }

    .wrap {
        width: 94%;
        margin: 0 auto;

        .consultingBox {
            padding: 8px;
            background: #fff;

            .listBox {
                margin: 10px 0;
                padding: 3px;
                background-color: #fff;
                width: 100%;
                display: flex;
                flex-direction: row;

                .left {
                    width: 40%;
                    height: 100%;

                    img {
                        width: 100%;
                        border-radius: 10px;
                    }
                }

                .right {
                    margin-left: 10px;
                    width: 58%;

                    .right_con {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 100%;

                        .top {
                            margin-top: 3px;

                            .fontBox {
                                display: -webkit-box;
                                text-overflow: ellipsis;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                            }

                            .iconAtlas {
                                width: 30px;
                                height: 18px;
                                background: red;
                                border-radius: 5px;
                                color: #fff;
                                font-size: 12px;
                                text-align: center;
                                display: inline-block;
                                margin-right: 5px;
                                vertical-align: top;
                            }
                        }

                        .bottom {
                            margin-bottom: 3px;
                            display: flex;
                            justify-content: space-between;
                            line-height: 28px;

                            .fontGreen, .timeBox {
                                font-size: 12px;
                                color: #777;

                            }
                        }
                    }
                }
            }
        }

        .van-tabs--line {
            /*padding-top: 44px;*/
        }

        .yujiashiBox {
            background: #fff;

            .personnel, .activityBox {
                padding: 10px;

                .top {
                    position: relative;
                    height: 40px;
                    line-height: 27px;

                    .left {
                        display: inline-block;
                        font-size: 18px;

                        b {
                            padding-left: 15px;

                            &:after {
                                content: "";
                                width: 4px;
                                height: 68%;
                                background: red;
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 1;
                            }
                        }
                    }

                    .right {
                        position: absolute;
                        right: 0;
                        color: red;
                        font-size: 12px;
                    }
                }

                .bottom {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    flex-flow: wrap;
                    overflow: hidden;

                    div {
                        width: 25%;
                        text-align: center;
                        margin-bottom: 20px;

                        span {
                            width: 100%;
                            white-space: nowrap;
                            display: block;
                            font-size: 14px;
                            line-height: 20px;
                        }

                        .per {
                            width: 64px;
                            height: 64px;
                            margin: 0 auto;
                            border-radius: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                overflow: hidden;
                                border-radius: 50%;
                            }
                        }

                        .gray {
                            color: #515151;
                            font-size: 12px;
                        }
                    }

                    .yichu1 {
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            }

            .activityBox {
                padding: 10px;

                .con {
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-bottom: 41.7%;
                    overflow: hidden;
                    transition: all .5s;
                    background: url(../assets/img/conn.png) no-repeat;
                    background-size: 100%;

                    .line {
                        width: 3px;
                        height: 28%;
                        position: absolute;
                        right: 11px;
                        background: red;
                        animation: mymove-data 2s infinite;
                        @keyframes mymove-data {
                            0% {
                                top: 90px;
                                height: 28%
                            }
                            5% {
                                top: 58px;
                                height: 28%
                            }
                            85% {
                                top: 58px;
                                height: 28%
                            }
                            100% {
                                top: 15px;
                                height: 0
                            }
                        }
                    }

                    .con_box {
                        position: absolute;
                        width: 100%;
                        top: calc(50% - 35px);
                        height: 70px;
                        overflow: hidden;
                    }

                    ul {
                        height: 500px;

                        li {
                            width: 92%;
                            height: 42px;
                            line-height: 25px;
                            margin: 15px 0;
                            position: relative;
                            z-index: 2;
                            color: #999494;
                            text-align: center;

                            .title {
                                color: #ff0000;
                                font-size: 16px
                            }

                            .time {
                                font-size: 14px;
                                color: #000
                            }
                        }
                    }
                }
            }

            .yogaketang {
                padding: 10px;

                .top {
                    position: relative;

                    .left {
                        display: inline-block;
                        font-size: 18px;

                        b {
                            padding-left: 15px;

                            &:after {
                                content: "";
                                width: 4px;
                                height: 100%;
                                background: red;
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 1;
                            }
                        }
                    }

                    .right {
                        position: absolute;
                        right: 0;
                        color: red;
                        font-size: 12px;
                    }
                }

                .bottom {
                    .listBox {
                        margin-top: 10px;
                        padding: 3px;
                        background-color: #fff;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: row;

                        .left {
                            width: 40%;
                            height: 100%;
                            position: relative;

                            img {
                                width: 100%;
                                height: auto
                            }
                        }

                        .right {
                            margin-left: 8px;
                            width: 58%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .top {
                                position: relative;

                                .fontBox {
                                    display: -webkit-box;
                                    overflow: hidden;
                                }
                            }

                            .middle {
                                font-size: 12px;
                                color: #515151;
                                line-height: 25px;
                            }

                            .bottom {
                                display: flex;
                                align-items: center;

                                .price {
                                    font-size: 16px;
                                    font-weight: 700;
                                    color: red;
                                }

                                .ori_price {
                                    width: 26%;
                                    text-decoration: line-through;
                                    font-size: 12px;
                                    margin: 0 15px 0 5px;
                                    color: #515151;
                                }

                                .vip_card {
                                    width: 50%;
                                }
                            }
                        }
                    }
                }
            }

            .xuqiu {
                padding: 10px;
                height: auto;

                .top {
                    position: relative;
                    height: 40px;
                    line-height: 27px;

                    .left {
                        display: inline-block;
                        font-size: 18px;

                        b {
                            padding-left: 15px;

                            &:after {
                                content: "";
                                width: 4px;
                                height: 68%;
                                background: red;
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 1;
                            }
                        }
                    }

                    .right {
                        position: absolute;
                        right: 0;
                        color: red;
                        font-size: 12px;
                    }
                }

                .bottom {
                    width: 100%;
                    display: flex;
                    flex-flow: wrap;
                    align-items: center;
                    justify-content: space-between;

                    .item {
                        width: 48%;
                        margin: 10px 0;

                        .img {
                            width: 100%;

                            img {
                                width: 100%;
                                height: auto;
                            }
                        }

                        .fon {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                        }

                        .bottomFon {
                            margin-top: 5px;
                            font-size: 12px;
                            position: relative;

                            .left {
                                color: red;
                            }

                            .right {
                                position: absolute;
                                right: 0;
                                font-size: 12px;
                                color: #777;
                            }
                        }
                    }
                }
            }
        }

    }

    .b-m {
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
    .adImg{
        width: 100%;
        img{
            width: 100%;
        }
    }
</style>