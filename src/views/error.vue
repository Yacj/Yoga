<template>
    <div class="error">
        <img src="../assets/img/404.png" alt="">
        <h4>sorry~</h4>
        <p>找不到页面了...</p>
        <router-link to="/home">
            <h6>回到首页</h6>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "error",
        data() {
            return {}
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    .error{
        padding: 0 40px;
        position: absolute;
        top: 30%;
        left: calc(50% - 190px);
        img{
            width: 300px;
            height: auto;
            line-height: 100%;
        }
        h4{
            text-align: center;
            margin-top: 20px;
            font-size: 20px;
        }
        p{
            text-align: center;
            margin-top: 10px;
        }
        h6{
            width: 140px;
            height: 35px;
            color: #fff;
            background-color: #f7cb81;
            text-align: center;
            line-height: 35px;
            border-radius: 35px;
            margin: 0 auto;
            margin-top: 15px;
        }
    }
</style>