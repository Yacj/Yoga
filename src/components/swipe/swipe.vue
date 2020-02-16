<template>
    <div class="wrapper">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in ads" :key="index">
                <a>
                    <!-- <a href="http://192.168.1.113:82/#/vip?code=2"> -->
                    <img :src="img_path+item.img" class="swiper-img" />
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import Swiper from "swiper";
    export default {
        name: "swipe",
        props:{
            ads:{
                type:Array,
                required: true
            }
        },
        data(){
            return{
                img_path:"http://img.yujia.com/",
                swiperOption: {
                    direction: "horizontal",
                    observer: true,
                    observeParents: true,
                    spaceBetween: 15,
                    loop: true,
                    slidesOffsetBefore: 35,
                    slidesOffsetAfter: 35,
                    slidesPerView: "auto",
                    autoplay: {
                        disableOnInteraction: false,
                        delay: 2500
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .swiper-container {
        padding-bottom: 10px;
    }
    .wrapper {
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 50.6%;
        .swiper-wrapper {
            width: 100%;
            .swiper-slide {
                width: 80%;
                margin: 0 auto;
                height: 100%;
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }
            }
        }
    }
    .swiper-slide-active img {
        box-shadow: 0 0 20px rgba(254, 15, 21, 0.5);
    }
</style>
