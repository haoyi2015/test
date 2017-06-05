/* eslint-disable */
(function (doc, win) {
    let docEl = doc.documentElement;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth / 320) * 20 + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
