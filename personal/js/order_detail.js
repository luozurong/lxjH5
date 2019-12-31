var clientType = GetURLParameter("clientType");
sessionStorage.setItem("host", host);
var token = GetURLParameter("token");
var orderNo = GetURLParameter("orderNo");
var organizationSeq=GetURLParameter("organizationSeq");
var timestamp = new Date().getTime();

/*orderNo = "201805080509068559998";
var token = "15257261375592fb6f94a13e4e13a688";
organizationSeq="4400100001";
var host = "https://tt.hori-gz.com:8443";*/
var backHomePage = GetURLParameter("backHomePage"); //回退到生活首页
if(backHomePage == "1") {
	backToHomePage();
}
setRefreshOnResume(); //刷新界面
var vue = new Vue({
	el: '#app',
	data: {
		jsondate: {},
		jsonget: {},
		lxjversionsName:sessionStorage.getItem("lxjversionsName")?sessionStorage.getItem("lxjversionsName"):0,
		apiurl: host + "/mms/servlet/getCommodityOrderList", //获取订单信息
		apiurl2: host + "/mms/servlet/getOrderStatusByOrderNo", //取消订单前验证
		apiurl3: host + "/mms/servlet/operateOrders", //订单操作
		apiurl4: host + "/mms/servlet/getWelfareAfterConfirmReceived", //优惠推送
		apiurl5: host + "/mms/servlet/getOrderInfoByOrderNo", //支付前验证
		apiurl6: host + "/mms/servlet/userBuyAgain", //再次购买
		apiurl7: host + "/mms/servlet/commitConfirmGetGoods" //确认收货和确认已维修的订单操作
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
			//console.log(99999999);
			setTitle("订单详情")
			this.getDatejson(-1, orderNo);
		});

	},
	methods: {
		getDatejson: function(orderStatus, orderNo) {
			var params = {};
			params.header = {
				token: token,
				time_stamp: timestamp
			};
			params.body = {
				orderStatus: orderStatus,
				orderDetailNo: orderNo,
				pageSize: 0,
				pageNum: 0
			};
			params.header.time_stamp = new Date().getTime();
			var paramData = JSON.stringify(params);
			this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				console.log(JSON.stringify(response.body));
				// 响应成功回调
				//this.message = JSON.stringify(response.body);
				this.jsonget = response.body;
				if(response.body.result == 0) {
					this.jsondate = response.body.orderDetail;
					//console.log(JSON.stringify(this.jsondate));
				}

			}, function(response2) {
				// 响应错误回调
				console.log(JSON.stringify(response2.body))
				//	console.log(JSON.stringify(response))
			});
		},
		//确认收货和确认已维修操作
		confirmOrderFlag: function(processStatus , safeguardNo) { //process:14确认收货，15确认已维修
			var params2 = {};
			params2.header = {
				token: token,
				time_stamp: timestamp
			};
			params2.body = {
				processStatus : processStatus ,
				safeguardNo: safeguardNo
			};
			params2.header.time_stamp = new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl7 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				if(response.body.result == 0) {

				}
				// 响应成功回调	
				this.getDatejson(-1, orderNo);


			}, function(response) {
				// 响应错误回调
				console.log("失败")
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
			params2.header.time_stamp = new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl3 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				if(flag == 6 && response.body.result == 0) {
					lxjTip.msg("订单已删除", {
						time: 1000
					});
					setTimeout(function() {
						goBack();
					}, 1000);
					return false;
				}
				// 响应成功回调
				this.getDatejson(-1, orderNo);
				if(processStatus == 14) {
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
			params2.header.time_stamp = new Date().getTime();
			var paramData2 = JSON.stringify(params2);
			this.$http.jsonp(this.apiurl4 + "?str=" + encodeURI(paramData2), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				// 响应成功回调	
				this.getDatejson(-1, orderNo);
				console.log(JSON.stringify(response.body))
			}, function(response) {
				// 响应错误回调
				this.getDatejson(-1, orderNo);
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
			params2.header.time_stamp = new Date().getTime();
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
						console.log(JSON.stringify(response.body));
						var status = response.body.status;
						var type = response.body.type;
						if(status == 4 || status == 2) {
							if(type == 3) {
								lxjTip.msg("店铺已安排服务，不能取消订单");
							} else if(type == 1) {
								lxjTip.msg("店铺已发货，不能取消订单");
							}
							vue.getDatejson(-1, orderNo);
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
		getButtom: function(status, expressage, comment) {
			if(status == 3 && expressage == 0) {
				return false;
			} else if( status == 4 &&expressage == 0 && comment == 1) {
				return false;
			} else {
				return true;
			}
		},

		//确认收货操作
		receivingProduct: function(i,orderNum1) {
			lxjTip.confirm('您确定已经收到货了吗？', {
				skin: 'demo3',
				yes: function(index) {
					if(i=='1'){
						vue.updateOrderFlag(2, orderNum1);
					}else{
						vue.confirmOrderFlag(i,orderNum1);
					}
					lxjTip.close(); //如果设定了yes回调，需进行手工关闭
				}
			});

		},
		//确认已维修操作
		confirmServise: function(process,safeguardNo) {
			lxjTip.confirm('您确定已维修了吗？', {
				skin: 'demo3',
				yes: function(index) {
					vue.confirmOrderFlag(process,safeguardNo);
					lxjTip.close(); //如果设定了yes回调，需进行手工关闭
				}
			});

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
		//进入支付页面
		goPay: function(orderNo, type) {
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
			params2.header.time_stamp = new Date().getTime();
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
			var url = host + "/mms/html5/personal/checkLogistics.htm?orderNo=" + orderNo;
			showActivity(url, "查看物流");
		},
		//进入填写地址页面
		writeAddress: function(orderNo,safeguardNo) {
			//console.log(orderNo +    safeguardNo);
			//var url = host + "/mms/html5/personal/recycleAddress.htm?childOrderNo=" + orderNo + "&safeguardNo=" + safeguardNo;

			var url = host + '/mms/html5/personal/recycleAddress.htm?childOrderNo=' + orderNo + '&safeguardNo=' + safeguardNo + '&token='+ token;
			showActivity(url,"填写地址");
			//showActivity(url, "填写地址");
		},
		//进入购物车页面
		shoppingAgain: function(items) {
			var list=items.commodityOrderList;
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
		goService: function(orderNo,commitPrice,skuId,commodityNum) {
			//console.log(orderNo+" "+commitPrice+ ' '+skuId+' '+commodityNum);
			var url = host + "/mms/html5/personal/service.htm?orderNo=" + orderNo+"&commodityPrice=" +commitPrice+"&skuId="+skuId+"&commodityNum="+commodityNum;
			showActivity(url, "申请售后");
		},
		//进入评价页面
		goEvaluate: function(orderNo, length, commodityId) {
			//if(length == 1) {
			showActivity(host + "/mms/html5/personal/" + decodeURI("writeProductEvaluateNew.htm?orderNo=" + orderNo + "&commodityId=" + commodityId), "商品评价");
			//} else {
			//	showActivity(host + "/mms/html5/personal/" + decodeURI("productEvaluate.htm?orderNo=" + orderNo), "商品评价");
			//}
		},


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
		vue.getDatejson(-1, orderNo);
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