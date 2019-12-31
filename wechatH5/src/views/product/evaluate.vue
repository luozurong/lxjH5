<template>
	<div v-title data-title="全部评论">
		<scroller :noDataText="noDataText" :on-infinite="infinite">
			<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
			<div class="prefecture-floor2">
				<li id="productevaluatebox" v-for="(item,index) in commodityList" :key="index" class="productevaluatebox">
					<div class="evaluateBox">
						<img v-if="item.userImage==''" :src="defalutPic" class="headPortrait" alt="头像" />

						<img v-if="item.userImage!=''" v-bind:src="item.userImage" class="headPortrait" alt="头像" />

						<span class="evaluateName">{{item.userAddress}}</span>
						<div class="evaluate-star">
							<img v-if="item.starLevel == 0" v-for="list in 5" src="../../../static/images/ic_big-start_pre@3x.png" alt="">
							<img v-if="item.starLevel > 0" v-for="list in item.starLevel" src="../../../static/images/ic_big-start_pre@3x.png" alt="">
							<img v-if="item.starLevel > 0" v-for="list in 5-item.starLevel" src="../../../static/images/ic_big-star_nor@3x.png" alt="">
						</div>
					</div>
					<div class="evaluateTime">{{item.commentTime}}&nbsp;{{item.commoditySku}}</div>
					<pre class="evaluateContents">{{item.commentContent}}</pre>

					<ul v-if="item.commentImages&&item.commentImages.length>0">
						<!---买家评价集合图片容器-->
						<li v-for="(item1,index1) in item.commentImages" v-if="item1.imgUrl!=''" class="commentImages">
							<div class="product_img" v-bind:style="{ backgroundImage: 'url('+item1.thumbImgUrl+')'}">
								<img v-on:click="getwxpreviewImage(item,item1.imgUrl)" v-bind:src="item1.thumbImgUrl" data-preview-src="" :data-preview-group="index" />
							</div>
						</li>
					</ul>
					<!-- 卖家回复-->
					<img v-if="item.reply==2" src="../../../static/images/sanjiao_03.png" alt="小三角" class="sanjiao" />
					<div v-if="item.reply==2" class="replyContent">
						<span>卖家回复：</span>
						<span>{{item.replyContent}}</span>
						<ul style="margin-top:0.1rem;">
							<!-- 卖家回复图片集合-->
							<li v-for="(item2,index2) in item.replyImages" v-if="item2.imgUrl!=''" class="replyImages">
								<div class="product_img" v-bind:style="{ backgroundImage: 'url('+item2.thumbImgUrl+')'}">
									<img v-on:click="getwxpreviewImage(item,item2.imgUrl)" v-bind:src="item2.thumbImgUrl" width="100px;" data-preview-src="" :data-preview-group="index" />
								</div>
							</li>
						</ul>
					</div>
				</li>
			</div>
		</scroller>
	</div>
