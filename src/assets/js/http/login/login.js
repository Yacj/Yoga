import {get, post, deletes} from '../http'
export const loginService = {
    // 登录部分
    loginData(param) {
        return post('/mobile/login', param)
    },
    //分销链接记录存储
    add_fenxiao_log(param){
        return post('/index/add_fenxiao_log', param)
    },


    // 微信授权登录
    // impower
    impower_login(param){
        return post('/mobile/wx_login', param)
    },
}

