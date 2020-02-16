<template>
    <div id="yuketang">
        <div class="content_box">
            <head-all
                    :show_logo="true"
                    :show_share="true"></head-all>
            <wave></wave>
            <swipe
                    :ads="ads"
                    v-if="ads.length > 1"
                    class="swiper"></swipe>
            <div class="ketangBox">
                <van-tabs
                        v-model="activeS"
                        sticky
                        animated
                        :line-width="50"
                        :line-height="1"
                        title-active-color="#ff0000"
                        scroll="{scrollTop:42px;}"
                >
                    <van-tab
                            v-for="item in title"
                            :key="item.class_id"
                    >
                        <div class="tab-title" slot="title"
                                @click="to_next(item.class_id)">
                            {{item.title}}
                        </div>
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                :finished-text="finishedText"
                                @load="loadMore">
                            <class-list
                                    :ke_list="ke_list"
                                    :money="money"
                            ></class-list>
                        </van-list>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
       <foot></foot>
    </div>
</template>

<script>
    import Wave from "../components/wave/wave";
    import Swipe from "../components/swipe/swipe";
    import {yuketangService} from "../assets/js/http/yuketang/yuketang";
    import ClassList from "../components/classList/classList";
    import {getStorage} from "../assets/js/util";
    import Foot from "../components/foot/foot";

    export default {
        name: "yuketang",
        components: {Foot, ClassList, Swipe, Wave},
        data() {
            return {
                ads: [],
                activeS: 0,
                title: [
                    {
                        title: "全部",
                        class_id: ""
                    },
                    {
                        title: "名师课堂",
                        class_id: 28
                    },
                    {
                        title: "训练计划",
                        class_id: 27
                    }
                ],
                loading: false,
                finished: false,
                finishedText: "",
                ke_list: [],
                money: "",
                page:1,
                class_id: "",
                isActivity:false
            }
        },
        mounted() {
            this.get_ads_list()
        },
        methods: {
            loadMore() {
                this.get_ke_list()
            },
            get_ads_list() {
                let that = this;
                yuketangService.get_ads_list().then(res => {
                    let code = res.errcode
                    if (code === 1000) {
                        that.ads = res.data.list
                    } else {

                    }
                })
            },
            get_ke_list() {
                let that = this;
                let class_id = that.class_id
                if (!class_id){
                    class_id = ""
                }
                let uid = "";
                if(getStorage("loginInfo")){
                    uid = getStorage("loginInfo").uid
                }
                let data = {
                    uid:uid,
                    class_id:class_id,
                    page:that.page
                }
                yuketangService.get_ke_list(data).then(res=>{
                    let data =res.data
                    let code = res.errcode
                    if(code === 1000){
                        if(data.list.length < 10){
                            if(that.page <= 1){
                                that.ke_list = data.list
                            }
                            that.finished = true
                            that.finishedText = "没用更多了"
                        }else{
                            that.page++
                            that.finished = false;
                            that.finishedText =""
                            this.ke_list = this.ke_list.concat(res.data.list);
                        }
                        this.loading = false;
                    }
                })
                    .catch(err => {
                        console.log(err);
                        // 当数据小于一页时到底自动加载会不断的触发，此时强制关闭
                        if (that.ke_list.length <= 11) {
                            that.finished = true;
                        }
                    });
            },
            to_next(id){
                this.page = 1;
                this.loading = true;
                this.class_id = id;
                let uid = ""
                if(getStorage("loginInfo")){
                    uid = getStorage("loginInfo").uid
                }
                let data = {
                    uid:uid,
                    class_id:id,
                    page:this.page
                }
                yuketangService.get_ke_list(data).then(res=>{
                    if (res.errcode === 1000) {
                        if (res.data.list.length < 10) {
                            if (this.page <= 1) {
                                this.ke_list = res.data.list;
                            }
                            this.finished = true;
                            this.finishedText = "没有更多了";
                        } else {
                            this.page++;
                            this.finished = false;
                            this.finishedText = "";
                            this.ke_list = this.ke_list.concat(res.data.list);
                        }
                        this.loading = false;
                    }
                })
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #yuketang {
        width: 100%;
        background-color: #fff;
        height: 100%;
        margin-top: 45px;

        #wave {
            height: 120px !important;
            top: 44px !important;
        }

        .swiper {
            position: relative;
            top: 10px;
        }
    }
</style>