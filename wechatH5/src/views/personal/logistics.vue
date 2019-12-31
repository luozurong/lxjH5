<template>
	<div class="logistics" v-title :data-title="titleWord">
		<div class="logistics-wrap" v-cloak>
			<img class="logistics-pic" :src="productPic">
			<div class="logistics-main" v-if="logisticsChoose">
				<div>
					<span>物流状态：</span>
					<span class="logistics-status" v-text="status"></span>
				</div>
				<div>
					<span>承运来源：</span>
					<span>商家配送</span>
				</div>
				<div>
					<span>配&nbsp; 送&nbsp; 人：</span>
					<span v-text="deliveryMan"></span>
				</div>
				<div>
					<span>联系电话：</span>
					<span><a :href="deliveryPhones" class="logistics-no" v-text="deliveryPhone"></a></span>
				</div>
			</div>
			<div class="logistics-main" v-if="!logisticsChoose">
				<div>
					<span>物流状态：</span>
					<span class="logistics-status" v-text="status"></span>
				</div>
				<div>
					<span>承运来源：</span>
					<span v-text="logisticsName"></span>
				</div>
				<div>
					<span>运单编号：</span>
					<span v-text="logisticsCode"></span>
				</div>
				<div>
					<span>官方电话：</span>
					<span class="logistics-no">暂无</span>
				</div>
			</div>
		</div>
		<div class="logistics-container" v-if="traces.length > 0">
			<div class="logistics-left">
				<div></div>
			</div>
			<div class="logistics-right">
				<div class="logistics-item" v-for="(item,index) in traces" :key="index">
					<div v-text="item.AcceptStation"></div>
					<div class="logistics-time" v-text="item.AcceptTime"></div>
					<span><i></i></span>
				</div>
				<div></div>
			
			</div>
		</div>
	</div>
</template>
<script>
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				titleWord: '物流详情',
				orderNo: this.$route.params.orderNo,
				traceList: [],
				productPic: null,
				logisticsName: '',
				logisticsCode: '',
				traces: [],
				status: '',
				deliveryMan: '',
				deliveryPhone: '',
				deliveryPhones: '',
				logisticsChoose: false
			}
		},
		methods:{
			logisticsAjax(){
				var that = this;
				var params = {
					body:{
						orderNo: this.orderNo,
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/getLogisticsTrace?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
	            	console.log(res);
	            	if(res.data.result == 0){
	            		that.productPic = res.data.imgUrl;
	            		that.logisticsChoose = res.data.deliveryType == 1 ? true : false;

	            		if(res.data.deliveryType == 1){ //商家配送
	            			var sellerDelivery = res.data.sellerDelivery;
	            			that.deliveryMan = res.data.sellerDelivery.deliveryMan
	            			that.deliveryPhone = res.data.sellerDelivery.deliveryPhone
	            			that.deliveryPhones = 'tel:'+res.data.sellerDelivery.deliveryPhone
							var status = sellerDelivery.state;
							switch(status) {
								case 2:
									that.status = "配送中";
									break;
								case 3:
									that.status = "已签收";
									break;
								default:
									break;
							}
	            		}else { //第三方快递配送
							var traceList = res.data.traceList[0];
							var state = traceList.state;
							that.traceList = res.data.traceList;
		            		that.logisticsName =  res.data.traceList[0].logisticsName;
		            		that.logisticsCode =  res.data.traceList[0].logisticsCode;
		            		that.traces =  res.data.traceList[0].traces
							switch(state) {
								case 2:
									that.status = "配送中";
									break;
								case 3:
									that.status = "已签收";
									break;
								case 4:
									that.status = "问题件";
									break;
								default:
									break;
							}
							
						}

	            	}
	            	
				})
				.catch(function (error) {
				    console.log(error);
				});
			}
		},
		mounted(){
			this.wxJsdkConfig([])
			this.logisticsAjax();
		}
	}
</script>
<style scoped>
	[v-cloak]{
		display: none;
	}
	.logistics-wrap{
		background: #fff;
		display: flex;
		display: -webkit-flex;
		padding: 0.18rem 0.14rem 0.12rem;
	}
	.logistics-wrap img{
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		width: 0.7rem;
		height: 0.7rem;
	}
	.logistics-main{
		flex-grow: 2;
		-webkit-flex-grow: 2;
		color: #333;
		font-size: 0.15rem;
		margin-top: -0.04rem;
		box-sizing: border-box;
		padding-left: 0.14rem;
	}
	.logistics-main .logistics-status{
		color: #3cbca3;
	}
	.logistics-main .logistics-no{
		color: #51aef4;
	}
	.logistics-container{
		display: flex;
		display: -webkit-flex;
	}

	.logistics-left{
		flex-shrink: 0; 
		-webkit-flex-shrink: 0; 
		width: 0.6rem;
		height: auto;
		box-sizing: border-box;
		padding-top: 0.15rem;
	}
	.logistics-left div{
		border-left: 1px solid #ccc;
		height: 100%;
		width: 1px;
		margin: 0 auto;
	}
	.logistics-right{
		flex-grow: 2; 
		-webkit-flex-grow: 2; 
	}
	.logistics-item{
		position: relative;
		padding: 0.15rem 0;
	}
	.logistics-item div{
		line-height: 0.2rem;
		box-sizing: border-box;
		padding-right: 0.14rem;
	}
	.logistics-item div.logistics-time{
		margin-top: 0.06rem;
	}
	.logistics-item span{
		width: 0.12rem;
		height: 0.12rem;
		border-radius: 100%;
		background: transparent;
		position: absolute;
		top: 0.14rem;
		left: -0.37rem;
	}
	.logistics-item span i{
		width: 0.08rem;
		height: 0.08rem;
		background: #ccc;
		display: block;
		border-radius: 100%;
		margin-top: 0.02rem;
		margin-left: 0.02rem;
	}
	.logistics-container{
		background: #fff;
		margin-top: 0.12rem;	
	}
	.logistics-right .logistics-item:first-child{
		color: #3cbca3;
	}
	.logistics-right .logistics-item:first-child span{
		background: #c4ebe3;
	}
	.logistics-right .logistics-item:first-child span i{
		background: #3cbca3;
	}
	.logistics-item{
		border-bottom: 1px solid #eee;
	}
</style>