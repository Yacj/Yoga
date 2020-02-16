<template>
    <div id="cart">
        <van-nav-bar
                fixed
        >
            <span slot="left"><van-icon name="arrow-left" @click="toBack"/></span>
            <span slot="title" class="disflex flex-align-center flex-justify-center">
        购物车
                <!-- <van-icon class="font14 margin-l5" name="location-o" icon-pos /> -->
      </span>
            <span slot="right" class="edit" @click="editBtn()">{{editText}}</span>
        </van-nav-bar>
        <div class="cartContent">
            <empty-list title="暂无数据" v-if="isNoData === true" icon="icon iconfont icon-wudingdan"></empty-list>
            <div class="contentWrapper">
                <div class="content">
                    <div class="cart_item_top" v-for="(item,index) in cartList" :key="index">
                        <van-checkbox
                                v-model="item.checked"
                                :key="index"
                                :name="item"
                                checked-color="#ff0000"
                                @change="checkboxBtn(index)"
                        ></van-checkbox>
                        <div class="item">
                            <div class="left">
                                <img :src="imgPath + item.figure" alt="">
                            </div>
                            <div class="right">
                                <p class="yichu1 top">{{ item.title }}</p>
                                <p class="mid">{{ item.scvp_item }}</p>
                                <div class="bottom">
                                    <span>￥{{item.price}}</span>
                                    <p>x{{item.num}}</p>
                                </div>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-submit-bar
                v-if="editShow === true"
                :price="totalMoney"
                button-text="去结算"
                @submit="onSubmit"
                :disabled='disabledHide'
        >
            <van-checkbox v-model="allChecked" checked-color="#ff0000" @click.native="allChangeBtn">全选</van-checkbox>

        </van-submit-bar>
        <div class="van-submit-bar editState" v-if="editShow === false">
            <div class="van-submit-bar__bar">
                <van-checkbox v-model="allChecked" checked-color="#ff0000" @click.native="allChangeBtn">全选
                </van-checkbox>
                <div class="flex-1 padding-lr10">
                    <van-button
                            round
                            class="fl-r"
                            plain
                            type="danger"
                            :disabled="disabledShow"
                            size="small"
                            @click.native="deleteGoods"
                    >删除
                    </van-button>
                </div>
            </div>
        </div>
        <loading v-if="loading" css="background:#fff;top:50px"></loading>
    </div>
</template>

<script>
    import EmptyList from "../components/EmptyList/EmptyList";
    import {getStorage} from "../assets/js/util";
    import {cartService} from "../assets/js/http/cart/cart";
    import Loading from "../components/loading/loading";

    export default {
        name: "cart",
        components: {Loading, EmptyList},
        data() {
            return {
                imgPath: "http://img.yujia.com/",
                editText: '编辑',
                isNoData: true,
                cartList: [],
                loading: true,
                editShow: true,
                totalMoney: 0,
                disabledHide: false,
                disabledShow: false,
                allChecked: false,
            }
        },
        mounted() {
            this.getCard()
        },
        methods: {
            getCard() {
                let that = this
                let data = {
                    id: getStorage("loginInfo").uid
                }
                cartService.cartList(data).then(res => {
                    that.loading = false
                    let code = res.errcode;
                    let data = res.data
                    if (code === 1000) {
                        that.cartList = data.list
                        if (that.cartList.length === 0) {
                            this.isNoData = true;
                            this.allChecked = false;
                            this.editShow = true;
                            this.disabledHide = true
                            this.disabledShow = true
                            this.submitResult()
                        } else {
                            this.isNoData = false;
                            this.disabledHide = false
                            this.disabledShow = false
                        }
                    }
                })
            },
            toBack() {
                this.$router.back();
            },
            editBtn() {
                if (this.editText === '编辑') {
                    this.editShow = false;
                    this.editText = "完成"
                } else {
                    this.editShow = true;
                    this.editText = "编辑"
                }
            },
            checkboxBtn() {
                let goodsCheck = 0
                this.cartList.forEach(res => {
                    if (!res.checked) {
                        goodsCheck++
                    }
                })
                if (goodsCheck === 0) {
                    this.allChecked = true
                } else {
                    this.allChecked = false
                }
                this.submitResult();
            },
            onSubmit() {
                let arr = []
                let checkedGoods = this.checkedGoods().checkedGoods
                checkedGoods.forEach(res=>{
                    arr.push(res.buyid)
                })
                if(!checkedGoods.length){
                    this.$toast.fail('您还没有选择商品!')
                    return false
                }else{
                    let ids = "" + arr.join(",")+"";
                    console.log(ids)
                }
            },
            allChangeBtn() {
                if(this.allChecked === false){
                    this.cartList.forEach((res)=>{
                       this.$set(res,"checked", true)
                    })
                    this.allChecked  === true
                    this.submitResult()
                }else{
                    this.allChecked === true
                    this.cartList.forEach((res)=>{
                        this.$set(res,"checked", false)
                    })
                }
                this.submitResult()
            },
            submitResult() {
                let sumMoney = 0;
                let checkGoods = this.checkedGoods().checkedGoods
                checkGoods.forEach(res => {
                    sumMoney += res.buynum * res.buyprice
                })
                this.totalMoney = sumMoney * 100
            },
            checkedGoods() {
                let checkedGoods = [];
                this.cartList.forEach(res => {
                    if (res.checked) {
                        checkedGoods.push({
                            buyid: res.id,
                            buynum: res.num,
                            buyprice: res.price
                        })
                    }
                })
                return {
                    checkedGoods: checkedGoods
                }
            },
            deleteGoods() {
                let arr = []
                let checkedGoods = this.checkedGoods().checkedGoods
                checkedGoods.forEach(res => {
                    arr.push(res.buyid)
                })
                if (!checkedGoods.length) {
                    this.$toast("您还没有选择商品！")
                    return false
                }
                this.$dialog.confirm({
                    title: '提示',
                    message: `确定删除已选中的${checkedGoods.length}种商品吗?`
                }).then(res => {
                    let data = {
                        uid: getStorage("loginInfo").uid,
                        cart_id: "" + arr.join(",") + ""
                    }
                    cartService.delCart(data).then(res => {
                        let code = res.errcode
                        if (code === 1000) {
                            this.$toast(res.errmsg)
                            this.editText = "编辑"
                            this.getCard()
                        } else {
                            this.$toast(res.errmsg)
                        }
                    })
                }).catch(res => {
                    console.log(res)
                })
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #cart {
        .cartContent {
            padding: 46px 0 100px;
        }

        .contentWrapper {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 4px 10px
        }

        .content {
            width: 94%;
            margin: 0 auto;

            .cart_item_top {
                position: relative;
                margin-top: 5px;
                padding-left: 30px;

                .van-checkbox {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    height: 22px;
                }
            }

            .item {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 20px 0;
                border-bottom: 1px dashed #dedede;

                .left {
                    width: 40%;
                    margin-right: 10px;

                    img {
                        width: 100%;
                    }
                }

                .right {
                    width: 55%;
                    display: flex;
                    flex-direction: column;

                    .top {
                        font-size: 16px;
                    }

                    .mid {
                        color: #777777;
                    }

                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;

                        span {
                            color: red;
                        }
                    }
                }
            }
        }
    }
</style>