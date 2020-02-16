<template>
    <div id="EmptyList">
        <p class="img">
            <i :class="icon"></i>
        </p>
        <p>{{title}}</p>
        <div @click="toPage">
            {{name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "EmptyList",
        props:{
            icon:String,
            title:String,
            name:String
        },
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            toPage(){
                if(_this.name === '去逛逛'||_this.name === '再逛逛'){
                    _this.$router.push('/yuketang')
                }else if(_this.name === '去收藏'){
                    _this.$router.push('/home')
                }
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #EmptyList {
        padding-top: .2rem;
        width: 100%;

        p {
            text-align: center;
            font-size: 16PX;

            .icon {
                font-size: 80PX;
                color: #757575;
            }
        }

        div {
            width: 25%;
            margin: 20px auto 0;
            text-align: center;
            background: #ff0000;
            color: #fff;
            line-height: 30px;
            border-radius: 10px;
        }

        p:last-child {
            font-size: 14px;
            color: #757575;
        }
    }
</style>