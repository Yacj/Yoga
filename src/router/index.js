import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/introduce',
        name: 'introduce',
        meta: {
            value: '资讯',
        },
        component: (resolve) => {
            require(['../views/introduce.vue'], resolve)
        }
    },
    {
        path: '/yuketang',
        name: 'yuketang',
        meta: {
            value: 'yuketang'
        },
        component: (resolve) => {
            require(['../views/yuketang.vue'], resolve)
        }
    },
    {
        path: '/descript',
        name: 'descript',
        component: (resolve) => {
            require(['../views/descript.vue'], resolve)
        }
    },
    {
        path: '/myself', // 个人中心部分
        name: 'myself',
        meta: {
            value: '个人中心',
        },
        component: (resolve) => {
            require(['../views/myself/myself.vue'], resolve)
        }
    },
    {
        path: '/myself/punchCard', // 打卡部分
        name: 'punchCard',
        meta: {
            value: '个人中心'
        },
        component: (resolve) => {
            require(['../views/myself/punchCard.vue'], resolve)
        }
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            value: '购物车',
        },
        component: (resolve) => {
            require(['../views/cart.vue'], resolve)
        }
    },
    // 404页面
    {
        path: '/error',
        name: 'error',
        meta: {
            value: '首页'
        },
        component: (resolve) => {
            require(['../views/error.vue'], resolve)
        }
    },
    {
        path: '/login', //登录页
        name: 'login',
        meta: {
            value: '首页',
        },
        component: (resolve) => {
            require(['../views/login.vue'], resolve)
        }
    },
    {
        path: '/registered', //注册页面registered
        name: 'registered',
        meta: {
            value: '首页',
        },
        component: (resolve) => {
            require(['../views/registered.vue'], resolve)
        }
    },
]
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
    routes
})

export default router
