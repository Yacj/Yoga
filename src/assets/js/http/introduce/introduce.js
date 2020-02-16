import {get, post, deletes} from '../http'
export const introduceService = {
    //  首页
    get_news_list(param) {
        return get('/mobile/get_news_list', param)
    },
}
