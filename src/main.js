import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//全局样式
import './assets/css/common.scss'
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont'
//移动端匹配
import './assets/js/rem'
import './assets/js/landscape'
// 引入全局过滤器
import './assets/js/filters/filters'
// 引入全局指令
import './assets/js/directives/directives'


//时间插件
import dayjs from "dayjs";
Vue.prototype.$day = dayjs
//轮播
import VueAwesomeSwipe from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwipe)
//全局头部
import headAll from "./components/head/index";
Vue.use(headAll)

import global from "./assets/js/global";
Vue.prototype.$global = global


//vant
import {Icon,Loading, NoticeBar, Tab, Tabs,Tabbar, TabbarItem,Popup,Dialog,Button,Toast, Col, Row,ActionSheet,RadioGroup, Radio,Cell, CellGroup,Tag,List,NavBar,Checkbox, CheckboxGroup,SubmitBar} from 'vant'
Vue.use(Icon).use(Loading).use(NoticeBar).use(Tabs).use(Tab).use(Tabbar).use(TabbarItem).use(Popup).use(Dialog).use(Button).use(Toast).use(Col).use(Row).use(ActionSheet)
    .use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(Tag).use(List).use(NavBar).use(Checkbox).use(CheckboxGroup).use(SubmitBar)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
    // 如果无页面跳转到404页面
    if (to.matched.length === 0) {
        from.name ? next({
            name: 'error'
        }) : next('/error');
    }else {
        next();
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
