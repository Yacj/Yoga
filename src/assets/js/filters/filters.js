//全局过滤

import Vue from 'vue'
// 给价格加上单位￥
Vue.filter('formateMoney', function (val) {
    if (val) {
        return '￥' + parseFloat(val).toFixed(2)
    }
    return ''
})
Vue.filter('formateContact', function ([a, b]) {
    if (a && b) {
        return a + ',' + b
    } else {
        return a || b || ''
    }
})
// 给电话号码加上****
Vue.filter('phoneNumShow', function (val) {
    let newval = ''
    if (typeof val === 'number') {
        val = val + ''
    }
    if (val.length === 11) {
        newval += val.substr(0, 3)
        newval += '****'
        newval += val.slice(-4)
        return newval
    }
    return val
})
// 截取完整时间中的年月日
Vue.filter('dateSlice', function (val) {
    if (val) {
        return val.slice(0, 10)
    }
    return ''
})

