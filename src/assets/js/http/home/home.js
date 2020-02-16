import { get, post, deletes } from '../http'
export const mobileService = {
    //  首页
    index(param) {
        return get('/mobile/shouye', param)
    },
    get_tui_list(param) {
        return get('/mobile/get_tui_list', param)
    },
}