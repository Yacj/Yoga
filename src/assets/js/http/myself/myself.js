import { get, post, deletes } from '../http'
export const myselfService = {
    // 我的部分
    //获取用户信息
    getUserInfo(param) {
        return get('/mobile/get_user_info', param)
    },

    // 签到按钮
    sign(param) {
        return post('/mobile/sign', param)
    },
    //订单列表
    ordersList(param) {
        return get('/mobile/get_orders_list', param)
    },
    // 优惠券列表
    couponList(param) {
        return get('/mobile/get_coupon_list', param)
    },
    // 领取优惠券
    addCoupon(param) {
        return post('/mobile/add_coupon', param)
    },

    // 我的已购课程
    mykeList(param) {
        return get('/mobile/get_myke_list', param)
    },

    // 收藏夹
    likesList(param) {
        return get('/mobile/get_likes_list', param)
    },
    // 取消收藏
    delLikes(param) {
        return deletes('/mobile/del_likes', param)
    },
    // 再来一单
    orderZai(param) {
        return post('/mobile/add_order_zai', param)
    },
    // 上传图片
    uploadImg(param) {
        return post('/system/upload_img', param)
    },
    // 修改用户信息
    updateInfo(param) {
        return post('/mobile/update_user_info', param)
    },
    //退出登录
    logOut(param) {
        return post('/mobile/log_out', param)
    },

    get_ke_info(param) {
        return get('/mobile/get_ke_info', param)
    },
    //积分
    get_user_info(param) {
        return get('/mobile/get_user_info', param)
    },
    get_ke_list(param) {
        return get('/mobile/get_ke_list', param)
    },
    // 打卡部分
    // 打卡
    daka(param) {
        return get('/mobile/daka', param)
    },
    //打卡详情
    get_daka_info(param) {
        return get('/mobile/get_daka_info', param)
    },
    //打卡记录
    dakaList(param) {
        return get('/mobile/dakaList', param)
    },
    // 点赞
    save_zan(param) {
        return post('/mobile/save_zan', param)
    },
    // 新人红包
    get_red_coupon(param) {
        return get('/mobile/get_red_coupon', param)
    },
    // 发布订单课程评价
    add_goods_comment(param) {
        return post('/mobile/add_goods_comment', param)
    },
    //获取订单详情
    get_order_info(param) {
        return get('/mobile/get_order_info', param)
    },
    //点击升级永久
    get_order_forever(param) {
        return get('/mobile/get_order_forever', param)
    },
    //弹框之后点击升级永久
    add_order_forever(param) {
        return post('/mobile/add_order_forever', param)
    },


    // 点赞
    support_comment(param) {
        return post('/mobile/support_comment', param)
    },
    // 提交回复
    reply_comment(param) {
        return post('/mobile/reply_comment', param)
    },
    // 发表评论
    add_comment(param) {
        return post('/mobile/add_comment', param)
    },
    // 二级回评列表
    get_ping_hui_list(param) {
        return get('/mobile/get_ping_hui_list', param)
    },
    // 一级回评列表
    get_ping_list(param) {
        return get('/mobile/get_ping_list', param)
    },
    get_cash_rand(param) {
        return get('/mobile/get_cash_rand', param)
    },
    istrueSign(param) {
        return get('/mobile/istrueSign', param)
    },
    url_escape(param) {
        return get('/mobile/url_escape', param)
    },
}

