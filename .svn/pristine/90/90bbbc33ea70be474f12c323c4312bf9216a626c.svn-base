var onscrollStatus = false;
var clientType = GetURLParameter("clientType");
sessionStorage.setItem("host", host);
var token = GetURLParameter("token");
var areaCode = GetURLParameter("organizationSeq");
var parentId = "1421225309526e2e64d25f36488c9ab4";

/*areaCode = '4400100001';
token = "1513065429033b923b08cfd949bdaa92";
host = "http://118.190.8.133:8090";
clientType="android";*/
var timestamp = new Date().getTime();
var isVisitor = false;
if(token && token.indexOf("_") == 0) {
	isVisitor = true;
}

var backHomePage = GetURLParameter("backHomePage"); //回退到生活首页
if(backHomePage == "1") {
	backToHomePage();
}

var vue = new Vue({
	el: '#app',
	data: {
		jsondate: {},
		presentClassifyid: '',
		classifyList: [],
		productList: [],
		presentTotal: 10,
		presentPagenum: 1,
		pageCount: 1,
		shopcarData: {},
		apiurl: host + "/mms/servlet/findHasCommodityCategoryList", //获取超市左侧分类
		apiurl2: host + "/mms/servlet/findSuperMarketCommodity", //获取超右侧商品列表
		apiurl3: host + "/mms/servlet/addShoppingcart", //商品数量操作
		apiurl4: host + "/mms/servlet/getShoppingcartCountServlet", //获取购物车信息
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			//console.log(99999999);
			this.getDatejson();
			//lxjTip.msg(window.location.href,{time:30000})
			var jsonData = {
				eventId: "click26",
				eventName: "商品超市首页浏览次数"
			};
			jsonData = JSON.stringify(jsonData);
			//调用APP接口，添加百度统计
			nativeMethod("baiduStatistics", jsonData);

		});

	},
	methods: {
		getDatejson: function() {
			var params = {};
			var timestamp = new Date().getTime();
			params.header = {
				token: token,
				time_stamp: timestamp
			};
			params.body = {
				type: "2",
				parentId: parentId,
				areaSeq: areaCode,
				status: "1"
			};
			var paramData = JSON.stringify(params);
			this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				onscrollStatus = true;
				// 响应成功回调
				//console.log(JSON.stringify(response.body))
				//this.message = JSON.stringify(response.body);
				this.jsondate = response.body;
				//console.log(JSON.stringify(this.jsondate))
				if(response.body.result == 0) {
					this.classifyList = response.body.list;
					this.presentClassifyid = response.body.list[0].id;
					//					if(refreshState) {
					//						this.orderList = response.body.orderList;
					//					} else {
					//						this.orderList = this.orderList.concat(response.body.orderList);
					//					}
					//					this.presentTotal = Math.ceil(this.orderList.length / 10) * 10;

				}

			}, function(response2) {
				// 响应错误回调
				onscrollStatus = true;
				console.log(JSON.stringify(response2.body));
				//	console.log(JSON.stringify(response))
			});
		},
		getproductListDate: function(pageSize, pageNum, categoryId, refreshState) {
			var params2 = {};
			var timestamp = new Date().getTime();
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				categoryId: categoryId,
				areaCode: areaCode,
				pageSize: pageSize,
				pageNum: pageNum
			};
			var paramData = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl2 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				//	onscrollStatus = true;
				// 响应成功回调
				//console.log(JSON.stringify(response.body))
				//this.message = JSON.stringify(response.body);
				//this.jsondate = response.body;
				console.log(JSON.stringify(response.body));
				if(response.body.result == 0) {
					if(refreshState) {
						this.productList = response.body.list;
						vue.getShoppingcartData();
					} else {
						this.productList = this.productList.concat(response.body.list);
					}
					this.pageCount = Math.ceil(response.body.totalCount / 10);
					this.presentTotal = Math.ceil(this.productList.length / 10) * 10;
					if(response.body.totalCount > 10) {
						$("#pullUp").show();
					} else {
						$("#pullUp").hide();
						$("#nomore").show();
					}
					if(response.body.list.length == 0) {
						$("#pullUp").hide();
						$("#nomore").show();
					}
				}
				if(!vue.shopcarData.totalCount) {
					vue.getShoppingcartData();
				}

			}, function(response2) {
				// 响应错误回调				
				console.log(JSON.stringify(response2.body))
				//	console.log(JSON.stringify(response))
			});
		},
		addShoppingcart: function(commodityId, count, e, item) {
			var params3 = {};
			var timestamp = new Date().getTime();
			params3.header = {
				token: token,
				time_stamp: timestamp
			};
			params3.body = {
				commodityId: commodityId,
				areaOrgSeq: areaCode,
				type: 2,
				count: count
			};
			var paramData = JSON.stringify(params3);
			this.$http.jsonp(this.apiurl3 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调
				console.log(JSON.stringify(response.body))
				//this.jsondate = response.body;
				if(response.body.result == 0) {
					//Vue.set(vue.productList, e, item);
					this.shopcarData = response.body;
					var newItem = item;
					newItem.shoppingCartCount = Number(item.shoppingCartCount) + Number(count);
					Vue.set(vue.productList, e, newItem);
				}

			}, function(response2) {
				// 响应错误回调				
				console.log(JSON.stringify(response2.body))
				//	console.log(JSON.stringify(response))
			});
		},
		getShoppingcartData: function() {
			var params4 = {};
			var timestamp = new Date().getTime();
			params4.header = {
				token: token,
				time_stamp: timestamp
			};
			params4.body = {
				areaOrgSeq: areaCode,
				type: 2,
			};
			var paramData = JSON.stringify(params4);
			this.$http.jsonp(this.apiurl4 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调
				console.log(JSON.stringify(response.body))
				//this.jsondate = response.body;
				if(response.body.result == 0) {
					this.shopcarData = response.body;
				}

			}, function(response2) {
				// 响应错误回调				
				console.log(JSON.stringify(response2.body))
				//	console.log(JSON.stringify(response))
			});
		},
		shopcarNum: function(totalCount) {
			var totalCount = Number(totalCount);
			if(totalCount > 9) {
				var totalCount = "…";
				console.log(55)
			}
			return totalCount;
		},
		//改变左边栏状态
		changeCategoryId: function(changeId) {
			vue.presentClassifyid = changeId;
		},
		//增加数量操作
		addData: function(e, item, stockQuantity) {
			window.event.cancelBubble = true;
			if(isVisitor) {
				needLogin(token);
				return false;
			}
			var newItem = item;
			if(newItem.shoppingCartCount >= stockQuantity) {
				console.log("库存上限")
				return false;
			}
			if(newItem.shoppingCartCount >= 100) {
				console.log("数量上限")
				return false;
			}
			//newItem.shoppingCartCount = Number(item.shoppingCartCount) + 1;
			vue.addShoppingcart(newItem.id, 1, e, newItem);

		},
		//增加数量操作
		reduceData: function(e, item) {
			window.event.cancelBubble = true;
			if(isVisitor) {
				needLogin(token);
				return false;
			}
			var newItem = item;
			//newItem.shoppingCartCount = Number(item.shoppingCartCount) - 1;
			vue.addShoppingcart(newItem.id, -1, e, newItem);
		},
		//跳转到详情页
		turnTo: function(id) {
			//			if (isVisitor) {
			//				needLogin(token);
			//				return false;
			//			}
			//showActivitySpecial("http://bbs.hori-gz.com/ctmsH5/offlineActivity/offlineList.htm?activityId=1504227810124aad16bf0cf141b89f0b", "活动详情", 3, null);
			//window.location.replace("http://118.190.8.134:8090/mms/html5/supermarket/test.htm?shoppingCartId=" + "55555" + "&showprice=" + "66");
			showActivity(host + "/mms/html5/supermarket/ProductDetail.htm?commodityId=" + id, "商品详情");
		},
		//跳转到购物车
		turnToshopcart: function() {
			if(isVisitor) {
				needLogin(token);
				return false;
			}
			showActivitySpecial(host + "/mms/html5/supermarket/shoppingcart.htm?type=2", "购物车", 1, null);
		},

	}
});
vue.$watch('classifyList', function(newValue, oldValue) {
	mySwiper.update();
});
vue.$watch('productList', function(newValue, oldValue) {
	myScroll.refresh();
});
vue.$watch('presentClassifyid', function(newValue, oldValue) {
	//$("#nomore").hide();
	document.getElementById("nomore").style.display="none";
	//setTimeout(function(){
		vue.getproductListDate(10, 1, newValue, true);
	//},100);
	vue.presentTotal = 10;
	vue.presentPagenum = 1;
	vue.pageCount = 1;
});
vue.$watch('shopcarData', function(newValue, oldValue) {
	var ele=document.getElementById("shoppingcartNum");
	var eleHeight=document.getElementById("shoppingcartNum").offsetHeight;
	if (clientType=="android") {
		ele.style.lineHeight=(Number(eleHeight)+1)+"px";	
	}else{
		ele.style.lineHeight=eleHeight+"px";
	}
	
});

var mySwiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	slidesPerView: 'auto',
	freeMode: true,
	freeModeMomentumBounce: false
});

//获取URL参数
function activeChoose(ele) {
	$('.classify').removeClass("chooseClassify");
	$(ele).addClass("chooseClassify");
}

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {
		$("#nomore").hide();
		vue.getproductListDate(vue.presentTotal, 1, vue.presentClassifyid, true);
	}, 0);
	return 1;
}
/*//滚动条在Y轴上的滚动距离
function getScrollTop() {　　
	var scrollTop = 0,
		bodyScrollTop = 0,
		documentScrollTop = 0;　　
	if(document.getElementById("product_list")) {　　　　
		bodyScrollTop = document.getElementById("product_list").scrollTop;　　
	}　　
	if(document.getElementById("product_list_box")) {　　　　
		documentScrollTop = document.getElementById("product_list_box").scrollTop;　　
	}　　
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
	return scrollTop;
}

//文档的总高度

function getScrollHeight() {　　
	var scrollHeight = 0,
		bodyScrollHeight = 0,
		documentScrollHeight = 0;　　
	if(document.getElementById("product_list")) {　　　　
		bodyScrollHeight = document.getElementById("product_list").scrollHeight;　　
	}　　
	if(document.getElementById("product_list_box")) {　　　　
		documentScrollHeight = document.getElementById("product_list_box").scrollHeight;　　
	}　　
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
	return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight() {　　
	var windowHeight = 0;　　
	//if(document.compatMode == "CSS1Compat") {　　　　
	//	windowHeight = document.documentElement.clientHeight;　　
	//} else {　　　　
	windowHeight = document.getElementById("product_list").clientHeight;　　
	//}　　
	return windowHeight;
}

document.getElementById("product_list").onscroll = function() {　　
	console.log(getScrollTop() + '   ' + getWindowHeight() + '   ' + getScrollHeight())
	if(getScrollHeight() - getScrollTop() - getWindowHeight() < 1000 && onscrollStatus) {
		//	　console.log("即将到底加载一次")
		//		onscrollStatus = false;
		//		if(vue.presentTotal == vue.orderList.length) {
		//			pageNum = Math.ceil(vue.presentTotal / 10) + 1;
		//		} else {
		//			pageNum = Math.ceil(vue.presentTotal / 10);
		//		}
		//		if(pageNum > 1) {
		//			vue.getDatejson(10, pageNum);
		//		}
	}
};*/