</template>
<script scoped>
	import Vue from 'vue'
	import VueScroller from 'vue-scroller'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import defalutPic from '../../../static/images/ic_default_avatar.png'


	Vue.use(VueScroller)

	export default {
		data() {
			return {
				noDataText: '没有更多了',
				infiniteFlag: true,
				mmsHost: this.$store.state.mmsHost,
				commodityList: [],
				setTime: 0,
				pageNum: 0,
				token: this.$store.state.token,
				commodityId: this.$route.params.commodityId,
				areaOrgSeq: this.$store.state.organizationSeq,
				defalutPic:defalutPic
			}
		},
		filters: {

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
			productColumnAjax(doneFunc) {
				var that = this;
				this.pageNum++;
				var params = {
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					},
					body: {
						commodityId: this.commodityId,
						areaOrgSeq: this.areaOrgSeq,
						type: 2,
						pageNum: this.pageNum,
						pageSize: 10
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getCommodityComments?str=" + paramsStr;
				axios.post(this.mmsHost + "/mms/servlet/getCommodityComments", params).then(function(response) {
					//axios.post(httpURL).then(function(response) {
					document.querySelector(".loading-layer").style.display = "block";
					if(response.data.result == 0) {
						for(var i = 0; i < response.data.commentList.length; i++) {
							that.commodityList.push(response.data.commentList[i]);
						}
						if(response.data.commentList.length < 10) {
							that.infiniteFlag = false;
						}
					} else {
						that.infiniteFlag = false;
					}
					doneFunc();
					that.setTime = 500;

				});
			},
			getwxpreviewImage: function(items, imgsrc) {
				let imgList = new Array();
				for(var i = 0; i < items.commentImages.length; i++) {
					imgList.push(items.commentImages[i].imgUrl);
				}
				var replystate=items.replyImages?true:false;
				if(replystate) {
					for(var j = 0; j < items.replyImages.length; j++) {
						imgList.push(items.replyImages[j].imgUrl);
					}
				}

				wx.previewImage({
					current: imgsrc,
					urls: imgList
				});
			},
			getbasicData: function() {
				this.$store.state.token ? sessionStorage.setItem("token", this.$store.state.token) : this.token = sessionStorage.getItem("confirmOrderbugType");
				this.$route.params.commodityId ? sessionStorage.setItem("commodityId", this.$route.params.commodityId) : this.commodityId = sessionStorage.getItem("commodityId");
				this.$store.state.organizationSeq ? sessionStorage.setItem("organizationSeq", this.$store.state.organizationSeq) : this.organizationSeq = sessionStorage.getItem("organizationSeq");
				this.wxJsdkConfig(['previewImage'], function(it) {})
			},
		},
		mounted: function() {
			this.getbasicData();
		},
	}
</script>
<style scoped>
	body {
		width: 100%;
		min-width: 100%;
	}
	
	li {
		list-style: none;
	}
	
	#productevaluate {
		width: 100%;
	}
	
	.prefecture-floor2 {
		width: 100%;
		box-sizing: border-box;
		background: #F3F4F5;
		overflow: hidden;
	}
	
	.productevaluatebox {
		/*padding-left: 0.113rem;*/
		padding-left: 0.14rem;
		background: #fff;
		margin-bottom: 0.1rem;
		padding-bottom: 0.2rem;
	}
	
	.headPortrait {
		/*width:0.3rem;*/
		/*height:0.3rem;*/
		width: 0.3rem;
		height: 0.3rem;
		display: inline-block;
		vertical-align: bottom;
		text-overflow: clip;
		border-radius: 50%;
		float: left;
		margin-top: 0.025rem;
	}
	
	.evaluateName {
		line-height: 0.38rem;
		height: 0.38rem;
		margin-left: 0.09rem;
		color: #555;
		font-size: 0.14rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.evaluateTime {
		color: #aaa;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		white-space: nowrap;
		font-size: 0.12rem;
	}
	
	.evaluateContents {
		margin-right: 0.12rem;
		margin-bottom: 0.1rem;
		/*font-size:0.14rem;*/
		padding-top: .2rem;
		font-size: 0.14rem;
		color: #333333;
		word-break: break-all;
	}
	
	.evaluateBox {
		padding-top: 0.05rem;
	}
	
	#evaluatePhotoes {
		margin-left: 0.1rem;
	}
	
	.evaluatePhotoes {
		display: inline-block;
	}
	
	.commentReply {
		background: #efeff4;
		width: 80%;
		height: 1rem;
		margin-top: 0.1rem;
	}
	
	.commentImages,
	.replyImages {
		/*width:1rem;*/
		display: inline-block;
	}
	
	.replyContent {
		color: #555555;
		width: 95%;
		background: #efeff4;
		padding-top: 0.1rem;
		padding-bottom: 0.1rem;
		font-size: 0.15rem;
		padding-left: 0.1rem;
	}
	
	.sanjiao {
		margin-left: 0.38rem;
		position: relative;
		top: 0.1rem;
	}
	
	pre {
		white-space: pre-wrap;
	}
	
	.commentImages img {
		display: inline-block;
		width: 0.64rem;
		height: 0.64rem;
		/*width:68px;*/
		/*height:68px;*/
		border: 0;
		opacity: 0;
	}
	
	.replyImages img {
		display: inline-block;
		width: 0.64rem;
		height: 0.64rem;
		border: 0;
		opacity: 0;
	}
	
	.product_img {
		width: 0.64rem;
		/*margin-right: 0.1rem;*/
		margin-right: 0.1rem;
		height: 0.64rem;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
	}
	
	.evaluateBox {
		overflow: hidden;
	}
	
	.evaluateName {
		width: 2.0rem;
		float: left;
		margin-left: 0.09rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		height: 0.38rem;
		line-height: 0.38rem;
	}
	
	.evaluate-star {
		float: right;
		margin-right: 0.15rem;
		margin-top: 0.06rem;
	}
	
	.evaluate-star img {
		width: 0.21rem;
	}
	
	#wrapper {
		background-color: #f3f4f5;
	}
	
	._v-container {
		background: #F3F4F5;
	}
	
	[v-cloak] {
		display: none!important;
	}
	
	.loading-layer {
		display: none;
	}
	
	body,
	html {
		font-family: "PingFang SC", Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	}
</style>