<template>
	<div v-title data-title="商品列表" class="serviceList">

		<div class="">
			<scroller :noDataText="noDataText" :on-infinite="infinite">
				<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
				<div class="prefecture-floor2">
					<div class="listBox">
						<div class="prefecture-floor2-item" v-for="(item,index) in commodityListArray" v-on:click="turnToproductDetail(item.id)" :key="index">
							<div class="picture"><img v-bind:src="item.logo" alt="" /></div>
							<div class="info">
								<div class="title">
									{{item.name}}
								</div>
								<div class="introduce">{{item.commodityDetails}}</div>
								<div class="price">¥{{splitNum(item.currentPrice)[0]}}.<span class="minfont">{{splitNum(item.currentPrice)[1]}}</span><span class="fufen" v-show="item.fufen>0">赠<span class="fufenNum">{{item.fufen}}</span>福分</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroller>
		</div>

		<div class="footer">
			<div class="shopCar">
				<div class="img_box1" v-on:click="turnToshoppingcart()">
					<img src="./images/btn_ic-_shopping-cartf@3x.png" />
					<span v-if="shoppingCarInfo!=null" v-show="shoppingCarInfo.totalCount>0">{{shoppingCarInfo.totalCount<100?shoppingCarInfo.totalCount:'…'}}</span>
				</div>
				<!--<p>菜篮子</p>-->
			</div>
			<div class="totalPrice">
				<div id="totalPrice" class="totalPriceT">
					合计：<span class="fuhao">¥</span><span class="integer">{{splitNum(shoppingCarInfo.realTotalPrice)[0]}}.</span><span class="fuhao" id="decimal">{{splitNum(shoppingCarInfo.realTotalPrice)[1]}}</span><span style="color:#ccc;font-size:0.11rem;">&nbsp;&nbsp;不含运费</span>
				</div>
				<div id="totalReducePrice" v-show="shoppingCarInfo.totalReducePrice>0" style="font-size: 0.13rem;color: #999;">
					已优惠：<span class="totalReducePriceN">¥ {{shoppingCarInfo.totalReducePrice}}</span>
				</div>
			</div>
			<div class="payFor" v-on:click="turnToshoppingcart()">
				去买单
			</div>
		</div>
	</div>
</template>
<script scoped>
	import Vue from 'vue'
	import VueScroller from 'vue-scroller'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import md5 from 'js-md5'

	Vue.use(VueScroller)

	export default {
		data() {
			return {
				noDataText: '没有更多了',
				infiniteFlag: true,
				commodityListArray: [],
				setTime: 0,
				pageNum: 0,
				advertisingImg: "",
				shoppingCarInfo: {
					realTotalPrice: "0.00",
					reason: "",
					result: "0",
					totalCount: 0,
					totalPrice: "0.00",
					totalReducePrice: "0.00",
					userAccount: ""
				},//购物车默认数据
				mmsHost: this.$store.state.mmsHost,
				activityId: this.$route.params.activityId
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
		methods: {
			infinite: function(done) {
				if(!this.infiniteFlag) {
					done(true);
					return;
				}
				var that = this;
				setTimeout(function() {
					that.productColumnAjax(function() {
						done();
					});
				}, that.setTime);
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			turnToproductDetail: function(id) {
				window.event.cancelBubble = true;
				this.$router.push({
					name: 'productDetail',
					params: {
						commodityId: id
					}
				});
			},
			turnToshoppingcart: function() {
				window.event.cancelBubble = true;
				this.$router.push({
					path: '/shoppingcart',
					params: {}
				})
			},
			splitNum(numberN) {
				var Num = numberN;
				var Nums = new Array();
				Nums = (Num + "").split(".");
				return Nums;
			},
			getshoppingNum() {
				var that = this;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						type: "1",
						areaOrgSeq: this.$store.state.organizationSeq
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getShoppingcartCountServlet?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					if(response.data.result == 0) {
						that.shoppingCarInfo = response.data;
					}
				});
			},
			productColumnAjax(doneFunc) {
				var that = this;
				this.pageNum++;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						flag: "2",
						activityId: this.activityId,
						areaSeq: this.$store.state.organizationSeq,
						pageNum: this.pageNum,
						pageSize: 8
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getActivity?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					console.log(response);
					if(response.data.result == 0) {
						for(var i = 0; i < response.data.commodityList.length; i++) {
							that.commodityListArray.push(response.data.commodityList[i]);
						}
						if(response.data.commodityList.length < 8) {
							that.infiniteFlag = false;
						}
					}
					doneFunc();
					that.setTime = 500;
				});
			}
		},
		mounted() {
			var that = this;
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			//if (this.$store.state.token.indexOf("_")>=0) {
			this.getshoppingNum();
			//}
			//
			this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function() {
				var imgLogo = that.$store.state.mmsHost + "/mms/html5/wechatH5/lxjlogo.png";
				var shareLink=that.$store.state.host+"/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/serviceList/"+that.activityId;
				var obj = {
					title: "联享家商城", //标题
					desc: '联享家商城，享优质新生活', //描述
					//link: window.location.href,
					link: shareLink,
					imgUrl: imgLogo
				};
				//分享到朋友圈"
				wx.onMenuShareTimeline({
					title: obj.title,
					link: obj.link, // 分享链接
					imgUrl: obj.imgUrl, // 分享图标
					success: function() {
						// console.log('分享到朋友圈成功')
					},
					cancel: function() {
						// console.log('分享到朋友圈失败')
					}
				});
				//分享给朋友
				wx.onMenuShareAppMessage({
					title: obj.title, // 分享标题
					desc: obj.desc, // 分享描述
					link: encodeURI(obj.link), // 分享链接
					imgUrl: obj.imgUrl, // 分享图标
					success: function() {
						// console.log('分享到朋友成功')
						/*lxjTip.msg(obj.link, {
							time: 30000
						})*/
					},
					cancel: function() {
						// console.log('分享到朋友失败')
					}
				});
			}, ["menuItem:share:appMessage", "menuItem:share:timeline"]);
		}
	}
