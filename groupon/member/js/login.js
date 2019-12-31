
var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser: isWxBrowser,
		popupState: false,
		isAgree: true,
		phoneNum: '',
		randomCodeNum: '',
		picRandomNum: '',
		picRandomUrl: "",
		randomCodeNumState: false,
		randomContent: "获取验证码",
		mobileplaceholder: "请输入手机号",
		messageplaceholder: "请输入短信验证码",

		apiurl3: uumsHost + "/uums/servlet/getPicRandomServlet", //获取图片验证码接口
		apiurl4: uumsHost + "/uums/servlet/getRandomCodeForSmsLogin", //获取短信验证码
		apiurl5: uumsHost + "/uums/wxGzh/wxGzhLoginBindMobile", //获取短信验证码

		apiurls: uumsHost + "/uums/wxGzh/wxGzhAuth", //获取fx
		stateSS: true,
		nuM:0,
		
		
		
		targetPage:'',
		goPage:'',

	},
	filters: {
		//状态过滤
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getBase();

			
		});
	},
	methods: {
		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		isCondition: function(param) {
			if(param != null && param != "" && param != undefined) {
				return true;
			}
			return false;
		},
		getTip: function() {
						
		},
		getBase: function() {
			this.targetPage=this.GetURLParameter("targetPage");
			
			if (this.isCondition(this.GetURLParameter("targetPage"))) {
				if(this.targetPage=="grouponActivity"){//活动页面授权登录
					this.goPage="../commander/grouponActivity.htm";
				}else if(this.targetPage=="grouponDetail"){//活动内容页授权登录					
					this.goPage="../commander/grouponDetail.htm?activityId="+this.GetURLParameter("activityId");
				}else if(this.targetPage=="commanderPersonal"){//团长页授权登录					
					this.goPage="../commander/commanderPersonal.htm";
				}										
			}else{
				lxjTip.msg("错误目标")
			}
								
			var that = this;
			this.wxJsdkConfig();
			
						
			if(this.isWxBrowser) {				
				if(this.isCondition(this.GetURLParameter("code"))&&sessionStorage.getItem("wxLogin")!="haslogin") { //授权重定向页面
					if(this.isCondition(sessionStorage.getItem("codeWechat"))) {						
						return false;
					}
					var codeWechat = this.GetURLParameter("code") ? this.GetURLParameter("code") : 1;
					var appid = this.GetURLParameter("appid") ? this.GetURLParameter("appid") : '';
					this.setCookie('appid', appid);
					sessionStorage.setItem("codeWechat", codeWechat);
					this.wxInfoAjax();
					sessionStorage.setItem("wxGzhAuthStart", "0");
					return false;
				}
				if(this.isCondition(this.getCookie("token"))) { //8小时内登录
					if(this.getCookie("token").indexOf('_') == -1) { //正常用户登录，走检测用户账号状态
						this.getTokenInfo();
					} else { //游客登录,每次提示授权
						//this.getTokenInfo(true);
						this.wxLogin();
					}
				} else { //登录信息为空需授权
					this.wxLogin();
				}								
			}
		},
	}
});

/*document.getElementById('fourth_box').ontouchstart = function(e){ e.preventDefault(); }*/
/*vue.$watch('classifyList', function(newValue, oldValue) {
});*/

function refreshData() {
	setTimeout(function() {
		//vue.getDatejson(true);
		//vue.getlistLatestrecords();
	}, 0);
	return 1;
}

function isCondition(param) { // (!typeof(a) === undefined)
	if(param != null && param != "" && param != undefined) {
		return true;
	}
	return false;
}
//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}