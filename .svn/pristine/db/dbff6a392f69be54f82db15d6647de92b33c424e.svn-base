<template>
	<div v-title :data-title="titleWord" class="home">
		<search></search>
		<div id="l-map" sytle="opacity: 0;"></div>
		<scroller :on-infinite="infinite" :noDataText="noDataText" ref="my_scroller">
			<div class="vue-load"></div>
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(list,index) in sourceListBanner" :key="index">
						<router-link @click.native="jumpUrl(index)" class="product-link" to="">
							<img :src="list.sourceURL" alt="">
						</router-link>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div class="classify-container" v-if="allGoodsFlag">
				<div class="classify-item" @click="classifyJump(index)" v-for="(item,index) in classifyArray" :key="index">
					<img :src="item.androidParams.androidLogoUrl" alt="">
					<span v-text="item.name"></span>
				</div>
				<div class="classify-item classify-item-all">
					<router-link to="product">
						<img src="../home/images/btn_ic_more@3x.png">
						<span>全部</span>
					</router-link>
				</div>
			</div>
			<div class="classify-pic" v-if="recommendRegionListArray.length > 0" @click="prefectureJump(0)">
				<img :src="recommendRegionListArray[0].recommendImgUrl">
			</div>
			<div class="prefecture" v-if="recommendRegionListArray.length > 0">
				<div class="prefecture-left" @click="prefectureJump(1)">
					<img :src="recommendRegionListArray[1].recommendImgUrl">
				</div>
				<div class="prefecture-right">
					<div @click="prefectureJump(2)">
						<img :src="recommendRegionListArray[2].recommendImgUrl">
					</div>
					<div @click="prefectureJump(3)">
						<img :src="recommendRegionListArray[3].recommendImgUrl">
					</div>
				</div>
			</div>
			<prefecture :recommendColumnArray='recommendColumnArray'></prefecture>
		</scroller>
		<div class="home-top">
			<img @click="homeTop()" src="../home/images/btn_ic_top@3x.png">
		</div>
		<div class="home-fixed-height"></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	//import Swiper from 'swiper';
	//import 'swiper/dist/css/swiper.min.css'
	import search from '@/components/search'
	import prefecture from '../home/prefecture.vue'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import md5 from 'js-md5'
	import VueResource from 'vue-resource'
	import defalutPic from '../../../static/images/ic_default_avatar.png'
	Vue.use(VueResource)

	export default {
		name: 'home',
		data() {
			return {
				sourceListBanner: [],
				recommendColumnArray: [],
				classifyArray: [],
				recommendRegionListArray: [],
				titleWord: '',
				noDataText: '',
				infiniteFlag: true,
				allGoodsFlag: false,
				pageNum: 0,
				setTime: 0,
				code: this.GetURLParameter("code"),
				mySwiper: null,
				recommendName: '',
				swiperActionFlag: false,
				partnerCitys: [],
				ctmsHost: this.$store.state.ctmsHost,
				timeStampParam: this.timeStamp(),
				homeTops: 0,
				organizationSeqArray: [false, false, false],
				sat: 2,
				activatedFlag: false,
				locationFlag: sessionStorage.getItem('locationFlag') ? sessionStorage.getItem('locationFlag') : true,
			}
		},
		components: {
			prefecture,
			search
		},
		methods: {
			getTokenInfo(bindCodeState) {
				var that = this;
				var setToken = this.tokenMd5();
				var token = this.$store.state.token;
				var unionid = this.$store.state.unionid;
				var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxGzhTokenCheck?token=" + token + '&unionid=' + unionid;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(bindCodeState) {//单纯判断微信号是否为绑定状态
						if(res.data.bindCode  == 0) {//bindCode：0为已经绑定，1为非绑定
							this.accreditAjax();//已绑定重新授权更新信息
						}
					} else {
						if(res.data.code == 0) {
							this.wxInfoAjax();
						} else if(res.data.code == 1) {
							this.accreditAjax();
						}
					}
				}, function(res) {});
			},
			accreditAjax() {
				var that = this;
				var params = {
					body: {
						surl: that.$store.state.host+"/mms/html5/wechatH5/dist/index.htm?pageFrom=wx",
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
					if(res.data.result == 0) {
						if(that.isWchat()) {
							var setToken = this.tokenMd5();
							that.$store.commit('settoken', setToken);
							window.location.href = res.data.url;
						}
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
					if(authorizationCode != '') {
						sessionStorage.setItem('refreshWechatData', false);
						this.$store.commit('setcodeWechat', '');
						that.$store.commit('setcode', res.body.result);
						that.$store.commit('setheadimgurl', res.body.headimgurl);
						that.$store.commit('setnickname', res.body.nickname);
						that.$store.commit('setopenid', res.body.openid);
						that.$store.commit('setsex', res.body.sex);
						that.$store.commit('setunionid', res.body.unionid);
						that.$store.commit('setuserAccount', res.body.userAccount);
						that.$store.commit('settoken', res.body.token);
						that.$store.commit('setlxjAccount', res.body.lxjAccount);

					}
					//this.getNewUrl();
				}, function(res) {});
			},
			getWechatMessage() {
				var codeWechat = this.GetURLParameter("code") ? this.GetURLParameter("code") : '';
				var appid = this.GetURLParameter("appid") ? this.GetURLParameter("appid") : '';
				this.$store.commit('setcodeWechat', codeWechat);
				this.$store.commit('setappid', appid);
				this.wxInfoAjax();
			},
			getNewUrl() {
				return false;
				var url = window.location.href;
				if(url.indexOf("code") != -1) {
					var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
					window.location.replace(sst);
				} else {
					if(url.indexOf("?") != -1) {} else {
						var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
						window.location.replace(sst);
					}
				}
			},
			getLocationFunc() {
				if(sessionStorage.getItem("getLocationFlag") != null) {
					return false;
				}
				var that = this;
				wx.getLocation({
					type: 'wgs84',
					success: function(res) {
						var latitude = res.latitude;
						var longitude = res.longitude;
						var speed = res.speed;
						var accuracy = res.accuracy;
						that.$store.commit('setlat', res.latitude);
						that.$store.commit('setlng', res.longitude);
						that.mylxjAddressFunc();
						that.locationFlag = false;
						sessionStorage.setItem('locationFlag', false);
					},
					cancel: function() {
						that.locationFlag = false;
						sessionStorage.setItem('locationFlag', false);
					},
					fail: function() {
						lxjTip.msg("定位失败，请检查定位设置");
						that.locationFlag = false;
						sessionStorage.setItem('locationFlag', false);
					}
				});

			},
			mylxjAddressFunc() { //获取定位信息
				var that = this;
				var x = this.$store.state.lng;
				var y = this.$store.state.lat;
				var ggPoint = new BMap.Point(x, y);
				var map = new BMap.Map("l-map");
				map.centerAndZoom(ggPoint, 30);
				var myGeo = new BMap.Geocoder(); // 创建地理编码实例 
				myGeo.getLocation(ggPoint, function(result) { // 根据坐标得到地址描述   
					if(result) {
						var addr = result.addressComponents;
						var mylxjAddress = addr.province + addr.city + addr.district + addr.street;
						that.$store.commit('changeCity', {
							name: addr.city,
							isLocation: true,
							code: ''
						});
						that.$store.commit('setLocationAddr', mylxjAddress);
						that.$store.commit('setLocationCity', addr.city);
						for(var i = 0; i < that.partnerCitys.length; i++) {
							if(that.partnerCitys[i].cityName == addr.city) {
								that.$store.commit('setLocationCode', that.partnerCitys[i].cityCode);
							}
						}
					}
				});
			},
			wechatLocationHomeShare() {
				var that = this;
				this.wxJsdkConfig(['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'], function(id) {
					if(that.locationFlag) {
						that.getLocationFunc();
					}

					var imgLogo = that.$store.state.mmsHost + "/mms/html5/wechatH5/lxjlogo.png";
					var shareLink=that.$store.state.host+"/mms/html5/wechatH5/dist/index.htm?pageFrom=wx";
				
					//var shareLink="http://tt.hori-gz.com/mms/html5/wechatH5/dist/index.htm?pageFrom=wx888";
					var obj = {
						title: "联享家商城", //标题
						desc: '联享家商城，享优质新生活', //描述
						link: shareLink,
						imgUrl: imgLogo
					};
					//分享到朋友圈"
					wx.onMenuShareTimeline({
						title: obj.title,
						link: obj.link, // 分享链接
						imgUrl: obj.imgUrl, // 分享图标
						success: function() {},
						cancel: function() {}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: obj.title, // 分享标题
						desc: obj.desc, // 分享描述
						link: encodeURI(obj.link), // 分享链接
						imgUrl: obj.imgUrl, // 分享图标
						success: function() {},
						cancel: function() {

						}
					});
				}, ["menuItem:share:appMessage", "menuItem:share:timeline"]);
			},
			AppPalyList: function() { //商城轮播图
				var tokenUp = md5(('EA3vWPmfxhWUit2s' + this.timeStampParam))
				var that = this;
				var params = {
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						posionCode: '006'
					},
					header: {
						passwd: 'EA3vWPmfxhWUit2s',
						token: tokenUp.toUpperCase(),
						time_stamp: this.timeStampParam,
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.$store.state.admsHost + "/adms/servlet/getAppPalyList?str=" + paramsStr;
				that.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(that.$store.state.organizationSeqFlag) {
						that.organizationSeqArray[0] = true;
						that.sourceListBanner = [];
					}
					that.sourceListBanner = res.body.sourceList;
					setTimeout(function() {
						that.swiperFunc();
					}, 100);
					that.changeData();
				}, function(res) {});
			},
			navigationList: function() { //生活导航栏
				var that = this;
				var params = {
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						clientType: '1',
						version: '3',
						navType: '5'
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/lifeNavigationList?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					if(that.$store.state.organizationSeqFlag) {
						that.organizationSeqArray[1] = true;
						that.classifyArray = [];
					}
					if(response.data.result == 0) that.allGoodsFlag = true;
					
					that.classifyArray = response.data.navigationList[0].list;
					if(that.classifyArray.length >= 9) {
						that.classifyArray.length = 9;
					}
					that.changeData();

				})
				.catch(function(error) {
					console.log(error);
				});
			},
			recommendColumn: function(doneFunc) { //推荐专区（专栏）
				this.pageNum++;
				var that = this;
				var params = {
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						pageNum: that.pageNum,
						pageSize: 3
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getRecommendColumnServlet?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						if(res.data.recommendItemList.length > 0 && that.pageNum == 1) {
							that.noDataText = '没有更多数据';
						}
						for(var i = 0; i < res.data.recommendItemList.length; i++) {
							that.recommendColumnArray.push(res.data.recommendItemList[i]);
						}
						if(res.data.recommendItemList.length < 3) {
							that.infiniteFlag = false;
						}
						that.setTime = 500;
						doneFunc();

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			recommendColumnAgain() {
				var that = this;
				this.setTime = 0;
				var params = {
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						pageNum: 1,
						pageSize: 3 * that.pageNum
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getRecommendColumnServlet?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						if(that.$store.state.organizationSeqFlag) {
							that.organizationSeqArray[2] = true;
							that.recommendColumnArray = [];
						}
						for(var i = 0; i < res.data.recommendItemList.length; i++) {
							that.recommendColumnArray.push(res.data.recommendItemList[i]);
						}
						if(res.data.recommendItemList.length < 3) {
							that.infiniteFlag = false;
						}
						that.changeData();
						that.setTime = 500;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getRecommendRegion() { //推荐专区（三个图片）
				var that = this;
				var params = {
					body: {},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = "/mms/servlet/getRecommendRegion?str=" + paramsStr;
				axios.post(httpURL).then(function(res) {
						that.recommendRegionListArray = res.data.recommendRegionList;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			infinite: function(done) {
				var that = this;
				if(!this.infiniteFlag) {
					setTimeout(function() {
						done(true);
					}, 10)
					return;
				}
				setTimeout(function() {
					that.recommendColumn(function() {
						done();
					})
				}, that.setTime);
			},
			homeTop: function() {
				var that = this;
				this.$refs.my_scroller.scrollBy(0, 0, true);
				this.$refs.my_scroller.finishInfinite(true);
				setTimeout(function() {
					that.$refs.my_scroller.scrollTo(0, 0, true);
				}, 50);
			},
			swiperFunc: function() {
				var that = this;
				this.mySwiper = new Swiper('.swiper-container', {
					pagination: {
						el: '.swiper-pagination'
					},
					paginationClickable: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					allowSlideNext: true,
					allowSlidePrev: true,
					loop: true,
					autoplayDisableOnInteraction: false,
					observer: true,
					observeParents: true
				});

				that.swiperActionFlag = true;

				this.mySwiper.on('click', function() {
					var length = that.sourceListBanner.length;
					if(this.activeIndex == 0) {
						var url = that.sourceListBanner[length - 1].url;
						that.bannerJumpUrl(url);
					} else if(that.activeIndex == length + 1) {
						var url = that.sourceListBanner[0].url;
						that.bannerJumpUrl(url);
					}
				});
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
			jumpUrl: function(index) {
				if(window.__wxjs_environment == 'miniprogram') {
					wx.miniProgram.navigateTo({
						url: '../product/product'
					});
				} else {
					//banner图跳转
					var url = this.sourceListBanner[index].url;
					this.bannerJumpUrl(url);
				}
			},
			classifyJump: function(index) {
				//分类列表跳转
				var url = this.classifyArray[index].androidParams.androidJumpUrl;
				this.bannerJumpUrl(url);
			},
			prefectureJump: function(index) {
				//营销活动跳转
				var url = this.recommendRegionListArray[index].jumpUrl;
				var recommendName = this.recommendRegionListArray[index].recommendName;
				this.bannerJumpUrl(url, recommendName);
			},
			bannerJumpUrl: function(url, recommendName) { //跳转分类	
				if(this.urlToRouter(url).toLowerCase() == 'productdetail') {
					var commodityId = this.paramrRouter(url, 'commodityId');
					//商品详情
					this.$router.push({
						name: 'productDetail',
						params: {
							commodityId: commodityId
						}
					});
				} else if(this.urlToRouter(url).toLowerCase() == 'servicelist') {
					//服务到家
					var activityId = this.paramrRouter(url, 'activityId');
					this.$router.push({
						name: 'serviceList',
						params: {
							activityId: activityId
						}
					});
				} else if(this.urlToRouter(url).toLowerCase() == 'yxactivity') {
					//营销活动
					var marketId = this.paramrRouter(url, 'marketId');
					if(recommendName == undefined) recommendName = '商品列表';
					var params = {
						marketId: marketId,
						recommendName: recommendName
					};
					this.$router.push({
						name: 'prefectureColumn',
						params: params
					});
				} else {
					window.location.href = url;
				}
			},
			bindAreaAjax() {
				var params = {
					body: {
						userAccount: this.$store.state.userAccount
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime(),
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.$store.state.tsmsHost + "/tsms/servlet/queryBindAddress?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					var list = res.body.list[0];
				}, function(res) {});
			},
			findCooperationCity() {
				var params = {
					body: {},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime(),
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.$store.state.cmsHost + "/cms/servlet/findCooperationCity?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					this.partnerCitys = res.body.citys;
				}, function(res) {});
			},
			GetURLParameter: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
			},
			isWchat: function() {
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == "micromessenger") {
					return true;
				} else {
					return false;
				}
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			urlToRouter: function(url) { // 获取路由
				var startNum = url.lastIndexOf('/') + 1;
				var endNum = url.lastIndexOf('htm') - 1 - startNum;
				return url.substr(startNum, endNum);
			},
			paramrRouter: function(url, name) { //路由参数
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = url.substr(url.lastIndexOf('?') + 1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
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
			changeData() {
				if(this.organizationSeqArray[0] && this.organizationSeqArray[1] && this.organizationSeqArray[2]) {
					this.$store.state.organizationSeqFlag = false;
					this.organizationSeqArray = [false, false, false];
				}
			},
			funcAjax(){
				this.timeStamp();
				this.AppPalyList();
				this.navigationList();
				this.getRecommendRegion();
				this.bindAreaAjax();
				this.findCooperationCity();
				this.$refs.my_scroller.resize();
			}
		},
		beforeRouteLeave(to, from, next) { //记录离开时的位置
			var homeTops = this.$refs.my_scroller.getPosition().top;
			this.homeTops = homeTops;
			next()
		},
		
		mounted: function() {
			var that = this;
			var setToken = this.tokenMd5();
			if(!this.$store.state.save) {
				if(this.$store.state.token == '' || this.$store.state.token == null) { //刚进入首页
					this.setDocumentTitle("联享家商城");
					this.$store.commit('settoken', setToken);
					this.accreditAjax();
				} else if(this.$store.state.token.indexOf('_') == 0) { //游客状态
					if(this.$store.state.unionid == '') {
						this.setDocumentTitle("联享家商城");
						this.accreditAjax();
					} else if(this.$store.state.unionid != '') {
						this.getTokenInfo(true);
						//this.getNewUrl();
					}
				} else if(this.$store.state.token.indexOf('_') == -1) { //联享家用户
					this.getTokenInfo();
				} else {
					this.setDocumentTitle("联享家商城");
					this.$store.commit('settoken', setToken);
					this.accreditAjax();
				}
				this.$store.commit('setsave', true);
			} else {
				this.activatedFlag = true;
				if(this.isCondition(this.GetURLParameter("code")) && sessionStorage.getItem('refreshWechatData') != 'false') {
					this.getWechatMessage();
				} else { //其它页面已经授权
					if(!this.isCondition(this.$store.state.token)) {
						this.$store.commit('settoken', setToken);
					}
				}
			}
			this.funcAjax();
		},
		activated() {
			var that = this;
			this.wechatLocationHomeShare();
			if(this.$store.state.save) {
				this.setDocumentTitle("联享家商城");
			}
			setTimeout(function() {
				that.$refs.my_scroller.scrollTo(0, that.homeTops, false);
			}, 150);

			if(this.$store.state.organizationSeqFlag) {
				console.log(this.$store.state.organizationSeq);
				if(that.swiperActionFlag){
					that.mySwiper.destroy(true, true);
					that.swiperActionFlag = false;
				}
				this.AppPalyList();
				this.navigationList();
				this.recommendColumnAgain();
			}
		}
	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	body {
		background: #f3f4f5;
	}
	
	.swiper-container {
		padding-top: 0.5rem;
		width: 100%;
		box-sizing: border-box;
	}
	
	.swiper-slide img {
		width: 100%;
		display: block;
	}
	
	.classify-container,
	.classify-pic {
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		background: #fff;
	}
	
	.classify-item {
		width: 20%;
		float: left;
		margin-top: 0.08rem;
	}
	
	.classify-item img {
		display: block;
		width: 0.46rem;
		height: 0.46rem;
		margin: 0 auto;
	}
	
	.classify-item-all img {
		height: 0.27rem;
		width: 0.27rem;
		padding-top: 0.09rem;
		margin-bottom: 0.07rem;
	}
	
	.classify-item span {
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: 0.12rem;
		line-height: 0.28rem;
		color: #333;
	}
	
	.classify-item-all span {
		margin-top: 0.03rem;
	}
	
	.classify-pic img {
		width: 100%;
		display: block;
		margin: 0.06rem 0 0;
	}
	
	.prefecture {
		overflow: hidden;
		box-sizing: border-box;
		margin-top: 0.12rem;
		background: #fff;
	}
	
	.prefecture-left,
	.prefecture-right {
		width: 50%;
		float: left;
		box-sizing: border-box;
	}
	
	.prefecture-left {
		border-right: 1px solid #eee;
		height: 2.45rem;
	}
	
	.prefecture-right>div {
		height: 1.22rem;
	}
	
	.prefecture-right>div:last-child {
		border-top: 1px solid #eee;
	}
	
	.prefecture-left img,
	.prefecture-right img {
		width: 100%;
	}
	
	.home-fixed-height {
		height: 0.54rem;
	}
	
	.home-top {
		position: fixed;
		bottom: 1.1rem;
		right: 0.14rem;
		z-index: 1000;
	}
	
	.home-top img {
		width: 0.52rem;
	}
</style>