</script>
<style scoped>
	.advertising {
		width: 100%;
		height: 1.7rem;
		background-color: #f8f8f8;
		border-bottom: 0.06rem solid #F3F4F5;
		overflow: hidden;
	}
	
	.advertising img {
		width: 100%;
		height: 100%;
	}
	
	.prefecture-floor2 {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		overflow: hidden;
		/*padding: 0 0.07rem;*/
	}
	
	.listBox {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
	}
	
	.prefecture-floor2-item {
		position: relative;
		width: 100%;
		height: 1.17rem;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0.065rem 0;
		background-color: #ffffff;
		display: -webkit-flex;
		border-bottom: 1px solid #eee;
	}
	
	.picture {
		width: 1.035rem;
		height: 1.035rem;
	}
	
	.picture img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.info {
		padding-left: 0.14rem;
		width: 30%;
		flex-grow: 2;
		position: relative;
	}
	
	.title {
		font-size: 15px;
		color: #000;
		font-size: 0.15rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.introduce {
		font-size: 0.13rem;
		line-height: .2rem;
		padding-top: 0.065rem;
		color: #888;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.price {
		font-size: 0.15rem;
		color: #fc9153;
		position: absolute;
		bottom: 0;
		line-height: 1;
	}
	
	.minfont {
		font-size: 0.13rem;
	}
	
	.fufen {
		padding-left: 0.25rem;
		font-size: 0.13rem;
	}
	
	.serviceList-fixed-height {
		height: 0.53rem;
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		height: 0.52rem;
		border-top: 1px solid #eee;
	}
	
	.shopCar {
		float: left;
		height: 0.52;
		margin-left: 0.14rem;
	}
	
	.img_box1 {
		margin: 0 auto;
		position: relative;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	}
	
	.img_box1 img {
		width: 0.28rem;
		padding-top: .11rem;
		display: block;
	}
	
	#totalPrice span {
		color: #fc9153;
	}
	
	.fuhao {
		font-size: 0.17rem;
	}
	
	.img_box1 span {
		background-color: #ff525c;
		border-radius: 0.19rem;
		position: absolute;
		width: 0.16rem;
		height: 0.16rem;
		line-height: 0.16rem;
		top: .045rem;
		right: -0.09rem;
		font-size: .1rem;
		color: #fff;
		text-align: center;
		border: 0.02rem solid #fff;
	}
	
	.totalPrice {
		font-size: 0.15rem;
		float: left;
		height: 0.52rem;
		margin-left: 8%;
		box-sizing: border-box;
		width: 44%;
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
	
	#totalPrice {
		width: 100%;
	}
	
	.totalPriceT {
		font-size: .15rem;
		color: #333333;
	}
	
	#decimal {
		font-size: 0.13rem;
	}
	
	.totalPriceTR {
		width: 100%;
		position: absolute;
		top: 0.06rem;
	}
	
	.integer {
		font-size: 0.15rem;
	}
	
	#totalReducePrice {
		width: 100%;
		/*position: absolute;
		bottom: 0.06rem;*/
	}
	
	.payFor {
		height: 0.52rem;
		line-height: 0.52rem;
		float: right;
		width: 28%;
		text-align: center;
		background-color: #fc9153;
		color: #fff;
		font-size: 0.17rem;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	}
</style>
<style type="text/css">
	.serviceList ._v-container>._v-content>.loading-layer {
		padding-bottom: 0.53rem;
	}
	
	.serviceList .totalPriceTR {
		width: 100%;
		position: absolute;
		top: 0.06rem;
	}
</style>