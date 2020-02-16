<template>
    <div>
        <div id="kefuBtn" @click="to_showKefu">
            <i class="iconfont icon-kefu">
            </i>
        </div>
        <div id="kefu">
            <van-popup v-model="show_kefu">
                <div class="content">
                    <div class="kefu_img">
                        <img src="../../assets/img/kefu.png" alt="">
                    </div>
                    <div id="lump">
                        <div class="lupm_item"></div>
                    </div>
                    <div class="info">
                        <div>客服微信 : <span>zhai</span></div>
                        <div class='phone'>店长电话 :
                            <a :href="'tel:' + phone">{{phone}}
                                <span>拨打</span>
                            </a>
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>

</template>

<script>

    export default {
        name: "kefuBtn",
        data() {
            return {
                show_kefu: false,
                phone: '1111111'
            }
        },
        methods: {
            to_showKefu() {
                this.show_kefu = !this.show_kefu
            }
        },
        components: {
        }
    }
</script>

<style scoped lang="scss">
    #kefu{

        .van-popup{
            width:70%;
            height:220px;
            border-radius: 10px;
            overflow: hidden;
            .content{
                width:100%;
                background: #fff;
                position: fixed;
                top:0;
                bottom:0;
                right:0;
                left:0;
                margin:auto;
                .kefu_img{
                    position: absolute;
                    top:10%;
                    left:0;
                    right:0;
                    margin:0 auto;
                    width:20%;
                    height:0;
                    padding-bottom:20%;
                    z-index: 2;
                    img{
                        width:100%;
                    }
                }
                .info{
                    padding-top:50px;
                    text-align: center;
                    line-height: 35px;
                    font-size: 14px;
                    span{
                        font-size: 14px;
                    }
                    .phone{
                        display: flex;
                        // justify-content: space-around;
                        justify-content: center;
                        align-items: center;
                        span{
                            height:24px;
                            line-height:24px;
                            background: #ff0000;
                            color:#fff;
                            padding:2px 10px;
                            border-radius: 5px;
                            font-size: 14px;
                        }
                        a{
                            color:#000;
                        }
                    }
                }
                .bottom{
                    margin-top:4px;
                    font-size: 14px;
                    color:#ff0000;
                }
            }
        }
    }
    #kefuBtn{
        width:50px;
        height:50px;
        border-radius: 50%;
        background: #fff;
        border:1px solid #ccc;
        position:fixed;
        bottom:90px;
        right:20px;
        z-index: 3;
        i{
            position: absolute;
            color:#ff0000;
            font-size: 30px;
            line-height: 50px;
            left:10px;
        }
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