/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
    if (!name) return
    if (typeof content === 'string' || typeof content === 'number') {
        window.localStorage.setItem(name, content)
    } else {
        window.localStorage.setItem(name, JSON.stringify(content))
    }
}
/**
 * 获取localStorage
 */
export const getStorage = name => {
    if (!name) return
    var str = window.localStorage.getItem(name)
    if (str === null) return // 如果取的本地存储没有存入的情况下 取到的本地存储为null
    if (str.indexOf('{') !== -1 || str.indexOf('[') !== -1) {
        return JSON.parse(str)
    } else {
        return str
    }
}
/**
 * 全部清除localStorage
 */
export const clearStorage = () => {
    window.localStorage.clear()
}
/**
 * 删除localStorage
 */
export const removeStorage = name => {
    if (!name) return
    window.localStorage.removeItem(name)
}

/**
 * 存cookie天数
 */
export const setCookie = (cname, value, day) => {
    var exdate = new Date()
    // exdate.setTime(exdate.getTime() + millisec)
    exdate.setDate(exdate.getDate() + day)
    document.cookie = cname + '=' + escape(value) +
        ((day == null) ? '' : ';expires=' + exdate.toGMTString())
}
/**
 * 存cookie时间
 */
export const setCookieM = (cname, value, day) => {
    var date = new Date();
    date.setTime(date.getTime() + 10 * 60 * 1000); //设置date为当前时间+5分
    document.cookie = "key=value; expires=" + date.toGMTString(); //将date赋值给expires
}

/**
 * 取cookie
 */
export const getCookie = (cname) => {
    if (document.cookie.length > 0) {
        var cstart = document.cookie.indexOf(cname + '=')
        var cend
        if (cstart !== -1) {
            cstart = cstart + cname.length + 1
            cend = document.cookie.indexOf(';', cstart)
            if (cend === -1) cend = document.cookie.length
            return unescape(document.cookie.substring(cstart, cend))
        }
    }
    return ''
}
// 删除cookies
export const delCookie = (cname) => {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var delValue = getCookie(key);
    if (!!delValue) {
        document.cookie = key + '=' + delValue + ';expires=' + date.toGMTString();
    }
}

export const img_fun = (size) => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        // console.log('是安卓');
        return '?imageMogr2/thumbnail/!' + size + 'p'+'/format/webp';
    }
    if (isiOS) {
        // console.log('是ios');
        return '?imageMogr2/thumbnail/!' + size + 'p';
    }

}

// 是否空对象
export const isEmpty = (obj) => {
    let index = 0
    for (var i in obj) {
        if (typeof obj[i] === 'string' && obj[i] !== '') {
            index++
        }
        if (typeof obj[i] === 'object' && obj[i].length !== 0) {
            index++
        }
    }
    if (index === 0) {
        return true
    } else {
        return false
    }
}
/**
 * 改变时间样式
 * 传参格式 Mon Jan 01 2018 00:00:00 GMT+0800 (中国标准时间)
 * 返回类型 2018-01-01
 */
export const getFormateDate = (time, fmt) => {
    if (Object.prototype.toString.call(time) !== '[object Date]') return
    let o = {
        'y+': time.getFullYear(),
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S': time.getMilliseconds()
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, o[k].toString().length === 1 ? ('0' + o[k]) : o[k])
        }
    }
    return fmt
}


