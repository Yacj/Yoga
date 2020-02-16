import {get, post, deletes} from '../http'
export const registeredService = {
    reg(param) {
        return post('/mobile/regist', param)
    },
    send_msg(param){
        return post('/mobile/send_msg', param)
    }
}
