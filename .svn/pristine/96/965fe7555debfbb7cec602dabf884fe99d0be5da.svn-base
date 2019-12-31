<template>
	<div>
		<scroller v-if="scrollerFlag" :on-infinite="infinite" v-title :data-title="orderStatusName" ref="my_scroller">
			<div style="margin-top:-1px;height:1px;"></div>
			<div class="order-container" v-if="orderListArray.length > 0" v-for="(item,index) in orderListArray" :key="index">
				<div class="order-shop">
					<img v-if="item.sellerLogo != ''" :src="item.sellerLogo">
					<img v-if="item.sellerLogo == ''" :src="stores">
					<span v-text="item.sellerName"></span>
					<span v-if="item.type == 8">订单信息</span>
					<div v-if="item.status == 0">待付款</div>
					<div v-if="item.status == 1">待发货</div>
					<div v-if="item.status == 2">待收货</div>
					<div v-if="item.status == 3">退款中</div>
					<div v-if="item.status == 4">售后处理中</div>
					<div v-if="item.status == 5">已完成</div>
					<div v-if="item.status == 6" class="order-over">订单关闭</div>
					<div v-if="item.status == 7" class="order-over">已拒收</div>
				</div>
				<div class="order-no">订单编号：{{item.orderNo}}</div>
				<div class="order-wrap" @click="orderDetail(item.orderNo,item.orderTpye,item.totalOrderNo)" v-for="(list,i) in item.commodityList">
					<img class="order-pic" :src="list.thumbLogo" alt="">
					<div class="order-goods">
						<div class="order-name" v-text="list.commodityName"></div>
						<div class="order-standent" v-if="item.type==1" v-text="list.commodityDetails"></div>
						<div class="order-standent" v-if="item.orderTpye==9&&item.groupLeaderKey==0">预计利润 ¥ {{item.profit}}/份</div>
					</div>
					<div class="order-right">
						<div class="order-price" v-text="list.commodityPrice">0.00</div>
						<div class="order-num">x{{list.counts}}</div>
					</div>
				</div>
				<div class="order-shipping">
					<div class="order-total" v-if="item.orderTpye==9&&item.groupLeaderKey==0">
						<span>{{item.orderProfit | pricePre}}</span>
						<span>{{item.orderProfit | priceNext}}</span>
					</div>
					<span v-if="item.orderTpye==9&&item.groupLeaderKey==0">&nbsp;预计利润合计：</span>
					<div class="order-total">
						<span>{{item.totalPrice | pricePre}}</span>
						<span>{{item.totalPrice | priceNext}}</span>
					</div>
					<span v-if="item.status==0">共{{item.commodityCounts}}件商品 待付款 :</span>
					<span v-if="item.status!=0">共{{item.commodityCounts}}件商品 实付款 :</span>
				</div>
				<div class="order-btn" v-if="item.orderTpye!=9">
					<span v-if="item.status ==0" @click="goPay(item.orderNo,index,item.type)" class="order-color">马上付款</span>
					<span v-if="item.status == 0" @click="orderCancel(item.orderNo,index,item.status)">取消订单</span>
					<span v-if="item.status == 1 && item.type == 8" @click="orderCancel(item.orderNo,index,item.status)">取消订单</span>
					<span v-if="item.type != 8 && item.comment == 0 && item.commentTimes == 1" @click="productEvaluate(item.orderNo)">追加评价</span>
					<span v-if="item.type != 8 && item.comment == 0 && item.commentTimes == 0" @click="productEvaluate(item.orderNo)">评价</span>
					<span v-if="item.status == 2" @click="sureOrder(item.orderNo,index,item.status)">确认收货</span>
					<span v-if="item.type == 1 && item.expressage == 1" @click="logistics(item.orderNo)">查看物流</span>
					<span v-if="item.type != 8 && item.status==5" @click="shoppingAgain(item)">再次购买</span>
					<span v-if="item.status == 99">删除订单</span>
				</div>
			</div>
		</scroller>
		<div class="collect-empty" v-if="emptyFlag">
			<img src="./images/no_order.png">
			<div class="collect-empty-tip">暂无订单</div>
		</div>
	</div>
