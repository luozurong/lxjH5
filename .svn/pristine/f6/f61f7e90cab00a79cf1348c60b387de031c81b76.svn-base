//设置对应的机型显示
(function (doc, win) {
	var docEl = doc.documentElement,
			isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi),
			dpr = isIOS? Math.min(win.devicePixelRatio, 3) : 1,
			dpr = window.top === window.self? dpr : 1, //被iframe引用时，禁止缩放
			scale = 1 / dpr,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var metaEl = doc.createElement('meta');
	metaEl.name = 'viewport';
	metaEl.content = 'initial-scale=1,maximum-scale=1, minimum-scale=1';
	docEl.firstElementChild.appendChild(metaEl);
	var recalc = function () {
		var width = docEl.clientWidth;
		if (width / dpr > 640) {
			width = 640 * dpr;
		}
		docEl.style.fontSize = 100 * (width / 640) + 'px';
	};
	recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);
var wwidth;
var wheight;
function setsize(){
    wwidth = parseInt($(window).width());
    wheight = parseInt($(window).height());
    $(".wheight").css("height",wheight);
}
//封装公共方法
var Common = {
	requestimes : 0,
	loadingTime : 1000,
	defaultParams : {
		"timeout": 60 * 1000,
		"timeout_msg": "请求超时，稍后尝试！",
		"type": "GET",
		"dataType": "text"
	},
	ajaxParams : false,
	reload : function(){
		if(this.ajaxParams){
			if(this.requestimes<3)
				$.ajax(this.ajaxParams);
			else {
				this.ajaxParams= false;
				this.requestimes = 0;
				this.toast("重试已超过三次");
			}
		}
	},
	ajax : function(params) {
		var t = $.extend({}, this.defaultParams, params);
		this.goAjax(t);
	},
	goAjax : function(paramsObj) {
		var me=this;
		// 调试用参数
		var AJAXTAG = paramsObj.url.split('?')[0];
		AJAXTAG = AJAXTAG.substring(AJAXTAG.lastIndexOf('/') + 1);
		//ajax请求
		this.ajaxParams = {
			timeout: paramsObj.timeout,
			url: paramsObj.url,
			type: paramsObj.type,
			data: paramsObj.data,
			dataType: paramsObj.dataType,
			async: true,
			beforeSend: function(xhr, settings) {
				//在Ajax请求之前该做的一些事情 比如缓存此次请求信息，用来失败时的重试
				me.requestimes++;
				if (!paramsObj.hideLoading) {
					Common.loader.show();
				}
			},
			success: function(data, textStatus, jqXHR) {
				/*这里可做一些公共的业务处理*/
				//根据后台返回的result code判断系统的异常情况

				//调用H5的方法
				if (data && data !== "" && typeof data === "string") {
					data = $.parseJSON(data);
					//成功
					if (data.success && (typeof paramsObj.success === "function")) {
						//解析数据
						var returnObj = !!data.returnObject ? data.returnObject : data;
						paramsObj.success(returnObj, textStatus, jqXHR);
						me.ajaxParams = false;
						//异常
					} else {
						if (typeof(paramsObj.dataException) === "function") {
							paramsObj.dataException(data);
						} else {
							this.dataException(data.exceptionMessage,data.errorMessage);
						}
					}
				} else {

				}
			},
			dataException: function(exceptionMessage,errorMessage) {
				if(exceptionMessage) {
					Common.dialog(exceptionMessage,99);
				} else if(errorMessage) {
				}else{
					console.log("data format is error");
					Common.dialog(errorMessage,99);
				}
			},
			error: function(e, xhr, type) {
				// 输出参数
				__console.log(e);
				if (e && e !== "") {
					if (e.response && e.response !== "" && typeof e.response === "string") {
						var response = JSON.parse(e.response);
						if (response === null) {
							console.error("json解释错误");
						}else { //非已登出的情况，抛出异常信息
							console.log(response.exceptionMessage?response.errorMessage:response.errorMessage);
						}
					}
				}
				if (paramsObj.error && paramsObj.error instanceof Function) {
					paramsObj.error(e, xhr, type);
				}else if(xhr === "timeout"){
					Common.dialog(me.defaultParams.timeout_msg,99);
					//调用重试
				}
			},
			complete: function(xhr, status) {
				if (paramsObj.complete && paramsObj.complete instanceof Function) {
					paramsObj.complete(xhr, status);
				}
			}
		}
		$.ajax(this.ajaxParams);
	},
	loader :{
		show : function(){
			var _$ = window.top.$;
			if(_$(".loading").length<1){
				this.create();
			}

			_$(".loading").show();
			_$(".overlay").show();
		},
		create : function(){
			var _$ = window.top.$;
			if(!_$(".overlay").length){
				_$(document.body).append('<div class="overlay"></div>');
			}
			_$(document.body).append('<div class="loading"><div class="loadingcircle">'
				+'<div class="loadingcircle-container loadingcircle1">'
				+'<div class="circle1"></div>'
				+'<div class="circle2"></div>'
				+'<div class="circle3"></div>'
				+'<div class="circle4"></div>'
				+'</div>'
				+'<div class="loadingcircle-container loadingcircle2">'
				+'<div class="circle1"></div>'
				+'<div class="circle2"></div>'
				+'<div class="circle3"></div>'
				+'<div class="circle4"></div>'
				+'</div>'
				+'<div class="loadingcircle-container loadingcircle3">'
				+'<div class="circle1"></div>'
				+'<div class="circle2"></div>'
				+'<div class="circle3"></div>'
				+'<div class="circle4"></div>'
				+'</div>'
				+'</div></div>');
		},
		destroy:function(){
			var _$ = window.top.$;
			_$(".loading").remove();
			_$(".overlay").hide();
		},
		hide:function(){
			var _$ = window.top.$;
			_$(".loading").hide();
			_$(".overlay").hide();
		}
	},
	//toast弹出提示框
	toast : function(message,type){
		layer.msg(message);
	},
	//带按钮的提示框
	dialog : function (text,callback,params){
		this.loader.hide();
		var r = window.confirm(text);
		if(r){
			if(callback==99){
				this.reload();
			}else if(typeof callback=="function"){
				callback(params);
			}
		}
	}
};

