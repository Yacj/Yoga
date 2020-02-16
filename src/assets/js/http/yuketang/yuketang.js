import {get, post, deletes} from '../http'
export const yuketangService = {
    //  瑜课堂
    get_ads_list(param) {
        return get('/mobile/get_ads_list', param)
    },
    get_ke_list(param) {
        return get('/mobile/get_ke_list', param)
    },
    get_ke_info(param) {
        return get('/mobile/get_ke_info', param)
    },
    get_user_info(param){
        return get('/mobile/get_user_info', param)
    },
    get_seck_list(param){
        return get('/mobile/seck_goods_list', param)
    },
}
