<template>
	<div v-title :data-title="qaCategoryTitle" class="questionClassification">
		<header>
			<div class="header_title">
				常见问题
			</div>
		</header>
		<div id="main">
			<div class="item_box" v-on:click="goQuestionDetail(item.id,index)" v-for="(item,index) in questionList">
				<div class="item">
					<div class="item_text">
						{{index+1}}.{{item.title}}
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
		name: 'questionList',
		data() {
			return {
				token: this.$store.state.token,
				ctmsHost: this.$store.state.ctmsHost,
				qaCategoryTitle: this.$route.params.qaCategoryTitle?this.$route.params.qaCategoryTitle:sessionStorage.getItem("qaCategoryTitle"),
				qaCategoryId: this.$route.params.qaCategoryId,
				jsondate: {},
				questionList: [],
				presentTotal: 20,
				onscrollStatus: false,
			}
		},
		methods: {
			getDatejson: function(pagesize, pageNum, refreshState) {
				var that = this;
				let params = {
					body: {
						qaCategoryId: this.qaCategoryId,
						pageNum: 1,
						pageSize: 1000,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.ctmsHost + "/ctmsApi/qaQuestion/getQaQuestions?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					//axios.post(this.mmsHost + "/ctmsApi/qaCategory/getQaCategorys", params).then(function(res) {
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
						if(that.questionList.length == 0) {
							lxjTip.msg("亲！请稍后再来！" + "问题列表暂时为空")
						}
					} else {
						lxjTip.msg("亲！请稍后再来！" + " " + res.data.reason, {
							time: 100000
						})
					}					
				}, function(response2) {
					that.onscrollStatus = true;
					console.log(JSON.stringify(response2.body))
					lxjTip.msg("亲！请稍后再来！" + "" + response2, {
						time: 10000
					})
				})

			},
			//进入问题详情页面
			goQuestionDetail: function(qaQuestionId, qaQuestionindex) {
				var qaQuestionindex=qaQuestionindex+1;
				this.$router.push({
					path: '/questionDetail/',
					name: 'questionDetail',
					params: {
						qaQuestionId: qaQuestionId,
						qaQuestionindex: qaQuestionindex
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
				this.$route.params.qaCategoryTitle ? sessionStorage.setItem("qaCategoryTitle", this.$route.params.qaCategoryTitle) : this.qaCategoryTitle = sessionStorage.getItem("qaCategoryTitle");
				this.$route.params.qaCategoryId ? sessionStorage.setItem("qaCategoryId", this.$route.params.qaCategoryId) : this.qaCategoryId = sessionStorage.getItem("qaCategoryId");
			    this.getDatejson();
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
		min-height: 0.54rem;
		display: -webkit-flex;
		-webkit-flex-direction: row;
		-webkit-justify-content: center;
		-webkit-align-items: center;
	}
	
	.item_text {
		-webkit-flex-grow: 3;
		color: #333;
		font-size: 15.3px;
		font-size: 0.153rem;
		line-height: 0.2rem;
		padding: 0.17rem 0.14rem 0.17rem 0;
	}
	
	.item img {
		-webkit-flex-shrink: 0;
		width: 0.08rem;
		height: auto;
	}
	
	.item_bottomborder {
		width: 100%;
		height: 1px;
		background-color: #ccc;
		transform: scaleY(0.33);
		-webkit-transform: scaleY(0.33);
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