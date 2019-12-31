<br /><template>
	<div v-if="orderDetail != null" v-title :data-title="titleWord">
		<div class="orderDetail-info">
			<div class="orderDetail-info-pic">	
				<img src="../../../static/images/ic_-Location-@3x.png">
			</div>
			<div class="orderDetail-info-wrap">
				<div>
					<span  v-text="orderDetail.receiverName"></span>
					<span v-text="orderDetail.receiverPhone"></span>
				</div>
				<div v-text="orderDetail.receiverAddress"></div>
			</div>
		</div>
		<div v-if="waitpayFlag" class="orderDetail-waitpay">留言：发货前务必检查质量问题，免得日后走售后麻烦，周五前务必发货，晚了收不到</div>
		<div v-if="serviceFlag" class="orderDetail-service">
			<div class="orderDetail-service-write">请退货并填写物流信息</div>
			<div class="orderDetail-service-wrap">	
				<div class="orderDetail-service-tip">商家已同意退货申请，请尽早退货</div>
				<div class="orderDetail-service-btn">	
					<span>我已寄出</span>
					<span>点击填写物流信息</span>
				</div>
			</div>
			<div class="orderDetail-info">
				<div class="orderDetail-info-pic">	
					<img src="./images/ic_deliver.png">
				</div>
				<div class="orderDetail-info-wrap">
					<div>
						<span>收件人：罗祖榕</span>
						<span class="orderDetail-mobile">15692423517</span>
					</div>
					<div>广州市番禺区大学城北青蓝街28号</div>
				</div>
			</div>
		</div>
		<div v-if="passFlag" class="prderDetail-pass">	
			<div class="orderDetail-service-write">维修审核通过，商品维修中</div>
			<div class="orderDetail-pass-write">商家留言</div>
			<div class="orderDetail-pass-tip">京东方开始京东方刷卡地方就水电费加快速度房间卡萨的房间卡萨就的付款就少抵扣发就几十块的放声大哭福建师大</div>	
			<div class="orderDetail-pass-srue">确认已维修</div>
		</div>
		<div v-if="shopFlag" class="orderDetail-service">
			<div class="orderDetail-service-write">邮寄成功，等待商家验货</div>
			<div class="orderDetail-service-wrap">	
				<div class="orderDetail-service-tips">
					<span>邮寄商家信息</span>
					<span>快递单号：5484515484</span>
				</div>
			</div>
			<div class="orderDetail-info">
				<div class="orderDetail-info-pic">	
					<img src="./images/ic_deliver.png">
				</div>
				<div class="orderDetail-info-wrap">
					<div>
						<span>收件人：罗祖榕</span>
						<span class="orderDetail-mobile">15692423517</span>
					</div>
					<div>广州市番禺区大学城北青蓝街28号</div>
				</div>
			</div>
		</div>
		<div class="order-container">
			<div class="order-shop">
				<img v-if="orderDetail.sellerLogo != ''" :src="orderDetail.sellerLogo">
				<img v-if="orderDetail.sellerLogo == ''" :src="stores">
				<span v-text="orderDetail.sellerName"></span>
				<div :class="{'colors': colorValue}">{{orderDetail.status | status}}</div>
			</div>
			<!-- <div class="order-no">订单编号：{{orderDetail.orderNo}}</div> -->
			<div class="order-wrap" v-for="(item,index) in orderDetail.commodityOrderList">
				<img class="order-pic" :src="item.thumbLogo">
				<div class="order-goods">
					<div class="order-name" v-text="item.commodityName"></div>
					<div class="order-standent" v-text="item.commodityDetails"></div>
				</div>
				<div class="order-right">
					<div class="order-price" v-text="item.commitPrice"></div>
					<s class="order-priceother" v-text="item.originalPrice"></s>
					<div class="order-num">x{{item.counts}}</div>
					
					<div class="order-addreass-write" 
					v-if="orderDetail.status == 5 && item.processStatus == 1" 
					@click="serviceJump(orderDetail.orderNo,item.commitPrice,item.skuId,item.counts)">申请售后</div>

					<div class="order-addreass-write order-address-color" 
					v-if="orderDetail.status == 5 && item.processStatus== 0 && item.process != 16 && item.process != 3 && item.process!=6">申请售后</div>

					<div class="order-addreass-write" 
					v-if="orderDetail.status == 5 && item.processStatus== 0 && item.process == 3" 
					@click="writeAddress(item.safeguardNo,orderDetail.orderNo)">填写地址</div>

					<div class="order-addreass-write" 
					v-if="orderDetail.status == 5 && item.processStatus== 0 && item.process == 6" 
					@click="receivingProduct(item.safeguardNo,14)">确认收货</div>

					<div class="order-addreass-write" 
					v-if="orderDetail.status == 5 && item.processStatus== 0 && item.process == 16" 
					@click="confirmServise(item.safeguardNo,15)">确认已维修</div>
				
				</div>
			</div>
			<div class="orderDetail-price">
				<div>	
					<span>商品总价</span>
					<span>￥{{orderDetail.commodityTotalPrice}}</span>
				</div>
				<div>	
					<span>物流运费</span>
					<span v-if="orderDetail.freight == 0.00">免邮</span>
					 <span v-if="orderDetail.freight != 0.00">￥{{orderDetail.freight}}</span> 
				</div>
				<div>	
					<span>运费优惠</span>
					<span>减￥{{orderDetail.freightAvoid}}</span>
				</div>
				<div>	
					<span>满减优惠</span>
					<span>减￥{{orderDetail.fullReducedFee}}</span>
				</div>
				<div>	
					<span>优惠券</span>
					<span>￥{{orderDetail.couponMoney}}</span>
				</div>
				<div class="orderDetail-price-total">	
					<span>实付金额</span>
					<span class="orderDetail-filter">
						<span>{{orderDetail.totalPrice |pricePre}}</span>
						<span>{{orderDetail.totalPrice |priceNext}}</span>
					</span>
				</div>
			</div>
		</div>
		<div class="orderDetail-time">
			<div>订单编号：{{orderDetail.orderNo}}</div>
			<div>创建时间：{{orderDetail.createTime}}</div>
			<div v-if="orderDetail.payTime !=''">付款时间：{{orderDetail.payTime}}</div>
			<div v-if="orderDetail.outTime !=''">发货时间：{{orderDetail.outTime}}</div>
			<div v-if="orderDetail.finishTime !=''">成交时间：{{orderDetail.finishTime}}</div>
		</div>
		<div class="order-btn">
			<span v-if="orderDetail.status == 0" class="order-color" @click="goPay(orderDetail.orderNo,orderDetail.type)">马上付款</span>
			<span v-if="orderDetail.status == 0" @click="orderCancel(orderDetail.orderNo,orderDetail.status)">取消订单</span>
			<span v-if="orderDetail.type == 8 && orderDetail.status == 1" @click="orderCancel(orderDetail.orderNo,orderDetail.status)">取消订单</span>
			<span v-if="orderDetail.type != 8 && orderDetail.comment == 0 && orderDetail.commentTimes == 1" @click="productEvaluate(orderDetail.orderNo)">追加评价</span>
			<span v-if="orderDetail.type != 8 && orderDetail.comment == 0 && orderDetail.commentTimes == 0" @click="productEvaluate(orderDetail.orderNo)">评价</span>
			<span v-if="orderDetail.status == 2" @click="sureOrder(orderDetail.orderNo)">确认收货</span>
			<span v-if="orderDetail.type == 1 && orderDetail.expressage == 1" @click="logistics(orderDetail.orderNo)">查看物流</span>
			<span v-if="orderDetail.type != 8 && orderDetail.status == 5" @click="shoppingAgain(orderDetail)">再次购买</span>
			<span v-if="orderDetail.status == 99">删除订单</span>
		</div>
	</div>
