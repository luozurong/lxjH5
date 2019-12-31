<template>
	<div v-title data-title="帮助与反馈" class="questionClassification">
		<header>
			<div class="header_title">
				问题类型
			</div>
		</header>
		<div id="main">
			<div class="item_box" v-on:click="goQusetionList(item.id,item.name)" v-for="(item,index) in questionList">
				<div class="item">
					<div class="item_text">
						{{index+1}}.{{item.name}}
					</div>
					<img src="./images/ic_more_grey@3x.png" />
				</div>
				<div class="item_bottomborder">
				</div>
			</div>
		</div>
		<div class="padding_bottom">
		</div>
		<footer>
			<div class="bottom_box">
				<div id="footer_bottom" v-on:click="goSaveFeedback()">
					意见反馈
				</div>
			</div>
		</footer>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'

	export default {
		name: 'questionClassification',
		data() {
			return {
				token: this.$store.state.token,
				ctmsHost: this.$store.state.ctmsHost,
				jsondate: {},
				questionList: [{
					createTime: "2018-02-26 09:06:50",
					creatorAccount: "zhuguan01",
					creatorLevel: "000VNMS4DHVI",
					creatorName: "成泽",
					description: "商品咨询类问题汇总",
					id: "151960720963111ebc0522fc4416a186",
					name: "商品咨询",
					seqNum: 1,
					status: 1,
					updateTime: "2018-02-26 09:06:50"
				}, {
					createTime: "2018-02-26 09:08:44",
					creatorAccount: "zhuguan01",
					creatorLevel: "000VNMS4DHVI",
					creatorName: "成泽",
					description: "物流退换货处理问题汇总",
					id: "15196073244636487ecbfdc847078165",
					name: "退换货处理",
					seqNum: 2,
					status: 1,
					updateTime: "2018-02-26 09:08:44"
				}, {
					createTime: "2018-02-26 09:07:55",
					creatorAccount: "zhuguan01",
					creatorLevel: "000VNMS4DHVI",
					creatorName: "成泽",
					description: "物流信息查询问题",
					id: "1519607274607452c6fcb119404faf86",
					name: "物流查询",
					seqNum: 2,
					status: 1,
					updateTime: "2018-02-26 09:08:04"
				}, {
					createTime: "2018-02-26 09:07:17",
					creatorAccount: "zhuguan01",
					creatorLevel: "000VNMS4DHVI",
					creatorName: "成泽",
					description: "订单类问题汇总",
					id: "151960723719d6b06183f8594ee59047",
					name: "订单查询",
					seqNum: 2,
					status: 1,
					updateTime: "2018-02-26 09:07:17"
				}],
				presentTotal: 20,
				onscrollStatus: false,
			}
		},
		methods: {
			getDatejson: function(pagesize, pageNum, refreshState) {
				var that = this;
				let params = {
					body: {
						pageNum: 1,
						pageSize: 1000,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.ctmsHost + "/ctmsApi/qaCategory/getQaCategorys?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					//axios.post(this.mmsHost + "/ctmsApi/qaCategory/getQaCategorys", params).then(function(res) {
					console.log(res);
					that.onscrollStatus = true;
					// 响应成功回调
					//this.message = JSON.stringify(res.data);
					that.jsondate = res.data;
					if(res.data.result == 0) {
						//this.questionList=res.data.list;
						if(refreshState) {
							that.questionList = res.data.list;
						} else {
							that.questionList = that.questionList.concat(res.data.list);
						}
						that.presentTotal = Math.ceil(that.questionList.length / 20) * 20;
					} else {
						lxjTip.msg("亲！请稍后再来！" + " " + res.data.reason, {
							time: 100000
						})
					}

				}, function(res) {
					that.onscrollStatus = true;
					console.log(JSON.stringify(response2.body))
					lxjTip.msg("亲！请稍后再来！" + " " + response2, {
						time: 10000
					})
				})

			},
			goQusetionList: function(qaCategoryId, qaCategoryTitle) {
				this.$router.push({
					path: '/questionList/',
					name: 'questionList',
					params: {
						qaCategoryId: qaCategoryId,
						qaCategoryTitle: qaCategoryTitle
					}
				})
			},
			goSaveFeedback: function() {
				this.$router.push({
					path: '/suggestionFeedback/',
					name: 'suggestionFeedback',
					params: {}
				})
			},
			getbasicData: function() {
				//this.getDatejson(20, 1);
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
	#main .item_box:nth-last-child(1) .item_bottomborder {
		background-color: #fff;
	}
	
	.header_title {
		width: 100%;
		box-sizing: border-box;
		padding-left: 0.14rem;
		line-height: 0.34rem;
		background-color: #F3F4F5;
		color: #888;
		font-size: 14px;
		font-size: 0.14rem;
	}
	
	#main {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
	}
	
	.item {
		width: 100%;
		min-height: 0.6rem;
		display: -webkit-flex;
		-webkit-flex-direction: row;
		-webkit-justify-content: center;
		-webkit-align-items: center;
	}
	
	.item_text {
		-webkit-flex-grow: 3;
		color: #333;
		font-size: 16px;
		font-size: 0.16rem;
		line-height: 0.2rem;
		padding: 0.2rem 0.14rem 0.2rem 0;
	}
	
	.item img {
		-webkit-flex-shrink: 0;
		width: 0.08rem;
		height: auto;
	}
	
	.item_bottomborder {
		width: 100%;
		height: 1px;
		background-color: #eee;
		/*transform: scaleY(0.33);
		-webkit-transform: scaleY(0.33);*/
	}
	
	.padding_bottom {
		width: 100%;
		height: 0.68rem;
		opacity: 0;
	}
	
	.bottom_box {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #F3F4F5;
		padding: 0.12rem 0.14rem;
	}
	
	#footer_bottom {
		width: 100%;
		background-color: #FC9153;
		color: #fff;
		font-size: 18px;
		font-size: 0.18rem;
		text-align: center;
		line-height: 0.44rem;
	}
</style>