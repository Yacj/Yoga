<template>
    <div id="footer">
        <van-tabbar v-model="actives">
            <van-tabbar-item
                    :icon="item.icon"
                    :info="item.info"
                    :dot="item.dot"
                    @click="footerNavigateTo(item)"
                    v-for="(item,index) in footerlist"
                    :key="index">{{ item.name }}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

    let buyersFooterList = [
        {
            index: 0,
            name: '首页',
            path: '/home',
            icon: 'icon iconfont icon-index',
            dot: false,
            info: ''// 此处为空时 dom不显示
        },
        {
            index: 1,
            name: '知识',
            path: '/introduce',
            icon: 'icon iconfont icon-zhishi',
            dot: false,
            info: ''
        },
        {
            index: 2,
            name: '视频',
            path: '/videoscope',
            icon: 'icon iconfont icon-shipin',
            dot: false,
            info: ''
        },
        {
            index: 3,
            name: '我的',
            path: '/myself',
            icon: 'icon iconfont icon-yonghu',
            dot: false,
            info: ''
        }
    ]
    export default {
        name: "AppFooter",
        data(){
          return{
              actives: this.active,
              footerlist: buyersFooterList
          }
        },
        props: ['active'],
        mounted () {
        },
        methods: {
            // 点击底部跳转到对应的path
            footerNavigateTo (obj) {
                this.$router.push({path: obj.path})
            }
        },
    }
</script>

<style lang="scss" scoped>
    #footer{
        position: relative;
        z-index: 101;
    }
    #footer .jiaobiao{
        position: fixed;
        bottom:35px;
        right:25%;
        z-index: 999;
        width:12%;
    }
    #footer .jiaobiao img{
        width:100%;
    }
    #footer .van-tabbar-item--active {
        color: #ff0000!important;
    }
    #footer .consultingBox .van-tabs__wrap{
        position: absolute;
        z-index: 55;
    }

</style>