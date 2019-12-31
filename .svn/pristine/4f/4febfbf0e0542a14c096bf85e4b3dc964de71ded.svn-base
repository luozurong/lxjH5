<template>
	<div v-title data-title="帮助与反馈" class="questionClassification">
		<header>
			<div class="header_title">
				<div class="question_tilte">
					{{qaQuestionindex}}.{{qaQuestion.title}}
				</div>
				<div class="borderbottom">
				</div>
			</div>
		</header>
		<div id="main" v-html="qaQuestion.content">
		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'

	export default {
		name: 'questionDetail',
		data() {
			return {
				token: this.$store.state.token,
				ctmsHost: this.$store.state.ctmsHost,
				qaQuestionId: this.$route.params.qaQuestionId,
				qaQuestionindex: this.$route.params.qaQuestionindex,
				qaQuestion: {},
				jsondate: {},
				onscrollStatus: false,
			}
		},
		methods: {
			getDatejson: function() {
				var that = this;
				let params = {
					body: {
						qaQuestionId: this.qaQuestionId,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.ctmsHost + "/ctmsApi/qaQuestion/getQaQuestionDetail?str=" + paramsStr;
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
						that.qaQuestion = res.data.qaQuestion;
					}
					that.getbgcolor()
				}, function(response2) {
					that.onscrollStatus = true;
					console.log(JSON.stringify(response2.body))
					lxjTip.msg("亲！请稍后再来！" + "" + response2, {
						time: 10000
					})
				})
			},
			getbgcolor:function(){
				var windowh=document.documentElement.clientHeight;
				var qele=document.getElementsByClassName("questionClassification")[0];
				var questionClassificationH=qele.clientHeight;
				if (questionClassificationH<windowh) {
					qele.style.height=windowh+'px';
				}		
			},
			getbasicData: function() {
				this.$route.params.qaQuestionindex ? sessionStorage.setItem("qaQuestionindex", this.$route.params.qaQuestionindex) : this.qaCategoryTitle = sessionStorage.getItem("qaQuestionindex");
				this.$route.params.qaQuestionId ? sessionStorage.setItem("qaQuestionId", this.$route.params.qaQuestionId) : this.qaQuestionId = sessionStorage.getItem("qaQuestionId");
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
	.header_title {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
		color: #333;
		font-size: 20px;
		font-size: 0.2rem;
	}
	
	.question_tilte {
		line-height: 0.3rem;
		padding: 0.25rem 0;
	}
	
	#main {
		width: 100%;
		box-sizing: border-box;
		padding: 0.2rem 0.14rem 0;
		font-size: 16px;
		font-size: 0.16rem;
		color: #888;
		line-height: 0.24rem;
		text-align: justify;
		word-break: break-all;
		background-color: #fff;
	}
	
	.borderbottom {
		width: 100%;
		height: 1px;
		background-color: #ccc;
		transform: scaleY(0.33);
		-webkit-transform: scaleY(0.33);
	}
	.questionClassification{
		background-color: #fff;
	}
</style>