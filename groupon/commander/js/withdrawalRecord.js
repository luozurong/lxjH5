
var scrollTop = "";
var onscrollStatus=false;

var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser=true;
} else {
	isWxBrowser=false;
}



//mmsHost = "https://tt.hori-gz.com:8443";
/*host = mmsHost;
commodityId = "1540187623912ff3ae4f815742bcbb5a";
organizationSeq = "4400100183";
token = "_15444060121896d708361a0d43a68164";*/


var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser:isWxBrowser,
		mmsHost:mmsHost,
		token:'',
		recordData:null,
		recordList:[],
		presentTotal:15,
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			this.getbasicData();
		});

	},
	methods: {
		getData: function(pageSize,pageNum) {
			var that = this;
			var params = {
				body: {
					pageSize: pageSize,
					pageNum: pageNum
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/getWithdrawCashInfo", params).then(function(res) {
				console.log(res);
				onscrollStatus = true;
				that.recordData=res.data;
				var list = res.data.list ? res.data.list : [];
				that.recordList=that.recordList.concat(list);
				that.presentTotal = Math.ceil(that.recordList.length / 15) * 15;	
			}, function(res) {})						
		},
	

		
		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},

		
		aminateFun: function() {
			var eleG = document.getElementById("chairmanMoreInfo");
			eleG.style.maxHeight = "0";		
		},
		getbasicData: function() {
			if(!this.isWxBrowser) { //app环境
				this.setCookie('token', this.GetURLParameter("token"));
				setTitle("提现记录");
				nativeMethod("showClosebutton", null);
			}
			this.getData(15,1);
			
			var that = this;
			if (isWxBrowser) {
				this.wxJsdkConfig();
			}		
		},
	},
	watch: {
		
	}
});

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}

function getScrollTop() {　　
	var scrollTop = 0,
		bodyScrollTop = 0,
		documentScrollTop = 0;　　
	if(document.body) {　　　　
		bodyScrollTop = document.body.scrollTop;　　
	}　　
	if(document.documentElement) {　　　　
		documentScrollTop = document.documentElement.scrollTop;　　
	}　　
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
	return scrollTop;
}
//文档的总高度

function getScrollHeight() {　　
	var scrollHeight = 0,
		bodyScrollHeight = 0,
		documentScrollHeight = 0;　　
	if(document.body) {　　　　
		bodyScrollHeight = document.body.scrollHeight;　　
	}　　
	if(document.documentElement) {　　　　
		documentScrollHeight = document.documentElement.scrollHeight;　　
	}　　
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
	return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight() {　　
	var windowHeight = 0;　　
	if(document.compatMode == "CSS1Compat") {　　　　
		windowHeight = document.documentElement.clientHeight;　　
	} else {　　　　
		windowHeight = document.body.clientHeight;　　
	}　　
	return windowHeight;
}

window.onscroll = function() {　　
	console.log(getScrollTop()+'   '+getWindowHeight()+'   '+getScrollHeight())
	if(getScrollHeight() - getScrollTop() - getWindowHeight() < 350 && onscrollStatus) {　
		onscrollStatus = false;
		//vue.getData()
		if(vue.recordList.length>=vue.presentTotal){
			pageNum=Math.ceil(vue.presentTotal / 15)+1;
		}else{
			pageNum=Math.ceil(vue.presentTotal / 15);
		}
		if (pageNum>1&&pageNum>Math.ceil(vue.presentTotal / 15)) {
			vue.getData(15, pageNum);
		}
	}
};
