<template>
    <div id="redPacket">
        <div class="redpacket">
            <van-popup v-model="packetshow">
                <div class="contant">
                    <div class="red_back1">
                        <div class="drawBtn" @click="getBtn">
                            <div>立即领取</div>
                        </div>
                        <div class="close" v-if="closeshow" @click="closeBtn">
                            <i class="iconfont icon-quxiao1"></i>
                        </div>
                    </div>
                    <div class="red_back2">
                        <div class="font">新人专享红包</div>
                        <div class="numberBox">
                            <span class="number">{{price}}</span>
                            <span class="numberYuan">元</span>
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import {getCookie} from "../../assets/js/util";

    export default {
        name: "redPacket",
        props: {
            price: {
                type: Number
            }
        },
        data() {
            return {
                packetshow: true,
                closeshow: true
            }
        },
        mounted() {
        },
        methods: {
            closeBtn() {
                this.packetshow = false;
                this.closeshow = false;
            },
            getBtn() {
                if (!getCookie("loginInfo")) {
                    this.$dialog.alert({
                        title: '提示',
                        message: "请先登录。",
                    }).then(() => {
                        this.$router.push({
                            path: '/login',
                            query: {redirect: location.hostname, to_login: this.to_login}
                        })
                        this.packetshow = false;
                        this.closeshow = false
                    })
                }
            }
        },
        component: {
            //someComponent

        }
    }
</script>
<style scoped lang="scss">
    @media screen and (max-height: 600px) {
        .red_back1 {
            top: 2rem !important;
        }
        .red_back2 {
            top: 0.8rem !important;
        }
    }

    #redPacket {
        position: absolute;
        top: 0;
        left: 0;

        .redpacket {
            .van-popup {
                width: 80%;
                height: 89%;
                background-color: transparent;

                .contant {
                    width: 100%;
                    height: 100%;

                    .red_back1 {
                        position: absolute;
                        top: 2.5rem;
                        left: -10.3%;
                        z-index: 90;
                        width: 100%;
                        height: 0;
                        padding-top: 70%;
                        background-image: url("../../assets/img/red_back1.png");
                        background-repeat: no-repeat;
                        background-size: 100% auto;

                        .drawBtn {
                            position: absolute;
                            top: 10%;
                            width: 100%;
                            height: 88%;
                            text-align: center;
                            font-size: 0.21rem;
                            color: #e4343a;

                            div {
                                width: 48%;
                                margin-top: 26.3%;
                                margin-left: 37%;
                            }
                        }

                        .close {
                            position: absolute;
                            bottom: -0.5rem;
                            left: 55%;
                            z-index: 120201020;

                            i {
                                color: #FFFFFF;
                                font-size: 30px;
                            }
                        }
                    }

                    .red_back2 {
                        position: absolute;
                        top: 1.3rem;
                        left: 9.8%;
                        width: 92%;
                        z-index: 10;
                        height: 2.2rem;
                        background-image: url("../../assets/img/red_back2.png");
                        background-repeat: no-repeat;
                        background-size: 100% auto;

                        .font {
                            width: 100%;
                            text-align: center;
                            margin-top: 22.7%;
                            margin-left: -6.4%;
                            font-size: 0.2rem;
                            color: #fc0002;
                        }

                        .numberBox {
                            width: 100%;
                            text-align: center;
                            margin-top: 0.8%;
                            margin-left: -8.6%;
                            position: relative;

                            .number {
                                font-size: 0.6rem;
                                font-weight: 100;
                                color: #fea23a;
                            }

                            .numberYuan {
                                position: absolute;
                                top: 0.16rem;
                                color: #fea23a;
                            }
                        }
                    }
                }
            }
        }
    }
</style>