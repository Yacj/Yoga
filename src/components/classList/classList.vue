<template>
    <div id="classList">
        <div class="listBox"
             @click="to_descript(item.id,item)"
             v-for="(item,index) in ke_list"
             :key="index">
            <div class="top">
                <img :src="img_path+item.figure" alt="">
            </div>
            <div class="angle1"
                 v-if="item.sale_info.model_id == 2">
                <div>
                    <img src="../../assets/img/zhe.png" alt="">
                </div>
            </div>
            <div class="mid yichu2">
                {{item.title}}
            </div>
            <div
                    class="bottom_free"
                    @click="toVip"
                    v-if="item.group?(item.group.group_id === 1?true:false):false"
            >VIP年卡 · 免费学习
            </div>
            <div class="bottom">
                <div class="price" v-if="!money">￥{{item.day_price}}</div>
                <div class="prices" v-if="money">
                    <span>折后价￥</span>
                    {{item.day_price - discount}}
                </div>
                <div class="focus">{{item.viewed}}人关注</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "classList",
        props: {
            ke_list: {
                type: Array,
                required: true
            },
            money: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                img_path: "http://img.yujia.com/",
                isGroup: false,
                backStatu_pro: true,
                discount: 0
            }
        },
        mounted() {
            this.discount = parseInt(this.money);
        },
        methods: {
            to_descript(id,item) {
                this.$emit('backStatu_Pro',
                this.backStatu_pro)
                if (id == 6935) {
                    this.$router.push({ path: "/vip", query: { code: 1 } });
                    return false;
                }
                if (id == 29934) {
                    this.$router.push({ path: "/vip", query: { code: 2 } });
                    return false;
                }
                if (this.isGroup) {
                    this.$router.push({
                        name: "video",
                        params: { id: id, chapter_id: "" },
                        query: { id: id, chapter_id: "" }
                    });
                } else {
                    this.$router.push({
                        name: "descript",
                        params: { id: id },
                        query: { id: id }
                    });
                }
            },
            toVip() {

            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #classList {
        width: 96%;
        margin: 0 auto;
        display: flex;
        flex-flow: wrap;
        .listBox {
            margin: 2%;
            width: 46%;
            display: flex;
            flex-direction: column;
            position: relative;
            .top {
                width: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .bottom_free {
                margin: 5px 0;
                font-size: 14px;
                color: #ff0000;
            }
            .bottom {
                width: 100%;
                display: flex;
                font-size: 12px;
                justify-content: space-between;
                .price {
                    color: #ff0000;
                }
                .prices {
                    color: #ff0000;
                    font-size: 12px;
                    span {
                        font-size: 11px;
                    }
                }
                .focus {
                    color: #777;
                }
            }
        }
    }
    .angle {
        position: absolute;
        left: 10px;
        top: 10px;
        background: rgba(182, 0, 0, 0.8);
        color: #fff;
        padding: 0 5px;
        border-radius: 2px;
        z-index: 9;
        font-size: 12px;
        display: table;
    }
    .angle1 {
        position: absolute;
        left: 8px;
        top: 0px;
        color: #fff;
        z-index: 9;
        div {
            width: 16%;
            height: 0;
            padding-bottom: 20%;
            img {
                width: 100%;
            }
        }
    }
</style>