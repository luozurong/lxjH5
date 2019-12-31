<template>
	<div class="product" v-title data-title="分类" v-cloak>
		<div class="product-left">
			<scroller :noDataText="noDataText" :on-infinite="infinite">
				<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
				<span v-for="(item,index) in parentArray" :key="index" :class="{'prodeuct-active':Num == index}" @click="productCategory(item.categoryId,index)" v-text="item.categoryName"></span>
			</scroller>
		</div>
		<div class="product-right">
			<scroller :noDataText="noDataText" :on-infinite="loadProduct">
				<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
				<div class="product-container" v-for="(items,index) in childListArray" :key="index">
					<div class="product-wrap" v-text="items.categoryName">手机数码</div>
					<div class="product-item">
						<router-link :to="{name:'productColumn',params:{categoryId:list.categoryId}}" v-for="(list,j) in items.childList" :key="j">
							<div>
								<img :src="list.imgThum">
								<span v-text='list.categoryName'>手机</span>
							</div>
						</router-link>
					</div>
				</div>
			</scroller>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import VueScroller from 'vue-scroller'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'

	Vue.use(VueScroller)
	export default {
		name: 'product',
		data: function() {
			return {
				infiniteFlag: false,
				loadProductFlag: false,
				noDataText: '',
				parentArray: [],
				parentListArray: [],
				childListArray: [],
				Num: 0,
			}
		},
		methods: {
			infinite: function(done) {
				if(!this.infiniteFlag) {
					done(true);
					return;
				}
				setTimeout(function() {
					this.productList();
					done();
				}, 500)
			},
			productList() {
				var that = this;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						parentId: ''
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getEntityCategory?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					if(response.data.result == 0) {
						that.parentArray = response.data.parentList;
						that.childListArray = response.data.childList;
					}
				});
			},
			productCategory(categoryId, index) {
				this.Num = index;
				var that = this;
				var timestamp = new Date().getTime();
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						parentId: categoryId //左侧三级分类的id
					}
				};

				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getEntityCategory?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					if(response.data.result == 0) {
						that.childListArray = response.data.childList;
					}
				});
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			loadProduct: function(done) {
				if(!this.loadProductFlag) {
					done(true);
					return;
				}
				setTimeout(function() {

					done();

				}, 500);
			},
			setDocumentTitle(title) {
				setTimeout(function() {
					//利用iframe的onload事件刷新页面
					document.title = title;
					var iframe = document.createElement('iframe');
					iframe.src = ''; // 必须
					iframe.style.visibility = 'hidden';
					iframe.style.width = '1px';
					iframe.style.height = '1px';
					iframe.onload = function() {
						setTimeout(function() {
							document.body.removeChild(iframe);
						}, 0);
					};
					document.body.appendChild(iframe);
				}, 0);
			},
			showShare() {
				var that = this;
				this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function() {
					var imgLogo = that.$store.state.mmsHost + "/mms/html5/wechatH5/lxjlogo.png";				
					var shareLink=that.$store.state.host+"/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/product";
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
						},
						cancel: function() {
							// console.log('分享到朋友失败')
						}
					});
				}, ["menuItem:share:appMessage", "menuItem:share:timeline"]);
			}
		},
		mounted: function() {
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			this.productList();
			this.showShare();
		},
		activated() {
			this.setDocumentTitle("分类");
			this.showShare();

		}
	}
</script>
<style scoped>
	* {
		font-size: 0.14rem;
	}
	
	body,
	html {
		height: 100%;
		overflow-x: hidden;
	}
	
	body {
		background: #fff;
	}
	
	[v-cloak] {
		display: none !important;
	}
	
	.product {
		height: 100%;
	}
	
	.product-left {
		width: 1.14rem;
		box-sizing: border-box;
		height: 100%;
	}

	.product-left span {
		display: block;
		width: 1rem;
		text-align: center;
		line-height: 0.30rem;
		margin: 0.25rem auto;
		border-radius: 0.16rem;
		font-size: 0.16rem;
		display:block;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;

	}
	
	.product-left span.prodeuct-active {
		background: #fc9153;
		color: #fff;
	}
	
	.product-right {
		box-sizing: border-box;
		height: 100%;
		overflow: auto !important;
	}
	
	.product-left ._v-container {
		width: 1.13rem !important;
		border-right: 1px solid #eee;
		background: #fff;
	}
	
	.product-right ._v-container {
		margin-left: 1.14rem;
		width: 3rem !important;
		box-sizing: border-box;
		background: #fff;
	}
	
	.product .loading-layer {
		line-height: 0.50rem;
	}
	
	.product-wrap {
		font-size: 0.15rem;
		color: #333;
		line-height: 0.3rem;
		margin-top: 0.18rem;
		margin-left: 0.21rem;
		margin-bottom: 0.18rem;
	}
	
	.product-item {
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: 0.11rem;
	}
	
	.product-item div {
		width: 0.93rem;
		float: left;
		box-sizing: border-box;
	}
	
	.product-item div img {
		width: 0.7rem;
		height: 0.7rem;
		margin: 0 auto;
		display: block;
	}
	.product-item span {
		line-height: 0.41rem;
		display: block;
		text-align: center;
		color: #555;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
}
</style>