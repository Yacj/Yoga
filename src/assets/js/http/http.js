import axios from 'axios'
import {setStorage,setCookie,getStorage,getCookie,removeStorage} from "../util";

// 请求响应时间
axios.defaults.timeout = 50000;
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
// 请求代理
axios.defaults.baseURL = '/api';



// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        var uuid = getStorage("uid");
        // var uuid = getCookieStorage("loginInfo").uid;
        if(!uuid){
            uuid = ''
        }
        axios.get(url,{
            params:params,
            headers:{
                'sessionKey':uuid
            }
        })
            .then(response => {
                if(response.errcode == 1003){
                    removeStorage('isLogin');
                    history.go(0);
                }
                resolve(response.data);
                // console.log(response.data.errcode)
                // console.log(JSON.stringify(response))
            })
            .catch(err => {
                reject(err)
            })
    })
}


// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        var uuid = getStorage("uid");
        if (!uuid) {
            uuid = ''
        }
        axios.post(url, JSON.stringify(params), {
            headers: {
                'sessionKey': uuid
            }
        })
            .then(response => {
                if (response.errcode == 1003) {
                    removeStorage('isLogin');
                    history.go(0);
                }
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}



// /**
//  * 封装deletes请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function deletes(url, params = {}) {
    var uuid = getStorage("uid");
    if (!uuid) {
        uuid = ''
    }
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params,
            headers: {
                'sessionKey': uuid
            }
        })
            .then(response => {
                if (response.errcode == 1003) {
                    removeStorage('isLogin');
                    history.go(0);
                }
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}


