(function (doc, win) {
    let docEl = doc.documentElement
    // let resizeEvt = 'orientationchange' in window ? 'orientationchange' : ''
    let recalc = function () {
        let clientWidth = docEl.clientWidth
        if (!clientWidth) return
        docEl.style.fontSize = (clientWidth / 3.75) + 'px'
    }
    if (!doc.addEventListener) return
    // win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

