<template>
	<div v-title data-title="我的">
		<div class="user-head">
			<img :src="$store.state.headimgurl" alt="">
			<div class="user-name">
				<div>
					<span class="user-name-one" v-text="$store.state.nickname"></span>
					<span class="user-name-two" v-if="$store.state.code == 0">联享家账号：{{$store.state.lxjAccount}}</span>
				</div>
			</div>
			<div class="user-bind" v-if="$store.state.code != 0" @click="accountBind()">账号绑定</div>
		</div>
		<div class="user-status">
			<div class="user-status-item" @click="orderStatusClick(index)" v-for="(item,index) in orderStatus" :key="index">
				<img :src="item.iconUrl">
				<span class="user-status-position" v-if="item.num > 0" v-text="item.num"></span>
				<span class="user-status-word" v-text="item.name"></span>
			</div>
		</div>
		<div class="user-column">
			<div class="user-column-item" @click="userColumnClick(index)" v-for="(item,index) in userColumnArray" :key="index">
				<img :src="item.iconUrl">
				<span v-text="item.name"></span>
				<i></i>
			</div>
			<div class="user-column-item" @click="userColumnClick(9)">
				<img src="./images/ic_help@3x.png">
				<span>帮助与反馈</span>
				<i></i>
			</div>
			<div class="user-column-item">
				<img src="./images/ic_hotline@3x.png" alt="">
				<span>客服热线</span>
				<div>
					<a href="tel://4008822252">4008-822-252</a>
				</div>
			</div>
		</div>
		<div class="kongBottom">
		</div>
		<div class="user-pop-bind" v-if="userBind" @click="colseBind()">
			<div class="user-pop-msg" @click.stop="colseBindOff()">
				<img class="user-pop-cancel" @click="userBindCancel()" src="./images/btn_ic_cancle@3x.png">
				<div class="user-pop-word">账号绑定</div>
				<div class="user-pop-mobile">
					<span>+86</span>
					<input type="tel" maxlength="11" v-model="userMobile" placeholder="请输入手机号码" v-on:blur="inputOnblur()">
				</div>
				<div class="user-pop-code">
					<input type="tel" v-model="messegeCode" placeholder="请输入短信验证码" v-on:blur="inputOnblur()">
					<span v-if="sendCodeShowFlag" @click="sendCode()">发送验证码</span>
					<span v-if="!sendCodeShowFlag" class="sendTime"><span v-text="timeNum"></span>s重新发送</span>
				</div>
				<div class="user-pop-sure" @click="sureBind()">绑定</div>
			</div>
		</div>
		<div class="user-pop-is" v-if="isBind">
			<div class="user-is-msg">
				<div class="user-pop-word">温馨提示</div>
				<div class="user-pop-tip">该联享家账号已与其他微信绑定,请解绑后重新绑定</div>
				<div class="user-pop-sure" @click="IsBindSure()">确定</div>
			</div>
		</div>
		<div class="user-pop-codes" v-show="codeShow">
			<div class="user-code-wrap">
				<div class="user-code-msg">请填写图片验证码</div>
				<div class="user-code-input">
					<input type="text" v-model="picCode" v-on:blur="inputOnblur()">
					<img :src="picRandomUrl" @click="imgCode()">
				</div>
				<div class="user-code-tip">图片验证码可点击刷新</div>
				<div class="user-code-btn">
					<span @click="cancelCode()">取消</span>
					<span @click="sureSend()">确定</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import defalutPic from '../../../static/images/ic_default_avatar.png'

	import waitPayIcon from './images/btn_ic_pay@3x.png';
	import waitSendIcon from './images/btn_ic_receive@3x.png'
	import waitGetIcon from './images/btn_ic_car@3x.png'
	import serviceIcon from './images/btn_ic_refund@3x.png'

	import allOrder from './images/ic_all@3x.png'
	import collectPic from './images/ic_collect@3x.png'
	import locationPic from './images/ic_Location@3x.png'
	import couponPic from './images/ic_youhuiquan.png'

	export default {
		name: 'user',
		data() {
			return {
				nickname: '',
				headimgurl: '',
				userBind: false,
				isBind: false,
				codeShow: false,
				sendCodeShowFlag: true,
				lxjAccount: this.$store.state.lxjAccount,
				userMobile: '',
				messegeCode: '',
				picRandomUrl: '',
				picCode: '',
				timeNum: 60,
				sureSendMessageFlag: true,
				orderStatus: [{
						name: '待付款',
						num: 0,
						orderStatus: 0,
						status: 'waitPay',
						iconUrl: waitPayIcon
					},
					{
						name: '待发货',
						num: 0,
						orderStatus: 1,
						status: 'waitSend',
						iconUrl: waitSendIcon
					},
					{
						name: '待收货',
						num: 0,
						orderStatus: 2,
						status: 'waitGet',
						iconUrl: waitGetIcon
					},
					{
						name: '售后/退货',
						num: 0,
						orderStatus: 4,
						status: 'service',
						iconUrl: serviceIcon
					},
				],
				userColumnArray: [{
						name: '全部订单',
						iconUrl: allOrder
					},
					{
						name: '优惠券',
						iconUrl: couponPic
					},
					{
						name: '商品收藏',
						iconUrl: collectPic
					},
					{
						name: '收货地址',
						iconUrl: locationPic
					}
				],
				showBindFlag: true,
			}
		},
		methods: {
			accountBind() {
				var that = this;

				if(this.$store.state.code == 1 || this.$store.state.code == 3) {
					if(this.showBindFlag) this.showBindFlag = false;
					else return false;
					setTimeout(function() {
						that.showBindFlag = true;
					}, 1000);
					this.$store.commit("setgetInforFlag", true);
					sessionStorage.setItem('accountBindClickFlag', true);
					this.accreditAjax();
				} else if(this.$store.state.code == 2) {
					this.userBind = true;
				}

			},
			inputOnblur() {
				var scrollTop = 0;
				if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					setTimeout(function() {
						try {
							scrollTop = document.scrollingElement.scrollTop;
						} catch(e) {
							scrollTop = document.documentElement.scrollTop;
						}
						scrollTop = Number(scrollTop) + 1;
						window.scrollTo(0, scrollTop)
					}, 300)
				}
			},
			sendCode() {
				var mobileRex = /^[1][0-9]{10}/;
				if(this.userMobile == '' || !mobileRex.test(this.userMobile)) {
					lxjTip.msg("请输入正确的手机号码");
				} else {
					this.picCode = '';
					this.picCodeAjax();
					this.userBind = false;
					this.codeShow = true;
				}
			},
			imgCode() {
				this.picCodeAjax();
			},
			cancelCode() {
				this.userBind = true;
				this.codeShow = false;
			},
			sureSend() {
				this.messegeCodeAjax();
			},
			sureBind() {
				this.loginBindMobileAjax();
			},
			colseBindOff() {

			},
			colseBind() {
				this.userBind = false;
			},
			userBindCancel() {
				this.userBind = false;
			},
			IsBindSure() {
				this.isBind = false;
			},
			orderStatusClick(index) {
				var that = this;
				if(this.$store.state.code == 1 || this.$store.state.code == 3) {
					if(this.showBindFlag) this.showBindFlag = false;
					else return false;
					setTimeout(function() {
						that.showBindFlag = true;
					}, 1000);
					this.accreditAjax();
				} else if(this.$store.state.code == 2) {
					this.userBind = true;
				} else if(this.$store.state.code == 0) {
					var orderStatusNames = '';
					if(index == 0) {
						orderStatusNames = '待付款';
					} else if(index == 1) {
						orderStatusNames = '待发货';
					} else if(index == 2) {
						orderStatusNames = '待收货';
					}

					if(index == 0 || index == 1 || index == 2)
						this.$router.push({
							name: 'myOrder',
							params: {
								orderStatus: this.orderStatus[index].orderStatus,
								orderStatusName: orderStatusNames
							}
						});
					if(index == 3)
						this.$router.push({
							name: 'orderService',
							params: {
								orderStatus: this.orderStatus[index].orderStatus
							}
						});
				}
				this.showBindFlag = true;
			},
			userColumnClick(index) {
				var that = this;
				console.log(index);
				if(this.$store.state.code == 1 || this.$store.state.code == 3) {
					if(this.showBindFlag) this.showBindFlag = false;
					else return false;
					setTimeout(function() {
						that.showBindFlag = true;
					}, 1000);
					this.accreditAjax();
				} else if(this.$store.state.code == 2) {
					this.userBind = true;
				} else if(this.$store.state.code == 0) {
					console.log(index);
					if(index == 0)
						this.$router.push({
							name: 'myOrder',
							params: {
								orderStatus: "-1",
								orderStatusName: '全部订单'
							}
						});
					if(index == 1)
						this.$router.push({
							name: 'discountCoupon',
							params: {}
						});
					if(index == 2)
						this.$router.push({
							name: 'collect',
							params: {}
						});
					if(index == 3)
						this.$router.push({
							name: 'address',
							params: {
								chooseState: 1
							}
						});
					if(index == 9)
						this.$router.push({
							name: 'questionClassification',
							params: {}
						});
				}

			},
			picCodeAjax() {
				var params = {
					body: {
						phone: this.userMobile,
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				};
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.$store.state.uumsHost + "/uums/servlet/getPicRandomServlet?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(res.body.result == 0) {
						this.picCode = '';
						console.log(res.body);
						this.picRandomUrl = res.body.picRandomUrl;
					}
				}, function(res) {});
			},
			messegeCodeAjax() {
				if(this.picCode == '') {
					lxjTip.msg("请输入图片验证码");
					return false;
				}
				var params = {
					body: {
						sourceClientCode: "lxj_u",
						picRandom: this.picCode,
						phone: this.userMobile,

					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				};
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.$store.state.uumsHost + "/uums/servlet/getRandomCodeForWxBind?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(res.body.result == 0) {
						if(res.body.code == 0) {
							lxjTip.msg("信息已发送，请注意查收");
							this.sureSendMessageFlag = true;
							this.userBind = true;
							this.codeShow = false;
							this.timeNumFunc();
						} else if(res.body.code == 1) {
							lxjTip.msg("验证码不正确");
							this.picCodeAjax();
						} else if(res.body.code == 2) {
							this.isBind = true;
							this.codeShow = false;
						} else if(res.body.code == 3) {
							lxjTip.msg("同一号码当天发送次数超过限制（同一短信模板当天最多10次");
						}
					}
				}, function(res) {});
			},
			loginBindMobileAjax() {
				if(this.sureSendMessageFlag == false) {
					lxjTip.msg("请输入正确的短信验证码");
					return false;
				}
				var params = {
					body: {
						surl: window.location.href,
						mobile: this.userMobile,
						smsVerifyCode: this.messegeCode,
						openid: this.$store.state.openid,
						unionid: this.$store.state.unionid,
						nickname: this.$store.state.nickname,
						sex: parseInt(this.$store.state.sex),
						headimgurl: this.$store.state.headimgurl
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				};

				var paramsStr = encodeURIComponent(JSON.stringify(params));
				var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxGzhLoginBindMobile?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "post",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(res.body.result == 0) {
						if(res.body.code == 0) {
							lxjTip.msg('绑定成功');
							this.userBind = false;
							this.$store.commit('setcode', res.body.code);
							this.$store.commit('settoken', res.body.token);
							this.$store.commit('setuserAccount', res.body.userAccount);
							this.$store.commit('setlxjAccount', res.body.lxjAccount);
							this.orderNum();
						} else if(res.body.code == 1) {
							lxjTip.msg("短信验证码错误 ");
						} else if(res.body.code == 2) {
							lxjTip.msg('该手机号已经绑定过微信');
							this.isBind = true;
							this.userBind = false;
						} else if(res.body.code == 3) {
							//用户微信号已经再其它地方绑定联享家账号，重新登录更新信息
							this.accreditAjax();
						}
					}

				}, function(res) {});
			},
			accreditAjax() {
				var that = this;
				if(this.code != null) {
					return false;
				}
				var params = {
					body: {
						surl: that.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/user",
						signatureUrl: window.location.href
					}
				};
				var paramsStr = encodeURIComponent(JSON.stringify(params));
				var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxGzhAuth?str=" + paramsStr;
				that.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					console.log(res);
					this.showBindFlag = false;
					if(res.data.result == 0) {
						that.$store.commit('setsave', true);
						window.location.href = res.data.url;
					}
				}, function(res) {});
			},
			wxInfoAjax() {
				var that = this;
				var authorizationCode = this.$store.state.codeWechat;
				var appid = this.$store.state.appid;
				var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxGzhLogin?code=" + authorizationCode + '&appid=' + appid;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					sessionStorage.setItem('refreshWechatData', false);
					this.$store.commit('setcode', res.body.result);
					this.$store.commit('setheadimgurl', res.body.headimgurl);
					this.$store.commit('setnickname', res.body.nickname);
					this.$store.commit('setopenid', res.body.openid);
					this.$store.commit('setsex', res.body.sex);
					this.$store.commit('setunionid', res.body.unionid);
					this.$store.commit('setuserAccount', res.body.userAccount);
					this.$store.commit('settoken', res.body.token);
					this.$store.commit('setlxjAccount', res.body.lxjAccount);

					/*var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
					window.location.replace(sst);*/

				}, function(res) {});
			},
			orderNum() {
				var params = {
					body: {},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				};

				var paramsStr = encodeURIComponent(JSON.stringify(params));
				var httpURL = this.$store.state.mmsHost + "/mms/servlet/getCommodityOrderCount?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "post",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					console.log(res);
					if(res.body.result == 0) {
						this.orderStatus[3].num = res.body.aftersaleCount;
						this.orderStatus[1].num = res.body.notDeliverCount;
						this.orderStatus[0].num = res.body.notPayCount;
						this.orderStatus[2].num = res.body.notReceiptCount;
					}

				}, function(res) {});
			},
			GetURLParameter: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			timeNumFunc() { //倒计时
				var that = this;
				that.sendCodeShowFlag = false;
				var showTime = setInterval(function() {
					that.timeNum -= 1;
					if(that.timeNum == 0) {
						that.timeNum = 60;
						that.sendCodeShowFlag = true;
						clearInterval(showTime);
					}
				}, 1000);

			},
			getWechatMessage: function() {
				var codeWechat = this.GetURLParameter("code") ? this.GetURLParameter("code") : 1;
				var appid = this.GetURLParameter("appid") ? this.GetURLParameter("appid") : '';
				this.$store.commit('setcodeWechat', codeWechat);
				this.$store.commit('setappid', appid);
				this.wxInfoAjax();
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
			}
		},
		mounted() {
			var that = this;
			if(this.$store.state.userAccount != '') {
				this.orderNum();
			}

			if(this.isCondition(this.GetURLParameter("code")) && sessionStorage.getItem('refreshWechatData') != 'false') {
				this.getWechatMessage();
			}

			/*this.$router.beforeEach((to, from, next) => {
				setTimeout(function(){
					that.orderNum();
				},100)
			    next();
			});	*/
		},
		activated() {
			this.setDocumentTitle("我的");
			this.wxJsdkConfig([]);
			this.userBind = false;
			this.orderNum();
		}
	}
