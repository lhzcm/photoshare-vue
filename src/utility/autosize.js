//自适应
const autoSize = function(id, maxwidth) {
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                // var appEl = document.getElementById(id)
                // var clientWidth = appEl.clientWidth;
                // console.log(clientWidth)
                // if (!clientWidth) return;
                // if (clientWidth >= 750) {
                //     docEl.style.fontSize = '100px';
                // } else {
                
                var odds =  docEl.clientWidth / maxwidth;
                odds = odds > 1 ? 1: odds;
                docEl.style.fontSize = (20 * odds) + 'px';
                // if (clientWidth == maxwidth) {
                //     appEl.style.marginLeft = 'calc((100% - ' + clientWidth + 'px)/2)'
                // } else {
                //     appEl.style.marginLeft = '0'
                // }
                // }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
}

export default autoSize 