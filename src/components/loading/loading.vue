<template>
    <div class="tooltipContent" :style="css">
        <span>
            <i class="iconfont icon-jia-zai"></i>
        </span>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props:{
          css:{String}
        },
        data() {
            return {}
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    .tooltipContent{
        position: fixed;
        left: 0;
        top: .46rem;
        bottom: .5rem;
        right: 0;
        z-index: 1999;
        text-align: center;
        height: 100%;
        span {
            position: absolute;
            top: 40%;
            display: inline-block;
            margin-left: -.2rem;
            animation: rotateAll 0.8s linear infinite;
            .icon {
                color: #ccc;
                font-size: 40px!important;
            }
        }
    }
    @keyframes rotateAll {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>