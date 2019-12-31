<template>
	<div v-if="orderDetail != null">
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
					<!-- <img src="./images/ic_deliver.png"> -->
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
					<!-- <img src="./images/ic_deliver.png"> -->
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
				<img :src="orderDetail.sellerLogo">
				<span v-text="orderDetail.sellerName">我的店铺</span>
				<div :class="{'colors': colorValue}">{{orderDetail.status | status}}</div>
			</div>
			<div class="order-no">订单编号：{{orderDetail.orderNo}}</div>
			<div class="order-wrap" v-for="(item,index) in orderDetail.commodityOrderList">
				<img class="order-pic" :src="item.thumbLogo">
				<div class="order-goods">
					<div class="order-name" v-text="item.commodityName">水电费圣诞节疯狂的数据库发上岛咖啡肯德基发</div>
					<div class="order-standent" v-text="item.commodityDetails">是打发斯蒂芬水电费</div>
				</div>
				<div class="order-right">
					<div class="order-price" v-text="item.commitPrice">180.00</div>
					<s class="order-priceother" v-text="item.originalPrice">12</s>
					<div class="order-num">x{{item.counts}}</div>
				</div>
			</div>
			<div class="orderDetail-price">
				<div>	
					<span>商品总价</span>
					<span>￥{{orderDetail.commodityTotalPrice}}</span>
				</div>
				<div>	
					<span>物流运费</span>
					<span>￥{{orderDetail.freight}}</span>
				</div>
				<div>	
					<span>店铺优惠</span>
					<span>￥{{orderDetail.discount}}</span>
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
			<span class="order-color">马上付款</span>
			<span>取消订单</span>
			<span>取消订单</span>
			<span>追加评价</span>
			<span>评价</span>
			<span>确认收货</span>
			<span>查看物流</span>
			<span>再次购买</span>
			<span>删除订单</span>
		</div>
	</div>
</template>
<script>	
	/*已经废用*/
	import axios from '../../common/js/http.js'
	export default{
		data(){
			return{
				waitpayFlag: false,
				serviceFlag: false,
				passFlag: false,
				shopFlag: false,
				orderDetail: null,
				colorValue: false,
				orderNo: this.$route.params.orderNo,
				orderStatus: this.$route.params.orderStatus 
			}
		},
		methods:{
			orderNoDetail(){
				var that = this;
				var params = {
					body:{
						orderStatus: this.orderStatus,
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
			this.orderNoDetail();
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
		margin-top: 0.01rem;
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
		margin-top: 0.18rem;
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
		height: 0.5rem;
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
</style>