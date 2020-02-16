<template>
    <div id="punchCard">
        <head-all :show_logo="false" :show_share="true"></head-all>
        <loading v-if="isLoading"
                 css="background:#fff;top:45px;"></loading>
        <div class="content">
            <div class="content_box">
                <div class="title">
                    <div class="left">
                    </div>
                    <div class="mid">
                        <p>本月打卡累计</p>
                        <p>
                            {{num_total}}
                            <span class="pSpan">天</span>
                        </p>
                    </div>
                    <div class="right">
                        <div class="credits" >积分:{{score}}</div>
                        <div class="rules">打卡规则</div>
                    </div>
                </div>
                <div class="cardBtn">
                    <div class="btn" @click="daka" v-if="!is_daka">立即打卡</div>
                    <div class="btns" @click="daka" v-if="is_daka">今日已打卡 积分+{{jifen_today}}</div>
                </div>
                <div class="calendarBox">
                    <div class="calendar">
                        <div class="timeBox">
                            <div class="spanbox"
                                v-for="(item,index) in week"
                                :key="index">
                                <van-tag
                                        round
                                        type="danger"
                                        v-if="item.jifen != ''&&item.weekday != '周一'"
                                >+{{item.jifen}}</van-tag>
                                <van-tag round type="danger" v-if="item.jifen != ''&&item.weekday == '周一'">翻倍</van-tag>

                                <p class="tian" v-if="item.daka == false&&item.is_today == false">{{item.tian}}</p>
                                <p class="tians" v-if="item.daka == true&&item.date != lastnum">
                                    <i class="iconfont icon-gouxuanzhong"></i>
                                </p>
                                <p class="tianss" v-if="item.daka == true&&item.date == lastnum">
                                    <i class="iconfont icon-gouxuanzhong"></i>
                                </p>
                                <p
                                        class="tiansss"
                                        v-if="item.daka == false&&item.date != lastnum&&item.is_today == true"
                                >{{item.tian}}</p>
                                <p class="zhou">{{item.weekday}}</p>
                            </div>
                        </div>
                        <div class="moreBox">
                            <span>...</span>
                            <span>更多</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Loading from "../../components/loading/loading";
    import {myselfService} from "../../assets/js/http/myself/myself";
    export default {
        name: "punchCard",
        components: {Loading},
        data() {
            return {
                isLoading: false,
                num_total:0,
                score:"",
                is_daka: true,
                jifen_today: "",
                lastnum: "",
                week:[]
            }
        },
        mounted() {
        this.get_daka_info();
            },
        methods:{
            get_daka_info(){
              let that = this;
              myselfService.get_daka_info().then(res=>{
                  let code = res.errcode
                  let data = res.data
                  if(code === 1000){
                      that.week = data.week
                  }
              })
            },
            daka(){

            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    .van-tag{
        position: absolute;
        right: -.1rem;
        top: -.15rem;
        height: 12px;
        text-align: center;
        font-size: 12px;
        line-height: 12px;
    }
.content{
    height: 94.4%;
    padding-top: 45px;
    .content_box{
        .title{
            width: 100%;
            height: 110px;
            display: flex;
            justify-content: center;
            position: relative;
            div{
                width: 33%;
                height: 100%;
            }
            .mid{
                padding-top: 8%;
                text-align: center;
                p{
                    &:first-child{
                        color: #919191;
                        font-size: .14rem;
                    }
                    &:last-child{
                        color: #fb617d;
                        font-size: .35rem;
                        .pSpan{
                            font-size: .1rem;
                            color: #919191;
                        }
                    }
                }
            }
            .right{
                .credits{
                    margin: 0 auto;
                    margin-top: 22%;
                    width: 60%;
                    height: 24px;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 24px;
                    background: linear-gradient(0deg,#fb617d,#fab0bf);
                    color: #fff;
                    font-size: 12px;
                }
                .rules{
                    margin: 8% auto;
                    width: 60%;
                    height: 24px;
                    border-radius: 20px;
                    border: 1px solid #fb617d;
                    text-align: center;
                    line-height: 22px;
                    font-size: 12px;
                    color: #fb617d;
                }
            }
        }
        .cardBtn{
            position: relative;
            z-index: 99;
            width: 100%;
            height: 40px;
            text-align: center;
            .btn{
                margin: 0 auto;
                width: 60%;
                border-radius: 20px;
                height: 100%;
                background: linear-gradient(90deg,#fb617d,#fab0bf);
                color: #fff;
                line-height: 40px;
            }
            .btns{
                margin: 0 auto;
                width: 60%;
                border-radius: 20px;
                height: 100%;
                background: #b8bcc5;
                color: #fff;
                line-height: 40px
            }
        }
        .calendarBox{
            position: relative;
            z-index: 10;
            height: 110px;
            width: 95%;
            margin: -5% auto;
            border-radius: 10px;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 1px 2px 8px #eaeaea;
            .calendar{
                width: 100%;
                display: flex;
                margin-top: 15%;
               .timeBox{
                   width: 90%;
                   height: 40px;
                   .spanbox{
                       width: 14.2%;
                       display: inline-block;
                       position: relative;
                       p{
                           text-align: center;
                       }
                       .tian{
                           margin: 0 auto;
                           width: 20px;
                           border: 1px solid #b8bcc5;
                           height: 20px;
                           font-size: 12px;
                           line-height: 20px;
                           border-radius: 50%;
                       }
                       .tiansss{
                           margin: 0 auto;
                           width: 20px;
                           height: 20px;
                           font-size: 12px;
                           line-height: 20px;
                           border-radius: 50%;
                           border: 1px solid #fb617d;
                       }
                   }
               }
                .zhou{
                    margin-top: 5px;
                    font-size: 12px;
                }
                .moreBox{
                    width: 10%;
                    span{
                        &:first-child{
                            margin: 0 auto;
                            width: 20px;
                            border: 1px solid #b8bcc5;
                            height: 20px;
                            font-size: 12px;
                            border-radius: 50%;
                        }
                        &:last-child{
                            margin-top: 5px;
                            font-size: 12px;
                        }
                        text-align: center;
                        display: block;
                    }
                }
            }
        }
    }
}
</style>