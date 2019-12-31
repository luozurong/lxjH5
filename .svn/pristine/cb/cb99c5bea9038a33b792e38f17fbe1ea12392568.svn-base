var onscrollStatus = false;
var scrollTop = "";

/*var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser=true;
} else {
	isWxBrowser=false;
}*/

//mmsHost = "https://tt.hori-gz.com:8443";
/*host = mmsHost;
commodityId = "1540187623912ff3ae4f815742bcbb5a";
organizationSeq = "4400100183";
token = "1546587535130c31b543e0f34080b29f";*/

var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser: isWxBrowser,
		orderStatus: "-1",
		jsondate: null,
		orderList: [],
		presentTotal: 10,
		mmsHost: mmsHost,
		token: "token",
		mobile: "",
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
		getDatejson: function(pageSize, pageNum, refreshState) {
			var phoneNum = vue.mobile;

			var that = this;
			var params = {
				body: {
					orderType: 9,
					angleKey: 1,
					searchMobile: phoneNum,
					orderStatus: this.orderStatus,
					orderDetailNo: "",
					pageSize: pageSize,
					pageNum: pageNum,
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/getCommodityOrderList", params).then(function(res) {
				onscrollStatus = true;
				// 响应成功回调
				console.log(JSON.stringify(res.data))
				//this.message = JSON.stringify(response.body);
				that.jsondate = res.data;
				if(res.data.result == 0) {

					if(refreshState) {
						that.orderList = res.data.orderList;
					} else {
						that.orderList = that.orderList.concat(res.data.orderList);
					}
					that.presentTotal = Math.ceil(that.orderList.length / 10) * 10;
				}

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
		searchByphone: function() {
			document.getElementById("mobile").blur();
			var mobile1 = vue.mobile;
			if(mobile1.length == 0) {
				this.orderList = [];
				this.jsondate = null;
				this.getDatejson(10, 1);
				return false;
			}
			if(!(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(mobile1))) {
				lxjTip.msg("*请您输入正确的11位手机号码")
				return false;
			}
			this.orderList = [];
			this.jsondate = null;
			this.getDatejson(10, 1);
		},
		//前往活动
		goGrouponActivity: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "grouponActivity.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponActivity.htm", "拼团活动");
			}
		}, //前往订单
		goCommanderOrder: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "commanderOrder.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderOrder.htm", "订单");
			}
		}, //前往我的
		goCommanderPersonal: function() {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "commanderPersonal.htm";
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/commanderPersonal.htm", "我的");
			}
		},
		goOrderDetail: function(orderN) {
			window.event.cancelBubble = true;
			if(isWxBrowser) {
				window.location.href = "orderDetail.htm?orderNo=" + orderN;
			} else {
				showActivity(mmsHostN + "/mms/html5/groupon/commander/orderDetail.htm?orderNo=" + orderN, "订单详情");
			}

		},

		getbasicData: function() {
			if(!this.isWxBrowser) { //app环境
				this.setCookie('token', this.GetURLParameter("token"));
				setTitle("订单");
				nativeMethod("showClosebutton", null);
			}
			//	this.token=
			this.getDatejson(10, 1);

			var that = this;
			if(isWxBrowser) {
				this.wxJsdkConfig();
			}
		},
	},
	watch: {
		orderStatus: function(newVal, oldVal) {
			this.orderList = [];
			this.jsondate = null;
			this.getDatejson(10, 1);
		}

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
		vue.getDatejson(vue.presentTotal, 1, true);
		
		//		var listnumber = $(".orderInformation li").length;
		//		if(listnumber<10){
		//			listnumber=10;
		//			currentPageNum=1;
		//		}else{
		//			currentPageNum=Math.ceil(listnumber/10);
		//			listnumber=Math.ceil(listnumber/10)*10;
		//		}
		//		getOrderList(listnumber, true);
	}, 0);
	return 1;
}
//滚动条在Y轴上的滚动距离
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
	//console.log(getScrollTop()+'   '+getWindowHeight()+'   '+getScrollHeight())
	if(getScrollHeight() - getScrollTop() - getWindowHeight() < 1000 && onscrollStatus) {　
		onscrollStatus = false;
		if(vue.orderList.length >= vue.presentTotal) {
			pageNum = Math.ceil(vue.presentTotal / 10) + 1;
		} else {
			pageNum = Math.ceil(vue.presentTotal / 10);
		}
		if(pageNum > 1 && pageNum > Math.ceil(vue.presentTotal / 10)) {
			vue.getDatejson(10, pageNum);
		}
	}
};