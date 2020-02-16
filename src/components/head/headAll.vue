<template>
    <div id="head">
        <div class="header">
            <div>
                <img src="../../assets/img/logo.jpg" alt="" @click="tohome" v-if="show_logo">
                <van-icon name="arrow-left" @click="toBack" v-if="!show_logo"/>
            </div>
            <div>
                <svg class="icon svg_img" aria-hidden="true" v-if="handle_user" @click="toLogin">
                    <use xlink:href="#icon-yonghu-touxiang"/>
                </svg>
                <span class="tomyself" v-if="loginShow && hide_img" @click="toFigure">
                <img :src="figure" alt/>
                </span>
                <span @click="to_inform" class="xiaoxi animation_y">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-lingdang"/>
                </svg>
                </span>
                <div @click="to_share" class="fenxiang1" v-if="show_share && !is_video">
                    <i class="iconfont icon-fenxiang1"></i>
                </div>
                <div @click="to_video" class="fenxiang1" v-if="!show_share && is_video">
                    <i class="iconfont icon-fenxiang1"></i>
                </div>
            </div>
        </div>
        <div v-if="show_share">
            <div id="share" v-show="handle_poster">
                <div class="shark" @click="to_hideshare">
                    <div class="posters" id="posters"
                         style="transform: scale(1);margin-top: 0">
                        <div id="imgWrapper">
                            <div id="img_box" ref="imageWrapper">
                                <img src="../../assets/img/poster.png" alt="" id="img_item">
                                <div id="qrCode"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas'

    export default {
        name: "headAll",
        props: {
            show_logo: {
                type: Boolean,
                required: true
            },
            show_share: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                figure: "",
                handle_user: true,
                loginShow: true,
                hide_img: true,
                is_video: false,
                handle_poster: false,
                isiOS: this.$global.isiOS,
                scale: 1,
            }

        },
        methods: {
            tohome() {

            },
            toFigure() {

            },
            toBack() {

            },
            toLogin() {

            },
            to_inform() {

            },
            to_share() {
                this.handle_poster = true
                let ios = this.isiOS
                document.body.classList.add('to_stop')
                const qrcode = document.getElementById("qrCode").getElementsByTagName('img')
                if (ios && this.$route.meta.count == 2) {
                    var img_marginTop = parseFloat((450 * (1 - this.scale) + 40).toFixed(2));
                } else if (ios) {
                    var img_marginTop = parseFloat((450 * (1 - this.scale)).toFixed(2));
                } else {
                    var img_marginTop = parseFloat((450 * (1 - this.scale)).toFixed(2));
                }
                document.getElementById('posters').style.transform = "scale(" + this.scale + ")"
                document.getElementById('posters').style.marginTop = "-" + img_marginTop + "px"
            },
            to_video() {

            },
            to_hideshare() {
                this.handle_poster = false
                document.body.classList.remove('to_stop')

            },
            change_image() {
                if (!document.getElementById("canvas_img")) {
                    console.log(1)
                    html2canvas(this.$refs.imageWrapper, {
                        backgroundColor: null
                    }).then((canvas) => {
                        let dataURL = canvas.toDataURL("image/png");
                        this.dataURL = dataURL;
                    });
                    let copyDom = document.getElementById("imgWrapper")
                    let img_item = document.getElementById("img_item")
                    console.log(img_item)
                    let width = copyDom.offsetWidth;
                    let height = copyDom.offsetHeight;
                    let scale = 2
                    let opts = {
                        dpi: window.devicePixelRatio * 2,
                        scale: scale,
                        width: width,
                        heigth: height,
                        logging: false
                    }
                    html2canvas(copyDom, opts).then(
                        canvas => {
                            let image = new Image();
                            console.log(image)
                            image.src = canvas.toDataURL();
                            image.id = "canvas_img";
                            image.setAttribute(
                                "style",
                                "top:0px;left:0px;position: absolute;width:" +
                                width +
                                "px;height:" +
                                height + "px"
                            );
                            let img_box = document.getElementById("img_box");
                            copyDom.replaceChild(image, img_box);
                            // copyDom.appendChild(image);
                        });
                }
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    #head {
        position: fixed;
        top: 0;
        z-index: 102;
        background: linear-gradient(to right, #ff0000, #ff4671);
        height: 45px;
        width: 100%;
        color: #fff;
        .svg_img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 5px;
            vertical-align: middle;
        }
        .van-icon-arrow-left {
            font-size: 17px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            height: 45px;

            > div:nth-child(1) {
                width: 25%;

                img {
                    width: 100%;
                    height: auto;
                    vertical-align: middle;
                }
            }

            > div:nth-child(2) {
                display: flex;
                align-items: center;
                width: 50%;
                justify-content: flex-end;
            }
        }

        .xiaoxi {
            padding: 0 15px;
            animation: swing 1.5s .15s linear infinite;
            color: #fff;
            font-size: 20px;
            @keyframes swing {
                0% {
                    transform: rotate(0deg)
                }
                5% {
                    transform: rotate(-15deg)
                }
                10% {
                    transform: rotate(0deg)
                }
                15% {
                    transform: rotate(15deg)
                }
                20% {
                    transform: rotate(0deg)
                }
                25% {
                    transform: rotate(-15deg)
                }
                30% {
                    transform: rotate(0deg)
                }
                35% {
                    transform: rotate(15deg)
                }
                40% {
                    transform: rotate(0deg)
                }
                100% {
                    transform: rotate(0deg)
                }
            }

        }
    }

    #share {
        .shark {
            width: 100%;
            height: 100%;
            top: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 99;
            position: fixed;
        }

        .posters {
            width: 230px;
            height: 439.1px;
            margin: 0 auto;
            position: relative;
            z-index: 100;

            #imgWrapper {
                width: 100%;
                height: 100%;
                position: relative;

                img {
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
</style>