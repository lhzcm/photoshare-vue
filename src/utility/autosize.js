//自适应
const autoSize = function(id, maxwidth) {
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var appEl = document.getElementById(id)
                var clientWidth = appEl.clientWidth;
                if (!clientWidth) return;
                // if (clientWidth >= 750) {
                //     docEl.style.fontSize = '100px';
                // } else {
                docEl.style.fontSize = 20 * (clientWidth / maxwidth) + 'px';
                if (clientWidth == maxwidth) {
                    appEl.style.marginLeft = 'calc((100% - ' + clientWidth + 'px)/2)'
                } else {
                    appEl.style.marginLeft = '0'
                }
                // }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
}

export default autoSize 