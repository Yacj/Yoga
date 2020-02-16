<template>
    <footer id="foot">
        <div>
            <div class="link">
                <span>
                    瑜课堂主页
                </span>
                <span>
                    会员中心
                </span>
                <span @click="to_show_keman">
                    微信关注
                </span>
            </div>
            <div class="copyRight">
                @网站名字
            </div>
        </div>
        <div class="keman_w">
            <van-popup v-model="show_keman" :close-on-click-overlay="false">
                <div class="con">
                    <div class="content">
                        <i class="iconfont icon-weixinqun1"></i>
                        <div id="lump">
                            <div class="lupm_item"></div>
                        </div>
                        <div class="info">
                            <div>客服微信</div>
                            <div class="container">
                                <p id="wx_kefu">{{message}}</p>
                                <button type="button"
                                        class="color_btn"
                                        v-clipboard:copy="message"
                                        v-clipboard:success="oncopy"
                                        v-clipboard:error="onerror">点击复制打开微信添加</button>
                            </div>
                        </div>
                    </div>
                    <div class="guanbi" @click="to_show_keman">
                        <i class="iconfont icon-quxiao1"></i>
                    </div>
                </div>
            </van-popup>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "foot",
        data() {
            return {
                show_keman:false,
                message:'11111',
            }
        },
        mounted() {
        },
        methods:{
            to_show_keman(){
                this.show_keman = !this.show_keman
            },
            oncopy(e){
                this.$toast('复制到剪切板：'+e.text)
            },
            onerror(){
                this.$toast.error('复制失败')
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #foot{
        background-color: #fff;
        width: 100%;
        padding-bottom: 50px;
        .keman_w{
            .van-popup{
                width: 80%;
                height: 65%;
                border-radius: 10px;
                background-color: transparent;
                overflow: hidden;
            }
            .con{
                width: 100%;
                height: 100%;
                .content{
                    width: 100%;
                    background: #fff;
                    border-radius: 10px;
                    .icon-weixinqun1{
                        position: absolute;
                        top: 30px;
                        left:calc(50% - 28px );
                        z-index: 11;
                        font-size: 60px;
                        color:#fff;
                    }
                    .info{
                        padding-top: 40px;
                        text-align: center;
                        font-size: 16px;
                        #wx_kefu{
                            border: none;
                            font-size: 20px;
                            margin-bottom: 25px;
                            text-align: center;
                        }
                        .color_btn{
                            border: none;
                            width: 80%;
                            background: linear-gradient(to bottom,#fc6785,#ff0000);
                            line-height: 40px;
                            font-size: 16px;
                            color: #ffffff;
                            text-align: center;
                            border-radius: 20px;
                            margin: 10px auto;
                        }
                    }
                    .bottom{
                        margin-top: 20px;
                        font-size: 14px;
                        color: #ff0000;
                    }
                }
            }
        }
        .guanbi{
            width: 100%;
            height: 100%;
            margin-top: 20px;
            text-align: center;
            i{
                font-size: 28px;
                color: #ffffff;
            }
        }
    }
    .link{
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 12px;
        span:nth-child(2){
            border-left:1px solid #eee;
            border-right:1px solid #eee;
            padding:0 15px;
        }
        span{
            margin: 10px 5px;
            color:#777;
        }
    }
    .copyRight{
        width: 60px;
        height: 40px;
        margin: 0 auto;
    }
    #lump{
        // border-radius: 10px 10px 0 0;
        height:0;
        padding-bottom: 25%;
        width:100%;
        position: relative;
        top:0px;
        left:0px;
        margin:0 auto;
        background: linear-gradient(to right, #f80e2d , #fc6785);
        .lupm_item{
            height:100%;
            width:100%;
            border-radius: 50%;
            position: absolute;
            top:50%;
            left:0px;
            margin:0 auto;
            background: linear-gradient(to right, #f80e2d , #fc6785);
        }
    }
</style>