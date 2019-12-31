<template>
	<div v-title data-title="服务到家">

		<div class="">
			<scroller :noDataText="noDataText" :on-infinite="infinite">
				<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
				<div class="prefecture-floor2">
					<div class="advertising">
						<img v-bind:src="advertisingImg" alt="" />
					</div>
					<div class="listBox">
						<div class="prefecture-floor2-item" v-for="(item,index) in commodityListArray" :key="index">
							<div class="list-info">
								<h1>{{item.title}}</h1>
								<p>
									{{item.subHead}}
								</p>
							</div>
							<div class="list-logo">
								<img v-bind:src="item.imgUrl" alt="" />
							</div>
						</div>
					</div>

				</div>
			</scroller>
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
				advertisingImg:"",
				ctmsHost: this.$store.state.ctmsHost,
				timeStampParam: this.timeStamp(),
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
			timeStamp: function() {
				var dataTime = new Date();
				var dataYear = dataTime.getFullYear();
				var dataMonth = dataTime.getMonth() + 1;
				if(dataMonth < 10) dataMonth = "0" + dataMonth;
				var dataDate = dataTime.getDate();
				if(dataTime < 10) dataTime = "0" + dataTime;
				var dataDay = dataTime.getDay();
				if(dataDay < 10) dataDay = "0" + dataDay;
				var dataHours = dataTime.getHours();
				if(dataHours < 10) dataHours = "0" + dataHours;
				var dataMi = dataTime.getMinutes();
				if(dataMi < 10) dataMi = "0" + dataMi;
				var dataS = dataTime.getSeconds();
				if(dataS < 10) dataS = "0" + dataS;
				return dataYear + dataMonth + dataDate + dataHours + dataMi + dataS;
			},
			AppPalyList: function() { //商城广告
				var tokenUp = md5(('EA3vWPmfxhWUit2s' + this.timeStampParam))
				var that = this;
				var params = {
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						posionCode: '007'
					},
					header: {
						passwd: 'EA3vWPmfxhWUit2s',
						token: tokenUp.toUpperCase(),
						time_stamp: this.timeStampParam,
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.ctmsHost + "/adms/servlet/getAppPalyList?str=" + paramsStr;
				that.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					var srcd=res.body.sourceList[0].sourceURL?res.body.sourceList[0].sourceURL:"";
					that.advertisingImg=srcd;
				}, function(res) {});
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
						flag: "1",
						activityId: "",
						areaSeq: this.$store.state.organizationSeq,
						pageNum: this.pageNum,
						pageSize: 10
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getActivity?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					console.log(response);
					if(response.data.result == 0) {
						for(var i = 0; i < response.data.activityList.length; i++) {
							that.commodityListArray.push(response.data.activityList[i]);
						}
						if(response.data.activityList.length < 10) {
							that.infiniteFlag = false;
						}
					}
					doneFunc();
					that.setTime = 500;
				});
			}
		},
		mounted() {
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			this.AppPalyList();
			this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function() {
				var obj = {
					title: "商品列表", //标题
					desc: '联享家商城', //描述
					link: window.location.href,
					imgUrl: 'http://tt.hori-gz.com:8090/upload/images/20180425/201804252126144606625_thumbnail.jpg'
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
	.advertising img{
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
	}
	
	.prefecture-floor2-item {
		position: relative;
		width: 50%;
		height: 1.12rem;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #ffffff;
		display: -webkit-flex;
		-webkit-align-items: center;
		float: left;
	}
	
	.prefecture-floor2-item:nth-child(odd) {
		border-bottom: 0.06rem solid #F3F4F5;
		border-top: 0.06rem solid #F3F4F5;
		border-left: 0.13rem solid #F3F4F5;
		border-right: 0.065rem solid #F3F4F5;
	}
	
	.prefecture-floor2-item:nth-child(even) {
		border-bottom: 0.06rem solid #F3F4F5;
		border-top: 0.06rem solid #F3F4F5;
		border-left: 0.065rem solid #F3F4F5;
		border-right: 0.13rem solid #F3F4F5;
	}
	
	.list-logo {
		-webkit-flex-shrink: 0;
		padding-right: 0.1rem;
	}
	
	.list-logo>img {
		width: 0.57rem;
		height: 0.57rem;
		outline: none;
		border: none;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
	}
	
	.list-logo>span {
		height: 100%;
		display: inline-block;
		vertical-align: middle;
	}
	
	.list-info {
		-webkit-flex-grow: 2;
		color: #6a6a6a;
		text-align: left;
	}
	
	.list-info>h1 {
		padding: 0 3px;
		box-sizing: border-box;
		font-size: 0.17rem;
		line-height: 0.22rem;
		color: #333;
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.list-info>p {
		font-size: 0.14rem;
		padding: 0.115rem 0.05rem 0;
		color: #6A6A6A;
		text-align: center;
		line-height: 0.16rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>