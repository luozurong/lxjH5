var onscrollStatus = false;
var pageSize = 10;
var pageNum = 1;
var clientType = GetURLParameter("clientType");
var orderStatus = GetURLParameter("orderStatus");
var organizationSeq=GetURLParameter("organizationSeq");
sessionStorage.setItem("host", host);
var token = GetURLParameter("token");

/*var token = "15475409492711f75fbc7d784e069e93";
organizationSeq='4400100001';
var host = "https://tt.hori-gz.com:8443";
var orderStatus = 4;*/
var timestamp = new Date().getTime();
if(orderStatus == 0) {
	setTitle("待付款订单");
} else if(orderStatus == 1) {
	setTitle("待发货订单");
} else if(orderStatus == 2) {
	setTitle("待收货订单");
}  else if(orderStatus == 3) {
	setTitle("退款中");
} else if(orderStatus == 4) {
	setTitle("售后处理");
}
else {
	orderStatus = -1;
}
var backHomePage = GetURLParameter("backHomePage"); //回退到生活首页
if(backHomePage == "1") {
	backToHomePage();
}
setRefreshOnResume(); //刷新界面
var params = {};
params.header = {
	token: token,
	time_stamp: timestamp
};
params.body = {
	orderStatus: orderStatus,
	orderDetailNo: "",
	pageSize: pageSize,
	pageNum: pageNum
};
var vue = new Vue({
	el: '#app',
	data: {
		message: '999999',
		jsondate: {},
		orderList: [],
		presentTotal: 10,
		orderStatus:orderStatus,
		apiurl: host + "/mms/servlet/getCommodityOrderList", //获取订单信息
		apiurl2: host + "/mms/servlet/getOrderStatusByOrderNo", //取消订单前验证
		apiurl3: host + "/mms/servlet/operateOrders", //订单操作
		apiurl4: host + "/mms/servlet/getWelfareAfterConfirmReceived", //优惠推送
		apiurl5: host + "/mms/servlet/getOrderInfoByOrderNo",//支付前验证
		apiurl6: host + "/mms/servlet/userBuyAgain" //再次购买
	},
	filters: {
		//状态过滤
		statusFlag: function(status, type) {
			var orderStatus;
			if(status == 0) { //代付款
				orderStatus = 'images/ic_obligation@3x.png';
			} else if(status == 1) { //待发货
				if(type == 1) { //商品订单
					orderStatus = 'images/ic_waitsend@3x.png';
				} else if(type == 3) { //服务类型订单
					orderStatus = 'images/ic_waitserve@3x.png';
				}
			} else if(status == 2) { //待收货
				if(type == 1) { //商品订单
					orderStatus = 'images/ic_waitget@3x.png';
				} else if(type == 3) { //服务类型订单
					orderStatus = 'images/ic_hadserve@3x.png';
				}
			} else if(status == 3) { //退款中
				orderStatus = 'images/ic_refund@3x.png';
			} else if(status == 4) { //售后处理中
				orderStatus = 'images/ic_processing@3x.png';
			} else if(status == 5) { //交易成功
				orderStatus = 'images/ic_hadfinish@3x.png';
			} else if(status == 6) { //订单关闭
				orderStatus = 'images/ic_hadclose@3x.png';
			}
			return orderStatus;
		},

	},
	mounted: function() {
		this.$nextTick(function() {
			this.getDatejson(pageSize, 1);
		});

	},
	methods: {
		getDatejson: function(pagesize, pageNum, refreshState,flag) {
			params.body.pageSize = pagesize;
			params.body.pageNum = pageNum;
			params.header.time_stamp=new Date().getTime();
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
				console.log(JSON.stringify(response.body))
				//this.message = JSON.stringify(response.body);
				this.jsondate = response.body;
				if(response.body.result == 0) {
					
					if(refreshState) {
						this.orderList = response.body.orderList;
					} else {
						this.orderList = this.orderList.concat(response.body.orderList);
					}					
					this.presentTotal = Math.ceil(this.orderList.length / 10) * 10;
					
				}
				if (flag==6&&response.body.result == 0) {
					lxjTip.msg("订单已删除", {
						time: 1000
					});
				}

			}, function(response2) {
				// 响应错误回调
				onscrollStatus = true;
				console.log(JSON.stringify(response2.body));
				//	console.log(JSON.stringify(response))
			});
		},
		//订单操作
		updateOrderFlag: function(flag, orderNo) { //flag:3取消订单，2确认收货订单
			var params2 = {};
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				flag: flag,
				orderNo: orderNo
			};
			params2.header.time_stamp=new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl3 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调	
				if(flag == 6&&response.body.result==0){		
					setTimeout(function(){
							vue.getDatejson(vue.presentTotal, 1, true,6);																
					},100)
				}
				this.getDatejson(this.presentTotal, 1, true);
				if(flag == 2) {
					this.getWel(2, orderNo);
				}
			}, function(response) {
				// 响应错误回调
				console.log("失败")
			});
		},
		//订单确认收货送优惠
		getWel: function(flag, orderNo) { //flag:2确认收货订单
			var params2 = {};
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				flag: 2,
				orderNo: orderNo
			};
			params2.header.time_stamp=new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl4 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调	
				this.getDatejson(this.presentTotal, 1, true);
				console.log(JSON.stringify(response.body))
			}, function(response) {
				// 响应错误回调
				this.getDatejson(this.presentTotal, 1, true);
				console.log("失败")
			});
		},
		//订单取消前的验证
		beforeCancel: function(orderNo) {
			var params2 = {};
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				orderStatus: "-1",
				orderNo: orderNo
			};
			params2.header.time_stamp=new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl2 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
					// 响应成功回调	
					if(response.body.result == 0) {
						console.log(JSON.stringify(response.body))
						var status = response.body.status;
						var type = response.body.type;
						if(status == 4 || status == 2) {
							if(type == 3) {
								lxjTip.msg("店铺已安排服务，不能取消订单");
								
							} else if(type == 1) {
								lxjTip.msg("店铺已发货，不能取消订单");
							}
							vue.getDatejson(vue.presentTotal, 1, true);
						} else {
							if(status == 1) { //已支付订单取消提示
								lxjTip.confirm('订单取消后款项将在1-7个工作日内退还到您支付的账号', {
									skin: 'demo3',
									btn: ['好的', '再想想'],
									yes: function(index) {
										vue.updateOrderFlag(3, orderNo);
										lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									}
								});
								

							} else if(status == 0) {
								//未支付订单取消提示
								lxjTip.confirm('您确定要取消订单吗？', {
									skin: 'demo3',
									yes: function(index) {
										vue.updateOrderFlag(3, orderNo);
										lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									}
								});
							}
						}
					}
				},
				function(response) {
					// 响应错误回调
					console.log("失败")
				});
		},
		//再次购买
		userBuyAgain: function(type,commodityArr) {
			var params3 = {};
			var timestamp1=new Date().getTime();
			params3.header = {
				token: token,
				time_stamp: timestamp1
			};
			params3.body = {
				type:1,
				organizationSeq: organizationSeq,
				commodityArr: commodityArr
			};
			var paramData = JSON.stringify(params3);
			this.$http.jsonp(this.apiurl6 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				onscrollStatus = true;
				// 响应成功回调
				console.log(JSON.stringify(response.body));
				if(response.body.result == 0) {
					var shoppingCartIds=response.body.shoppingCartIdList.join(',');
					console.log(shoppingCartIds)
					showActivitySpecial(host + "/mms/html5/supermarket/" + decodeURI("shoppingcart.htm?shoppingCartIds=" + shoppingCartIds+"&type="+type), "购物车", 1, null);
				}
			}, function(response2) {
				// 响应错误回调
				console.log(JSON.stringify(response2.body));
			});
		},
		//底部按钮判断
		getButtom: function(status, expressage, comment,type) {			
			/*if (status==1&&type==8) {
				return true;
			}else */
			if (status==1||status==3) {
				return false;
			}else{
				return true;
			}		
		},
		//删除订单操作
		deleOrder: function(orderNo) {
			lxjTip.confirm('您确定要删除该订单吗？', {
				skin: 'demo3',
				yes: function(index) {
					vue.updateOrderFlag(6, orderNo);
					lxjTip.close(); //如果设定了yes回调，需进行手工关闭
				}
			});

		},
		//确认收货操作
		receivingProduct: function(orderNo) {
			lxjTip.confirm('您确定已经收到货了吗？', {
				skin: 'demo3',
				yes: function(index) {
					vue.updateOrderFlag(2, orderNo);
					lxjTip.close(); //如果设定了yes回调，需进行手工关闭
				}
			});
		},
		//进入订单详情页面
		getOrderDetail: function(orderNo,type,totalOrderNo) {
			if (type!=9) {
				showActivity(host + "/mms/html5/personal/" + decodeURI("order_details.htm?orderNo=" + orderNo), "订单详情");
			}else{
				showActivity(host + "/mms/html5/groupon/commander/orderDetail.htm?orderNo=" + totalOrderNo, "订单详情");
			}
			
		},
		//进入支付页面
		goPay: function(orderNo) {
			//			if(type != 3) {
			//				showActivity(host + "/mms/html5/personal/" + decodeURI("pay.htm?orderNo=" + orderNo), "付款");
			//			} else {
			var params2 = {};
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				orderStatus: -1,
				orderNo: orderNo
			};
			params2.header.time_stamp=new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl5 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调	
				console.log(JSON.stringify(response.body));
				var odata = response.body;
				if(odata.result == 0) {
					if(odata.commodityStatus != 0) { //没有下架的商品在订单中
						if(odata.payTimeStatus != 0) { //预约时间超时
							showActivity(host + "/mms/html5/personal/" + decodeURI("pay.htm?orderNo=" + orderNo), "付款");
						} else {
							lxjTip.alert('所选服务时间已过,订单即将关闭！', {
								skin: 'demo2',
								yes: function(index) {
									vue.updateOrderFlag(3, orderNo);
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								}
							});			
						}
					} else {
						lxjTip.alert('订单信息已更改，订单即将关闭,请重新购买！', {
								skin: 'demo2',
								yes: function(index) {
									vue.updateOrderFlag(3, orderNo);
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								}
						});
					}
				}
			}, function(response) {
				// 响应错误回调
				console.log("失败")
			});
			//}
		},
		//进入查看物流页面
		checkLogistics: function(orderNo) {
			showActivity(host + "/mms/html5/personal/" + decodeURI("checkLogistics.htm?orderNo=" + orderNo), "查看物流");
		},
		//进入购物车页面
		shoppingAgain: function(items) {
			var list=items.commodityList;
			var type=list[0].categoryType?list[0].categoryType:1;
			var shopinglist=new Array();
			if(list&&list.length>0){
				for(var i=0;i<list.length;i++){
					var item={
						commodityId:list[i].commodityId,
						skuId:list[i].skuId,
						count:list[i].counts,
						commodityDetails:list[i].commodityDetails
					};
					shopinglist.push(item);
				}
			}
			setTimeout(function(){
				vue.userBuyAgain(type,shopinglist);
			},50)
		},
		//进入申请售后页面
		goService: function(orderNo) {
			showActivity(host + "/mms/html5/personal/" + decodeURI("service.htm?orderNo=" + orderNo), "申请售后");
		},
		//进入评价页面
		goEvaluate: function(orderNo, length, commodityId) {
			//if(length == 1) {
				showActivity(host + "/mms/html5/personal/" + decodeURI("writeProductEvaluateNew.htm?orderNo=" + orderNo + "&commodityId=" + commodityId), "商品评价");
			//} else {
			//	showActivity(host + "/mms/html5/personal/" + decodeURI("productEvaluate.htm?orderNo=" + orderNo), "商品评价");
			//}
		}
	}
});

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
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
		if(vue.orderList.length>=vue.presentTotal){
			pageNum=Math.ceil(vue.presentTotal / 10)+1;
		}else{
			pageNum=Math.ceil(vue.presentTotal / 10);
		}
		if (pageNum>1&&pageNum>Math.ceil(vue.presentTotal / 10)) {
			vue.getDatejson(10, pageNum);
		}
	}
};