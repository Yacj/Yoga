let u = navigator.userAgent;
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let ua = navigator.userAgent.toLowerCase();
let is_weixin = /micromessenger/.test(ua) ? true : false;
export default {
    is_weixin,
    isiOS
}