</template>
<script>
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'we-vue'
	import stores from './images/ic_store@3x.png'
	export default {
		data() {
			return {
				orderStatusName: this.$route.params.orderStatusName,
				scrollerFlag: true,
				orderListArray: [],
				infiniteFlag: true,
				setTime: 0,
				pageNum: 0,
				emptyFlag: false,
				orderStatus: this.$route.params.orderStatus,
				appId: '',
				payState: false, //支付状态
				stores: stores,
				mmsHost: this.$store.state.mmsHost,
			}
		},
		methods: {
			infinite(done) {
				var that = this;
				if(!this.infiniteFlag) {
					setTimeout(function() {
						done(true);
					}, 10)
					return;
				}
				that.pageNum++;
				setTimeout(function() {
					that.orderAjax(function() {
						done();
					})
				}, that.setTime);
			},
			orderAjax(doneFunc) {
				var that = this;
				var params = {
					body: {
						orderStatus: that.orderStatus,
						orderDetailNo: '',
						pageSize: 10,
						pageNum: that.pageNum
					},
					header: {
						token: that.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getCommodityOrderList?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						console.log(res);
						for(var i = 0; i < res.data.orderList.length; i++) {
							that.orderListArray.push(res.data.orderList[i]);
						}
						if(res.data.orderList.length < 10) {
							that.infiniteFlag = false;
						}
						if(that.orderListArray.length == 0) {
							that.scrollerFlag = false;
							that.emptyFlag = true;
						} else {
							that.scrollerFlag = true;
							that.emptyFlag = false;
						}
						setTimeout(function() {
							that.borderFunc();
						}, 1000)

						doneFunc();
						that.setTime = 500;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			orderAjaxAgain() {
				var that = this;
				that.pageNum = 0;
				that.pageNum++;
				var params = {
					body: {
						orderStatus: that.orderStatus,
						orderDetailNo: '',
						pageSize: 10,
						pageNum: that.pageNum
					},
					header: {
						token: that.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getCommodityOrderList?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						console.log(res);
						that.that.orderListArray = [];
						for(var i = 0; i < res.data.orderList.length; i++) {
							that.orderListArray.push(res.data.orderList[i]);
						}
						if(res.data.orderList.length < 10) {
							that.infiniteFlag = false;
						}
						if(that.orderListArray.length == 0) {
							that.scrollerFlag = false;
							that.emptyFlag = true;
						} else {
							that.scrollerFlag = true;
							that.emptyFlag = false;
						}
						setTimeout(function() {
							that.borderFunc();
						}, 100)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			orderCancel(orderNo, i, statusCancel) {
				this.orderBeforeCancel(orderNo, i, statusCancel);
			},
			orderBeforeCancel(orderNo, i, statusCancel) {
				var that = this;
				var params = {
					body: {
						orderStatus: "-1",
						orderNo: orderNo
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getOrderStatusByOrderNo?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						console.log(res);
						if(res.data.result == 0) {
							var status = res.data.status;
							var type = res.data.type;
							if(status == 4 || status == 2) {
								if(type == 3) {
									lxjTip.msg("店铺已安排服务，不能取消订单");
								} else if(type == 1) {
									lxjTip.msg("店铺已发货，不能取消订单");
								}
								//vue.getDatejson(vue.presentTotal, 1, true);
							} else {
								if(status == 1) { //已支付订单取消提示
									lxjTip.confirm('订单取消后款项将在1-7个工作日内退还到您支付的账号', {
										skin: 'demo3',
										btn: ['好的', '再想想'],
										yes: function(index) {
											that.orderOperate(orderNo, i, 0); //取消订单
											that.pageNum = 0;
											that.infinite(function() {});
											lxjTip.close();
										}
									});
								} else if(status == 0) {
									//未支付订单取消提示
									lxjTip.confirm('您确定要取消订单吗？', {
										skin: 'demo3',
										btn: ['确定', '取消'],
										yes: function(index) {
											that.orderOperate(orderNo, i, status);
											console.log("取消订单")
											lxjTip.close();
										}
									});
								}
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			sureOrder(orderNo, index, status) {
				var that = this;
				lxjTip.confirm('您确定收到货了吗？', {
					skin: 'demo3',
					btn: ['确定', '取消'],
					yes: function(index) {
						that.orderOperate(orderNo, index, 2)
						lxjTip.close(); //如果设定了yes回调，需进行手工关闭
					}
				});
			},
			orderOperate(orderNo, i, statusOperate) { //订单操作
				var flag = 0;
				if(statusOperate == 0) { //取消订单
					flag = 3;
				} else if(statusOperate == 2) { //确认收货
					flag = 2
				}
				var that = this;
				var params = {
					body: {
						orderNo: orderNo,
						flag: flag,
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/operateOrders?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						console.log(res);
						if(res.data.result == 0) {
							if(statusOperate == 0 && that.orderStatus == -1 && flag == 3) {
								that.orderListArray[i].status = 6;
								that.orderAjaxAgain();
							} else if(statusOperate == 0 && that.orderStatus == 0 && flag == 3) {
								that.orderListArray.splice(i, 1);
								that.orderAjaxAgain();
							} else if(statusOperate == 0 && that.orderStatus == 1 && flag == 3) {
								that.orderListArray.splice(i, 1);
								that.orderAjaxAgain();
							} else if(statusOperate == 2 && that.orderStatus == 2) { //待收货中的确认订单
								that.orderListArray.splice(i, 1);
							} else if(statusOperate == 2 && that.orderStatus == -1) { //全部订单的确认订单
								that.orderListArray[i].status = 5;
								that.orderListArray[i].comment = 0;
								that.orderListArray[i].commentTimes = 0;
							}

							if(that.orderListArray.length == 0) {
								that.scrollerFlag = false;
								that.emptyFlag = true;
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			goPay(orderNo, i, type) { //支付前验证
				Toast.loading({
					duration: 100000,
					message: '支付校验中...'
				});
				if(this.payState) {
					return false;
				}
				var that = this;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						orderStatus: -1,
						orderNo: orderNo
					}
				};
				this.payState = true;
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getOrderInfoByOrderNo?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						// 响应成功回调	
						var odata = res.data;
						if(odata.result == 0) {
							if(odata.commodityStatus != 0) { //没有下架的商品在订单中
								if(odata.payTimeStatus != 0) { //预约时间超时
									that.verifyCommodityOrder(orderNo, i);
								} else {
									Toast.loading({
										duration: 10,
										message: '支付校验中...'
									});
									lxjTip.alert('所选服务时间已过,订单即将关闭！', {
										skin: 'demo2',
										yes: function(index) {
											that.orderOperate(orderNo, i, 0);
											that.payState = false;
											lxjTip.close();
										}
									});
								}
							} else {
								Toast.loading({
									duration: 10,
									message: '支付校验中...'
								});
								lxjTip.alert('订单信息已更改，订单即将关闭,请重新购买！', {
									skin: 'demo2',
									yes: function(index) {
										that.orderOperate(orderNo, i, 0);
										that.payState = false;
										lxjTip.close();
									}
								});
							}
						} else {
							Toast.loading({
								duration: 10,
								message: '支付校验中...'
							});
							that.payState = false;
						}
					})
					.catch(function(error) {
						that.payState = false;
						Toast.loading({
							duration: 10,
							message: '支付校验中...'
						});
						console.log(error);
					});
			},
			verifyCommodityOrder: function(orderNo, i) {
				var that = this;
				let params = {
					body: {
						orderNo: orderNo,
					},
					header: {
						token: that.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/verifyCommodityOrder", params).then(function(res) {
					if(res.data.result == 0) {
						if(res.data.statusFlag == 1 && res.data.priceFlag == 1 && res.data.giftBagLimitFlag == 1) {
							that.getPayInfo(orderNo);
						} else {
							Toast.loading({
								duration: 10,
								message: '支付校验中...'
							});
							that.payState = false;
							if(res.data.statusFlag == 0) { //没有此商品,关闭订单
								lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
									skin: 'demo3',
									yes: function(index) {
										that.orderOperate(orderNo, i, 0);
										lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									}
								});
							} else if(res.data.priceFlag == 0) {
								//订单价格信息有变动
								that.getChangedOrderInfo(orderNo, i);
							}
						}
					} else {
						Toast.loading({
							duration: 10,
							message: '支付校验中...'
						});
						that.payState = false;
					}

				}, function(res) {
					Toast.loading({
						duration: 10,
						message: '支付校验中...'
					});
					that.payState = false;
				})
			},
			//订单价格变更
			getChangedOrderInfo: function(orderNo, i) {
				var that = this;
				let params = {
					body: {
						orderNo: orderNo,
					},
					header: {
						token: that.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getChangeOrderInfo", params).then(function(res) {
					if(res.data.result == 0) {
						if(res.data.breakOrderStatus != 1) {
							lxjTip.confirm('订单信息已更改，请重新确认!', {
								skin: 'demo3',
								yes: function(index) {
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									that.verifyCommodityOrder(orderNo, i);
								}
							});
						} else {
							lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
								skin: 'demo3',
								yes: function(index) {
									that.orderOperate(orderNo, i, 0);
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								}
							});

						}
					}
				}, function(res) {})
			},
			//开始生成预付款订单信息
			getPayInfo: function(orderNo) {
				var that = this;
				let params = {
					body: {
						pay_method: "5",
						orderNo: orderNo,
						appid: this.appId,
						channel_flag: "3",
						openid: this.$store.state.openid,
						//openid: this.$store.state.openid,
					},
					header: {
						token: that.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getWxPrepayidRequest", params).then(function(res) {
					var sd = res.data;
					//lxjTip.msg(res.data);
					//that.onBridgeReady(sd.obj.appid, sd.obj.timestamp, sd.obj.noncestr, sd.obj.package, sd.obj.sign, orderN)
					Toast.loading({
						duration: 10,
						message: '支付校验中...'
					});
					wx.chooseWXPay({
						timestamp: sd.obj.timestamp,
						nonceStr: sd.obj.noncestr,
						package: sd.obj.package,
						signType: "MD5",
						paySign: sd.obj.sign,
						success: function(res) {
							//var msgee=JSON.stringify(res)
							that.getWxPayOrderStatus(orderNo, that.appId)
							that.payState = false;
						},
						cancel: function(res) {
							that.payState = false;
							//var msgee=JSON.stringify(res)
							that.$router.replace({
								name: 'payFail',
								params: {}
							});
						}
					});
					//that.OrderFreightdata = res.data;
					/*for (let i=0;i<res.data.commoditySku.length;i++) {
						that.skuSelectList.push('0000')
					}*/
				}, function(res) {})
			},
			//获取支付结果
			getWxPayOrderStatus: function(orderN, appid) {
				var that = this;
				let params = {
					body: {
						orderNo: orderN,
						pay_method: "5",
						channel_flag: "3",
						appid: appid,
					},
					header: {
						token: that.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getWxPayOrderStatus", params).then(function(res) {
						if(res.data.result == 0) {
							if(res.data.obj.trade_state == 'SUCCESS') {
								lxjTip.msg('支付成功');
								setTimeout(() => {
									that.$router.push({
										name: 'paySuccess',
										params: {}
									});
								}, 500);
							} else {
								that.$router.push({
									name: 'payFail',
									params: {}
								});
							}
						} else {
							that.$router.push({
								name: 'payFail',
								params: {}
							});
						}
					},
					function(res) {})
			},
			accreditAjax: function() {
				var that = this;
				var params = {
					body: {
						surl: window.location.href.split('#')[0],
						signatureUrl: window.location.href.split('#')[0],
					}
				};
				var paramsStr = encodeURIComponent(JSON.stringify(params));
				var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxGzhAuth?str=" + paramsStr;
				that.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					console.log(res);
					if(res.data.result == 0) {
						that.appId = res.data.appid
						wx.config({
							debug: false,
							appId: res.data.appid,
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.signature,
							jsApiList: ["hideAllNonBaseMenuItem", 'chooseWXPay']
						});
						wx.ready(function() {
							wx.hideAllNonBaseMenuItem();
						});
					}
				}, function(res) {});
			},
			shoppingAgain(item) {
				var that = this;
				var list = item.commodityList;
				var shopinglist = new Array();
				if(list && list.length > 0) {
					for(var i = 0; i < list.length; i++) {
						var item = {
							commodityId: list[i].commodityId,
							skuId: list[i].skuId,
							count: list[i].counts,
							commodityDetails: list[i].commodityDetails
						};
						shopinglist.push(item);
					}
				}
				var params = {
					body: {
						type: 1,
						organizationSeq: this.$store.state.organizationSeq,
						commodityArr: shopinglist
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
				};
				var paramData = JSON.stringify(params);
				var httpURL = "/mms/servlet/userBuyAgain?str=" + paramData;
				axios.post(httpURL).then(function(res) {
					console.log(res.data.shoppingCartIdList);
					if(res.data.result == 0) {
						var shoppingCartIds = res.data.shoppingCartIdList;
						that.$router.push({
							path: '/shoppingcart',
							query: {
								shoppingCartIds: shoppingCartIds
							}
						});
					}
				}).catch(function(error) {
					console.log(error);
				});

			},
			getWelfare(orderNo) { //优惠推送
				var params = {
					body: {
						orderNo: orderNo,
						flag: 2,
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getWelfareAfterConfirmReceived?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						console.log(res);

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			logistics(orderNo) {
				this.$router.push({
					name: 'logistics',
					params: {
						orderNo: orderNo
					}
				});
			},
			orderDetail(orderNo, status, totalOrderNo) {
				console.log(orderNo);
				if(status != 9) {
					this.$router.push({
						name: 'orderDetail',
						params: {
							orderNo: orderNo,
							orderStatus: status
						}
					});
				} else {
					window.location.href =window.location.protocol +"//"+ window.location.host+ "/mms/html5/groupon/commander/orderDetail.htm?orderNo=" + totalOrderNo;
				}
			},
			productEvaluate(orderNo) {
				this.$router.push({
					name: 'productEvaluate',
					params: {
						orderNo: orderNo,
						orderStatus: status
					}
				});
			},
			borderFunc() {
				var dom = document.getElementsByClassName('order-btn');
				for(var i = 0; i < dom.length; i++) {
					if(dom[i].getElementsByTagName("span").length == 0) {
						dom[i].style.borderTop = '1px solid transparent';
					}
				}
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
		mounted() {
			if(window.location.href.indexOf("pageFrom=wx") >= 0) {} else {
				var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
				window.location.replace(sst)
			}
			this.accreditAjax();
		}
	}
</script>
<style scoped>
	.order-container {
		background: #fff;
		margin-bottom: 0.12rem;
	}
	
	.order-container:last-child {
		margin-bottom: 0;
	}
	
	.order-shop {
		width: 100%;
		box-sizing: border-box;
		padding: 0.12rem 0.14rem;
		overflow: hidden;
		background: #fff;
	}
	
	.order-shop img {
		width: 0.18rem;
		height: 0.18rem;
		float: left;
		display: block;
		margin-top: 0.03rem;
		margin-right: 0.14rem;
	}
	
	.order-shop span {
		float: left;
		font-size: 0.15rem;
	}
	
	.order-shop div {
		float: right;
		font-size: 0.15rem;
		color: #fc9153;
	}
	
	.order-shop div.order-over {
		color: #ccc;
	}
	
	.order-no {
		font-size: 0.15rem;
		color: #333;
		padding-left: 0.14rem;
		line-height: 0.4rem;
		border-top: 1px solid #eee;
	}
	
	.order-wrap {
		padding: 0.15rem 0.14rem 0.09rem;
		background: #f8f8f8;
		margin-bottom: 0.06rem;
		overflow: hidden;
	}
	
	.order-pic {
		width: 0.7rem;
		height: 0.7rem;
		float: left;
	}
	
	.order-goods {
		width: 2.12rem;
		float: left;
		margin-left: 0.14rem;
	}
	
	.order-container .order-wrap:last-child {
		border-bottom: 0;
	}
	
	.order-name {
		text-align: left;
		line-height: 20px;
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 0.15rem;
		color: #333;
	}
	
	.order-standent {
		overflow: hidden;
		margin-top: 0.05rem;
		color: #aaa;
	}
	
	.order-standent div {
		float: left;
		margin-right: 0.12rem;
	}
	
	.order-standent div span {
		color: #aaa;
		font-size: 0.13rem;
	}
	
	.order-right {
		width: 0.83rem;
		float: right;
		text-align: right;
	}
	
	.order-price {
		font-size: 0.15rem;
		color: #333;
	}
	
	.order-price:before {
		content: "￥";
		margin-right: -0.03rem;
	}
	
	.order-num {
		font-size: 0.18rem;
		color: #aaa;
		font-size: 0.14rem;
		margin-top: 0.32rem;
	}
	
	.order-shipping {
		color: #333;
		font-size: 0.14rem;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0.03rem 0.14rem 0.08rem;
	}
	
	.order-shipping>span {
		float: right;
		line-height: 0.3rem;
	}
	
	.order-shipping div {
		float: right;
		margin-top: 0.02rem;
	}
	
	.order-shipping div span {
		color: #fc9153;
	}
	
	.order-shipping div span:first-child {
		font-size: 0.17rem;
		margin-right: -0.04rem;
	}
	
	.order-shipping div span:first-child:before {
		content: '￥';
		line-height: 0.19rem;
		margin-right: -0.03rem;
	}
	
	.order-btn {
		margin: 0 0.14rem;
		border-top: 1px solid #eee;
		/* padding: 0.1rem 0; */
		overflow: hidden;
	}
	
	.order-btn span {
		display: inline-block;
		padding: 0.03rem 0.11rem;
		border: 1px solid #333;
		border-radius: 0.15rem;
		margin: 0.1rem 0.14rem 0.1rem 0;
		float: right;
		color: #333;
	}
	
	.order-btn span:first-child {
		margin-right: 0;
	}
	
	.order-btn span.order-color {
		border: 1px solid #fc9153;
		color: #fc9153;
	}
	
	.collect-empty img {
		width: 1.8rem;
		height: 1.8rem;
		margin: 1.2rem auto 0;
		display: block;
	}
	
	.collect-empty-tip {
		font-size: 0.16rem;
		color: #aaa;
		text-align: center;
		margin-top: 0.3rem;
	}
</style>