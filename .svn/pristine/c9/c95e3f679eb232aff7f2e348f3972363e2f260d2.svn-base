<template>
	<div>
		<scroller v-if="scrollerFlag" :on-infinite="infinite" v-title data-title="售后/退货" ref="my_scroller">
			<div style="margin-top:-1px;height:1px;"></div>
			<div class="order-container" v-if="orderListArray.length > 0" v-for="(item,index) in orderListArray" :key="index">
				<div class="order-shop">
					<span class="order-shop-No">售后编号</span>
					<span v-text="item.orderNo"></span>
					<div v-text="item.processMsg"></div>
				</div>
				<div class="order-wrap" @click="orderDetail(item.orderNo,item.safeguardType,item.totalOrderNo)">
					<img class="order-pic" :src="item.imgUrl">
					<div class="order-goods">
						<div class="order-name" v-text="item.commodityName"></div>
						<div class="order-standent"></div>
					</div>
					<div class="order-right">
						<div class="order-price" v-text="item.simplePrice"></div>
						<div class="order-num">x{{item.commodityNum}}</div>
					</div>
				</div>
				<div class="order-shipping">
					<div class="order-total">
						<span>{{item.returnMoney | pricePre}}</span>
						<span>{{item.returnMoney | priceNext}}</span>
					</div>
					<span>共{{item.commodityNum}}件商品 实付款 :</span>
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
	export default {
		data() {
			return {
				scrollerFlag: true,
				orderListArray: [],
				infiniteFlag: true,
				emptyFlag: false,
				setTime: 0,
				pageNum: 0,
				orderStatus: this.$route.params.orderStatus,
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
				setTimeout(function() {
					var params = {
						body: {
							orderStatus: that.orderStatus,
							orderDetailNo: "",
							pageSize: 10,
							pageNum: that.pageNum
						},
						header: {
							token: that.$store.state.token,
							time_stamp: new Date().getTime()
						}
					}
					that.infiniteFlag = false;
					var paramsStr = encodeURI(JSON.stringify(params));
					var httpURL = "/mms/servlet/getCommodityOrderList?str=" + paramsStr;
					axios.post(httpURL).then(function(res) {
							console.log(res);
							for(var i = 0; i < res.data.orderList.length; i++) {
								that.orderListArray.push(res.data.orderList[i]);
							}
							that.infiniteFlag = false;
							if(that.orderListArray.length == 0) {
								that.scrollerFlag = false;
								that.emptyFlag = true;
							} else {
								that.scrollerFlag = true;
								that.emptyFlag = false;
							}
							done();
						})
						.catch(function(error) {
							console.log(error);
						});
				}, that.setTime);
			},
			orderDetail(orderNo, processStatus, totalOrderNo) {
				if(processStatus != 9) {
					this.$router.push({
						name: 'orderDetail',
						params: {
							orderNo: orderNo,
							processStatus: processStatus
						}
					});
				} else {
					window.location.href = window.location.protocol + "//" + window.location.host + "/mms/html5/groupon/commander/orderDetail.htm?orderNo=" + totalOrderNo;
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
		mounted: function() {
			this.wxJsdkConfig([]);
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
	
	.order-shop-No {
		display: block;
		line-height: 0.23rem;
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
		margin-top: 0.01rem;
		margin-right: 0.14rem;
	}
	
	.order-shop span {
		font-size: 0.14rem;
		color: #888;
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
		color: #999;
		padding-left: 0.14rem;
		line-height: 0.5rem;
		border-top: 1px solid #eee;
	}
	
	.order-wrap {
		padding: 0.15rem 0.14rem;
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
		padding: 0.08rem 0.14rem.14rem;
		line-height: 0.27rem;
	}
	
	.order-shipping>span {
		float: right;
	}
	
	.order-shipping div {
		float: right;
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
		padding: 0.1rem 0;
		overflow: hidden;
	}
	
	.order-btn span {
		display: inline-block;
		padding: 0.07rem 0.11rem;
		border: 1px solid #333;
		border-radius: 0.15rem;
		margin-left: 0.14rem;
		float: right;
		color: #333;
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