function pullUpAction() {
	setTimeout(function() {
		if(vue.presentPagenum <= vue.pageCount) {
			vue.presentPagenum = Number(vue.presentPagenum) + 1;
			vue.getproductListDate(10, vue.presentPagenum, vue.presentClassifyid);
		} else {
			$("#pullUp").hide();
			$("#nomore").show();
		}

	}, 10);
}
var moveC = false;

function loaded() {
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		bounce: true,
		onRefresh: function() {
			if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拉';
			}
		},
		onScrollMove: function() {
			moveC = true;
			if((this.y < this.maxScrollY) && (this.pointY < 1)) {
				this.scrollTo(0, this.maxScrollY, 400);
				return;
			} else if(this.y > 0 && (this.pointY > window.innerHeight - 1)) {
				this.scrollTo(0, 0, 400);
				return;
			} else if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开手刷新';
				this.maxScrollY = this.maxScrollY;
			} else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拉更多惊喜';
				//	this.maxScrollY = pullUpOffset;
			}

		},
		onScrollEnd: function() {
			if(moveC) {
				sessionStorage.setItem("Ycoordinate", this.y);
			}
			myScroll.refresh();
			if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});
	//document.getElementById('wrapper').style.left = '22%';
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function() {
	setTimeout(loaded, 200);
}, false);