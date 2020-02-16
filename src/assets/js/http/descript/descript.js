import {get, post, deletes} from '../http'
export const descriptService = {
    get_ke_info(param) {
        return get('/mobile/get_ke_info', param)
    },
    get_comment_list(param) {
        return get('/mobile/get_comment_list', param)
    },
    //加入购物车
    addCart(param) {
        return post('/mobile/add_cart', param)
    },
    //加入购物车
    goumai(param) {
        return post('/mobile/goumai', param)
    },
    // get_ke_info(param) {
    //     return get('/mobile/get_ke_info', param)
    // },
    // get_comment_list(param) {
    //     return get('/mobile/get_comment_list', param)
    // },
    add_likes(param){
        return post('/mobile/add_likes', param)
    },
    del_likes(param){
        return deletes('/mobile/del_likes', param)
    },
    get_user_info(param){
        return get('/mobile/get_user_info', param)
    },
    get_myke_info(param){
        return get('/mobile/get_myke_info', param)
    },
    //分销链接记录存储
    add_fenxiao_log(param){
        return post('/index/add_fenxiao_log', param)
    },
    //卡密提交
    card_pay(param){
        return post('/mobile/card_pay', param)
    },

    // 生成拼团订单
    add_order_tuan(param){
        return post('/pintuan/add_order_tuan', param)
    },
    // 拼团活动信息
    tuan_act_info(param){
        return get('/pintuan/tuan_act_info', param)
    },
    // 单个拼团详情
    tuan_info(param){
        return get('/pintuan/tuan_info', param)
    },

    // 领取优惠券
    add_coupon(param){
        return post('/mobile/add_coupon', param)
    },
}

