<template>
    <div id="descript">
        <div class="content_box">
            <head-all :show_logo="false" :show_share="false"></head-all>
            <div class="banner">
                <div class="top">
                    <img :src="img_path+list.figure" alt="">
                    <span class="getCoupon" @click="acquireCounpon">
                        领卷
                    </span>
                </div>
                <span class="angles" v-if="sale_info.model_id == 2">
                    限时折扣
                    <span>
                        {{sale_info.dicct}}
                        折
                    </span>
                </span>
                <span class="angles" v-if="sale_info.model_id == 3">
                    限时减价
                    <span>
                        {{sale_info.down}}
                        元
                    </span>
                </span>
                <span class="angles" v-if="sale_info.model_id === 4">限时秒杀</span>
                <div class="activityBar" v-if="sale_info.model_id">
                    <p>
                        <span v-if="sale_info.model_id === 2">限时折扣</span>
                        <span v-if="sale_info.model_id === 3">限时减价</span>
                        <span v-if="sale_info.model_id === 4">距结束</span>
                        <span v-if="sale_info.model_id === 2" style="color: yellow;font-size: 16px;">
                            {{sale_info.dicct}}折
                        </span>
                        <span v-if="sale_info.model_id === 3" style="color: yellow;font-size: 16px;">
                            {{sale_info.down}}元
                        </span>
                        &nbsp;&nbsp; | &nbsp;&nbsp;
                        <span class="act_djs">{{hour}}</span> 时
                        <span class="act_djs">{{minute}}</span> 分
                        <span class="act_djs">{{second}}</span> 秒
                    </p>
                </div>
            </div>
            <div class="content">
                <div class="title">
                    {{list.title}}
                </div>
                <div class="ellipsis yichu2">
                    {{list.intro}}
                </div>
                <div class="money">
                    <span v-if="is_card == false?true:false">价格:</span>
                    <span v-if="is_card == false?false:true">会员价格:</span>
                    <span class="goldFon" v-show="buy">￥{{list_class.day_price}}</span>
                    <span class="goldFon" v-show="!buy">￥{{list_class.price}}</span>
                    <span>
                        <s>￥{{list_class.ori_price}}</s>
                    </span>
                    <span class="nitraria" @click="nitrariaBtn">
                        卡密激活
                    </span>
                </div>
                <div class="attrribute">
                    <span>属性：</span>
                    <span :class="buy?'active':'normal'" @click="isActive">
                        90天
                    </span>
                    <span :class=" !buy?'active': 'normal'" @click="isActive">永久</span>
                    <span class="normal_vip" @click="to_vip">vip免费看</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getStorage,
        setStorage
    } from "../assets/js/util";
    import {
        descriptService
    } from "../assets/js/http/descript/descript";

    export default {
        name: "descript",
        data() {
            return {
                id: "",
                list: {},
                sale_info: [],
                img_path: "http://img.yujia.com/",
                // 倒计时
                timer: "",
                hour: "",
                minute: "",
                second: "",
                differTime: "",
                is_card: false,
                buy: true,
                list_class: "",
            }
        },
        created() {

            if (this.$route.query.fnid) {
                let arr = this.$route.fullPath.split("&");
                let id_item = arr[0].split("=");
                let fnid = decodeURIComponent(arr[1]);
                this.id = id_item[1];
                if (getStorage("loginInfo")) {
                    //分销链接记录
                    let obj = {
                        from_uid: fnid
                    };
                    descriptService.add_fenxiao_log(obj).then(res => {});
                } else {
                    setStorage("fnid", fnid);
                }
            } else {
                this.id = this.$route.params.id;
                if (!this.id) {
                    this.id = this.$route.query.id;
                }
            }
        },
        mounted() {
            this.get_ke_info()
        },
        methods: {
            acquireCounpon() {

            },
            get_ke_info() {
                let that = this;
                let uid = "";
                if (getStorage("loginInfo")) {
                    uid = getStorage("loginInfo").uid
                }
                let data = {
                    id: that.id,
                    uid: uid
                }
                descriptService.get_ke_info(data).then(res => {
                    let code = res.errcode
                    if (code === 1000) {
                        that.list = res.data
                        that.list_class = res.data.class;
                    }
                    if (res.data.sale_info !== "") {
                        that.sale_info = res.data.sale_info
                        that.timer = setInterval(() => {
                            this.count_down()
                        }, 1000)
                    }
                })
            },
            count_down() {
                let that = this
                let now_time = new Date().getTime();
                let end_time = new Date(
                    that.sale_info.end_time.replace(/-/g, "/")
                ).getTime()
                let differ_time = end_time - now_time
                if (differ_time >= 0) {
                    that.hour = Math.floor(differ_time / 1000 / 60 / 60);
                    that.minute = Math.floor(differ_time / 1000 / 60 - that.hour * 60);
                    that.second = Math.floor(
                        differ_time / 1000 - that.hour * 60 * 60 - that.minute * 60
                    );
                    // 三元运算
                    that.hour < 10 ? (that.hour = "0" + that.hour) : that.hour;
                    that.minute < 10 ? (that.minute = "0" + that.minute) : that.minute;
                    that.second < 10 ? (that.second = "0" + that.second) : that.second;
                } else {
                    clearInterval(that.timer)
                }
            },
            nitrariaBtn() {

            },
            isActive(){
                this.buy = !this.buy
                
            },
            to_vip(){

            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #descript {
        width: 100%;
        background-color: #fff;
        height: 100%;
        margin-top: 45px;

        .content_box {
            .banner {
                position: relative;
                width: 100%;

                .top {
                    width: 100%;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

            }
            .content{
                width: 90%;
                margin: 10px auto 0;
                background-color: #fff;
                .title{
                    line-height: 27px;
                    font-size: 17px;
                    font-weight: 700;
                }
                .ellipsis{
                    margin-top: 10px;
                    height: 40px;
                    color: #777777;
                }
                .money{
                    margin-left: -5px;
                    margin-top: 10px;
                    height: 44px;
                    line-height: 44px;
                    font-size: 15px;
                    span{
                        margin: 0 5px;
                        s{
                            color: #777;
                            font-size: 13px;
                        }
                    }
                    .goldFon{
                        color:red;
                        font-weight: 700;
                        font-size: 15px;
                    }
                    .nitraria{
                        display: inline-block;
                        height: 25px;
                        width: 70px;
                        text-align: center;
                        line-height: 25px;
                        border-radius: 5px;
                        color: #cccccc;
                    }
                }
                .attrribute{
                    margin-left: -5px;
                    font-size: 14px;
                    height: 50px;
                    margin-top: 5px;
                    border-bottom: 1px solid #f5f5f5;
                    span{
                        margin: 0 10px;
                    }
                    .normal{
                        border: 1px solid #777;
                        border-radius: 5px;
                        padding: 4px 8px;
                    }
                    .active{
                        padding: 4px 8px;
                        background-color: red;
                        border: 1px solid red;
                        border-radius: 5px;
                        color: #ffffff;
                    }
                    .normal_vip{
                        border: 1px solid #dbbc8c;
                        border-radius: 5px;
                        padding: 4px 8px;
                        color: #dbbc8c;
                    }
                }
            }
        }

        .getCoupon {
            position: absolute;
            right: 0;
            bottom: 20px;
            font-size: 12px;
            color: #ffffff;
            background: red;
            padding: 5px 12px;
            border-radius: 15px 0 0 15px;
            text-align: center;
            margin-top: 2px;
            font-weight: 400;
        }

        .angles {
            position: absolute;
            left: 10px;
            top: 10px;
            background: rgba(182, 0, 0, .8);
            color: #ffffff;
            padding: 5px;
            line-height: 100%;
            border-radius: 2px;
            z-index: 9;
            font-size: 12px;

            span {
                margin-left: 10px;
            }
        }

        .activityBar {
            position: relative;
            width: 100%;
            height: 44px;
            padding: 0 15px;
            background: #e22d32;
            margin-top: -20px;

            p {
                color: #ffffff;
                height: 44px;
                line-height: 44px;
                text-align: center;
            }

            .act_djs {
                background: #fff;
                color: red;
                padding: 1px 2px;
                border-radius: 4px;
                font-weight: 700;
            }
        }
    }
</style>