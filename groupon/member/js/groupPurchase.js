var scrollTop = "";

var images1 = new Image();
images1.src = "images/ic_cut_-no-active-.png";
var images2 = new Image();
images2.src = "images/list_btn_ic_subtract@3x.png";
var images3 = new Image();
images3.src = "images/ic_add_-active_no.png";
var images4 = new Image();
images4.src = "images/list_btn_ic_add@3x.png";

/*mmsHost = mmsHost;

mmsHost = "https://tt.hori-gz.com:8443";*/
/*commodityId = "1540187623912ff3ae4f815742bcbb5a";
organizationSeq = "4400100183";
token = "_15444060121896d708361a0d43a68164";*/

var vue = new Vue({
	el: '#app',
	data: {
		mmsHost: mmsHost,
		transitionShow: false,
		transitionShow2: false,
		transitionShow3: false,
		isWxBrowser: isWxBrowser,
		vistorToken: "_20181228",
		chairmanMoreInfoState: false,
		activityNoticeState: false,
		countDownTimeStamp: 0,
		countDown: ["00", "00", "00", "00"],
		countonw: [1, 2, 3, 4, 5],
		commodityList: [1, 2, 3, 4, 5, 8, 8, 8, 9],
		stockQuantityData: [],
		chooseData: [],
		jsonPdata: null,
		carouselList: [],
		carouselIndex: 0,
		carouselItem1: null,
		carouselItem2: null,
		totailPrice: 0.00,
		saveOrderData: null,
		jsonDataleader: null,

		activityId: "",
		groupLeaderId: "",
		codes: "",

	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			this.getbasicData();
			//	this.setCookie('token', '_154682826078f0c2f22eb5664d0490f0');
		});

	},
	methods: {
		getData: function() {
			var that = this;
			var params = {
				body: {
					activityId: this.activityId,
					groupLeaderId: this.groupLeaderId,
					codes: this.codes
				},
				header: {
					token: this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/getGroupActivityDetailForMember", params).then(function(res) {
				that.jsonPdata = res.data;

				var timeS = res.data.serverTime ? (res.data.serverTime / 1000) : "0";
				var timeE = res.data.activityEndTime ? (res.data.activityEndTime / 1000) : "0";

				that.countDownTimeStamp = (timeE - timeS) >= 0 ? parseInt(timeE - timeS) : 0;

				document.title = res.data.activityName ? res.data.activityName : "团购商品列表详情";

				if(res.data.isEnd == 1) {
					that.countDownTimeStamp = 0;
				} else {
					that.getCountdown(that.countDownTimeStamp);
					that.countdownStart();
				}

				//that.stockQuantityData = res.data.list ? res.data.list : [];
				that.commodityList = res.data.list ? res.data.list : [];
				that.getNumberData(that.commodityList);

				that.jsonDataleader = {
					groupLeaderId: that.groupLeaderId,
					activityId: that.activityId,
					activityName: res.data.activityName,
					groupLeaderName: res.data.groupLeaderName,
					groupLeaderphone: res.data.phone,
					groupLeaderaddress: res.data.doorplateAddr
				}

			}, function(res) {})
		},
		getGroupActivityCarouselList: function() {
			var that = this;
			var params = {
				body: {
					activityId: this.activityId,
					groupLeaderId: this.groupLeaderId,
					codes: this.codes
				},
				header: {
					token: this.getCookie("token"),
					/* this.getCookie("token")*/
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/getGroupActivityCarouselList", params).then(function(res) {
				that.carouselList = res.data.carouselList ? res.data.carouselList : [];
				if (that.carouselList.length>0&&that.carouselList.length<=2) {
					that.carouselList = that.carouselList.concat(res.data.carouselList);
					that.carouselList = that.carouselList.concat(res.data.carouselList);
				}
				if(that.carouselList.length > 0) {
					that.animateStart()
					that.animateStart2()
				}

			}, function(res) {})
		},
		getNumberData: function(list) {
			var listG = [];
			for(var i = 0; i < list.length; i++) {
				var stockQuantity = {
					stockQuantity: list[i].stock,
					sellerId: list[i].sellerId,
					sellerName: list[i].sellerName,
					imgUrl: list[i].imgUrl,
					commodityId: list[i].commodityId,
					commodityName: list[i].commodityName,
					limit: list[i].limitCount > 0 ? list[i].limitCount : 999,
					price: list[i].buyPrice,
					num: 0,
				};
				listG.push(stockQuantity);
			}
			this.stockQuantityData = this.stockQuantityData.concat(listG);
		},
		getsaveOrderData: function() {
			var dataOrder = null;
			var list1 = [];
			for(var i = 0; i < this.stockQuantityData.length; i++) {

				if(this.stockQuantityData[i].num > 0) {

					if(list1.length > 0) {
						if(JSON.stringify(list1).indexOf(this.stockQuantityData[i].sellerId) >= 0) {
							for(var j = 0; j < list1.length; j++) {
								if(list1[j].sellerId == this.stockQuantityData[i].sellerId) {

									list1[j].list.push({
										imgUrl: this.stockQuantityData[i].imgUrl,
										commodityId: this.stockQuantityData[i].commodityId,
										commodityName: this.stockQuantityData[i].commodityName,
										num: this.stockQuantityData[i].num,
										price: this.stockQuantityData[i].price,
									})
									break;
								}
							}
						} else {
							list1.push({
								sellerId: this.stockQuantityData[i].sellerId,
								sellerName: this.stockQuantityData[i].sellerName,
								list: [{
									imgUrl: this.stockQuantityData[i].imgUrl,
									commodityId: this.stockQuantityData[i].commodityId,
									commodityName: this.stockQuantityData[i].commodityName,
									num: this.stockQuantityData[i].num,
									price: this.stockQuantityData[i].price,
								}]
							});
						}
					} else {
						list1.push({
							sellerId: this.stockQuantityData[i].sellerId,
							sellerName: this.stockQuantityData[i].sellerName,
							list: [{
								imgUrl: this.stockQuantityData[i].imgUrl,
								commodityId: this.stockQuantityData[i].commodityId,
								commodityName: this.stockQuantityData[i].commodityName,
								num: this.stockQuantityData[i].num,
								price: this.stockQuantityData[i].price,
							}]
						});
					}
				}
			}
			this.saveOrderData = list1;
		},

		//增加数量操作
		addData: function(num, stockQuantity, limit, i) { //数量增加按钮操作事件响应（num:当前数量，stockQuantity：商品库存，i数据索引标识）
			window.event.cancelBubble = true;
			if(num >= stockQuantity) { //数量增加超出相应商品库存
				lxjTip.msg('亲，老板没那么多存货呢!', {
					time: 1500
				});
				return false;
			}
			if(num >= limit) { //单个商品最大购买数
				lxjTip.msg('亲，商品购买数量已达上限了!', {
					time: 1500
				});
				return false;
			}
			num++;
			this.$set(this.stockQuantityData[i], "num", num);
		},
		//减少数量操作
		reduceData: function(num, i) { //数量减少按钮操作事件响应（num:当前数量，stockQuantity：商品库存，ij数据索引标识）
			window.event.cancelBubble = true;
			if(num <= 0) { //单个商品最小购买数为1
				return false;
			}
			num--;
			this.$set(this.stockQuantityData[i], "num", num);

		},

		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		animateStart: function() {
			var timeStat2 = setInterval(function() {
				if(vue.transitionShow) {
					vue.transitionShow = false;
				} else {
					//clearInterval(timeStat);										
					vue.transitionShow = true;
					if(!vue.transitionShow2) {
						setTimeout("vue.transitionShow3=true", 100)
					}
				}
			}, 3000)
		},
		animateStart2: function() {
			var timeStat2 = setInterval(function() {
				if(vue.transitionShow3) {
					if(vue.transitionShow2) {
						vue.transitionShow2 = false;
					} else {
						//clearInterval(timeStat);
						vue.transitionShow2 = true;
					}
				}

			}, 3000)
		},
		countdownStart: function() {
			var timeStat = setInterval(function() {
				if(vue.countDownTimeStamp > 0) {
					vue.countDownTimeStamp = vue.countDownTimeStamp - 1;
				} else {
					clearInterval(timeStat);
				}
			}, 1000)
		},
		getCountdown: function(num) {
			var dayNum = parseInt(num / 86400);
			if(dayNum < 10) dayNum = "0" + dayNum;
			var dayNum2 = num % 86400;

			var hoursNum = parseInt(dayNum2 / 3600);
			if(hoursNum < 10) hoursNum = "0" + hoursNum;
			var hoursNum2 = dayNum2 % 3600;

			var MMNum = parseInt(hoursNum2 / 60);
			if(MMNum < 10) MMNum = "0" + MMNum;

			var SSNum = hoursNum2 % 60;
			if(SSNum < 10) SSNum = "0" + SSNum;

			Vue.set(this.countDown, 0, dayNum);
			Vue.set(this.countDown, 1, hoursNum);
			Vue.set(this.countDown, 2, MMNum);
			Vue.set(this.countDown, 3, SSNum);

		},
		isCondition: function(param) {
			if(param != null && param != "" && param != undefined) {
				return true;
			}
			return false;
		},
		aminateFun: function() {
			var eleG = document.getElementById("chairmanMoreInfo");
			eleG.style.maxHeight = "0";
		},
		goOrdersCentre: function() {
			window.event.cancelBubble = true;
			if(!this.isCondition(this.getCookie("unionid"))) {
				this.wxLogin();
				return false;
			}
			if(this.getCookie("code") != '0') { //非联享家用户走注册流程
				window.location.href = mmsHostN+"/mms/html5/groupon/member/register.htm"
			} else {
				window.location.href = "ordersCentre.htm";
			}
		},
		goDetail: function(id) {
			window.event.cancelBubble = true;
			window.location.href = "commodityDetail.htm?commodityId=" + id;
		},
		goConfirmOrder: function() {
			window.event.cancelBubble = true;
			if(!this.isCondition(this.getCookie("unionid"))) {
				this.wxLogin();
				return false;
				//window.location.replace("login.htm")
			}
			if(this.saveOrderData.length == 0) {
				lxjTip.msg('亲，至少选择购买一件商品!', {
					time: 1500
				});
				return false;
			}
			sessionStorage.setItem("saveOrderData", JSON.stringify(this.saveOrderData));
			sessionStorage.setItem("jsonDataleader", JSON.stringify(this.jsonDataleader));

			/*window.location.href = "confirmOrder.htm";*/
			if(this.getCookie("code") != '0') { //非联享家用户走注册流程
				window.location.href = mmsHostN+"/mms/html5/groupon/member/register.htm"
			} else {
				sessionStorage.setItem("saveOrderData", JSON.stringify(this.saveOrderData));
				//	window.location.href = "../../wechatH5/dist/confirmOrder.htm?pageFrom=wxGroup";
				window.location.href = "confirmOrder.htm?pageFrom=wxGroup";
				//window.location.href = "http://tt.hori-gz.com/mms/html5/groupon/member/confirmOrder.htm"
			}
		},

		getbasicData: function() {
			this.activityId = this.GetURLParameter("activityId");
			this.groupLeaderId = this.GetURLParameter("groupLeaderId");
			this.codes = this.GetURLParameter("codes");

			/*this.activityId = "154839995600d8e946e3d7fe405da029";
			this.groupLeaderId = "154743571811e7ac40d538c44a528fd1";
			this.codes = "246882,335620,424285";*/

			this.getData();
			this.getGroupActivityCarouselList();

			var that = this;
			if(this.isWxBrowser) {
				this.wxJsdkConfig();
				if(this.isCondition(this.GetURLParameter("code"))) { //授权重定向页面
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
	},
	watch: {
		stockQuantityData: {
			handler:function(val, oldVal) {
				var totailP = 0;
				for(var i = 0; i < this.stockQuantityData.length; i++) {
					totailP = totailP + (this.stockQuantityData[i].price * this.stockQuantityData[i].num * 100);
				}
				vue.totailPrice = String(parseFloat(totailP / 100).toFixed(2));
				vue.jsonDataleader.totailPrice = vue.totailPrice
				vue.getsaveOrderData()
			},
			deep: true
		},

		transitionShow2: function(newVal, oldVal) {
			if(!newVal) {
				if(vue.carouselIndex < vue.carouselList.length - 2) {
					vue.carouselIndex = vue.carouselIndex + 2;
				} else {
					if (vue.carouselIndex==vue.carouselList.length - 1) {
						vue.carouselIndex= 1;
					}else{
						vue.carouselIndex= 0;
					}					 
				}
			}
		},
		countDownTimeStamp: function(newVal, oldVal) {
			vue.getCountdown(newVal);
		},
		chairmanMoreInfoState: function(newVal, oldVal) {
			var eleG = document.getElementById("chairmanMoreInfo");
			var eleG2 = document.getElementById("chairmanMoreInfo2");

			if(newVal) {
				//vue.couponMoreState2 = true;
				setTimeout(function() {
					eleG.style.maxHeight = "9rem";
					eleG2.style.maxHeight = "9rem";
				}, 10)
			} else {
				//vue.couponMoreState2 = false;
				setTimeout(function() {
					eleG.style.maxHeight = "0";
					eleG2.style.maxHeight = "0";
				}, 10)
			}
		},
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