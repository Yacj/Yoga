import {get, post, deletes} from '../http'
export const cartService = {
    //购物车列表
    cartList(param) {
        return get('/mobile/get_cart_list', param)
    },
    //购物车列表
    delCart(param) {
        return deletes('/mobile/del_cart', param)
    }
}



// WEBPACK FOOTER //
// ./src/port/cart/cart.js