<template>
    <div id="introduce" class="introduce">
        <head-all
                :show_logo="true"
                :show_share="true"></head-all>
        <loading
                v-if="isLoading"
                css="background:#fff;top:180px"></loading>
        <div class="introduce">
            <div class="content_box">
                <van-tabs
                        v-model="switch_index"
                        sticky
                        animated
                        :line-width="50"
                        :line-height="1"
                        title-active-color="#ff0000"
                >
                    <van-tab
                            v-for="(item,index) in channel"
                            :key="index">
                        <div class="">
                            {{item.title}}
                        </div>
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                :finished-text="finishedText"
                                @load="loadMore">

                        </van-list>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <app-footer
                :active="1"></app-footer>
    </div>
</template>

<script>
    import AppFooter from "../components/AppFooter/AppFooter";
    import Loading from "../components/loading/loading";
    import {getCookie, setCookie} from "../assets/js/util";
    import {introduceService} from "../assets/js/http/introduce/introduce";

    export default {
        name: "introduce",
        components: {Loading, AppFooter},
        data() {
            return {
                id: "",
                page: 1,
                isLoading: false,
                switch_index: '',
                news: [],
                channel: [],
                finished: false,
                finishedText: "",
            }
        },
        watch: {
            $route: {
                handler: function(to, form){
                    if(!to.query.id){
                        this.id = 2;
                        this.news=[];
                        this.page = 1;
                        this.get_news_list();
                    }
                },
                //立即先去执行handler方法
                immediate:true
            }
        },
        created() {
        },
        mounted() {
            if (getCookie("index")) {
                console.log(2)
                this.get_news_list({class_id: getCookie("ID")});
                setCookie("index", false, -1);
            }
        },
        methods: {
            loadMore() {
                console.log("2")
                this.get_news_list();
            },
            get_news_list(datas) {
                let that = this
                if(!datas){
                    var class_id = "";
                    var label_id = ""
                }else{

                }
                let data = {
                    pid:this.id,
                    class_id:class_id,
                    label_id:label_id,
                    page:this.page
                }
                console.log(data)
                introduceService.get_news_list(data).then(res=>{
                    console.log(res)
                    let data = res.data
                    let code = res.errcode
                    console.log(data.news.list.length)
                    if(that.page === 1){
                        that.news = []
                    }
                    if(data.status === "error"){
                        that.loading = false;
                        that.finishedText = "没用更多了";
                        that.finished = true
                    }else  if(data.news.list.length < 10){
                        if(that.page == 1){
                            that.news = data.news.list
                        }else {
                            that.news = that.news.concat(data.news.list)
                        }
                    }
                })
            },
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    .introduce {
        padding: 22px 0;
        width: 100%;
    }
</style>