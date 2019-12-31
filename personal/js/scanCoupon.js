var backHomePage = GetURLParameter("backHomePage"); //回退到生活首页
if(backHomePage == "3") {//链接带有指定属性，不修改返回键 返回首页属性	
}else{
	backToHomePage();
}

setTitle("领取优惠券");
var showTime;
var vue = new Vue({
	el: '.scan',
	data:{
		couponInfo: null,
		lxjApp: lxjAppFlag(),
		showDiscFlag: true,
		showDiscIcon: 'images/ic_put-up@3x.png',
		couponFlag: true,
		couponEmpty: false,
		overCouponFlag: false,
		scanTypeFlag: true,
		yanFlag: true,
		userMobile: GetURLParameter('userMobile') != null ? GetURLParameter("userMobile") : '',
		codeShow: false,
		picCode: '',
		telCode: '',
		timeNum: 60,
		picRandomUrl: '',
		submitFlag: true,
		emptyWord: '优惠券已被领完',
		limitcollar: 1,
		okSubmitFlag: false,  //是否能够立即领取（微信）
		couponCode: GetURLParameter('couponCode'),
		token: GetURLParameter('token') != null ? GetURLParameter("token") : '_test',
		uums: uumsHost,
		mms: mmsHost
		/*uums: 'https://tt.hori-gz.com:8443',
		mms: 'https://tt.hori-gz.com:8443',*/
	},
	filters:{
		dateTime: function(value){
			return value.replace(/-/g,".")
		}
	},
	methods:{
		conponAjax: function(){ //优惠券详情信息获取
			var params = {
				body:{
					couponCode: this.couponCode,
				},
				header:{
					token: this.token,
					time_stamp: new Date().getTime()
				}
			};
			var paramsStr = encodeURI(JSON.stringify(params));
            var httpURL = this.mms+"/mms/servlet/getCouponDetail?str="+paramsStr;
            this.$http.jsonp(httpURL,{
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            }).then(function(res){ 
            	if(res.body.result == 0){
            		this.couponInfo = res.body.couponInfo;
            		this.limitcollar = res.body.couponInfo.limitcollar;
            		this.couponEmpty = false;
            	}else{
            		this.couponEmpty = true;
            	}
            	console.log(res);
            },function(res){
            	this.couponEmpty = true;
            });
		},
		myCoupon: function(){  //点击立即领取优惠券

			if(this.submitFlag){ //其他扫码获取优惠券
				if(!this.lxjApp){
					var mobileRex = /^[1][0-9]{10}/;
					if(this.userMobile == '' || !mobileRex.test(this.userMobile)){
						lxjTip.msg("请输入正确的手机号码");
						return false;
					}
					if(this.telCode == ''){
						lxjTip.msg("请输入短信验证码");
						return false;
					}
					if(!this.okSubmitFlag){   //过滤非登录流程直接领取优惠券
						lxjTip.msg("请输入正确的短信验证码");
						return false;
					}
					this.submitFlag = false;
					this.getNewToken();
				}else{  //App联享家5.2扫码获取优惠券
					if(this.token.indexOf("_") == 0){
						needLogin(this.token);
						return false;
					}

					this.submitFlag = false;
					this.getCouponAjax();
				}
			}
			
			
		},
		getCouponAjax: function(){  //获取优惠券
			var params = {
				body:{
					couponId: this.couponInfo.couponId
				},
				header:{
					token: this.token,
					time_stamp: new Date().getTime()
				}
			};
			if(this.userMobile != null && this.userMobile != "" && this.userMobile != undefined){
				params.body.mobile=this.userMobile;
			}
			var paramsStr = encodeURI(JSON.stringify(params));
            var httpURL = this.mms+"/mms/servlet/receiveCoupon?str="+paramsStr;
            this.$http.jsonp(httpURL,{
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            }).then(function(res){ 
            	if(res.body.result == 0){
            		lxjTip.msg("领取成功"+this.limitcollar+"张");
            		this.overCouponFlag = true;
            	}else if(res.body.result == '019'){ //已经领过优惠券
            		lxjTip.msg("优惠券已被领完");
            		this.couponEmpty = true;
            		this.emptyWord = "优惠券已被领完";
            	}else if(res.body.result == '020'){ 
            		lxjTip.msg("您已领取过优惠卷");
            		this.overCouponFlag = true;
            	}else if(res.body.result == '021'){ 
            		lxjTip.msg("该优惠券已失效或已过期");
            		this.couponEmpty = true;
            		this.emptyWord = "该优惠券已失效或已过期";
            	}else{
            		lxjTip.msg(res.body.reason);
            	}
            	this.submitFlag = true;
            	if(!this.lxjApp){
            		this.userMobile = '';
            		this.telCode = '';
            		this.okSubmitFlag = false;
            		this.token = '_test';
            	}

            	this.timeNum = 60;
            	this.yanFlag = true; // 立即领取后，倒数秒数消失
            	clearInterval(showTime);

            	console.log(res);
            },function(res){});
		},
		showDisc: function(){
			if(this.showDiscFlag){	
				this.showDiscIcon = 'images/btn_ic_put-up.png';
				this.showDiscFlag = false;
			}else{
				this.showDiscIcon = 'images/ic_put-up@3x.png';
				this.showDiscFlag = true;
			}
		},
		sendCode: function(){
			var mobileRex = /^[1][0-9]{10}/;
			if(this.userMobile == '' || !mobileRex.test(this.userMobile)){
				lxjTip.msg("请输入正确的手机号码");
			}else{
				this.codeShow = true;
				this.picCodeAjax();
			}
		},
		picCodeAjax: function(){  //图形验证码获取
			var params = {
				body:{
					phone:this.userMobile,
				},
				header:{
					token: this.token,
					time_stamp: new Date().getTime()
				}
			};
			var paramsStr = encodeURI(JSON.stringify(params));
            var httpURL = this.uums+"/uums/servlet/getPicRandomServlet?str="+paramsStr;
            this.$http.jsonp(httpURL,{
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            }).then(function(res){ 
            	if(res.body.result == 0){
            		this.picCode = '';
            		this.picRandomUrl = res.body.picRandomUrl;
            	}
            },function(res){});
		},
		imgCode: function(){
			this.picCodeAjax();
		},
		cancelCode: function(){
			this.codeShow = false;
		},
		sureSend: function(){
			this.codeShow = false;
			this.messegeCodeAjax();
		},
		goBuy: function(couponId){
			if(sessionStorage.getItem("lxjversionsName") >= 5103){
				showActivity(this.mms + "/mms/html5/supermarket/couponCommodities.htm?couponId=" + couponId, "优惠商品使用列表");
			}else{
				lxjTip.msg("优惠券需在联享家APP5.2或更高版本使用！");
			}
			//location.href=this.mms + "/mms/html5/supermarket/couponCommodities.htm?couponId=" + couponId;
		
		},
		messegeCodeAjax: function(){  //获取短信验证码
			if(this.picCode == ''){
				lxjTip.msg("请输入图片验证码");
				return false;
			}
			var params = {
				body:{
					sourceClientCode: "lxj_u",
					picRandom: this.picCode,
					phone: this.userMobile,

				},
				header:{
					token: this.token,
					time_stamp: new Date().getTime()
				}
			};
			var paramsStr = encodeURI(JSON.stringify(params));
	        var httpURL = this.uums+"/uums/servlet/getRandomCodeForSmsLogin?str="+paramsStr;
	        this.$http.jsonp(httpURL,{
	            emulateJSON: true,
	            method: "get",
	            dataType: "jsonp",
	            jsonp: "jsoncallback",
	            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	        }).then(function(res){ 
	        	console.log(res);
	        	if(res.body.result == 0){
	        		if(res.body.code == 1){
	        			lxjTip.msg("信息已发送，请注意查收");
						this.codeShow = false;
						this.timeNumFunc();
	        		}else if(res.body.code == 2){
	        			lxjTip.msg("验证码不正确");
	        			this.picCodeAjax();
	        		}else if(res.body.code == 3){
	        			lxjTip.msg("同一号码当天发送次数超过限制5次");
	        			this.codeShow = false;
	        		}else if(res.body.code == 4){
	        			lxjTip.msg("同一IP当天发送次数超过限制10次");
	        			this.codeShow = false;
	        		}else if(res.body.code == 5){
	        			lxjTip.msg("同一号码发短信间隔时间超过限制120s");
	        			this.codeShow = false;
	        		}else if(res.body.code == 6){
	        			lxjTip.msg("调用短信网关发送发生异常");
	        			this.codeShow = false;
	        		}else if(res.body.code == "-1"){
	        			lxjTip.msg("短信发送超过次数限制");
	        			this.codeShow = false;
	        		}

	        		if(!this.lxjApp){ //是否能够立即领取（微信）
						this.okSubmitFlag = true;
					}
					
	        	}
        	},function(res){});
	    },
	    getNewToken: function(){  //其他扫码获取优惠券需要获取的token
	    	var params = {
				body:{
					mobile: this.userMobile,
					smsVerifyCode: this.telCode
				},
				header:{
					token: this.token,
					time_stamp: new Date().getTime()
				}
			};
			var paramsStr = encodeURI(JSON.stringify(params));
	        var httpURL = this.uums+"/uums/servlet/smsGetToken?str="+paramsStr;
	        this.$http.jsonp(httpURL,{
	            emulateJSON: true,
	            method: "get",
	            dataType: "jsonp",
	            jsonp: "jsoncallback",
	            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	        }).then(function(res){ 
	        	console.log(res);
	        	if(res.body.result == 0){
	        		if(res.body.code == 0){
	        			this.token = res.body.token;
	        		}
	        		this.getCouponAjax();
	        	}
	        	this.submitFlag = true;
	        	this.okSubmitFlag = false;
        	},function(res){});
	    },
	    timeNumFunc: function(){  //60s倒计时
			var that = this;
			that.yanFlag = false;
			showTime = setInterval(function(){
				that.timeNum -= 1;
				if(that.timeNum == 0){
					that.timeNum = 60;
					that.yanFlag = true;
					clearInterval(showTime);
				}
			},1000);
	    },
	   
	},
	mounted: function(){
		this.conponAjax();
		console.log("初始化成功")
	}
})
function GetURLParameter(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//判断时候需要手机登录
function lxjAppFlag(){
	var tokenTemp = GetURLParameter('token');
	if(tokenTemp != null && tokenTemp != undefined && tokenTemp != ''){
		return true;
	}else{
		return false;
	}
}