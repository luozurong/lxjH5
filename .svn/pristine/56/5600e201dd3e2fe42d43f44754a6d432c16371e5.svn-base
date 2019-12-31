<template>
	<div v-title data-title="商品列表">
		<scroller :noDataText="noDataText" :on-infinite="infinite">
			<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
			<div class="prefecture-floor2">
				<div class="prefecture-floor2-item" v-for="(item,index) in commodityListArray" :key="index">
					<router-link :to="{name:'productDetail',params:{commodityId: item.id}}">
						<img class="prefecture-floor2-pic" :src="item.thumLogo">
						<div class="prefecture-floor2-name" v-text="item.name"></div>
						<div class="prefecture-floor2-preprice">
							<span>{{item.currentPrice | pricePre}}</span>
							<span>{{item.currentPrice | priceNext}}</span>
						</div>
						<s class="prefecture-floor2-nextprice" v-if="item.prePrice != null">{{item.prePrice}}</s>
					</router-link>
				</div>
			</div>
		</scroller>
	</div>
</template>
<script scoped>
	import Vue from 'vue'
	import VueScroller from 'vue-scroller'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'

	Vue.use(VueScroller)

	export default {
		data() {
			return {
				noDataText: '没有更多数据',
				infiniteFlag: true,
				commodityListArray: [],
				setTime: 0,
				pageNum: 0,
				categoryId: this.$route.params.categoryId
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
			productColumnAjax(doneFunc) {
				var that = this;
				this.pageNum++;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						categoryId: this.categoryId,
						pageNum: this.pageNum,
						pageSize: 10
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getCategoryCommodity?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					console.log(response);
					if(response.data.result == 0) {
						for(var i = 0; i < response.data.commodityList.length; i++) {
							that.commodityListArray.push(response.data.commodityList[i]);
						}
						if(response.data.commodityList.length < 10) {
							that.infiniteFlag = false;
						}
					}
					doneFunc();
					that.setTime = 500;
				});
			}
		},
		mounted() {
			var that=this;
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function() {
				var imgLogo=that.$store.state.mmsHost+"/mms/html5/wechatH5/lxjlogo.png";
				var shareLink=that.$store.state.host+"/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/productColumn/"+that.categoryId;
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
	.prefecture-floor2 {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		overflow: hidden;
		padding: 0 0.07rem;
	}
	
	.prefecture-floor2-item {
		width: 50%;
		float: left;
		padding: 0.08rem 0.07rem 0;
		box-sizing: border-box;
		margin-bottom: 0.12rem;
	}
	
	.prefecture-floor2-pic {
		width: 100%;
		height: 1.86rem;
	}
	
	.prefecture-floor2-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 0.15rem;
		color: #333;
		margin-bottom: 0.04rem;
		height: 0.4rem;
		line-height: 0.2rem;
	}
	
	.prefecture-floor2-preprice {
		display: table-cell;
		float: left;
	}
	
	.prefecture-floor2-preprice span:first-child {
		font-size: 0.16rem;
		color: #fc9153;
		vertical-align: text-bottom;
	}
	
	.prefecture-floor2-preprice span:first-child:before {
		content: "￥";
		font-size: 0.16rem;
		margin-right: -0.03rem;
	}
	
	.prefecture-floor2-preprice span:last-child {
		font-size: 0.12rem;
		display: inline-block;
		padding-bottom: 0.01rem;
		color: #fc9153;
		vertical-align: text-bottom;
		margin-left: -0.04rem;
	}
	
	.prefecture-floor2-nextprice {
		color: #999;
	}
	
	.prefecture-floor2-nextprice {
		color: #999;
		float: left;
		margin-top: 0.02rem;
		margin-left: 0.19rem;
	}
	
	.prefecture-floor2-nextprice:before {
		content: "￥";
		margin-right: -0.03rem;
	}
</style>