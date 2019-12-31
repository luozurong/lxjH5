var clientType = GetURLParameter("clientType");
var organizationSeq = GetURLParameter("organizationSeq");
var token = GetURLParameter("token");
var commodityId = GetURLParameter("commodityId");
var scrollTop = "";



window.onpageshow = function(event) {
	if(event.persisted) {
		//window.location.reload();
		if (isWxBrowser) {			
			window.location.reload();
		   //Vue.wxJsdkConfig();				
		}	
	}
}

/*mmsHost = host;

mmsHost = "https://tt.hori-gz.com:8443";*/
/*host = mmsHost;
commodityId = "154684364443802050a6e70341759ab9";
organizationSeq = "4400100183";
token = "_15444060121896d708361a0d43a68164";*/

var isVisitor = false;
if(token && token.indexOf("_") == 0) {
	isVisitor = true;
	userAccount = token;
}

var imgClickStae = true;

var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser:isWxBrowser,
		defalutPic: "images/ic_default_avatar.png",
		codeShow: false, //图形验证码控制
		timeNum: 60, //验证时长控制
		sendCodeShowFlag: true, //验证时长显示控制
		token: token,
		commodityId: commodityId, //商品id
		organizationSeq: "organizationSeq",
		mmsHost: mmsHost,
		isVisitor: isVisitor, //游客判断
		photo: [], //商品轮播图
		favorite: 0, //商品收藏
		shoppingcartCount: 0, //购物车数量
		shoppingCartInfo: [], //购物车信息
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
		wxpreviewImage1: [],
		wxpreviewImage2: [],
		wxpreviewImage3: [],
		userBind: false,
		isBind: false,
		codeShow: false,
		sureSendMessageFlag: true,
		userMobile: '',
		messegeCode: '',
		picCode: '',
		picRandomUrl: '',
		couponMoreState: false,
		couponMoreState2: false,
		bugInfoAminateS: false,
		couponList: [],
		lxjversionsName: sessionStorage.getItem("lxjversionsName") ? sessionStorage.getItem("lxjversionsName") : 0,
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {

			setTitle("商品详情");
			this.getbasicData();
		});

	},
	methods: {
		getCommodityDetail: function(shoppingCartInforefresh) {
			var that = this;
			var params = {
				body: {
					commodityId: this.commodityId
				},
				header: {
					token: "_20190114",
					time_stamp: new Date().getTime()
				}
			}
			var paramsStr = encodeURI(JSON.stringify(params));
			/*var httpURL = this.mmsHost + "/mms/group/getGroupCommodityDetail?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			})*/
			axios.post(this.mmsHost + "/mms/group/getGroupCommodityDetail", params).then(function(res) {

				if(shoppingCartInforefresh) {
					//that.shoppingCartInfo = res.data.shoppingCartInfo;
				} else {
					that.photo = res.data.imgList;
					that.getpreviewImage1(res.data.imgList);
					that.productInfoData = res.data;
					//that.shoppingCartInfo = res.data.shoppingCartInfo;
					//that.commoditySku = res.data.commoditySku;
				//	that.skuList = res.data.skuList;
				//	that.skuSelectList = new Array(res.data.commoditySku.length);
				//	that.skuSelectDetailList = new Array(res.data.commoditySku.length);
				//	that.favorite = res.data.favorite ? res.data.favorite : 0;
				//	that.getskuisSelect(res.data.commoditySku);

					/*if(res.data.commoditySku.length == 1) {
						setTimeout(function() {
							that.getskushowStatue();
						}, 500)
					}*/
					if(that.photo.length > 1) {
						//setTimeout(() => {
						setTimeout(function() {
							that.swiperFunc({
								el: '.swiper-pagination'
							}, {
								delay: 3000,
								stopOnLastSlide: false,
								disableOnInteraction: false,
							}, true, true);
						}, 50)

						//}, 50);
					} else {
						setTimeout(function() {
							that.swiperFunc(false, false, false, false);
						}, 50)
						/*	setTimeout(() => {
								that.swiperFunc(false, false, false, false);
							}, 100);*/
					}
				}

			}, function(res) {})
		},
		getCouponData: function() {
			var that = this;
			var params = {
				body: {
					commodityId: this.commodityId
				},
				header: {
					token: this.token,
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/getCommodityCoupons", params).then(function(res) {
				console.log(res);
				that.couponList = res.data.list ? res.data.list : [];
			}, function(res) {})

		},
		getCoupon: function(couponId) {
			window.event.cancelBubble = true;
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
					token: this.token,
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/receiveCoupon", params).then(function(res) {
				console.log(res);
				if(res.data.result == "0") {
					lxjTip.msg("领取成功！");
					setTimeout(function() {
						that.getCouponData()
					}, 10)
				} else {
					lxjTip.msg("领取失败！")
					setTimeout(function() {
						that.getCouponData()
					}, 10)
				}
			}, function(res) {
				lxjTip.msg("领取失败！")
			})
		},
		getCommodityComments: function() {
			var that = this;
			var params = {
				body: {
					areaOrgSeq: this.organizationSeq,
					commodityId: this.commodityId,
					type: '1',
					pageSize: '',
					pageNum: ''
				},
				header: {
					token: this.token,
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/servlet/getCommodityComments", params).then(function(res) {
				console.log(res);
				that.commentData = res.data;
				var commentImages = res.data.commentImages ? res.data.commentImages : [];
				var replyImages = res.data.replyImages ? res.data.replyImages : [];
				that.getpreviewImage2(commentImages, replyImages)
			}, function(res) {})

		},
		getShoppingcartCount: function() {
			var that = this;
			var params = {
				body: {
					areaOrgSeq: this.organizationSeq,
					type: 1
				},
				header: {
					token: this.token,
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
					commodityId: this.commodityId,
					areaOrgSeq: this.organizationSeq,
					count: this.bugNumber,
					commoditySkuAttrIds: this.skuSelectList,
					commodityDetails: this.skuSelectDetailList.join("; "),
					type: 1
				},
				header: {
					token: this.token,
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
					that.getCommodityDetail(true);
					that.skuSelectList = new Array(that.productInfoData.commoditySku.length);
					that.skuSelectDetailList = new Array(that.productInfoData.commoditySku.length);
				} else {
					lxjTip.msg("加入购物车失败");
				}
			}, function(res) {})
		},
		addUserComOrSellerLove: function(i) {
			//游客状态先走授权绑定流程
			if(this.isVisitor) {
				this.gologinFun();
				return false;
			}
			if(this.clickState) {
				return false;
			}
			var that = this;
			var params = {
				body: {
					commodityType: 1,
					type: 1,
					commodityId: this.commodityId,
					price: this.productInfoData.product[0].minPrice,
					sellerId: this.productInfoData.sellerId
				},
				header: {
					token: this.token,
					time_stamp: new Date().getTime()
				}
			}
			this.clickState = true;
			axios.post(this.mmsHost + "/mms/servlet/addUserComOrSellerLove", params).then(function(res) {
				that.clickState = false;
				if(res.data.result == "0") {
					if(i == 1) {
						that.favorite = 1;
						lxjTip.msg("收藏成功");
					} else {
						that.favorite = 0;
						lxjTip.msg("取消收藏成功");
					}
				} else {
					if(i == 1) {
						lxjTip.msg("收藏失败");
					} else {
						lxjTip.msg("取消收藏失败");
					}
				}
			}, function(res) {
				that.clickState = false;
			})

		},
		swiperFunc: function(pagination, autoplay, allowSlideNext, allowSlidePrev) {
			var that = this;
			this.mySwiperp = new Swiper('.swiper-container', {
				pagination: pagination,
				paginationClickable: true,
				autoplay: autoplay,
				allowSlideNext: allowSlideNext,
				allowSlidePrev: allowSlidePrev,
				loop: true,
				autoplayDisableOnInteraction: false,
				observer: true,
				observeParents: false
			});
			this.mySwiperp.on('click', function() {
				var length = that.photo.length;
				var ai = 0;
				if(this.activeIndex == 0) {
					ai = length - 1;
				} else if(this.activeIndex > length) {
					ai = 0;
				} else {
					ai = this.activeIndex - 1;
				}
				that.imgPreview(ai, that.wxpreviewImage1);
			});
			this.getpreviewImage3();
		},
		getpreviewImage1: function(list) {
			for(var i = 0; i < list.length; i++) {
				if(this.wxpreviewImage1.join(',').indexOf(list[i].imgUrl) < 0) {
					this.wxpreviewImage1.push({
						url: list[i].imgUrl
					});
				}
			}
		},
		getpreviewImage2: function(list1, list2) {
			console.log(list1)
			for(var i = 0; i < list1.length; i++) {
				if(this.wxpreviewImage2.join(',').indexOf(list1[i].imgUrl) < 0 && list1[i].imgUrl != '') {
					this.wxpreviewImage2.push({
						url: list1[i].imgUrl
					});
				}
			}
			for(var j = 0; j < list2.length; j++) {
				if(this.wxpreviewImage2.join(',').indexOf(list2[j].imgUrl) < 0 && list2[j].imgUrl != '') {
					this.wxpreviewImage2.push({
						url: list2[j].imgUrl
					});
				}
			}
		},
		getpreviewImage3: function() {
			var that = this;
			var ele = document.getElementById("detailContentMain") ? document.getElementById("detailContentMain") : 'aaa';
			if(ele == 'aaa') {
				return false;
			}
			var imgList = ele.getElementsByTagName("img");
			for(var i = 0; i < imgList.length; i++) {
				var imgSrc = {
					url: imgList[i].src
				};
				this.wxpreviewImage3.push(imgSrc);
				(function(i) {
					imgList[i].addEventListener('click', function() {
						that.imgPreview(i, that.wxpreviewImage3);
					});
				})(i);
			}
		},
		getImgIndex: function(current, list) {
			var i = 0;
			for(var j = 0; j < list.length; j++) {
				if(list[j].url == current) {
					return j;
				}
			}
		},
		commentImgpreview: function(current) {
			var indexc = this.getImgIndex(current, this.wxpreviewImage2);
			this.imgPreview(indexc, this.wxpreviewImage2);
		},
		imgPreview: function(indexNUm, picList) {
			if(!imgClickStae) {
				return false;
			}
			imgClickStae = false;
			setTimeout("imgClickStae=true", 1500);
			var jsonData = {
				selectedIndex: indexNUm,
				picList: picList
			}
			jsonData = JSON.stringify(jsonData);
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				wx.previewImage({
					current: picList[indexNUm].url,
					urls: JSON.stringify(picList).replace(/{"url":|}|\[|\]|"/g, "").split(',')
				});
			} else {
				nativeMethod("showPicPreview", jsonData);
			}

		},
		selectSku: function(i) {
			//游客状态先走授权绑定流程
			if(this.isVisitor) {

				this.gologinFun();

				return false;
			}
			this.skuShowstate = i;
			try {
				scrollTop = document.scrollingElement.scrollTop;
			} catch(e) {
				scrollTop = document.documentElement.scrollTop;
			}
			document.body.style.top = -(scrollTop) + "px";
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
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
				showActivity(host + "/mms/html5/supermarket/confirmOrderNew.htm?commodityId=" + this.commodityId + "&commoditySkuAttrIds=" + this.skuSelectList + "&commodityCount=" + this.bugNumber + "&buyType=" + "2" + "&giftbagId=''", "确认订单");
				//this.skuShowstate = 0;
				that.closeSelecSku();
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
		goUseCoupon: function(couponId) { //前往使用优惠券
			window.event.cancelBubble = true;

			vue.aminateFun();
			setTimeout(function() {
				showActivity(host + "/mms/html5/supermarket/couponCommodities.htm?couponId=" + couponId, "优惠商品使用列表");
			}, 0)

		},
		goEvaluate: function() {
			//游客模式禁止进入全部评论
			if(this.isVisitor) {
				this.gologinFun();
				return false;
			}
			showActivity(host + "/mms/html5/supermarket/evaluate.htm?commodityId=" + this.commodityId, "全部评价");
		},
		closeSelecSku: function() {
			var eleG = document.getElementById("bugInfoAminate");
			eleG.style.maxHeight = "0";
			setTimeout(function() {
				vue.skuShowstate = 0;
				document.body.style.overflow = 'auto';
				document.body.style.position = 'static';
				try {
					document.scrollingElement.scrollTop = scrollTop;
				} catch(e) {
					document.documentElement.scrollTop = scrollTop;
				}
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
		isShowdetail: function(d) {
			if(d == null) {
				return false;
			} else if(d.productDetail != '000x000' || d.hasParams != 'No' || d.hasParam2 != 'No') {
				return true;
			} else {
				return false;
			}
		},
		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		goshoppingcar: function() {
			//游客状态无法查看购物车
			if(this.isVisitor) {
				this.gologinFun();
				return false;
			}
			showActivitySpecial(host + "/mms/html5/supermarket/shoppingcart.htm?type=2", "购物车", 1, null);
		},
		gologinFun: function() {
			needLogin(token);
		},
		goOtherproduct: function(urllink) {
			var urlN = urllink;
			var reg = new RegExp("(^|&)" + "commodityId" + "=([^&]*)(&|$)");
			//链接不为空
			if(this.isCondition(urlN)) {
				var r = urlN.split('?')[1].match(reg);
				//链接有商品id
				if(r != null && this.isCondition(decodeURI(r[2]))) {
					var commodityNid = decodeURI(r[2]);

					showActivity(urllink, "商品详情");
				} else {
					//其他链接跳转
					window.open(urlN)
				}
				//}
			} else {
				return false;
			}
		},
		aminateFun: function() {
			var eleG = document.getElementById("couponInfoI");
			eleG.style.maxHeight = "0";
			setTimeout(function() {
				vue.couponMoreState = false;
				document.body.style.overflow = 'auto';
				document.body.style.position = 'static';
				try {
					document.scrollingElement.scrollTop = scrollTop;
				} catch(e) {
					document.documentElement.scrollTop = scrollTop;
				}
			}, 600)
		},
		getbasicData: function() {
		//	this.getCouponData();
			this.getCommodityDetail();
			//this.getCommodityComments();

			if(!this.isVisitor) {
				//this.getShoppingcartCount();
			}
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