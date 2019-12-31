(function(doc, win) {
	var docEl = doc.documentElement,
	isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi),
	dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
	dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
	scale = 1 / dpr,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if(width / dpr > 768) {
			width = 768 * dpr;
		}
		docEl.style.fontSize = 100 * (width / 414) + 'px';
	};
	recalc();
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);