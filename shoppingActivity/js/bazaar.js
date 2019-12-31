var clientType = GetURLParameter("clientType");
var organizationSeq = GetURLParameter("organizationSeq");
var token = GetURLParameter("token");
var couponId = GetURLParameter("couponId");
var scrollTop = "";

//var giftbagId = GetURLParameter("giftbagId");
var giftbagId = "";
if(!isCondition(giftbagId)) {
	giftbagId = '';
}

mmsHost = host;

/*mmsHost = "https://tt.hori-gz.com:8443";
host = mmsHost;
couponId = "153958607165e78e4ba9b61e4e8b968f";
organizationSeq = "4400100001";
token = "154467044805c63da5e45ebb4700bbf2";*/

var isVisitor = false;
if(token && token.indexOf("_") == 0) {
	isVisitor = true;
	userAccount = token;
}

var vue = new Vue({
	el: "#marketing",
	data: {
		isVisitor: isVisitor, //游客判断
		shoppingCartInfo: [], //购物车信息
		commodityNId: null,
		productInfoData: null, //商品信息
		commentData: null, //评论信息
		mySwiperp: null, //主图轮播组件控制
		skuShowstate: 0,
		inputFocusState: false,
		skuSelectList: [],
		skuSelectDetailList: [],
		skuSelectTip: [],
		commoditySku: [],
		skuList: [],
		selectPrice: null,
		bugNumber: 1,
		clickState: false,
		minstockQuantity: 1,
		maxstockQuantity: 100,
		totalStockQuantity: 0,
		skuisSelect: [],
		bugInfoAminateS: false,
		couponId: couponId, //15242051008915e7cbb58d28473a9fde//153898123780e69b65fe7acf43d78d1d
		shoppingCartIdList: [],
		shoppingcartCount: 0,

		banner: '',

		commodityList: [],
		collectFlag: true,
		noDataText4: '抱歉，没有更多了',
		setTime: 0,
		pageNum: 0,
		ctmsHost: mmsHost,
		titleName: '',
		mmsHost: mmsHost,
		itemc: {
			type: 1,
			denomination: 10,
			couponId: "6666",
			couponCondition: 1,
			conditionMoney: 20,
			scope: 2,
			effectiveStart: 2018,
			effectiveEnd: 2019,
			receiveState: 1,
			useMsg: "没有更多了没有更多了没有更多了没有更多了没有更多了没有更多了"
		}

	},
	mounted: function() {
		this.$nextTick(function() {
			
			this.getShoppingcartCount()
		});

	},
	methods: {
		getCommodityDetail: function(commodityId) {
			var that = this;
			var params = {
				body: {
					areaOrgSeq: organizationSeq,
					commodityId: commodityId,
					shoppingCartType: '1',
					giftbagId: giftbagId
				},
				header: {
					token: token,
					time_stamp: new Date().getTime()
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = this.mmsHost + "/mms/servlet/getCommodityDetail?str=" + paramsStr;
			/*this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			})*/
			axios.post(this.mmsHost + "/mms/servlet/getCommodityDetail", params).then(function(res) {
				that.productInfoData = res.data;
				that.shoppingCartInfo = res.data.shoppingCartInfo;
				that.commoditySku = res.data.commoditySku;
				that.commodityNId = commodityId;
				that.skuList = res.data.skuList;
				that.skuSelectList = new Array(res.data.commoditySku.length);
				that.skuSelectDetailList = new Array(res.data.commoditySku.length);
				that.getskuisSelect(res.data.commoditySku);
				that.skuShowstate = 1;
			}, function(res) {})
		},
		getCoupon: function(couponId) {
			window.event.cancelBubble = true;
			_hmt.push(['_trackEvent', baiduButtonId, "1", "点我抢按钮"]);
			if(this.isVisitor) {
				this.gologinFun();
				return false;
			}
			var that = this;
			var params = {
				body: {
					couponId: couponId
				},
				header: {
					token: token,
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/receiveCoupon", params).then(function(res) {
				console.log(res);
				/*if(res.data.result == "0") {
					lxjTip.msg("领取成功！");
					setTimeout(function() {
						//that.getCouponData()
					}, 10)
				} else {
					lxjTip.msg("领取失败！")
					setTimeout(function() {
						//	that.getCouponData()
					}, 10)
				}*/

				if(res.data.result == 0) {
					lxjTip.msg("领取成功");
				} else if(res.data.result == '019') { //已经领过优惠券
					lxjTip.msg("优惠券已被领完");
				} else if(res.data.result == '020') {
					lxjTip.msg("您已领取过优惠卷");
				} else if(res.data.result == '021') {
					lxjTip.msg("该优惠券已失效或已过期");
				} else {
					lxjTip.msg("领取失败！")
					//lxjTip.msg(res.data.reason);
				}
			}, function(res) {
				lxjTip.msg("领取失败！")
			})
		},
		getShoppingcartCount: function() {
			var that = this;
			var params = {
				body: {
					areaOrgSeq: organizationSeq,
					type: 1
				},
				header: {
					token: token,
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/getShoppingcartCountServlet", params).then(function(res) {

				that.shoppingcartCount = res.data.totalCount < 100 ? res.data.totalCount : '…';
			}, function(res) {})
		},
		addShoppingcart: function() {
			var that = this;
			var params = {
				body: {
					commodityId: this.commodityNId,
					areaOrgSeq: organizationSeq,
					count: this.bugNumber,
					commoditySkuAttrIds: this.skuSelectList,
					commodityDetails: this.skuSelectDetailList.join("; "),
					type: 1
				},
				header: {
					token: token,
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/addShoppingcart", params).then(function(res) {
				//that.shoppingcartCount=res.data.totalCount<100?res.data.totalCount:'…';                  
				if(res.data.result == "0") {
					that.closeSelecSku();
					//that.skuShowstate = 0;
					lxjTip.msg("加入购物车成功");
					that.getShoppingcartCount();
					that.getCommodityDetail(that.commodityNId);
					that.skuSelectList = new Array(that.productInfoData.commoditySku.length);
					that.skuSelectDetailList = new Array(that.productInfoData.commoditySku.length);
					if(vue.shoppingCartIdList.length == 0 || vue.shoppingCartIdList.join(',').indexOf(res.data.id) < 0) {
						vue.shoppingCartIdList.push(res.data.id)
					}
				} else {
					lxjTip.msg("加入购物车失败");
				}
			}, function(res) {})
		},
		goConfirmOrder: function() {
			if(this.selectPrice == null) {
				lxjTip.msg(this.skuSelectTip);
				return false;
			}
			if(this.bugNumber == '') {
				lxjTip.msg("亲，请添加购买数量");
				return false;
			}
			if(this.bugNumber > 100) {
				lxjTip.msg("亲，商品购买数量已达上限了");
				return false;
			}
			if(this.bugNumber > this.totalStockQuantity) {
				lxjTip.msg("亲，老板没那么多存货呢");
				return false;
			}
			if(this.skuShowstate == 2) {
				sessionStorage.removeItem("shoppingCartCount");
				sessionStorage.removeItem("hadChooseReceiverId");
				showActivity(host + "/mms/html5/supermarket/confirmOrderNew.htm?commodityId=" + this.commodityId + "&commoditySkuAttrIds=" + this.skuSelectList + "&commodityCount=" + this.bugNumber + "&buyType=" + "2" + "&giftbagId=" + giftbagId, "确认订单");
				//this.skuShowstate = 0;
				this.closeSelecSku();
				this.skuSelectList = new Array(this.productInfoData.commoditySku.length);
				this.skuSelectDetailList = new Array(this.productInfoData.commoditySku.length);

			} else {
				if(this.totalStockQuantity >= 100) {
					if(this.maxstockQuantity <= 0) {
						//单件商品数量已满100件
						lxjTip.msg("亲，购物车购买数量已达上限了");
						return false;
					}
				} else {
					if(this.maxstockQuantity <= 0) {
						lxjTip.msg("亲，老板没那么多存货呢");
						return false;
					}
				}
				this.addShoppingcart();
			}

		},
		selectSku: function(id, baiduText, indexN) {
			window.event.cancelBubble = true;
			_hmt.push(['_trackEvent', baiduButtonId, "1", "加入购物车"]);
			_hmt.push(['_trackEvent',baiduButtonId, indexN, baiduText + "—加入购物车"]);
			//游客状态先走授权绑定流程
			if(this.isVisitor) {

				this.gologinFun();

				return false;
			}
			this.getCommodityDetail(id)
		},
		selectTagFun: function(i, j, item, items, state) { //点击规格
			if(state) {
				return false;
			}
			//console.log(i+"  "+item)			
			//this.skuSelectList[i]=item.paramId;
			if(this.skuSelectList[i] == item.paramId) {
				this.$set(this.skuSelectList, i, "");
				this.$set(this.skuSelectDetailList, i, "");
			} else {
				this.$set(this.skuSelectList, i, item.paramId);
				this.$set(this.skuSelectDetailList, i, items.skuName + ":" + item.paramName);
			}
			this.getskushowStatue();
		},
		closeSelecSku: function() {
			var eleG = document.getElementById("bugInfoAminate");
			eleG.style.maxHeight = "0";
			setTimeout(function() {
				document.body.style.overflow = 'auto';
				document.body.style.position = 'static';
				try {
					document.scrollingElement.scrollTop = scrollTop;
				} catch(e) {
					document.documentElement.scrollTop = scrollTop;
				}
				vue.skuShowstate = 0;
			}, 600)
			//this.skuShowstate = 0;
		},
		focusInput: function() {
			this.inputFocusState = true;
		},
		blurInput: function() {
			this.inputFocusState = false;
			if(this.bugNumber == '') {
				this.bugNumber = 1;
			}
			if(isNaN(this.bugNumber)) {
				this.bugNumber = 1;
			}
			if(this.bugNumber <= 0) {
				this.bugNumber = 1;
			}
			if(this.bugNumber > 100) {
				this.bugNumber = 100;
			}
			if(this.bugNumber > this.maxstockQuantity) {
				this.bugNumber = this.maxstockQuantity;
			}
			if(this.totalStockQuantity >= 100) {
				if(this.maxstockQuantity <= 0) {
					//单件商品数量已满100件
					lxjTip.msg("亲，购物车购买数量已达上限了");
					return false;
				}
			} else {
				if(this.maxstockQuantity <= 0) {
					lxjTip.msg("亲，老板没那么多存货呢");
					return false;
				}
			}
		},
		getskuisSelect: function(list) {
			var lista = new Array();
			for(var i = 0; i < list.length; i++) {
				var listab = new Array();
				for(var j = 0; j < list[i].skuValues.length; j++) {
					listab[j] = false;
				}
				lista[i] = listab;
			}
			this.skuisSelect = lista;
		},
		isConditionList: function(list) {
			for(var i = 0; i < list.length; i++) {
				if(list[i] == null || list[i] == "" || list[i] == undefined) {
					return true;
				}
			}
			return false;
		},
		isCondition: function(param) {
			if(param != null && param != "" && param != undefined) {
				return true;
			}
			return false;
		}, //获取选择文案提示
		getmissSelectText: function(list1, list2) {
			var a = '';
			for(var i = 0; i < list1.length; i++) {
				if(list1[i] == null || list1[i] == "" || list1[i] == undefined) {
					a = a + list2[i].skuName + " ";
				}
			}
			return a;
		}, //获取选择规格的价格
		getSelectPrice: function(list1, list2) {
			for(var i = 0; i < list2.length; i++) {
				if(list2[i].skuId == list1.join(',')) {
					return list2[i];
				}
			}
		},
		getNewlist: function(list, key) {
			var newList = new Array();
			var oldList = [];
			oldList = list;
			for(var i = 0; i < oldList.length; i++) {
				if(oldList[i].skuId.indexOf(key) >= 0) {
					newList.push(oldList[i])
				}
			}
			return newList;
		},
		getTagBox: function() {
			var tagBoxList = new Array();
			var tagBox = this.commoditySku;
			for(var i = 0; i < this.skuSelectList.length; i++) {
				if(!this.isCondition(this.skuSelectList[i])) {
					var aa = {
						index: i,
						list: this.commoditySku[i]
					}
					tagBoxList.push(aa);
				}
			}
			return tagBoxList;
		},
		getshowStatue0: function(list) {
			var newList = new Array();
			for(var i = 0; i < list.length; i++) {
				if(list[i].showStatue == '0') {
					newList.push(list[i]);
				}
			}
			return newList;
		},
		changeSkustate: function(list) {
			for(var i = 0; i < list.length; i++) {
				var bb = this.skuisSelect[list[i].index];
				for(var j = 0; j < this.skuisSelect[list[i].index].length; j++) {
					//this.skuisSelect[list[i].index][j]=false;
					this.$set(this.skuisSelect[list[i].index], j, true);
				}
			}
		},
		changeOneSkuliststate: function(list, skuBoxlist1) {
			for(var i = 0; i < list.length; i++) {
				if(list[i].showStatue == '0') {
					var items = skuBoxlist1[0].list.skuValues;
					for(var j = 0; j < items.length; j++) {
						if(list[i].skuId.indexOf(items[j].paramId) >= 0) {
							this.$set(this.skuisSelect[skuBoxlist1[0].index], j, true);
							break;
						}
					}
				}
			}
		},
		changeNoneSkuliststate: function(idlist, nonelist) {
			for(var i = 0; i < this.commoditySku.length; i++) {
				var newlist1 = new Array();
				for(var j = 0; j < this.commoditySku[i].skuValues.length; j++) {
					if(idlist[i] != this.commoditySku[i].skuValues[j].paramId) {
						var dd = {
							indexm: j,
							id: this.commoditySku[i].skuValues[j].paramId
						}
						newlist1.push(dd)
					}
				}
				if(newlist1.length > 0) {
					this.isChange(newlist1, idlist, nonelist, i)
				}
			}

		},
		isChange: function(list1, list2, list3, index) {
			for(var i = 0; i < list1.length; i++) {
				var newlist1 = new Array();
				newlist1 = list2.slice(0);
				newlist1[index] = list1[i].id;
				var skuIda = newlist1.join(",");
				for(var j = 0; j < list3.length; j++) {
					if(list3[j].skuId == skuIda) {
						this.$set(this.skuisSelect[index], list1[i].indexm, true);
						break;
					}
				}
			}
		},
		getskushowStatue: function() {
			var skuIdArridlist = this.skuSelectList;
			//	var skuIdNoneidlist = new Array();//没有选中状态的规格
			var skuCommodityList = new Array();
			var skuListO = this.skuList;
			var showStatue = 0;
			//skuListO = this.skuList;
			for(var i = 0; i < skuIdArridlist.length; i++) {
				if(this.isCondition(skuIdArridlist[i])) {
					skuListO = this.getNewlist(skuListO, skuIdArridlist[i])
				}
			}
			for(var i = 0; i < skuListO.length; i++) {
				if(skuListO[i].showStatue == '1') {
					showStatue = 1;
					break;
				}
			}
			var skuBoxlist = this.getTagBox();
			console.log(skuBoxlist)
			if(!this.isConditionList(this.skuSelectList)) {
				this.getskuisSelect(this.commoditySku);
				var showNonelist = this.getshowStatue0(this.skuList); //不可选择的规格组合数组
				this.changeNoneSkuliststate(skuIdArridlist, showNonelist);
			} else {
				this.getskuisSelect(this.commoditySku);
				console.log(this.skuisSelect);
			}
			if(showStatue == '0') {
				this.changeSkustate(skuBoxlist);
			} else {
				if(skuBoxlist.length == '1') {
					this.changeOneSkuliststate(skuListO, skuBoxlist);
				}
			}
		},
		getshoppingcarCount: function(key) {
			for(var i = 0; i < this.shoppingCartInfo.length; i++) {
				if(this.shoppingCartInfo[i].skuId == key) {
					return this.shoppingCartInfo[i].count;
				}
			}
		},
		reducebugNumber: function() {
			if(this.bugNumber <= 1) {
				this.bugNumber = 1;
			} else {
				this.bugNumber = this.bugNumber - 1;
			}
		},
		addbugNumber: function() {
			if(this.maxstockQuantity > 0) {
				if(this.bugNumber < this.maxstockQuantity) {
					this.bugNumber++;
				} else {
					this.bugNumber = this.maxstockQuantity;
				}
			} else {
				this.bugNumber == 1;
			}
		},

		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		goShoppingcart: function() {
			window.event.cancelBubble = true;
			
			_hmt.push(['_trackEvent', baiduButtonId, "2", "购物车图标点击次数"]);
			if(this.isVisitor) {
				this.gologinFun();
				return false;
			}
			var shoppingCartIds = vue.shoppingCartIdList.join(',');
			showActivitySpecial(host + "/mms/html5/supermarket/" + decodeURI("shoppingcart.htm?shoppingCartIds=" + shoppingCartIds + "&type=1"), "购物车", 1, null);

		},
		gologinFun: function() {
			needLogin(token);
		},
		goOtherPage: function(url,nameP,indexP) {
			window.event.cancelBubble = true;
			_hmt.push(['_trackEvent', baiduButtonId, indexP, nameP]);
			showActivity(url, "");
		},

		goDetail: function(id, nameP, indexP) {
			window.event.cancelBubble = true;
			_hmt.push(['_trackEvent', baiduButtonId, indexP, nameP + "—商品详情"]);
			var mmsHost="https://mms.hori-gz.com:8443";
			var url = mmsHost + "/mms/html5/supermarket/ProductDetail.htm?commodityId=" + id;
			console.log(url)
			console.log(nameP)
			console.log(indexP)
			showActivity(url, "商品详情");
		}

	},
	filters: {
		pricePre: function(value) {
			var val = parseInt(value);
			return val;
		},
		priceNext: function(value) {
			var val = '.' + String(parseFloat(value).toFixed(2)).split('.')[1];
			return val;
		}
	},
	watch: {
		skuSelectList: function(newVal, oldVal) {
			this.bugNumber = 1;
			this.totalStockQuantity = 1;
			this.maxstockQuantity = 100;
			if(this.isConditionList(this.skuSelectList)) {
				this.selectPrice = null;
				this.skuSelectTip = "请选择：" + this.getmissSelectText(this.skuSelectList, this.commoditySku);
				console.log(this.skuSelectTip)
			} else {
				this.skuSelectTip = "已选：" + this.skuSelectDetailList.join(',');
				this.selectPrice = this.getSelectPrice(this.skuSelectList, this.productInfoData.skuList).price;

				this.totalStockQuantity = this.getSelectPrice(this.skuSelectList, this.productInfoData.skuList).stockQuantity;
				if(this.skuShowstate == 2) {
					if(this.isCondition(this.giftbagId)) {
						this.maxstockQuantity = 1;
					} else {
						this.maxstockQuantity = (this.totalStockQuantity < 100 ? this.totalStockQuantity : 100);
					}

				} else {
					this.maxstockQuantity = (this.totalStockQuantity < 100 ? this.totalStockQuantity : 100) - (this.getshoppingcarCount(this.skuSelectList.join(',')) ? this.getshoppingcarCount(this.skuSelectList.join(',')) : 0);
				}
			}
		},
		bugNumber: function(newVal, oldVal) {
			if(newVal == '') {}
			if(!isNaN(newVal)) {
				if(newVal > this.maxstockQuantity && this.maxstockQuantity > 0) {
					this.bugNumber = this.maxstockQuantity;
				}
			}
		},
		skuShowstate: function(newVal, oldVal) {

			if(newVal > 0) {
				vue.bugInfoAminateS = true;
				try {
					scrollTop = document.scrollingElement.scrollTop;
				} catch(e) {
					scrollTop = document.documentElement.scrollTop;
				}
				document.body.style.top = -(scrollTop) + "px";
				document.body.style.overflow = 'hidden';
				document.body.style.position = 'fixed';
				setTimeout(function() {
					var eleG = document.getElementById("bugInfoAminate");
					eleG.style.maxHeight = "9rem";
				}, 10)
			} else {
				vue.bugInfoAminateS = false;
			}
		}
	}
});

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {
		vue.shoppingCartIdList = [];
		vue.getShoppingcartCount();
	}, 0);
	return 1;
}

function ruleShowAnimate(e) {
	var clickState = e.getAttribute("dataState") == 1 ? true : false;
	var clickState2 = e.getAttribute("dataStateC");
	if(clickState2 == "2") {
		return false;
	}
	var eleG = e;
	var eleT = eleG.previousSibling;
	eleG.setAttribute("dataStateC", "2");
	setTimeout(function() {
		eleG.setAttribute("dataStateC", "1");
	}, 600)
	if(clickState) {
		eleT.previousSibling.classList.add("couponInfoRuleAnimat")
		eleT.previousSibling.style.whiteSpace = 'normal';
		eleG.setAttribute("dataState", "2");
		eleG.src = "images/btn_ic_put-up.png";
	} else {
		eleT.previousSibling.classList.remove("couponInfoRuleAnimat");
		eleG.src = "images/ic_put-up@3x.png";
		setTimeout(function() {
			eleT.previousSibling.style.whiteSpace = 'nowrap';
			eleG.setAttribute("dataState", "1");
		}, 600)
	}

}