<template>
	<div v-title data-title="优惠券" class="coupon">
		<div class="coupon-nav">
			<div @click="clickNav(0)" v-bind:class="{active: clickFlag == 0 }"><span>未使用({{unUsedList.length}})</span></div>
			<div @click="clickNav(1)" v-bind:class="{active: clickFlag == 1 }"><span>已使用({{usedList.length}})</span></div>
			<div @click="clickNav(2)" v-bind:class="{active: clickFlag == 2 }"><span>已过期({{overduedList.length}})</span></div>
		</div>
		<div class="coupon-page">
			<div class="coupon-page-nav" v-show="clickFlag == 0">
				<div class="couponInfoBoxMain">
					<div class="couponInfoItem" v-for="item in unUsedList" v-if="unUsedList.length != 0">
						<div class="couponInfo">
							<div class="couponInfo1" :class="{couponkuai:item.overdue == 1}">
								<div class="couponInfo1bj">
									<div>
										<div class="couponInfoP" v-if="item.type == 1">
											<span class="couponInfoPB">
												<span class="smallF">¥</span>
											<span class="bigF">{{item.denomination}}</span>
											</span>
										</div>
										<div class="couponInfoP" v-if="item.type == 2">
											<span class="couponInfoPB">
												<span class="bigF">{{item.denomination}}</span>
											<span class="smallF">折</span>
											</span>
										</div>
									</div>
									<div class="couponInfoR">
										<span v-if="item.couponCondition == 1">无门槛使用</span>
										<span v-if="item.couponCondition == 2">满{{item.conditionMoney}}元使用</span>
									</div>
								</div>
								<div :class="{couponInfoType: true}">
									<div class="couponInfoType1">
										<span class="first" v-if="item.type == 1 && item.couponCondition == 2">满减券</span>
										<span class="first" v-if="item.type == 2">折扣券</span>
										<span class="last" v-if="item.scope == 1">适用全部商品</span>
										<span class="last" v-if="item.scope == 2">适用于部分商品</span>
									</div>
									<div class="couponInfoTime">
										<span>{{item.effectiveStart | dateTime}}-{{item.effectiveEnd | dateTime}}</span>
									</div>

								</div>
								<div class="couponInfoUse">
									<span class="couponGetbt" @click="goBuy(item.couponId)">立即使用</span>
								</div>
							</div>
							<div class="couponInfoRuleBox">
								<div class="couponInfoRuleBoxbj">
									<div></div>
									<div></div>
								</div>
								<div class="couponInfoRule">
									<div v-text="item.useMsg"></div>
									<img v-if="item.useMsg.length > 25" dataState='1' dataStateC='1' v-on:click="ruleShowAnimate($event)" src="../product/images/ic_put-up@3x.png" />
								</div>
							</div>
						</div>
					</div>
					<div class="coupon-empty" v-if="unUsedList.length == 0">
						<img src="../product/images/coupon-empty.png">
						<span>暂无可使用的优惠券</span>
					</div>
				</div>
			</div>
			<div class="coupon-page-nav" v-show="clickFlag == 1">
				<div class="couponInfoBoxMain">
					<div class="couponInfoItem" v-for="item in usedList" v-if="usedList.length != 0">
						<div class="couponInfo">
							<div class="couponInfo1">
								<div class="couponInfo1bjGray">
									<div class="couponInfoP" v-if="item.type == 1">
										<span class="couponInfoPB">
											<span class="smallF">¥</span>
										<span class="bigF">{{item.denomination}}</span>
										</span>
									</div>
									<div class="couponInfoP" v-if="item.type == 2">
										<span class="couponInfoPB">
											<span class="bigF">{{item.denomination}}</span>
										<span class="smallF">折</span>
										</span>
									</div>
									<div class="couponInfoR">
										<span v-if="item.couponCondition == 1">无门槛使用</span>
										<span v-if="item.couponCondition == 2">满{{item.conditionMoney}}元使用</span>
									</div>
								</div>
								<div class="couponInfoType">
									<div class="couponInfoType1 couponInfoType2">
										<span class="first" v-if="item.type == 1 && item.couponCondition == 2">满减券</span>
										<span class="first" v-if="item.type == 2">折扣券</span>
										<span class="last" v-if="item.scope == 1">适用全部商品</span>
										<span class="last" v-if="item.scope == 2">适用于部分商品</span>
									</div>
									<div class="couponInfoTime">
										<span>{{item.effectiveStart | dateTime}}-{{item.effectiveEnd | dateTime}} &nbsp;&nbsp;已使用</span>
									</div>
								</div>
							</div>
							<div class="couponInfoRuleBox">
								<div class="couponInfoRuleBoxbj couponInfoRuleBoxbj2">
									<div></div>
									<div></div>
								</div>
								<div class="couponInfoRule">
									<div v-text="item.useMsg"></div>
									<img v-if="item.useMsg.length > 25" dataState='1' dataStateC='1' v-on:click="ruleShowAnimate($event)" src="../product/images/ic_put-up@3x.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="coupon-empty" v-if="usedList.length == 0">
					<img src="../product/images/coupon-empty.png">
					<span>暂无已使用的优惠券</span>
				</div>
			</div>
			<div class="coupon-page-nav" v-show="clickFlag == 2">
				<div class="couponInfoBoxMain">
					<div class="couponInfoItem" v-for="item in overduedList" v-if="overduedList.length != 0">
						<div class="couponInfo">
							<div class="couponInfo1">
								<div class="couponInfo1bjGray">
									<div class="couponInfoP" v-if="item.type == 1">
										<span class="couponInfoPB">
											<span class="smallF">¥</span>
										<span class="bigF">{{item.denomination}}</span>
										</span>
									</div>
									<div class="couponInfoP" v-if="item.type == 2">
										<span class="couponInfoPB">
											<span class="bigF">{{item.denomination}}</span>
										<span class="smallF">折</span>
										</span>
									</div>
									<div class="couponInfoR">
										<span v-if="item.couponCondition == 1">无门槛使用</span>
										<span v-if="item.couponCondition == 2">满{{item.conditionMoney}}元使用</span>
									</div>
								</div>
								<div class="couponInfoType">
									<div class="couponInfoType1 couponInfoType2">
										<span class="first" v-if="item.type == 1 && item.couponCondition == 2">满减券</span>
										<span class="first" v-if="item.type == 2">折扣券</span>
										<span class="last" v-if="item.scope == 1">适用全部商品</span>
										<span class="last" v-if="item.scope == 2">适用于部分商品</span>
									</div>
									<div class="couponInfoTime">
										<span>{{item.effectiveStart | dateTime}}-{{item.effectiveEnd | dateTime}} &nbsp;&nbsp;已过期</span>
									</div>
								</div>
							</div>
							<div class="couponInfoRuleBox">
								<div class="couponInfoRuleBoxbj couponInfoRuleBoxbj2">
									<div></div>
									<div></div>
								</div>
								<div class="couponInfoRule">
									<div v-text="item.useMsg"></div>
									<img v-if="item.useMsg.length > 25" dataState='1' dataStateC='1' v-on:click="ruleShowAnimate($event)" src="../product/images/ic_put-up@3x.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="coupon-empty" v-if="overduedList.length == 0">
					<img src="../product/images/coupon-empty.png">
					<span>暂无过期的优惠券</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script scoped>
	import Vue from 'vue'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import md5 from 'js-md5'
	import imgup1 from '../product/images/btn_ic_put-up.png'
	import imgdown1 from '../product/images/ic_put-up@3x.png'

	export default {
		data() {
			return {
				clickFlag: 0,
				overduedList: [],
				unUsedList: [],
				usedList: [],
				token: this.$store.state.token,
				mmsHost: this.$store.state.mmsHost,
			}
		},
		filters: {
			dateTime: function(value) {
				return value.replace(/-/g, ".")
			}
		},
		methods: {
			clickNav: function(index) {
				this.clickFlag = index;
			},
			goBuy: function(couponId) {
				this.$router.push({
					name: 'couponCommodities',
					params: {
						couponId: couponId
					}
				});
			},
			getData: function() {
				let that = this;
				let params4 = {};
				let timestamp = new Date().getTime();
				params4.header = {
					token: this.token,
					time_stamp: timestamp
				};
				params4.body = {};
				var paramData = JSON.stringify(params4);

				axios.post(this.mmsHost + "/mms/servlet/getNewCoupons", params4).then(function(res) {
					//this.jsondate = response.body;

					if(res.data.result == 0) {
						that.usedList = res.data.usedList;
						that.unUsedList = res.data.unUsedList;
						that.overduedList = res.data.overduedList;
					}
				}, function(response2) {
					// 响应错误回调				
					console.log(JSON.stringify(response2.body))
					//	console.log(JSON.stringify(response))
				});
			},
			isCondition: function(param) { //判断是否为空
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			ruleShowAnimate: function(event) {
				var e = event.target;

				var clickState = e.getAttribute("dataState") == 1 ? true : false;
				var clickState2 = e.getAttribute("dataStateC");
				if(clickState2 == "2") {
					return false;
				}
				var eleG = e;
				var eleT = eleG.previousSibling;
				eleG.setAttribute("dataStateC", "2");
				setTimeout(function() {
					eleG.setAttribute("dataStateC", "1");
				}, 600)
				if(clickState) {
					eleT.previousSibling.classList.add("couponInfoRuleAnimat")
					eleT.previousSibling.style.whiteSpace = 'normal';
					eleG.setAttribute("dataState", "2");
					eleG.src = imgup1;
				} else {
					eleT.previousSibling.classList.remove("couponInfoRuleAnimat");
					eleG.src = imgdown1;
					setTimeout(function() {
						eleT.previousSibling.style.whiteSpace = 'nowrap';
						eleG.setAttribute("dataState", "1");
					}, 600)
				}
			},

		},
		mounted() {
			var that = this;
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			//if (this.$store.state.token.indexOf("_")>=0) {
			this.getData();
			//}
			//
			this.wxJsdkConfig([])

		}
	}
</script>
<style scoped>
	[v-cloak] {
		display: none;
	}
	
	.coupon-nav {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		background-color: #fff;
		height: 0.49rem;
	}
	
	.coupon-nav div {
		width: 33.33%;
		text-align: center;
	}
	
	.coupon-nav div span {
		display: inline-block;
		line-height: 0.48rem;
		color: #aaa;
	}
	
	.coupon-nav div.active span {
		border-bottom: 3px solid #fc9153;
		color: #333;
	}
	
	.coupon-empty {
		width: 100%;
	}
	
	.coupon-empty img {
		display: block;
		margin: 0.92rem auto 0;
		width: 1.80rem;
		height: 1.80rem;
	}
	
	.coupon-empty span {
		display: block;
		width: 100%;
		text-align: center;
		color: #ccc;
		font-size: 0.17rem;
		margin-top: 0.10rem;
	}
	
	.couponInfoBoxMain {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #F3F4F5;
		overflow: auto;
	}
	
	.couponInfoBoxMain .couponInfoItem {
		padding-top: 0.12rem;
		width: 100%;
	}
	
	.couponInfoBoxMain .couponInfo {
		width: 100%;
		background-color: #fff;
	}
	
	.couponInfoBoxMain .couponInfoItem:first-child {
		padding-top: 0.14rem;
	}
	
	.couponInfo1 {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		height: 1.12rem;
	}
	
	.couponInfo1bj {
		min-width: 1.2rem;
		height: 1.12rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		background-image: url(../product/images/square.png);
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 0 0;
	}
	
	.couponInfo1bjGray {
		min-width: 1.2rem;
		height: 1.12rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		background-image: url(../product/images/squar-grey.png);
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 0 0;
	}
	
	.couponInfoP {
		width: 100%;
		text-align: center;
	}
	
	.couponInfoPB {
		display: flex;
		display: -webkit-flex;
		align-items: flex-end;
		justify-content: center;
		-webkit-align-items: flex-end;
		-webkit-justify-content: center;
		color: #fff;
		font-size: 0.15rem;
		padding-top: 0.15rem;
	}
	
	.couponInfoPB .bigF {
		font-size: 0.5rem;
		line-height: 0.52rem;
	}
	
	.couponInfoPB .smallF {
		font-size: 0.2rem;
		line-height: 0.33rem;
	}
	
	.couponInfoR {
		width: 100%;
		color: #fff;
		font-size: 0.15rem;
		text-align: center;
		padding-top: 0.08rem;
		line-height: 0.16rem;
	}
	
	.couponInfoType {
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		height: 1.12rem;
		padding-left: 0.12rem;
		min-width: 1.6rem;
	}
	
	.couponInfoUse {
		display: flex;
		display: -webkit-flex;
		width: 0.86rem;
		justify-content: flex-end;
		align-items: center;
		-webkit-align-items: center;
	}
	
	.couponInfoUse span {
		display: inline-block;
		width: 0.78rem;
		height: 0.26rem;
		border: 1px solid #fc9153;
		box-sizing: border-box;
		color: #fc9153;
		font-size: 0.14rem;
		border-radius: 0.13rem;
		text-align: center;
		line-height: 0.26rem;
		margin-right: 0.05rem;
	}
	
	.couponkuai {
		background-image: url(../personal/images/kuaiguoqi.png);
		background-size: 0.42rem 0.42rem;
		background-repeat: no-repeat;
		background-position: right 0;
	}
	
	.couponInfoType1 {
		width: 100%;
		display: flex;
		align-items: center;
		display: -webkit-flex;
		-webkit-align-items: center;
		margin-top: 0.14rem;
	}
	
	.couponInfoType1 span {
		font-size: 0.146rem;
		color: #333;
		margin-right: 0.08rem;
	}
	
	.couponInfoType1 span.first {
		color: #52acff;
		font-size: 0.11rem;
		line-height: 0.18rem;
		border-radius: 0.03rem;
		background-color: #e4f3ee;
		width: 0.4rem;
		text-align: center;
		padding: 0;
	}
	
	.couponInfoType2 span.first {
		color: #999;
		font-size: 0.11rem;
		line-height: 0.18rem;
		border-radius: 0.03rem;
		background-color: #eee;
		width: 0.4rem;
		text-align: center;
		padding: 0;
	}
	
	.couponInfoTime {
		width: 100%;
		display: flex;
		align-items: center;
		display: -webkit-flex;
		-webkit-align-items: center;
		-webkit-justify-content: space-between;
		margin-top: 0.34rem;
	}
	
	.couponInfoTime .couponUsebt {
		width: 0.78rem;
		height: 0.26rem;
		background-color: #FC9153;
		border-radius: 0.13rem;
		color: #fff;
		font-size: 0.14rem;
		line-height: 0.26rem;
		text-align: center;
		-webkit-flex-shrink: 0;
		margin-right: 0.14rem;
	}
	
	.couponInfoTime .couponGetbt {
		width: 0.78rem;
		height: 0.26rem;
		background-color: #fff;
		border-radius: 0.13rem;
		border: 1px solid #FC9153;
		color: #FC9153;
		font-size: 0.14rem;
		line-height: 0.26rem;
		text-align: center;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		margin-right: 0.14rem;
	}
	
	.couponInfoTime span:first-child {
		font-size: 0.12rem;
		color: #999;
		line-height: 0.26rem;
	}
	
	.couponInfoRuleBox {
		width: 100%;
		padding-bottom: 0.06rem;
	}
	
	.couponInfoRuleBoxbj {
		width: 100%;
		height: 0.06rem;
		display: -webkit-flex;
	}
	
	.couponInfoRuleBoxbj div:first-child {
		width: 1.2rem;
		height: 0.06rem;
		-webkit-flex-shrink: 0;
	}
	
	.couponInfoRuleBoxbj div:nth-child(2) {
		-webkit-flex-grow: 2;
		height: 0.06rem;
		background-image: url(../product/images/bj001.png);
		background-size: auto 100%;
		background-position: 0 0;
		background-repeat: repeat-x;
	}
	
	.couponInfoRuleBoxbj2 div:nth-child(2) {
		-webkit-flex-grow: 2;
		height: 0.06rem;
		background-image: url(../product/images/bj002.png);
		background-size: auto 100%;
		background-position: 0 0;
		background-repeat: repeat-x;
	}
	
	.couponInfoRule {
		width: 100%;
		display: -webkit-flex;
		-webkit-align-items: flex-start;
	}
	
	.couponInfoRule>div {
		-webkit-flex-grow: 2;
		font-size: 0.13rem;
		line-height: 0.28rem;
		padding-left: 0.14rem;
		max-height: 0.28rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition-property: max-height;
		transition-duration: .6s;
		transition-delay: 0s;
		color: #555;
	}
	
	.couponInfoRuleAnimat {
		max-height: 2.0rem!important;
	}
	
	.couponInfoRule img {
		width: 0.14rem;
		height: auto;
		padding: 0.1rem 0.14rem 0 0.14rem;
		-webkit-flex-grow: 0;
		-webkit-flex-shrink: 0;
	}
</style>