var clientType = GetURLParameter("clientType");
var token = GetURLParameter("token");
var areaCode = GetURLParameter("organizationSeq");
var titleType = 1;
var type = 1;
var shoppingCartIds = GetURLParameter("shoppingCartIds")?GetURLParameter("shoppingCartIds").split(','):[];
//再次购物商品参数
/*if(titleType == 0) {
	type = 2;
}*/
//默认页面数据为商品超市购物车
/*if(!isCondition(type)) {
	type = 2;
}*/
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};
/*areaCode = '4400100001';
token = "152876810855f58ed3330cab4551b011";
host = "https://tt.hori-gz.com:8443";
type = 1;*/

var vue = new Vue({
	el: '#app',
	data: {
		jsondate: {},
		quang: false,
		titleType: 0,
		setFinish: true,
		shoppingCarttype: type,
		writeState: false,
		shoppingCartIds: [],
		shoppingSellerIds: [],
		invalidList: [],
		sellerList: [],
		shopcarPricedata: {},
		shopcarData: {},
		apiurl: host + "/mms/servlet/findShoppingcartList", //获取购物车列表信息
		apiurl2: host + "/mms/servlet/calculateShoppingcartPrice", //计算购物车选中的商品总价
		apiurl3: host + "/mms/servlet/editShoppingcartCount", //商品数量操作
		apiurl4: host + "/mms/servlet/deleteShoppingcart", //删除购物车商品
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			//console.log(99999999);
			setTitle("购物车");
			this.getDatejson();
			if(vue.shoppingCarttype == 1) {
				var jsonData = {
					eventId: "click31",
					eventName: "购物车页面浏览次数"
				};
				jsonData = JSON.stringify(jsonData);
				//调用APP接口，添加百度统计
				nativeMethod("baiduStatistics", jsonData);
			} else if(vue.shoppingCarttype == 2) {
				var jsonData = {
					eventId: "click30",
					eventName: "菜篮子页面浏览次数"
				};
				jsonData = JSON.stringify(jsonData);
				//调用APP接口，添加百度统计
				nativeMethod("baiduStatistics", jsonData);
			}
		});

	},
	methods: {
		getDatejson: function(state) {
			var params = {};
			var timestamp = new Date().getTime();
			params.header = {
				token: token,
				time_stamp: timestamp
			};
			params.body = {
				type: vue.shoppingCarttype,
				pageNum: 1,
				pageSize: 1000,
				areaOrgSeq: areaCode,
			};
			var paramData = JSON.stringify(params);
			try {
				this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
				}).then(function(response) {
					onscrollStatus = true;
					// 响应成功回调
					console.log(JSON.stringify(response.body))
					this.jsondate = response.body;
					//console.log(JSON.stringify(this.jsondate))
					if(response.body.result == 0) {
						this.sellerList = response.body.sellerList;
						//this.presentClassifyid = response.body.list[0].id;		
						setTimeout("vue.shoppingCartIdsAdd()", 100);
						setTimeout("vue.getshoppingSellerIds()", 100);
						setTimeout("vue.getInvalidList()", 100);
						if(state) {
							this.shopcarPricedata = {};
							setTimeout(function() {
								vue.shoppingCartIds = [];
							}, 150);
						}
						if(isCondition(shoppingCartIds)) {
							setTimeout(function() {
								vue.shoppingCartIds = shoppingCartIds;
								shoppingCartIds = [];
							}, 200);
						}
					}

				}, function(response2) {
					// 响应错误回调
					//	setTimeout("vue.getDatejson()", 100);
					//console.log(JSON.stringify(response2.body))
					console.log(8888888888)
					//	console.log(JSON.stringify(response))
				});
			} catch(e) {
				//setTimeout("vue.getDatejson()", 100);
				console.log(99999999)
			}

		},
		calculateShoppingcartPrice: function() {
			var params2 = {};
			var timestamp = new Date().getTime();
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				areaOrgSeq: areaCode,
				shoppingCartIds: vue.shoppingCartIds.join(","),
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
					this.shopcarPricedata = response.body;
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
				id: commodityId,
				count: count,
				shoppingCartIds: vue.shoppingCartIds.join(","),
				areaOrgSeq: areaCode
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
					this.shopcarPricedata = response.body;
					item.count = count;

				}

			}, function(response2) {
				// 响应错误回调				
				setTimeout("vue.calculateShoppingcartPrice", 100);
				//	console.log(JSON.stringify(response))
			});
		},
		deleteShoppingcartCommodity: function(type) {
			var params4 = {};
			var timestamp = new Date().getTime();
			var idList = [];
			if(type == 2) {
				idList = vue.invalidList;
			} else {
				idList = vue.shoppingCartIds;
			}
			params4.header = {
				token: token,
				time_stamp: timestamp
			};
			params4.body = {
				ids: idList,
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
					setTimeout("vue.getDatejson(true)", 100);
				}

			}, function(response2) {
				// 响应错误回调				
				console.log(JSON.stringify(response2.body))
				//	console.log(JSON.stringify(response))
			});
		},
		getInvalidList: function() {
			var invalidList = new Array();
			$("#shoppingcloseList .product .closeLogo").each(function(i, e) {
				invalidList.push($(this).attr("id"));
			});
			vue.invalidList = invalidList;
		},
		shoppingCartIdsAdd: function() {
			var shoppingCartIds = new Array();
			$("#shoppingList .product .yes_quang").each(function(i, e) {
				shoppingCartIds.push($(this).attr("id"));
			});
			vue.shoppingCartIds = shoppingCartIds;
		},
		getshoppingSellerIds: function() {
			var shoppingSellerIds = new Array();
			$(".shop .yes_quang").each(function(i, e) {
				shoppingSellerIds.push($(this).attr("id"));
			});
			vue.shoppingSellerIds = shoppingSellerIds;
		},
		//商品点击
		checkedproduct: function(id) {
			if(vue.shoppingCartIds.indexOf(id) >= 0) {
				//已经选中状态				
				vue.shoppingCartIds.remove(id);
			} else {
				vue.shoppingCartIds.push(id);
			}
		},
		//店铺点击
		checkedSeller: function(id) {
			if($("#" + id).parent().siblings('.product_box').children(".product").children(".quang").length == $("#" + id).parent().siblings('.product_box').children(".product").children(".yes_quang").length) {
				$("#" + id).parent().siblings('.product_box').children(".product").children(".quang").each(function(i, e) {
					vue.shoppingCartIds.remove($(this).attr("id"));
				});
			} else {
				$("#" + id).parent().siblings('.product_box').children(".product").children(".quang").each(function(i, e) {
					if(vue.shoppingCartIds.indexOf($(this).attr("id")) >= 0) {} else {
						vue.shoppingCartIds.push($(this).attr("id"));
					}
				});
			}
		},
		//全选点击
		checkedAll: function() {
			if($("#shoppingList .product .quang").length == vue.shoppingCartIds.length) {
				//已经选中状态				
				vue.shoppingCartIds = [];
			} else {
				var shoppingCartIds = new Array();
				$("#shoppingList .product .quang").each(function(i, e) {
					shoppingCartIds.push($(this).attr("id"));
				});
				vue.shoppingCartIds = shoppingCartIds;
			}
		},
		//增加数量操作
		addData: function(e, item, stockQuantity) {
			var newItem = item;
			if(newItem.count >= stockQuantity) {
				lxjTip.msg('亲，老板没那么多存货呢!', {
					time: 1500,
					skin: 'demo1'
				});
				return false;
			}
			if(newItem.count >= 100) {
				lxjTip.msg('亲，商品购买数量已达上限了!', {
					time: 1500,
					skin: 'demo1'
				});
				return false;
			}
			var count = Number(newItem.count) + 1;
			//newItem.shoppingCartCount = Number(item.shoppingCartCount) + 1;
			vue.addShoppingcart(newItem.id, count, e, newItem);

		},
		//增加数量操作
		reduceData: function(e, item) {
			var newItem = item;
			if(newItem.count == 1) {
				return false;
			}
			//newItem.shoppingCartCount = Number(item.shoppingCartCount) - 1;
			var cont = newItem.count - 1;
			vue.addShoppingcart(newItem.id, cont, e, newItem);
		},
		//数量操作
		inputChange: function(e, item) {
			var count = $("#" + item.id).siblings('.product_arguments').find("input").val();
			if(count <= 0) {
				$("#" + item.id).siblings('.product_arguments').find("input").val(1);
				count=1;
			}
			if(count > 0 && count <= 100 && item.stockQuantity >= count) {

			} else if(count > 100) {
				lxjTip.msg('亲，商品购买数量已达上限了!', {
					time: 1500,
					skin: 'demo1'
				});
				$("#" + item.id).siblings('.product_arguments').find("input").val(100);
				count = 100;
			}
			if(item.stockQuantity < count) {
				lxjTip.msg('亲，老板没那么多存货呢!', {
					time: 1500,
					skin: 'demo1'
				});
				$("#" + item.id).siblings('.product_arguments').find("input").val(item.stockQuantity);
				count = item.stockQuantity;
			}
			vue.addShoppingcart(item.id, count, e, item);
		},

		//删除动作判断
		confirmDelete: function() {
			if(vue.shoppingCartIds.length <= 0) {
				lxjTip.msg('请选择要删除的商品', {
					time: 3000,
					skin: 'demo1'
				});
			} else {
				lxjTip.confirm('您确定删除选中的商品吗？', {
					skin: 'demo3',
					btn: ['确定', '取消'],
					yes: function(index) {
						vue.deleteShoppingcartCommodity();
						lxjTip.close(); //如果设定了yes回调，需进行手工关闭
					}
				});
			}
		},
		//改变购物车类型
		changeShopcarttype: function(type) {

			if(type == 1) {
				console.log(type)
				if(vue.shoppingCarttype != type) {
					vue.shoppingCarttype = 1;
					if(vue.jsondate.result == 0) {
						vue.getDatejson(true);

					}
				}
			} else {
				console.log(type)
				if(vue.shoppingCarttype != type) {
					vue.shoppingCarttype = 2;
					if(vue.jsondate.result == 0) {
						vue.getDatejson(true);
					}
				}
			}
		},
		inputFoucs: function() {
			vue.writeState = true;
		},
		inputBlur: function() {
			vue.writeState = false;
		},

		//去下单		
		gopay: function() {
			if(vue.shoppingCartIds.length <= 0) {
				lxjTip.msg('请选择要购买的商品', {
					time: 3000,
					skin: 'demo1'
				});
				return false;
			}
			//if(vue.shoppingCarttype == 2) {
				showActivity(host + "/mms/html5/supermarket/confirmOrderNew.htm?shoppingCartId=" + vue.shoppingCartIds.join(",") + "&buyType=" + vue.shoppingCarttype, "确认订单");
			/*} else {
				showActivity(host + "/mms/html5/mall/confirmOrderNew.htm?shoppingCartId=" + vue.shoppingCartIds.join(",") + "&buyType=" + vue.shoppingCarttype, "确认订单");
			}*/
		},
		goShoppingpage: function() {
			if(vue.shoppingCarttype == 2) {
				showActivitySpecial(host + "/mms/html5/supermarket/productClassify.htm", "商品超市",4, null);
			} else {
				showActivitySpecial(host + "/mms/html5/mall/serviceCategory.htm", "服务到家",4, null);
			}
		},

	}
});
vue.$watch('jsondate', function(newValue, oldValue) {
	if(vue.sellerList.length == 0 && vue.jsondate.invalidList.length == 0) {
		$("html").css("background-color", "#f3f4f5")
	} else {
		$("html").css("background-color", "#f3f4f5")
	}
});
vue.$watch('shoppingCartIds', function(newValue, oldValue) {
	$(".shop").each(function(i, e) {
		$("#shoppingList .product .quang").each(function(j, f) {
			if(vue.shoppingCartIds.indexOf($(f).attr("id")) < 0) {
				$(f).removeClass("yes_quang");
				$(e).children(".quang").removeClass("yes_quang");
			} else {
				$(f).addClass("yes_quang");
			}
		});
	});
	$(".shop").each(function(i, e) {
		if($(e).siblings('.product_box').children(".product").children(".quang").length == $(e).siblings('.product_box').children(".product").children(".yes_quang").length && $(e).siblings('.product_box').children(".product").children(".yes_quang").length > 0) {
			$(e).children(".quang").addClass("yes_quang");
		} else {
			$(e).children(".quang").removeClass("yes_quang");
		}
	});
	if($("#shoppingList .product .quang").length == vue.shoppingCartIds.length) {
		$("#shoppingCart_box .quang").addClass("yes_quang");
	} else {
		$("#shoppingCart_box .quang").removeClass("yes_quang");
	}
	vue.calculateShoppingcartPrice();
});

//编辑数量时

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {
		vue.getDatejson(true);
	}, 0);
	return 1;
}

//执行编辑操作
function setEditOperate() {
	vue.setFinish = false;
}

function setFinishOperate() {
	vue.setFinish = true;
	lxjTip.close();
	//refreshData();
	//window.location.reload();
}