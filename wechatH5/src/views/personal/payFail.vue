<template>
	<div v-title data-title="支付失败" class="payFail">
		<ul>
			<li class="img-min"><img src="./images/picture_fail@3x.png" /></li>
			<li class="success-title">
				支付失败
			</li>
			<li class="time">
				请尝试再次支付
			</li>
			<!--<li class="lookOrders">
				<p v-on:click="seeOrder()">查看订单</p>
			</li>-->
		</ul>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	export default {
		name: 'payFail',
		data() {
			return {
				
			}
		},
		methods: {

			seeOrder: function() {
				this.$router.replace({name: 'myOrder', params: {orderStatus:1}});
			},
			getbasicData: function() {

			},

		},

		mounted: function() {
			//console.log(this.commoditySkuAttrIds);
			this.getbasicData();
			this.wxJsdkConfig([])
		},
		watch: {

		}
	}
</script>
<style scoped="scoped">
	.line_01 {
		width: 100%;
		height: 1px;
		background-color: #eee;
		/*transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5)*/
	}
	
	.line_01box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
	}
	.payFail{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		background-color: #fff;
	}
	
	ul li {
		overflow: hidden;
		background: #fff;
		padding: 1.2rem .195rem .0rem .195rem;
		/* border-bottom:1px solid #ccc;*/
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	img {
		clear: both;
		display: block;
		margin: auto;
		margin-top: 0;
		width: 1.8rem;
	}
	
	.success-title {
		text-align: center;
		color: #222;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 0.17rem;
		line-height: 0.45rem;
		padding: 0;
	}
	
	.time {
		text-align: center;
		padding-top:0;
		font-size: 0.15rem;
		line-height: 0.16rem;
		color: #aaa;
		text-overflow: ellipsis;
		display: block;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		padding-bottom: 0.3rem;
	}
	
	.lookOrders {
		padding: 0;
		width: 26%;
		background: #fff;
		color: #FC9153;
		border-radius: 0.18rem;
		margin-left: 37%;
		text-align: center;
		height: 0.36rem;
		line-height: 0.2rem;
		font-size: 0.16rem;
		border: 1px solid #FC9103;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		/*position: fixed;
		bottom: 5px;*/
	}
	.lookOrders p{
		color: #FC9103;
		line-height: 0.2rem;
	}
</style>