</template>
<script>	
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'we-vue'
	import stores from './images/ic_store@3x.png'
	export default{
		data(){
			return{
				titleWord: '订单详情',
				waitpayFlag: false,
				serviceFlag: false,
				passFlag: false,
				shopFlag: false,
				orderDetail: null,
				colorValue: false,
				orderNo: this.$route.params.orderNo,
				orderStatus: this.$route.params.orderStatus,
				payState:false,//支付状态
				stores: stores,
				mmsHost:this.$store.state.mmsHost,
			}
		},
		methods:{
			orderNoDetail(){
				var that = this;
				var params = {
					body:{
						orderStatus: -1,
						orderDetailNo: this.orderNo,
						pageSize: 0,
						pageNum: 0
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/getCommodityOrderList?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
				 	console.log(res);
				 	that.orderDetail = res.data.orderDetail;
				 	if(res.data.orderDetail.status == 6) that.colorValue = true;
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			orderCancel(orderNo,status){
				var that = this;
				lxjTip.confirm('您确定要取消订单吗？', {
					skin: 'demo3',
					btn: ['确定', '取消'],
					yes: function(index) {
						that.orderOperate(orderNo,0);
						lxjTip.close(); //如果设定了yes回调，需进行手工关闭
					}
				});			
			},
			logistics(orderNo){
				this.$router.push({name: 'logistics', params: {orderNo:orderNo}});
			},
			sureOrder(orderNo){
				var that = this;
				lxjTip.confirm('您确定收到货了吗？', {
					skin: 'demo3',
					btn: ['确定', '取消'],
					yes: function(index) {
						that.orderOperate(orderNo,2)
						lxjTip.close(); //如果设定了yes回调，需进行手工关闭
					}
				});
			},
			serviceJump(orderNo,commitPrice,skuId,counts){
				console.log(orderNo +' '+commitPrice+' '+skuId+' '+counts);
				this.$router.push({name:'service',params:{orderNo:orderNo,commitPrice:commitPrice,skuId:skuId,counts:counts}})
			},
			goPay(orderNo,type){
				Toast.loading({duration: 100000,message: '支付校验中...'});
				if(this.payState){
					return false;
				}
				var that = this;
				var params2 = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						orderStatus: -1,
						orderNo: orderNo
					}
				}
				this.payState=true;
				var paramsStr = encodeURI(JSON.stringify(params2));
	            var httpURL = "/mms/servlet/getOrderInfoByOrderNo?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
	            	console.log(res);
					var odata = res.data;
					if(odata.result == 0) {
						if(odata.commodityStatus != 0) { //没有下架的商品在订单中
							if(odata.payTimeStatus != 0) { //预约时间超时
								that.verifyCommodityOrder(orderNo);
								//showActivity(host + "/mms/html5/personal/" + decodeURI("pay.htm?orderNo=" + orderNo), "付款");
							} else {
								Toast.loading({duration: 10,message: '支付校验中...'});
								lxjTip.alert('所选服务时间已过,订单即将关闭！', {
									skin: 'demo2',
									yes: function(index) {
										that.payState=false;
										that.orderOperate(orderNo,0);
										lxjTip.close();
									}
								});
							}
						} else {
							Toast.loading({duration: 10,message: '支付校验中...'});
							lxjTip.alert('订单信息已更改，订单即将关闭,请重新购买！', {
								skin: 'demo2',
								yes: function(index) {
									that.payState=false;
									that.orderOperate(orderNo,0);
									lxjTip.close();
								}
							});
						}
					}else{
						Toast.loading({duration: 10,message: '支付校验中...'});
						that.payState=false;
					}
				})
				.catch(function (error) {
				    console.log(error);
				    Toast.loading({duration: 10,message: '支付校验中...'});
				    that.payState=false;
				});
				
			},			
			verifyCommodityOrder: function(orderNo) {
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
							Toast.loading({duration: 10,message: '支付校验中...'});
							that.payState=false;
							if(res.data.statusFlag == 0) { //没有此商品,关闭订单
								lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
									skin: 'demo3',
									yes: function(index) {
										that.orderOperate(orderNo, 0);
										lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									}
								});
							} else if(res.data.priceFlag == 0) {
								//订单价格信息有变动
								that.getChangedOrderInfo(orderNo);
							}
						}
					}else{
						Toast.loading({duration: 10,message: '支付校验中...'});
						that.payState=false;
					}

				}, function(res) {
					Toast.loading({duration: 10,message: '支付校验中...'});
					that.payState=false;
				})
			},		
			//订单价格变更
			getChangedOrderInfo: function(orderNo) {
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
									that.verifyCommodityOrder(orderNo);
								}
							});
						} else {
							lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
								skin: 'demo3',
								yes: function(index) {
									that.orderOperate(orderNo, 0);
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
					Toast.loading({duration: 10,message: '支付校验中...'});
					wx.chooseWXPay({
						timestamp: sd.obj.timestamp,
						nonceStr: sd.obj.noncestr,
						package: sd.obj.package,
						signType: "MD5",
						paySign: sd.obj.sign,
						success: function(res) {
							//var msgee=JSON.stringify(res)
							that.payState=false;
							that.getWxPayOrderStatus(orderNo, that.appId)
						},
						cancel: function(res) {
							that.payState=false;
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
			receivingProduct(safeguardNo,status){ //售后确认收货
				var that = this;
				lxjTip.confirm('您确定已经收到货了吗？', {
					skin: 'demo3',
					yes: function(index) {
						if(status == '1'){
							that.orderOperate(2, safeguardNo);
						}else{
							that.confirmOrderFlag(status,safeguardNo);
						}
						lxjTip.close(); 
					}
				});
			},
			confirmServise(safeguardNo,status){ //售后确认维修
				var that = this;
				lxjTip.confirm('您确定已维修了吗？', {
					skin: 'demo3',
					yes: function(index) {
						that.confirmOrderFlag(status,safeguardNo);
						lxjTip.close(); 
					}
				});
			},
			shoppingAgain(item){ //再次购买
				var that = this;
				var list = item.commodityOrderList;
				var shopinglist = new Array();
				if(list && list.length>0){
					for(var i = 0; i < list.length; i++){
						var item={
							commodityId: list[i].commodityId,
							skuId: list[i].skuId,
							count: list[i].counts,
							commodityDetails: list[i].commodityDetails
						};
						shopinglist.push(item);
					}
				}
				var params = {
					body:{
						type: 1,
						organizationSeq: this.$store.state.organizationSeq,
						commodityArr: shopinglist
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
				};
				var paramData = JSON.stringify(params);
				var httpURL = "/mms/servlet/userBuyAgain?str="+paramData;
	            axios.post(httpURL).then(function (res) {
	            	console.log(res.data.shoppingCartIdList);
					if(res.data.result == 0) {
						var shoppingCartIds = res.data.shoppingCartIdList;
						that.$router.push({path: '/shoppingcart',query: {shoppingCartIds: shoppingCartIds}});
					}
	            }).catch(function (error) {
				    console.log(error);
				});
				
			},
			orderOperate(orderNo,statusOperate){ //订单操作
				var flag = 0;
				if(statusOperate == 0){ //取消订单
					flag = 3;
				}else if(statusOperate == 2){ //确认收货
					flag = 2
				}
				var that = this;
				var params = {
					body:{
						orderNo: orderNo,
						flag: flag,
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				//return false;
	            var httpURL = "/mms/servlet/operateOrders?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
	            	console.log(res);
	            	if(res.data.result == 0 && flag == 3){
	            	/*	that.orderDetail.status = 6;
	            		that.colorValue = true;*/
	            		that.orderNoDetail();
	            	}else if(res.data.result == 0 && flag == 2){
	            		/*that.orderDetail.status = 5;
	            		that.orderDetail.comment = 0;
	            		that.orderDetail.commentTimes = 0;*/
	            		that.orderNoDetail();
	            	}
	            	
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			confirmOrderFlag(processStatus,safeguardNo) { //process:14确认收货，15确认已维修
				var that = this;
				var params = {
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						processStatus: processStatus,
						safeguardNo: safeguardNo
					}
				};
				
				var paramsStr = encodeURIComponent(JSON.stringify(params));
	            var httpURL = this.$store.state.mmsHost + "/mms/servlet/commitConfirmGetGoods?str="+paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback"
				}).then(function(res) {
					if(res.body.result == 0) {
	            		that.orderNoDetail();
					}
				});
				/*var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/commitConfirmGetGoods?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
	            	if(res.data.result == 0) {
	            		that.orderNoDetail();
					}
				})
				.catch(function (error) {
				    console.log(error);
				});*/
			},
			productEvaluate(orderNo){
				this.$router.push({name: 'productEvaluate', params: {orderNo:orderNo}});
			},
			writeAddress(safeguardNo,orderNo){
				this.$router.push({name: 'writeAddress', params: {safeguardNo:safeguardNo,orderNo:orderNo}});
			}

		},
		filters:{
			status(val){
				var statusValue;
				if(val == 0) statusValue = '待付款';
				if(val == 1) statusValue = '待发货';
				if(val == 2) statusValue = '待收货';
				if(val == 3) statusValue = '退款中';
				if(val == 4) statusValue = '售后处理中';
				if(val == 5) statusValue = '已完成';
				if(val == 6) statusValue = '订单关闭';
				if(val == 7) statusValue = '已拒收';
				return statusValue;
				
			},
			pricePre(value){
				var val = parseInt(value);
				return val;
			},
			priceNext(value){
				var val = '.'+String(parseFloat(value).toFixed(2)).split('.')[1];
				return val;
			}
		},
		mounted(){
			if(window.location.href.indexOf("pageFrom=wx")>=0){				
			}else{
				var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
				window.location.replace(sst)
			}
			this.orderNoDetail();
			this.accreditAjax();
		}
	}
</script>
<style scoped>	
	.orderDetail-info{
		width: 100%;
		padding: 0.12rem 0.14rem;
		display: flex;
		display: -webkit-flex;
		background: #fff;
		font-size: 0.15rem;
		color: #555;
		line-height: 0.26rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}
	.orderDetail-info-pic{
		width: 0.3rem;
		height: auto;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		display:flex;
	    display: -webkit-flex; 
		align-items:center;
	}
	.orderDetail-info-pic img{
		width: 0.17rem;
		height: 0.2rem;
	}
	.orderDetail-info-wrap{
		flex-grow: 2;
		-webkit-flex-grow: 2;
	}	
	.orderDetail-info-wrap div span:last-child{
		margin-left: 0.1rem;
	}
	 .orderDetail-waitpay{
		padding: 0.09rem 0.14rem;
		font-size: 0.15rem;
		line-height: 0.23rem;
		color: #666;
		background: #fff;
	}
	.orderDetail-service{
		background: #fff;
	}
	.orderDetail-service-write{
		line-height: 0.5rem;
		background: #ffe6a8;
		font-size: 0.15rem;
		color: #555;
		box-sizing: border-box;
		padding-left: 0.14rem; 
	}
	.orderDetail-service-wrap{
		overflow: hidden;
		margin: 0 0.14rem; 
		border-bottom: 1px solid #eee;
	}
	.orderDetail-service-tip{
		font-size: 0.15rem;
		color: #333;
		box-sizing: border-box; 
		line-height: 0.34rem;
		margin-top: 0.1rem;
	}
	.orderDetail-service-btn{
		float:right;
		width: 0.9rem;
		height: 0.46rem;
		border: 1px solid #fc9153;
		border-radius: 0.03rem;
		margin-bottom: 0.14rem;
	}
	
	.orderDetail-service-btn span{
		display: block;
		text-align: center;
		color: #fc9153;
	}
	.orderDetail-service-btn span:first-child{
		font-size: 0.12rem;
		line-height: 0.19rem;
		margin-top: 0.06rem;
	}
	.orderDetail-service-btn span:last-child{
		font-size: 0.1rem;
	}
	.orderDetail-mobile{
		float: right;
	}
	.prderDetail-pass{
		background: #fff;
		overflow: hidden;
		
	}
	.orderDetail-pass-write{
		font-size: 0.16rem;
		color: #333;
		line-height: 0.5rem;
		border-bottom: 1px solid #eee;
		margin: 0  0.14rem;
	}
	.orderDetail-pass-tip{
		font-size: 0.14rem;
		color: #555;
		box-sizing: border-box;
		padding: 0.1rem 0.14rem;
	}
	.orderDetail-pass-srue{
		width: 0.9rem;
		height: 0.3rem;
		font-size: 0.14rem;
		border-radius: 0.15rem;
		border:1px solid #fc9153;
		color: #fc9153;
		float: right;
		margin-right: 0.14rem;
		line-height: 0.3rem; 
		text-align: center;
		margin-bottom: 0.14rem;
		margin-top: 0.04rem;
	}
	.orderDetail-service-tips span:first-child{
		font-size: 0.16rem;
		color: #333;
		display: inline-block;
		line-height: 0.5rem;
	}
	.orderDetail-service-tips span:last-child{
		float: right;
		font-size: 0.14rem;
		color: #555;
		display: inline-block;
		line-height: 0.5rem;
	} 
	.order-container{
		background: #fff;
		margin-top: 0.12rem;
	}
	.order-container:last-child{
		margin-bottom: 0;
	}
	.order-shop{
		width: 100%;
		box-sizing: border-box;
		padding: 0.12rem 0.14rem; 
		overflow: hidden;
		background: #fff;
	}
	.order-shop img{
		width: 0.18rem;
		height: 0.18rem;
		float: left;
		display: block;
		margin-top: 0.03rem;
		margin-right: 0.14rem;
	}
	.order-shop span{
		float: left;
		font-size: 0.15rem;
	}
	.order-shop div{
		float: right;
		font-size: 0.15rem;
		color: #fc9153;
	}
	.order-shop div.order-over{
		color: #ccc;
	}
	.order-no{
		font-size: 0.15rem;
		color: #999;
		padding-left: 0.14rem; 
		line-height: 0.5rem;
		border-top: 1px solid #eee;
	}
	.order-wrap{
		padding: 0.15rem 0.14rem;
		background: #f8f8f8;
		margin-bottom: 0.06rem;
		overflow: hidden;
	}
	.order-pic{
		width: 0.7rem;
		height: 0.7rem;
		float: left;
	}
	.order-goods{
		width: 2.12rem;
		float: left;
		margin-left: 0.14rem;
	}
	.order-container .order-wrap:last-child{
		border-bottom: 0;
	}
	.order-name{
		text-align: left;
		line-height:20px;
	    height:40px;
	   	overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.15rem;
        color: #333;
	}
	.order-standent{
		overflow: hidden;
		margin-top: 0.05rem;
		color: #aaa;
	}
	.order-standent div{
		float: left;
		margin-right: 0.12rem;
	}
	.order-standent div span{
		color: #aaa;
		font-size: 0.13rem;
	}
	.order-right{
		width: 0.83rem;
		float: right;
		text-align: right;
	}
	.order-price{
		font-size: 0.15rem;
		color: #333;
	}
	.order-price:before{
		content: "￥";
		margin-right: -0.03rem;
	}
	.order-num{
		font-size: 0.18rem;
		color: #aaa;
		font-size: 0.14rem;
		margin-top: 0.05rem;
	}
	.orderDetail-price{
		background: #fff;
		padding: 0.12rem 0.14rem;
	}
	.orderDetail-price div{
		overflow: hidden;
	}
	.orderDetail-price div>span{
		color: #555;
		line-height: 0.21rem;
	}
	.orderDetail-price div>span:first-child{
		float: left;
	}
	.orderDetail-price div>span:last-child{
		float: right;
	}
	.orderDetail-price-total{
		margin-top: 0.18rem;
	}
	.orderDetail-price .orderDetail-price-total span{
		color: #333;
		font-size: 0.15rem;
	}
	.orderDetail-price .orderDetail-filter span{
		color: #fc9153;
	}
	.orderDetail-price .orderDetail-filter span:first-child{
		font-size: 0.17rem;
	}
	.orderDetail-price .orderDetail-filter span:first-child:before{
		font-size: 0.17rem;
		content: "￥";
		margin-right: -0.04rem;
	}
	.orderDetail-price .orderDetail-filter span:last-child{
		font-size: 0.13rem;
		margin-left: -0.04rem;
	}
	.orderDetail-time{
		background: #fff;
		line-height: 0.24rem;
		box-sizing: border-box;
		padding: 0.1rem 0.14rem;
		color: #aaa;
		margin: 0.1rem 0 0.6rem;
	}
	.order-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		/* height: 0.5rem; */
		background: #fff;
		box-sizing: border-box;
		padding: 0 0.14rem;
	}
	.order-btn span{
		width: 0.9rem;
		height: 0.3rem;
		line-height: 0.28rem;
		box-sizing: border-box;
		border: 1px solid #333;
		color: #333;
		border-radius: 0.15rem;
		text-align: center;
		display: inline-block;
		margin-top: 0.1rem;
		float: right;
		margin-left: 0.1rem;
		margin-bottom: 0.1rem;
	}
	.order-btn span.order-color{
		color: #fc9153;
		border-color: #fc9153;
	}
	.order-priceother{
		color: #ccc;
	}
	.order-priceother:before{
		content:"￥";
	}
	.order-shop .colors{
		color: #ccc;
	}
	.order-addreass-write{
		width: 0.9rem;
		height: 0.3rem;
		line-height: 0.30rem;
		border-radius: 0.15rem;
		border: 1px solid #fc9153;
		color: #fc9153;
		text-align: center;
		box-sizing: border-box;
	}
	.order-address-color{
		width: 0.9rem;
		height: 0.3rem;
		line-height: 0.30rem;
		border-radius: 0.15rem;
		border: 1px solid #ccc;
		color: #ccc;
		text-align: center;
		box-sizing: border-box;
	}
</style>