</script>
<style scoped>
	html,
	body {
		height: 100%;
	}
	
	.user-head {
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
		padding: 0.34rem 0.14rem;
		background-image: url(../../../static/images/username-bg.png);
		background-size: cover;
	}
	
	.user-head img {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 100%;
		float: left;
		margin-right: 0.2rem;
	}
	
	.user-head .user-name {
		height: 0.7rem;
		float: left;
	}
	
	.user-name div {
		height: 0.7rem;
		display: table-cell;
		vertical-align: middle;
	}
	
	.user-name span {
		display: block;
	}
	
	.user-head .user-bind {
		display: inline-block;
		float: right;
		margin-top: 0.18rem;
	}
	
	.user-name-one {
		font-size: 0.18rem;
		font-weight: 600;
		color: #333;
	}
	
	.user-name-two {
		font-size: 0.14rem;
		color: #888;
		margin-top: 0.05rem;
	}
	
	.user-bind {
		width: 0.91rem;
		line-height: 0.31rem;
		border-radius: 0.18rem;
		border: 1px solid #666;
		text-align: center;
	}
	
	.user-status {
		display: flex;
		display: -webkit-flex;
		background: #fff;
		padding: 0.22rem 0.14rem;
		box-sizing: border-box;
		margin-bottom: 0.12rem;
	}
	
	.user-status div {
		width: 25%;
		position: relative;
	}
	
	.user-status div img {
		display: block;
		width: 0.28rem;
		height: 0.28rem;
		margin: 0 auto;
	}
	
	.user-status div .user-status-word {
		display: block;
		text-align: center;
		color: #555;
		margin-top: 0.09rem;
	}
	
	.user-status-item .user-status-position {
		position: absolute;
		top: -0.1rem;
		right: 0.25rem;
		background: #ff525d;
		border-radius: 100%;
		font-size: 0.16rem;
		color: #fff;
		width: 0.20rem;
		height: 0.20rem;
		text-align: center;
		line-height: 0.21rem;
		transform: scale(0.7);
	}
	
	.user-column {
		background: #fff;
		padding: 0 0.14rem;
	}
	
	.user-column-item {
		overflow: hidden;
		padding: 0.18rem 0;
		border-bottom: 1px solid #eee;
	}
	
	.user-column-item img {
		width: 0.2rem;
		float: left;
		margin-right: 0.14rem;
	}
	
	.user-column-item span {
		font-size: 0.15rem;
		color: #222;
		font-size: 0.15rem;
	}
	
	.user-column-item i {
		display: inline-block;
		width: 0.08rem;
		height: 0.14rem;
		background-image: url(./images/ic_more_grey@3x.png);
		background-size: cover;
		background-repeat: no-repeat;
		float: right;
		margin-top: 0.03rem;
	}
	
	.user-column-item div {
		float: right;
		font-size: 0.14rem;
		line-height: 0.17rem;
		color: #fc9153;
	}
	
	.user-column-item div a {
		display: inline-block;
		line-height: 0.23rem;
		color: #fc9153;
	}
	
	.user-pop-bind,
	.user-pop-is,
	.user-pop-codes {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 10;
		background: rgba(0, 0, 0, 0.4);
	}
	
	.user-pop-msg {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11;
		margin: auto;
		width: 3rem;
		height: 2.60rem;
		background: #fff;
		border-radius: 0.1rem;
	}
	
	.user-pop-cancel {
		position: absolute;
		top: 0.14rem;
		right: 0.14rem;
		z-index: 12;
		height: 0.16rem;
		width: 0.16rem;
	}
	
	.user-pop-word {
		font-size: 0.2rem;
		text-align: center;
		margin: 0.2rem 0;
	}
	
	.user-pop-mobile {
		width: 2.56rem;
		margin: 0 auto;
		border-bottom: 1px solid #eee;
		padding-bottom: 0.16rem;
		padding-top: 0.1rem;
	}
	
	.user-pop-mobile span {
		padding-right: 0.12rem;
		margin-right: 0.12rem;
		border-right: 1px solid #eee;
		color: #333;
	}
	
	.user-pop-mobile input {
		width: 1.2rem;
		font-size: 0.14rem;
		line-height: 0.16rem;
		border: none;
	}
	
	.user-pop-code {
		width: 2.56rem;
		margin: 0 auto;
		font-size: 0.14rem;
		display: flex;
		display: -webkit-flex;
	}
	
	.user-pop-code input {
		padding-top: 0.24rem;
		width: 1.46rem;
		border-bottom: 1px solid #eee;
		padding-bottom: 0.16rem;
		margin-right: 0.25rem;
		box-sizing: border-box;
		padding-left: 0.13rem;
		line-height: 0.16rem;
		border: none;
		outline: none;
		border-bottom: 1px solid #eee;
		flex-grow: 2;
		-webkit-flex-grow: 2;
		box-sizing: border-box;
		font-size: 0.14rem;
	}
	
	.user-pop-code input::placeholder {
		font-size: 0.14rem;
	}
	
	.user-pop-code span {
		font-size: 0.15rem;
		color: #fc9153;
		line-height: 0.57rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	
	.user-pop-code .sendTime,
	.user-pop-code .sendTime span {
		color: #ccc;
	}
	
	.user-pop-sure {
		width: 100%;
		color: #fc9153;
		text-align: center;
		margin-top: 0.26rem;
		border-top: 1px solid #eee;
		line-height: 0.5rem;
		font-size: 0.17rem;
	}
	
	.user-is-msg {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11;
		margin: auto;
		width: 3rem;
		height: 2rem;
		background: #fff;
		border-radius: 0.1rem;
	}
	
	.user-pop-tip {
		font-size: 0.16rem;
		color: #222;
		line-height: 0.27rem;
		padding: 0 0.35rem;
		box-sizing: border-box;
	}
	
	.user-code-wrap {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11;
		margin: auto;
		width: 3rem;
		height: 2.35rem;
		background: #fff;
		border-radius: 0.1rem;
	}
	
	.user-code-msg {
		text-align: center;
		font-size: 0.16rem;
		color: #333;
		margin-top: 0.35rem;
	}
	
	.user-code-input {
		width: 2.26rem;
		height: 0.48rem;
		margin: 0 auto;
		display: flex;
		display: -webkit-flex;
		margin-top: 0.17rem;
		margin-bottom: 0.17rem;
	}
	
	.user-code-input input {
		width: 50%;
		border: 1px solid #eee;
		box-sizing: border-box;
		padding-left: 0.12rem;
		font-size: 0.14rem;
	}
	
	.user-code-input img {
		width: 50%;
		border: 1px solid #eee;
		box-sizing: border-box;
		border-left: none;
	}
	
	.user-code-tip {
		text-align: center;
		font-size: 0.14rem;
		color: #aaa;
	}
	
	.user-code-btn {
		border-top: 1px solid #eee;
		margin-top: 0.2rem;
		display: flex;
		display: -webkit-flex;
	}
	
	.user-code-btn span {
		width: 50%;
		display: inline-block;
		line-height: 0.5rem;
		text-align: center;
		color: #999;
		font-size: 0.17rem;
	}
	
	.user-code-btn span:last-child {
		border-left: 1px solid #eee;
		color: #fc9153;
	}
	
	.kongBottom {
		width: 100%;
		height: 0.6rem;
		background-color: transparent;
	}
</style>