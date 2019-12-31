<template>
	<div class="productDetail" v-title data-title="商品详情">
		<div class="productPhoto_box">
			<div class="productPhotopadding_box">
			</div>
			<div class="productPhotoContent_box">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in photo">
							<div class="photoItem" :style="{ backgroundImage: 'url('+item.photoUrl+')' }">
							</div>
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</div>
		</div>
		<!--<div class="discountsInfo" v-if="productInfoData!=null&&productInfoData.promotionInfo!='0'">
			<span>
				促销
			</span>
			<span v-text="productInfoData.promotionInfo">				
			</span>
		</div>-->
		<div class="productPrice_box" v-if="productInfoData!=null">
			<span class="productPrice">
						¥<span><span v-text="String(parseFloat(productInfoData.product[0].minPrice).toFixed(2)).split('.')[0]"></span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.product[0].minPrice).toFixed(2)).split('.')[1]"></span></span><span v-if="productInfoData.product[0].minPrice<productInfoData.product[0].maxPrice"> ~ <span><span v-text="String(parseFloat(productInfoData.product[0].maxPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.product[0].maxPrice).toFixed(2)).split('.')[1]"></span></span>
			</span>
			</span>

			<span class="productfufen" v-if="productInfoData.product[0].commodityFufen>0">
						赠{{productInfoData.product[0].commodityFufen}}福分
					</span>
			<span class="buypeople" v-text="productInfoData.product[0].buyPeople">				
			        </span>
		</div>
		<div class="productName" v-if="productInfoData!=null&&productInfoData.product[0].commodityName!=''" v-text="productInfoData.product[0].commodityName">
		</div>
		<!--新增优惠券-->
		<div class="couponBox" v-if="couponList.length>0">
			<div class="line_01">
			</div>
			<div class="couponMain" v-on:click="couponMoreState=!couponMoreState">
				<span>领券</span>
				<div class="couponListBox">
					<div class="couponItem" v-if="couponList.length>0">
						<span class="couponItembj1"></span>
						<span class="couponItembj2" v-if="couponList[0].type==1&&couponList[0].couponCondition==1">{{couponList[0].denomination}}元优惠券</span>
						<span class="couponItembj2" v-if="couponList[0].type==1&&couponList[0].couponCondition==2">满{{couponList[0].conditionMoney}}减{{couponList[0].denomination}}</span>
						<span class="couponItembj2" v-if="couponList[0].type==2&&couponList[0].couponCondition==1">{{couponList[0].denomination}}折扣券</span>
						<span class="couponItembj2" v-if="couponList[0].type==2&&couponList[0].couponCondition==2">满{{couponList[0].conditionMoney}}打{{couponList[0].denomination}}折券</span>
						<span class="couponItembj3"></span>
					</div>
					<div class="couponItem" v-if="couponList.length>1">
						<span class="couponItembj1"></span>
						<span class="couponItembj2" v-if="couponList[1].type==1&&couponList[1].couponCondition==1">{{couponList[1].denomination}}元优惠券</span>
						<span class="couponItembj2" v-if="couponList[1].type==1&&couponList[1].couponCondition==2">满{{couponList[1].conditionMoney}}减{{couponList[1].denomination}}</span>
						<span class="couponItembj2" v-if="couponList[1].type==2&&couponList[1].couponCondition==1">{{couponList[1].denomination}}折扣券</span>
						<span class="couponItembj2" v-if="couponList[1].type==2&&couponList[1].couponCondition==2">满{{couponList[1].conditionMoney}}打{{couponList[1].denomination}}折券</span>
						<span class="couponItembj3"></span>
					</div>
				</div>
				<img class="moreCoupon" src="../product/images/btn_ic_more@3x.png" />
			</div>
		</div>
		<div class="promotionInfoBox" v-if="productInfoData!=null&&productInfoData.privilegeArr!=null&&productInfoData.privilegeArr.length>0&&productInfoData.privilegeArr[0].type!=null">
			<div class="line_01">
			</div>
			<div class="promotionInfoMain">
				<span>促销</span>
				<div class="promotionInfoList">
					<div class="promotionInfoItem" v-for="(itempri,indexpri) in productInfoData.privilegeArr">
						<span v-if="itempri.type==1">满减</span><span v-if="itempri.type==2">包邮</span>
						<span>{{itempri.name}}</span>
					</div>
				</div>
			</div>
		</div>

		<!--<div class="freight_box productPrice_box" v-if="productInfoData!=null">
			<span class="freight" v-if="productInfoData.freight>0">
				运费：{{productInfoData.freight}}元
			</span>
			<span class="freight" v-if="productInfoData.freight==0">
				免邮
			</span>
			<span class="buypeople" v-text="productInfoData.product[0].buyPeople">				
			</span>
		</div>-->
		<div class="sellerInfo_box padding_bottom0" v-if="productInfoData!=null">
			<div class="sellerName_box">
				<img src="../../../static/images/sellerName_logo.png" />
				<span v-text="productInfoData.sellerName">					
				</span>
			</div>
			<div class="line_01">
			</div>
			<div class="thirdbaoInfo_box">
				<div class="thirdbaoItem" v-if="productInfoData.product[0].ppsq=='品牌授权'">
					<img src="../../../static/images/quality@3x.png" />
					<span>
						品牌授权
					</span>
				</div>
				<div class="thirdbaoItem" v-if="productInfoData.product[0].zpbz=='正品保证'">
					<img src="../../../static/images/quality@3x.png" />
					<span>
						正品保证
					</span>
				</div>
				<div class="thirdbaoItem" v-if="productInfoData.product[0].sevenDay=='7天退换货'">
					<img src="../../../static/images/quality@3x.png" />
					<span>
						7天退换货 
					</span>
				</div>
			</div>

		</div>
		<div class="evaluateInfo sellerInfo_box" v-if="commentData!=null&&productInfoData!=null&&commentData.commentCount>0">
			<div class="evaluateTotail">
				商品评价({{commentData.commentCount}})
			</div>
			<div class="line_01">
			</div>
			<div class="evaluateUserInfo">
				<div class="evaluateUser">
					<img v-bind:src="commentData.userImage?commentData.userImage:defalutPic" />
					<span v-text="commentData.userAddress"></span>
				</div>
				<div class="evaluateStarLevel">
					<img src="../../../static/images/ic_big-start_pre@3x.png" v-for="list in commentData.starLevel>0?commentData.starLevel:5" />
					<img src="../../../static/images/ic_big-star_nor@3x.png" v-for="list in commentData.starLevel>0?5-commentData.starLevel:0" />
				</div>
			</div>
			<div class="evaluateTime">
				{{commentData.commentTime}}&nbsp;{{commentData.commoditySku}}
			</div>
			<div class="evaluateContent">
				<div class="evaluateText">
					<pre v-html="commentData.commentContent"></pre>
				</div>
				<div class="evaluateImg">
					<div class="evaluateImgItem" v-if="commentData.commentImages.length>0&&item.imgUrl!=''" v-for="(item,indexc) in commentData.commentImages">
						<div class="commentImage" v-on:click="commentImgpreview(item.imgUrl)" :style="{ backgroundImage: 'url('+item.thumbImgUrl+')' }">
							<!--:style="{ backgroundImage: 'url('+item.photoUrl+')' }"-->
						</div>
					</div>
				</div>
			</div>
			<div class="replyContent_box" v-if="commentData.reply==2">
				<div class="replyContentlogo">
					<img src="../../../static/images/sanjiao_03.png" />
				</div>
				<div class="replyContent">
					<div class="replyContentText">
						<pre>卖家回复：{{commentData.replyContent}}</pre>
					</div>
					<div class="replyContentImg">
						<div class="evaluateImgItem" v-if="commentData.replyImages.length>0&&item.imgUrl!=''" v-for="(item,indexreply) in commentData.replyImages">
							<div class="commentImage" v-on:click="commentImgpreview(item.imgUrl)" :style="{ backgroundImage: 'url('+item.thumbImgUrl+')' }">
								<!--:style="{ backgroundImage: 'url('+item.photoUrl+')' }"-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="evaluateButton" v-if="commentData.commentCount>1">
				<span v-on:click="goEvaluate()">
					查看全部评价
				</span>
			</div>
		</div>
		<div class="detailContent" v-if="isShowdetail(productInfoData)">
			<div class="detailContentTitle_box">
				<div class="detailContentTitle">
					商品详情
				</div>
				<div class="line_01">
				</div>
				<div class="productCommodity" v-if="productInfoData.hasParams=='Yes'||productInfoData.hasParam2=='Yes'">
					<div class="productCommodityItem" v-if="productInfoData.hasParams=='Yes'&&productInfoData.productCommodity[0].productPlace!='0'">
						<span>
							产地
						</span>
						<span v-text="productInfoData.productCommodity[0].productPlace">
						</span>
					</div>
					<div class="productCommodityItem" v-if="productInfoData.hasParams=='Yes'&&productInfoData.productCommodity[0].productWeight!='0'">
						<span>
							净重
						</span>
						<span v-text="productInfoData.productCommodity[0].productWeight">						
						</span>
					</div>
					<div class="productCommodityItem" v-if="productInfoData.hasParam2=='Yes'" v-for="(item,index2) in productInfoData.productCommodity[1].customParamsList" :key="index2">
						<span v-text="item.customParamsName">
						</span>
						<span v-text="item.customParamsValue">
						</span>
					</div>
				</div>
			</div>
			<div class="detailContentMain" id="detailContentMain" v-if="productInfoData.productDetail!='000x000'" v-html="productInfoData.productDetail">
			</div>
		</div>
		<div class="recommendProduct" v-if="productInfoData!=null&&productInfoData.product[0].recommendPhoto.length>0">
			<div class="recommendProductTitle">
				推荐商品
			</div>
			<div class="recommendProductList">
				<div class="recommendProductItem_box" v-for="(item,index) in productInfoData.product[0].recommendPhoto">
					<div class="recommendProductItem" v-on:click="goOtherproduct(item.photoLink)">
						<div class="recommendProductphoto" :style="{ backgroundImage: 'url('+item.photoUrl+')' }">
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="kongBottom">
		</div>
		<div class="footerButton">
			<div class="line_01">
			</div>
			<div class="footerButtonMain">
				<div class="favoriteImg">
					<div class="favoriteImg_box">
						<img class="favoriteNo" v-on:click="addUserComOrSellerLove(1)" v-show="favorite==0" src="../../../static/images/ic_-collection-@3x.png" />
						<img class="favoriteYes" v-on:click="addUserComOrSellerLove(0)" v-show="favorite==1" src="../../../static/images/ic_-collectioned@3x.png" />
					</div>
				</div>
				<div class="shoppingcartNum">
					<div class="shoppingcartNum_box" v-on:click="goshoppingcar()">
						<img src="../../../static/images/btn_ic-_shopping-cart@3x.png" />
						<span id="shoppingcartNum" v-text="shoppingcartCount" v-show="shoppingcartCount!=0"></span>
					</div>
				</div>
				<div class="joinShoppingcart" v-on:click="selectSku(1)">
					<span>
						加入购物车
					</span>
				</div>
				<div class="goSaveOrder" v-on:click="selectSku(2)">
					<span>
						立即购买
					</span>
				</div>
			</div>
		</div>
		<!--优惠券领取-->
		<div class="bgTangcan" v-show="couponMoreState">
			<div id="couponInfoI" class="couponInfoBox" v-show="couponMoreState2">
				<div class="couponInfoBoxTitle">
					<div class="couponInfoBoxTitleBox">
						<span>优惠券</span>
						<img v-on:click="aminateFun()" src="../product/images/btn_ic_close@3x.png" />
					</div>
				</div>
				<div class="couponInfoBoxMain" v-if="couponList.length>0">
					<div class="couponInfoItem" v-for="(itemc,indexc) in couponList">
						<div class="couponInfo">
							<div class="couponInfo1">
								<div class="couponInfo1bj">
									<div class="couponInfoP">
										<span class="couponInfoPB"><span class="smallF" v-if="itemc.type==1">¥</span><span class="bigF">{{itemc.denomination}}</span><span class="smallF" v-if="itemc.type==2">折</span></span>
									</div>
									<div class="couponInfoR">
										{{itemc.couponCondition==1?'无门槛使用':('满'+itemc.conditionMoney+'元可用')}}
									</div>
								</div>
								<div class="couponInfoType">
									<div class="couponInfoType1">
										<span v-if="itemc.type==1&&itemc.couponCondition==2" class="quanLogo">满减券</span><span v-if="itemc.type==2" class="quanLogo">折扣券</span><span>{{itemc.scope==1?'适用于全部商品':'适用于部分商品'}}</span>
									</div>
									<div class="couponInfoTime">
										<span>{{itemc.effectiveStart}}-{{itemc.effectiveEnd}}</span><span class="couponUsebt" v-if="itemc.useState==1&&itemc.receiveState==0">已使用</span><span class="couponUsebt" v-if="itemc.useState==0&&itemc.receiveState==0" v-on:click="goUseCoupon(itemc.couponId)">立即使用</span><span v-if="itemc.receiveState==1" class="couponGetbt" v-on:click="getCoupon(itemc.couponId)">点击领取</span>
									</div>
								</div>
							</div>
							<div class="couponInfoRuleBox">
								<div class="couponInfoRuleBoxbj">
									<div></div>
									<div></div>
								</div>
								<div class="couponInfoRule">
									<div>
										{{itemc.useMsg}}
									</div>
									<img v-if="itemc.useMsg.length>=20" dataState='1' dataStateC='1' v-on:click="ruleShowAnimate($event)" src="../product/images/ic_put-up@3x.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="bgTangcan" v-show="skuShowstate>0">
			<div class="bugInfo_box">
				<div class="bugInfo" v-if="productInfoData!=null">
					<div class="closeLogo" v-on:click="closeSelecSku()">
						<img src="../../../static/images/btn_ic_close@3x.png" />
					</div>
					<div class="bugprizeInfo" v-show="!inputFocusState">
						¥<span v-if="selectPrice!=null"><span v-text="String(parseFloat(selectPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(selectPrice).toFixed(2)).split('.')[1]">00</span></span><span v-if="selectPrice==null"><span v-text="String(parseFloat(productInfoData.product[0].minPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.product[0].minPrice).toFixed(2)).split('.')[1]">00</span></span><span v-if="productInfoData.product[0].minPrice<productInfoData.product[0].maxPrice&&selectPrice==null"> ~ ¥<span><span v-text="String(parseFloat(productInfoData.product[0].maxPrice).toFixed(2)).split('.')[0]"></span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.product[0].maxPrice).toFixed(2)).split('.')[1]">00</span></span>
						</span>
					</div>
					<div class="hadChaooseSkuInfo" v-show="inputFocusState" v-text="skuSelectTip">
					</div>
					<div class="line_01box" v-show="!inputFocusState">
						<div class="line_01">
						</div>
					</div>
					<div class="commoditySku_box" v-show="!inputFocusState">
						<div class="commoditySkuItems" v-if="commoditySku.length>0" v-for="(items,index3) in commoditySku">
							<div class="skuName" v-text="items.skuName">
							</div>
							<div class="skuParamName">
								<span class="paramNameN" v-bind:class="{paramNameY:skuSelectList[index3]==item.paramId,paramNameF:skuisSelect[index3][index4]}" v-on:click="selectTagFun(index3,index4,item,items,skuisSelect[index3][index4])" v-for="(item,index4) in items.skuValues" v-text="item.paramName">
								</span>
								<!--<span class="paramNameF">
									立即购买立
								</span>
								<span class="paramNameN">
									立即购买立
								</span>-->
							</div>
						</div>
					</div>
					<div class="line_01box">
						<div class="line_01">
						</div>
					</div>
					<div class="bugNumber_box">
						<div class="bugNumberText">
							数量
						</div>
						<div class="reducebt" v-bind:class="{reducefall:bugNumber<=1}" v-on:click="reducebugNumber()">
						</div>
						<input type="tel" v-model="bugNumber" v-on:blur="blurInput()" v-on:focus="focusInput()" name="bugNumber" id="bugNumber" value="1" />
						<div class="addbt" v-bind:class="{addbfall:bugNumber>=maxstockQuantity}" v-on:click="addbugNumber()">
						</div>
					</div>
					<div class="bugAffirm" v-on:click="goConfirmOrder()">
						<span>
							确定
						</span>
					</div>
				</div>
			</div>
		</div>
		<!--绑定流程-->
		<div class="user-pop-bind" v-if="userBind" @click="colseBind()">
			<div class="user-pop-msg" @click.stop="colseBindOff()">
				<img class="user-pop-cancel" @click="userBindCancel()" src="../personal/images/btn_ic_cancle@3x.png">
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
				<div class="user-pop-tip">该联享家账号已与其他微信绑定，请解绑后重新绑定</div>
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
<script type="text/javascript">
	//import Swiper from 'swiper';
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	//import 'swiper/dist/css/swiper.min.css'
	import VueResource from 'vue-resource'
	import defalutPic from '../../../static/images/ic_default_avatar.png'
	import imgup1 from '../product/images/btn_ic_put-up.png'
	import imgdown1 from '../product/images/ic_put-up@3x.png'
	Vue.use(VueResource)
	export default {
		name: 'productDetail',
		data() {
			return {
				defalutPic: defalutPic,
				codeShow: false, //图形验证码控制
				timeNum: 60, //验证时长控制
				sendCodeShowFlag: true, //验证时长显示控制
				token: this.$store.state.token,
				code: this.$store.state.code, //用户属性
				commodityId: this.$route.params.commodityId, //商品id
				organizationSeq: this.$store.state.organizationSeq,
				mmsHost: this.$store.state.mmsHost,
				uumsHost: this.$store.state.uumsHost,
				isVisitor: false, //游客判断
				photo: [], //商品轮播图
				favorite: 0, //商品收藏
				shoppingcartCount: 0, //购物车数量
				shoppingCartInfo: [], //购物车信息
				productInfoData: null, //商品信息
				commentData: null, //评论信息
				mySwiperp: null, //主图轮播组件控制
				skuShowstate: 0,
				inputFocusState: false,
				skuSelectList: [],
				skuSelectDetailList: [],
				skuSelectTip: [],
				commoditySku: [],
				skuList: [],
				selectPrice: null,
				bugNumber: 1,
				clickState: false,
				minstockQuantity: 1,
				maxstockQuantity: 100,
				totalStockQuantity: 0,
				skuisSelect: [],
				wxpreviewImage1: [],
				wxpreviewImage2: [],
				wxpreviewImage3: [],
				userBind: false,
				isBind: false,
				codeShow: false,
				sureSendMessageFlag: true,
				userMobile: '',
				messegeCode: '',
				picCode: '',
				picRandomUrl: '',
				couponMoreState: false,
				couponMoreState2: false,
				bugInfoAminateS: false,
				couponList: [],
			}
		},
		methods: {
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
			colseBind() {
				this.userBind = false;
			},
			colseBindOff() {},
			userBindCancel() {
				this.userBind = false;
			},
			sendCode() {
				var mobileRex = /^[1][3,4,5,7,8][0-9]{9}/;
				if(this.userMobile == '' || !mobileRex.test(this.userMobile)) {
					lxjTip.msg("请输入正确的手机号码");
				} else {
					this.picCode = '';
					this.picCodeAjax();
					this.userBind = false;
					this.codeShow = true;
				}
			},
			sureBind() {
				this.loginBindMobileAjax();
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
				var httpURL = this.uumsHost + "/uums/wxGzh/wxGzhLoginBindMobile?str=" + paramsStr;
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
							this.isVisitor = false;
							this.code = 0;
							this.$store.commit('setcode', res.body.code);
							this.$store.commit('settoken', res.body.token);
							this.token = res.body.token;
							this.$store.commit('setuserAccount', res.body.userAccount);
							this.$store.commit('setlxjAccount', res.body.lxjAccount);
							this.getbasicData();
						} else if(res.body.code == 1) {
							lxjTip.msg("短信验证码错误 ");
						} else if(res.body.code == 2) {
							lxjTip.msg('该手机号已经绑定过微信');
							this.isBind = true;
							this.userBind = false;
						} else if(res.body.code == 3) {
							//用户已经再其它地方绑定账号，重新登录更新信息
							this.gologinFun();
						}
					}

				}, function(res) {});
			},
			IsBindSure() {
				this.isBind = false;
			},
			imgCode() {
				this.picCodeAjax();
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
				var httpURL = this.uumsHost + "/uums/servlet/getPicRandomServlet?str=" + paramsStr;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(res.body.result == 0) {
						this.picCode = '';
						this.picRandomUrl = res.body.picRandomUrl;
					}
				}, function(res) {});
			},
			cancelCode() {
				this.userBind = true;
				this.codeShow = false;
			},
			sureSend() {
				this.messegeCodeAjax();
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
				var httpURL = this.uumsHost + "/uums/servlet/getRandomCodeForWxBind?str=" + paramsStr;
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
			getCommodityDetail: function(shoppingCartInforefresh) {
				var that = this;
				let params = {
					body: {
						areaOrgSeq: this.organizationSeq,
						commodityId: this.commodityId,
						shoppingCartType: '1',
						giftbagId: ''
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.mmsHost + "/mms/servlet/getCommodityDetail?str=" + paramsStr;
				/*this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				})*/
				axios.post(this.mmsHost + "/mms/servlet/getCommodityDetail", params).then(function(res) {
					if(res.data.result == '003' || res.data.result == '002') {
						that.gologinFun();
					}
					if(shoppingCartInforefresh) {
						that.shoppingCartInfo = res.data.shoppingCartInfo;
					} else {
						that.photo = res.data.product[0].photo;
						that.getpreviewImage1(res.data.product[0].photo);
						that.productInfoData = res.data;
						that.shoppingCartInfo = res.data.shoppingCartInfo;
						that.commoditySku = res.data.commoditySku;
						that.skuList = res.data.skuList;
						that.skuSelectList = new Array(res.data.commoditySku.length);
						that.skuSelectDetailList = new Array(res.data.commoditySku.length);
						that.favorite = res.data.favorite ? res.data.favorite : 0;
						that.getskuisSelect(res.data.commoditySku);
						if(that.photo.length > 1) {
							setTimeout(() => {
								that.swiperFunc({
									el: '.swiper-pagination'
								}, {
									delay: 3000,
									stopOnLastSlide: false,
									disableOnInteraction: false,
								}, true, true);
							}, 50);
						} else {
							setTimeout(() => {
								that.swiperFunc(false, false, false, false);
							}, 100);
						}

						//var linkurl1 = window.location.href;
						//var linkurl1="http:tt.hori-gz.com/mms/html5/wechatH5/dist/index.htm#/productDetail/1524625058828a3347f800d045549bf6";
						/*wx.onMenuShareTimeline({
							title: '商品详情', // 分享标题
							link: linkurl1,
							imgUrl: that.photo[0].photoUrl, // 分享图标
							success: function() {}
						});
						wx.onMenuShareAppMessage({
							title: '商品详情', // 分享标题
							desc: res.data.product[0].commodityName, // 分享描述
							link: linkurl1,
							imgUrl: that.photo[0].photoUrl, // 分享图标
							success: function() {
								lxjTip.msg(linkurl1)
							}
						});*/

						/*that.wxJsdkConfig(['previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage'], function(it) {
							var fxurl = window.location.protocol + window.location.host + window.location.pathname + window.location.hash;
							lxjTip.msg(fxurl, {
								time: 10000
							})
							"window.location.hash"
							wx.onMenuShareTimeline({
								title: '商品详情',
								link: "http:tt.hori-gz.com/mms/html5/wechatH5/dist/index.htm",
								imgUrl: that.photo[0].photoUrl,
								success: function() {}
							});
							wx.onMenuShareAppMessage({
								title: '商品详情', // 分享标题
								desc: res.data.product[0].commodityName,
								link: "http:tt.hori-gz.com/mms/html5/wechatH5/dist/index.htm",
								imgUrl: that.photo[0].photoUrl,
								type: "link",
								success: function() {
									lxjTip.msg(9999)
								}
							});

						}, ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:copyUrl"])*/
						var shareLink = that.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/productDetail/" + that.commodityId;
						var obj = {
							title: "商品详情", //标题
							desc: res.data.product[0].commodityName, //描述
							//link: window.location.href,
							link: shareLink,
							imgUrl: that.photo[0].photoUrl
						};
						that.wxJsFun(obj);

					}

				}, function(res) {})
			},

			getCouponData: function() {
				var that = this;
				var params = {
					body: {
						commodityId: this.commodityId
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getCommodityCoupons", params).then(function(res) {
					console.log(res);
					that.couponList = res.data.list ? res.data.list : [];
				}, function(res) {})

			},
			getCoupon: function(couponId) {
				window.event.cancelBubble = true;
				if(this.isVisitor) {
					if(this.code != 2) {
						//未授权的游客
						this.gologinFun();
						return false;
					} else {
						this.userBind = true;
						this.aminateFun();
						//未绑定的游客						
					}
					return false;
				}
				var that = this;
				var params = {
					body: {
						couponId: couponId
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/receiveCoupon", params).then(function(res) {
					console.log(res);
					if(res.data.result == "0") {
						lxjTip.msg("领取成功！");
						setTimeout(function() {
							that.getCouponData()
						}, 10)
					} else {
						lxjTip.msg("领取失败！")
						setTimeout(function() {
							that.getCouponData()
						}, 10)
					}
				}, function(res) {
					lxjTip.msg("领取失败！")
				})
			},
			wxJsFun: function(obj) {
				var that = this;
				/*	let jsApiListo = ["hideAllNonBaseMenuItem", 'showMenuItems'];
					jsApiListo = jsApiListo.concat(list);*/
				var params = {
					body: {
						surl: window.location.href.split('#')[0],
						signatureUrl: window.location.href,
					}
				};
				var paramsStr = encodeURIComponent(JSON.stringify(params));
				var httpURL = this.uumsHost + "/uums/wxGzh/wxGzhAuth?str=" + paramsStr;
				that.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(res.data.result == 0) {
						that.appId = res.data.appid;
						wx.config({
							debug: false,
							appId: res.data.appid,
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.signature,
							jsApiList: ["hideAllNonBaseMenuItem", "showMenuItems", "onMenuShareTimeline", "onMenuShareAppMessage", "previewImage"]
						});
						wx.ready(function() {
							//callback ? callback(res.data.appid) : '';
							wx.hideAllNonBaseMenuItem();
							wx.showMenuItems({
								menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
							});
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
						});
					}
				}, function(res) {});
			},
			getCommodityComments: function() {
				var that = this;
				let params = {
					body: {
						areaOrgSeq: this.organizationSeq,
						commodityId: this.commodityId,
						type: '1',
						pageSize: '',
						pageNum: ''
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getCommodityComments", params).then(function(res) {
					console.log(res);
					that.commentData = res.data;
					var commentImages = res.data.commentImages ? res.data.commentImages : [];
					var replyImages = res.data.replyImages ? res.data.replyImages : [];
					that.getpreviewImage2(commentImages, replyImages)
				}, function(res) {})

			},
			getShoppingcartCount: function() {
				var that = this;
				let params = {
					body: {
						areaOrgSeq: this.organizationSeq,
						type: 1
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getShoppingcartCountServlet", params).then(function(res) {
					/*if(res.data.result=='003'||res.data.result=='002'){
						that.gologinFun();
					}*/
					that.shoppingcartCount = res.data.totalCount < 100 ? res.data.totalCount : '…';
				}, function(res) {})
			},
			addShoppingcart: function() {
				var that = this;
				let params = {
					body: {
						commodityId: this.commodityId,
						areaOrgSeq: this.organizationSeq,
						count: this.bugNumber,
						commoditySkuAttrIds: this.skuSelectList,
						commodityDetails: this.skuSelectDetailList.join("; "),
						type: 1
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/addShoppingcart", params).then(function(res) {
					//that.shoppingcartCount=res.data.totalCount<100?res.data.totalCount:'…';                  
					if(res.data.result == "0") {
						that.skuShowstate = 0;
						lxjTip.msg("加入购物车成功");
						that.getShoppingcartCount();
						that.getCommodityDetail(true);
						that.skuSelectList = new Array(that.productInfoData.commoditySku.length);
						that.skuSelectDetailList = new Array(that.productInfoData.commoditySku.length);
					} else {
						lxjTip.msg("加入购物车失败");
					}
				}, function(res) {})
			},
			addUserComOrSellerLove: function(i) {
				//游客状态先走授权绑定流程
				if(this.isVisitor) {
					if(this.code != 2) {
						//未授权的游客
						this.gologinFun();
						return false;
					} else {
						this.userBind = true;
						//未绑定的游客						
					}
					return false;
				}
				if(this.clickState) {
					return false;
				}
				var that = this;
				let params = {
					body: {
						commodityType: 1,
						type: 1,
						commodityId: this.commodityId,
						price: this.productInfoData.product[0].minPrice,
						sellerId: this.productInfoData.sellerId
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				this.clickState = true;
				axios.post(this.mmsHost + "/mms/servlet/addUserComOrSellerLove", params).then(function(res) {
					that.clickState = false;
					if(res.data.result == "0") {
						if(i == 1) {
							that.favorite = 1;
							lxjTip.msg("收藏成功");
						} else {
							that.favorite = 0;
							lxjTip.msg("取消收藏成功");
						}
					} else {
						if(i == 1) {
							lxjTip.msg("收藏失败");
						} else {
							lxjTip.msg("取消收藏失败");
						}
					}
				}, function(res) {
					that.clickState = false;
				})

			},
			swiperFunc: function(pagination, autoplay, allowSlideNext, allowSlidePrev) {
				var that = this;
				this.mySwiperp = new Swiper('.swiper-container', {
					pagination: pagination,
					paginationClickable: true,
					autoplay: autoplay,
					allowSlideNext: allowSlideNext,
					allowSlidePrev: allowSlidePrev,
					loop: true,
					autoplayDisableOnInteraction: false,
					observer: true,
					observeParents: false
				});
				this.mySwiperp.on('click', function() {
					var length = that.photo.length;
					var ai = 0;
					if(this.activeIndex == 0) {
						ai = length - 1;
					} else if(this.activeIndex > length) {
						ai = 0;
					} else {
						ai = this.activeIndex - 1;
					}
					wx.previewImage({
						current: that.wxpreviewImage1[ai],
						urls: that.wxpreviewImage1
					});
				});
				this.getpreviewImage3();
			},
			getpreviewImage1: function(list) {
				for(var i = 0; i < list.length; i++) {
					if(this.wxpreviewImage1.join(',').indexOf(list[i].photoUrl) < 0) {
						this.wxpreviewImage1.push(list[i].photoUrl);
					}
				}
			},
			getpreviewImage2: function(list1, list2) {
				console.log(list1)
				for(var i = 0; i < list1.length; i++) {
					if(this.wxpreviewImage2.join(',').indexOf(list1[i].imgUrl) < 0 && list1[i].imgUrl != '') {
						this.wxpreviewImage2.push(list1[i].imgUrl);
					}
				}
				for(var j = 0; j < list2.length; j++) {
					if(this.wxpreviewImage2.join(',').indexOf(list2[j].imgUrl) < 0 && list2[j].imgUrl != '') {
						this.wxpreviewImage2.push(list2[j].imgUrl);
					}
				}
			},
			getpreviewImage3: function() {
				var that = this;
				var ele = document.getElementById("detailContentMain") ? document.getElementById("detailContentMain") : 'aaa';
				if(ele == 'aaa') {
					return false;
				}
				var imgList = ele.getElementsByTagName("img");
				for(var i = 0; i < imgList.length; i++) {
					let imgSrc = imgList[i].src;
					this.wxpreviewImage3.push(imgSrc);
					(function(i) {
						imgList[i].addEventListener('click', function() {
							wx.previewImage({
								current: that.wxpreviewImage3[i],
								urls: that.wxpreviewImage3
							});
						});
					})(i);
				}
			},
			commentImgpreview: function(current) {
				wx.previewImage({
					current: current,
					urls: this.wxpreviewImage2
				});
			},
			selectSku: function(i) {
				//游客状态先走授权绑定流程
				if(this.isVisitor) {
					if(this.code != 2) {
						//未授权的游客
						this.gologinFun();
						return false;
					} else {
						this.userBind = true;
						//未绑定的游客						
					}
					return false;
				}
				this.skuShowstate = i;
			},
			selectTagFun: function(i, j, item, items, state) { //点击规格
				if(state) {
					return false;
				}
				//console.log(i+"  "+item)			
				//this.skuSelectList[i]=item.paramId;
				if(this.skuSelectList[i] == item.paramId) {
					this.$set(this.skuSelectList, i, "");
					this.$set(this.skuSelectDetailList, i, "");
				} else {
					this.$set(this.skuSelectList, i, item.paramId);
					this.$set(this.skuSelectDetailList, i, items.skuName + ":" + item.paramName);
				}
				this.getskushowStatue();
			},
			goConfirmOrder: function() {
				if(this.selectPrice == null) {
					lxjTip.msg(this.skuSelectTip);
					return false;
				}
				if(this.bugNumber == '') {
					lxjTip.msg("亲，请添加购买数量");
					return false;
				}
				if(this.bugNumber > 100) {
					lxjTip.msg("亲，商品购买数量已达上限了");
					return false;
				}
				if(this.bugNumber > this.totalStockQuantity) {
					lxjTip.msg("亲，老板没那么多存货呢");
					return false;
				}
				if(this.skuShowstate == 2) {
					sessionStorage.removeItem("shoppingCartCount");
					sessionStorage.removeItem("hadChooseReceiverId");
					sessionStorage.removeItem("couponId");
					this.$router.push({
						path: '/confirmOrder/',
						name: 'confirmOrder',
						params: {
							bugType: 2,
							commodityCounts: this.bugNumber,
							commoditySkuAttrIds: this.skuSelectList,
							commodityId: this.commodityId,
						}
					})
				} else {
					if(this.totalStockQuantity >= 100) {
						if(this.maxstockQuantity <= 0) {
							//单件商品数量已满100件
							lxjTip.msg("亲，购物车购买数量已达上限了");
							return false;
						}
					} else {
						if(this.maxstockQuantity <= 0) {
							lxjTip.msg("亲，老板没那么多存货呢");
							return false;
						}
					}
					this.addShoppingcart();
				}

			},
			goEvaluate: function() {
				//游客模式禁止进入全部评论

				if(this.isVisitor) {
					if(this.code != 2) {
						//未授权的游客
						this.gologinFun();
						return false;
					} else {
						this.userBind = true;
						//未绑定的游客						
					}
					return false;
				}

				this.$router.push({
					path: '/evaluate/',
					name: 'evaluate',
					params: {
						commodityId: this.commodityId,
					}
				})

			},
			closeSelecSku: function() {
				this.skuShowstate = 0;
			},
			focusInput: function() {
				this.inputFocusState = true;
			},
			blurInput: function() {
				this.inputFocusState = false;
				this.inputOnblur()
				if(this.bugNumber == '') {
					this.bugNumber = 1;
				}
				if(isNaN(this.bugNumber)) {
					this.bugNumber = 1;
				}
				if(this.bugNumber <= 0) {
					this.bugNumber = 1;
				}
				if(this.bugNumber > 100) {
					this.bugNumber = 100;
				}
				if(this.bugNumber > this.maxstockQuantity) {
					this.bugNumber = this.maxstockQuantity;
				}
				if(this.totalStockQuantity >= 100) {
					if(this.maxstockQuantity <= 0) {
						//单件商品数量已满100件
						lxjTip.msg("亲，购物车购买数量已达上限了");
						return false;
					}
				} else {
					if(this.maxstockQuantity <= 0) {
						lxjTip.msg("亲，老板没那么多存货呢");
						return false;
					}
				}
			},
			getskuisSelect: function(list) {
				let lista = new Array();
				for(var i = 0; i < list.length; i++) {
					let listab = new Array();
					for(var j = 0; j < list[i].skuValues.length; j++) {
						listab[j] = false;
					}
					lista[i] = listab;
				}
				this.skuisSelect = lista;
			},
			isConditionList: function(list) {
				for(var i = 0; i < list.length; i++) {
					if(list[i] == null || list[i] == "" || list[i] == undefined) {
						return true;
					}
				}
				return false;
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			}, //获取选择文案提示
			getmissSelectText: function(list1, list2) {
				var a = '';
				for(var i = 0; i < list1.length; i++) {
					if(list1[i] == null || list1[i] == "" || list1[i] == undefined) {
						a = a + list2[i].skuName + " ";
					}
				}
				return a;
			}, //获取选择规格的价格
			getSelectPrice: function(list1, list2) {
				for(var i = 0; i < list2.length; i++) {
					if(list2[i].skuId == list1.join(',')) {
						return list2[i];
					}
				}
			},
			getNewlist: function(list, key) {
				var newList = new Array();
				var oldList = [];
				oldList = list;
				for(var i = 0; i < oldList.length; i++) {
					if(oldList[i].skuId.indexOf(key) >= 0) {
						newList.push(oldList[i])
					}
				}
				return newList;
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
			getTagBox: function() {
				var tagBoxList = new Array();
				var tagBox = this.commoditySku;
				for(var i = 0; i < this.skuSelectList.length; i++) {
					if(!this.isCondition(this.skuSelectList[i])) {
						let aa = {
							index: i,
							list: this.commoditySku[i]
						}
						tagBoxList.push(aa);
					}
				}
				return tagBoxList;
			},
			getshowStatue0: function(list) {
				var newList = new Array();
				for(var i = 0; i < list.length; i++) {
					if(list[i].showStatue == '0') {
						newList.push(list[i]);
					}
				}
				return newList;
			},
			changeSkustate: function(list) {
				for(var i = 0; i < list.length; i++) {
					var bb = this.skuisSelect[list[i].index];
					for(var j = 0; j < this.skuisSelect[list[i].index].length; j++) {
						//this.skuisSelect[list[i].index][j]=false;
						this.$set(this.skuisSelect[list[i].index], j, true);
					}
				}
			},
			changeOneSkuliststate: function(list, skuBoxlist1) {
				for(var i = 0; i < list.length; i++) {
					if(list[i].showStatue == '0') {
						var items = skuBoxlist1[0].list.skuValues;
						for(var j = 0; j < items.length; j++) {
							if(list[i].skuId.indexOf(items[j].paramId) >= 0) {
								this.$set(this.skuisSelect[skuBoxlist1[0].index], j, true);
								break;
							}
						}
					}
				}
			},
			changeNoneSkuliststate: function(idlist, nonelist) {
				for(var i = 0; i < this.commoditySku.length; i++) {
					var newlist1 = new Array();
					for(var j = 0; j < this.commoditySku[i].skuValues.length; j++) {
						if(idlist[i] != this.commoditySku[i].skuValues[j].paramId) {
							var dd = {
								indexm: j,
								id: this.commoditySku[i].skuValues[j].paramId
							}
							newlist1.push(dd)
						}
					}
					if(newlist1.length > 0) {
						this.isChange(newlist1, idlist, nonelist, i)
					}
				}

			},
			isChange: function(list1, list2, list3, index) {
				for(var i = 0; i < list1.length; i++) {
					var newlist1 = new Array();
					newlist1 = list2.slice(0);
					newlist1[index] = list1[i].id;
					var skuIda = newlist1.join(",");
					for(var j = 0; j < list3.length; j++) {
						if(list3[j].skuId == skuIda) {
							this.$set(this.skuisSelect[index], list1[i].indexm, true);
							break;
						}
					}
				}
			},
			getskushowStatue: function() {
				var skuIdArridlist = this.skuSelectList;
				//	var skuIdNoneidlist = new Array();//没有选中状态的规格
				var skuCommodityList = new Array();
				var skuListO = this.skuList;
				var showStatue = 0;
				//skuListO = this.skuList;
				for(var i = 0; i < skuIdArridlist.length; i++) {
					if(this.isCondition(skuIdArridlist[i])) {
						skuListO = this.getNewlist(skuListO, skuIdArridlist[i])
					}
				}
				for(var i = 0; i < skuListO.length; i++) {
					if(skuListO[i].showStatue == '1') {
						showStatue = 1;
						break;
					}
				}
				var skuBoxlist = this.getTagBox();
				console.log(skuBoxlist)
				if(!this.isConditionList(this.skuSelectList)) {
					this.getskuisSelect(this.commoditySku);
					var showNonelist = this.getshowStatue0(this.skuList); //不可选择的规格组合数组
					this.changeNoneSkuliststate(skuIdArridlist, showNonelist);
				} else {
					this.getskuisSelect(this.commoditySku);
					console.log(this.skuisSelect);
				}
				if(showStatue == '0') {
					this.changeSkustate(skuBoxlist);
				} else {
					if(skuBoxlist.length == '1') {
						this.changeOneSkuliststate(skuListO, skuBoxlist);
					}
				}
			},
			getshoppingcarCount: function(key) {
				for(var i = 0; i < this.shoppingCartInfo.length; i++) {
					if(this.shoppingCartInfo[i].skuId == key) {
						return this.shoppingCartInfo[i].count;
					}
				}
			},
			reducebugNumber: function() {
				if(this.bugNumber <= 1) {
					this.bugNumber = 1;
				} else {
					this.bugNumber = this.bugNumber - 1;
				}
			},
			addbugNumber: function() {
				if(this.maxstockQuantity > 0) {
					if(this.bugNumber < this.maxstockQuantity) {
						this.bugNumber++;
					} else {
						this.bugNumber = this.maxstockQuantity;
					}
				} else {
					this.bugNumber == 1;
				}
			},
			isShowdetail: function(d) {
				if(d == null) {
					return false;
				} else if(d.productDetail != '000x000' || d.hasParams != 'No' || d.hasParam2 != 'No') {
					return true;
				} else {
					return false;
				}
			},
			GetURLParameter: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;

			},
			goshoppingcar: function() {
				//游客状态无法查看购物车
				if(this.isVisitor) {
					if(this.code != 2) {
						//未授权的游客
						this.gologinFun();
						return false;
					} else {
						this.userBind = true;
						//未绑定的游客						
					}
					return false;
				}
				this.$router.push({
					path: '/shoppingcart',
					params: {}
				})
			},
			gologinFun: function() {
				var that = this;
				var params = {
					body: {
						surl: that.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/productDetail/" + that.commodityId,
						signatureUrl: window.location.href,
					}
				};
				var paramsStr = encodeURIComponent(JSON.stringify(params));
				var httpURL = this.uumsHost + "/uums/wxGzh/wxGzhAuth?str=" + paramsStr;
				that.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {
					if(res.data.result == 0) {
						that.$store.commit('setsave', true);
						window.location.href = res.data.url;
					}
				}, function(res) {});
			},
			goOtherproduct: function(urllink) {
				var urlN = urllink;
				var reg = new RegExp("(^|&)" + "commodityId" + "=([^&]*)(&|$)");
				//链接不为空
				if(this.isCondition(urlN)) {
					var r = urlN.split('?')[1].match(reg);
					//链接有商品id
					if(r != null && this.isCondition(decodeURI(r[2]))) {
						var commodityNid = decodeURI(r[2]);
						this.$router.push({
							name: 'productDetail',
							params: {
								commodityId: commodityNid
							}
						});
					} else {
						//其他链接跳转
						window.open(urlN)
					}
					//}
				} else {
					return false;
				}
			},
			wxInfoAjax() {
				var that = this;
				var authorizationCode = this.$store.state.codeWechat;
				var appid = this.$store.state.appid;
				var httpURL = this.uumsHost + "/uums/wxGzh/wxGzhLogin?code=" + authorizationCode + '&appid=' + appid;
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
					this.token = res.body.token;
					this.$store.commit('setlxjAccount', res.body.lxjAccount);
					this.getbasicData();
				}, function(res) {});
			},
			getTokenInfo(bindCodeState) {
				var that = this;
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
					console.log(res.data)
					if(bindCodeState) { //单纯判断微信号是否为绑定状态
						if(res.data.bindCode == 0) { //bindCode：0为已经绑定，1为非绑定
							this.gologinFun(); //已绑定重新授权更新信息						
						}
					}else{
						if(res.data.code == 1||res.data.bindCode == 1) { //code：1为非绑定
							this.gologinFun(); //更新信息					
						}
					}
				}, function(res) {});
			},
			getbasicData: function() {

				if(!this.isCondition(this.token)) {
					var setToken = this.tokenMd5();
					this.$store.commit('settoken', setToken);
					this.token = setToken;
				}

				/*if(this.$store.state.code != 1) {
					this.$store.commit('setcode', this.$store.state.code);
				} else {
					var setCode = this.GetURLParameter("code") ? this.GetURLParameter("code") : 1;
					this.$store.commit('setcode', setCode);
					this.code = setCode;
				}*/
				if(this.token.indexOf("_") == 0) {
					this.isVisitor = true;
				}
				if(this.code != 0) {
					this.isVisitor = true;
				}
				if(this.isVisitor && this.isCondition(this.$store.state.unionid)) {
					this.getTokenInfo(true);
				}
				if( !this.isVisitor&&!this.isCondition(sessionStorage.getItem("chaeckedTokenState"))&&this.isCondition(this.$store.state.unionid)) {
					sessionStorage.setItem("chaeckedTokenState","true");
					this.getTokenInfo(false);
				}
				
				this.commodityId = this.$route.params.commodityId;
				this.$store.state.organizationSeq ? sessionStorage.setItem("organizationSeq", this.$store.state.organizationSeq) : this.organizationSeq = sessionStorage.getItem("organizationSeq");
				/*if(this.isCondition(this.GetURLParameter("code"))) {
					//var sst=this.mmsHost+ "/mms/html5/wechatH5/dist/index.htm" + window.location.hash;
					var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
					window.location.replace(sst)
				} else {
				}*/
				this.getCommodityDetail();
				this.getCouponData();
				this.getCommodityComments();
				if(!this.isVisitor) {
					this.getShoppingcartCount();
				}
				//history.replaceState(null, "商品详情", "index.htm#/productDetail/" + this.commodityId);

			},
			aminateFun: function() {
				var eleG = document.getElementById("couponInfoI");
				var that = this;
				eleG.style.maxHeight = "0";
				setTimeout(function() {
					that.couponMoreState = false;
					/*document.body.style.overflow = 'auto';
					document.body.style.position = 'static';
					try {
						document.scrollingElement.scrollTop = scrollTop;
					} catch(e) {
						document.documentElement.scrollTop = scrollTop;
					}*/
				}, 600)
			},
			goUseCoupon: function(couponId) { //前往使用优惠券
				window.event.cancelBubble = true;
				var that=this;

				this.aminateFun();
				
				//setTimeout(function() {
				//	showActivity(host + "/mms/html5/supermarket/couponCommodities.htm?couponId=" + couponId, "优惠商品使用列表");
					this.$router.push({
							name: 'couponCommodities',
							params: {
								couponId: couponId
							}
					});
				//}, 0)

			},
		},
		mounted: function() {
			if(this.isCondition(this.GetURLParameter("code")) && sessionStorage.getItem('refreshWechatData') != 'false') {
				var codeWechat = this.GetURLParameter("code") ? this.GetURLParameter("code") : 1;
				var appid = this.GetURLParameter("appid") ? this.GetURLParameter("appid") : '';
				this.$store.commit('setcodeWechat', codeWechat);
				this.$store.commit('setappid', appid);
				this.wxInfoAjax();
			} else {
				this.getbasicData();
			}

		},
		watch: {
			skuSelectList(newVal, oldVal) {
				this.bugNumber = 1;
				this.totalStockQuantity = 1;
				this.maxstockQuantity = 100;
				if(this.isConditionList(this.skuSelectList)) {
					this.selectPrice = null;
					this.skuSelectTip = "请选择：" + this.getmissSelectText(this.skuSelectList, this.commoditySku);
					console.log(this.skuSelectTip)
				} else {
					this.skuSelectTip = "已选：" + this.skuSelectDetailList.join(',');
					this.selectPrice = this.getSelectPrice(this.skuSelectList, this.productInfoData.skuList).price;

					this.totalStockQuantity = this.getSelectPrice(this.skuSelectList, this.productInfoData.skuList).stockQuantity;
					if(this.skuShowstate == 2) {
						this.maxstockQuantity = (this.totalStockQuantity < 100 ? this.totalStockQuantity : 100);
					} else {
						this.maxstockQuantity = (this.totalStockQuantity < 100 ? this.totalStockQuantity : 100) - (this.getshoppingcarCount(this.skuSelectList.join(',')) ? this.getshoppingcarCount(this.skuSelectList.join(',')) : 0);

					}
					//console.log(this.totalStockQuantity+"  "+this.maxstockQuantity)
				}
			},
			bugNumber(newVal, oldVal) {
				if(newVal == '') {}
				if(!isNaN(newVal)) {
					if(newVal > this.maxstockQuantity && this.maxstockQuantity > 0) {
						this.bugNumber = this.maxstockQuantity;
					}
				}
			},
			couponMoreState: function(newVal, oldVal) {
				var eleG = document.getElementById("couponInfoI");
				if(newVal) {
					/*try {
						scrollTop = document.scrollingElement.scrollTop;
					} catch(e) {
						scrollTop = document.documentElement.scrollTop;
					}
					document.body.style.top = -(scrollTop) + "px";
					document.body.style.overflow = 'hidden';
					document.body.style.position = 'fixed';*/
					this.couponMoreState2 = true;
					setTimeout(function() {
						eleG.style.maxHeight = "9rem";
					}, 10)
				} else {
					this.couponMoreState2 = false;
				}
			},
			'$route' (to, from) {
				if(to.name == from.name) {
					window.scrollTo(0, 0);
					this.wxpreviewImage1 = [];
					this.wxpreviewImage2 = [];
					this.wxpreviewImage3 = [];
					this.mySwiperp.destroy(true, true);
					this.getbasicData();
				}
				//setTimeout(() => {
				//this.getbasicData();
				//}, 100);				
			}
		}
	}
</script>
<style scoped="scoped">
	.productDetail {
		width: 100%;
	}
	
	.line_01box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
	}
	
	.productPhoto_box {
		width: 100%;
		position: relative;
	}
	
	.productPhotopadding_box {
		width: 100%;
		padding-bottom: 100%;
		height: 0;
	}
	
	.productPhotoContent_box {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.swiper-container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	
	.photoItem {
		background-color: #fff;
		width: 100%;
		height: 100%;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.discountsInfo {
		width: 100%;
		box-sizing: border-box;
		padding: 2.8% 3.3%;
		padding: 0.12rem 0.14rem;
		display: flex;
		align-items: center;
		background-color: #f8f8f8;
	}
	
	.discountsInfo span:nth-child(1) {
		flex-shrink: 0;
		font-size: 0.14rem;
		white-space: nowrap;
		color: #fff;
		line-height: 0.15rem;
		padding: 0.02rem 0.04rem;
		background-color: #FF525C;
		border-radius: 0.17rem;
	}
	
	.discountsInfo span:nth-child(2) {
		flex-shrink: 1;
		flex-grow: 0;
		font-size: 0.14rem;
		color: #555;
		line-height: 0.17rem;
		padding-left: 0.12rem;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.productName {
		width: 100%;
		background-color: #fff;
		color: #333;
		font-size: 16px;
		font-size: 0.16rem;
		line-height: 0.2rem;
		box-sizing: border-box;
		word-break: break-all;
		text-align: justify;
		padding: 3% 3.3%;
		padding: 0.01rem 0.14rem 0.28rem;
	}
	
	.productPrice_box {
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		padding: 2.4% 3.3%;
		padding: 0.28rem 0.14rem 0.1rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	
	.productPrice {
		color: #FC9153;
		font-size: 28px;
		font-size: 0.28rem;
		line-height: 0.3rem;
		flex-grow: 2;
		flex-shrink: 0;
		max-width: 80%;
	}
	
	.productPrice span {
		color: #FC9153;
		font-size: 28px;
		font-size: 0.28rem;
	}
	
	.bugprizeInfo span.minproductPrice,
	.productPrice span.minproductPrice {
		font-size: 15.3px;
		font-size: 0.153rem;
	}
	
	.productPrice span.minproductPrice {
		font-size: 18px;
		font-size: 0.18rem;
	}
	
	.buypeople {
		font-size: 14px;
		font-size: 0.14rem;
		line-height: 0.3rem;
		color: #aaa;
	}
	
	.productfufen {
		color: #FC9153;
		flex-grow: 0;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.freight_box {
		font-size: 14px;
		font-size: 0.14rem;
		color: #aaa;
	}
	
	.couponBox {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
	}
	
	.couponMain {
		width: 100%;
		padding: 0.12rem 0;
		display: flex;
		display: -webkit-flex;
		font-size: 0.14rem;
		align-items: center;
		-webkit-align-items: center;
	}
	
	.couponMain>span {
		padding-right: 0.07rem;
		font-size: 0.14rem;
		color: #999;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	
	.couponListBox {
		flex-grow: 2;
		-webkit-flex-grow: 2;
		min-height: 0.16rem;
		display: flex;
		display: -webkit-flex;
		overflow: hidden;
	}
	
	.couponItem {
		height: 0.16rem;
		display: flex;
		display: -webkit-flex;
	}
	
	.couponItembj1 {
		width: 0.14rem;
		height: 0.16rem;
		background-image: url('../product/images/coupon1.png');
		background-position: right;
		background-size: auto 100%;
		background-repeat: no-repeat;
	}
	
	.couponItembj2 {
		min-width: 0.66rem;
		height: 0.16rem;
		line-height: 0.16rem;
		font-size: 0.12rem;
		text-align: center;
		color: #fff;
		background-image: url('../product/images/coupon2.png');
		background-position: right;
		background-size: auto 100%;
		background-repeat: repeat-x;
	}
	
	.couponItembj3 {
		width: 0.14rem;
		height: 0.16rem;
		background-image: url('../product/images/coupon3.png');
		background-position: left;
		background-size: auto 100%;
		background-repeat: no-repeat;
	}
	
	.moreCoupon {
		width: 0.16rem;
		height: 0.16rem;
		padding-left: 0.12rem;
		display: block;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	
	.line_01 {
		width: 100%;
		height: 1px;
		background-color: #eee;
		/*transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5)*/
	}
	
	.sellerInfo_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 3.3%;
		padding: 0 0.14rem;
		margin-top: 12px;
		margin-top: 0.12rem;
		background-color: #fff;
		padding-bottom: 0.14rem;
	}
	
	.padding_bottom0 {
		padding-bottom: 0;
	}
	
	.sellerName_box {
		width: 100%;
		padding: 3.3% 0;
		padding: 0.14rem 0;
		display: flex;
		align-items: center;
		font-size: 15.3px;
		font-size: 0.153rem;
		color: #333;
	}
	
	.sellerName_box img {
		padding-right: 0.14rem;
		width: 0.18rem;
		height: auto;
		flex-shrink: 0;
		display: block;
		flex-grow: 0;
	}
	
	.thirdbaoInfo_box {
		width: 100%;
		padding: 3.3% 0;
		padding: 0.14rem 0;
		display: flex;
		justify-content: space-around;
	}
	
	.thirdbaoItem {
		display: flex;
		align-items: center;
		color: #555;
		font-size: 12.6px;
		font-size: 0.126rem;
	}
	
	.thirdbaoItem img {
		padding-right: 0.1rem;
		width: 0.18rem;
		height: auto;
		flex-shrink: 0;
		display: block;
		flex-grow: 0;
	}
	
	.thirdbaoItem span {
		font-size: 12.6px;
		font-size: 0.126rem;
		line-height: 0.15rem;
	}
	
	.evaluateTotail {
		width: 100%;
		padding: 3.3% 0;
		font-size: 16px;
		font-size: 0.16rem;
		color: #222;
	}
	
	.evaluateUserInfo {
		width: 100%;
		padding-top: 2.8%;
		padding-top: 0.12rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.evaluateUser {
		display: flex;
		align-items: center;
	}
	
	.evaluateUser img {
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		background-color: f3f4f5;
		flex-direction: 0;
		flex-grow: 0;
		margin-right: 0.1rem;
	}
	
	.evaluateUser span {
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		font-size: 14.6px;
		font-size: 0.146rem;
		color: #555;
	}
	
	.evaluateStarLevel {
		display: flex;
		flex-shrink: 0;
		flex-flow: 0;
		align-items: center;
	}
	
	.evaluateStarLevel img {
		width: 0.2rem;
		padding-left: 0.05rem;
		flex-shrink: 0;
		flex-flow: 0;
		height: auto;
		display: block;
	}
	
	.evaluateTime {
		width: 100%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		font-size: 12px;
		font-size: 0.12rem;
		color: #aaa;
		line-height: 26px;
		line-height: 0.26rem;
	}
	
	.evaluateContent {
		width: 100%;
	}
	
	.evaluateText {
		width: 100%;
	}
	
	.evaluateText pre,
	.replyContentText pre {
		width: 100%;
		font-size: 14px;
		font-size: 0.14rem;
		line-height: 22px;
		line-height: 0.22rem;
		white-space: pre-wrap;
		word-break: break-all;
	}
	
	.evaluateImg,
	.replyContentImg {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	
	.evaluateImg .evaluateImgItem:nth-child(1),
	.evaluateImg .evaluateImgItem:nth-child(5),
	.evaluateImg .evaluateImgItem:nth-child(9) {
		padding-left: 0;
	}
	
	.evaluateImg .evaluateImgItem:nth-child(4),
	.evaluateImg .evaluateImgItem:nth-child(8) {
		padding-right: 0;
	}
	
	.replyContentImg .evaluateImgItem:nth-child(1),
	.replyContentImg .evaluateImgItem:nth-child(4),
	.replyContentImg .evaluateImgItem:nth-child(7) {
		padding-left: 0;
	}
	
	.replyContentImg .evaluateImgItem:nth-child(3),
	.replyContentImg .evaluateImgItem:nth-child(6) {
		padding-right: 0;
	}
	
	.evaluateImgItem {
		width: 0.8rem;
		height: 0.8rem;
		padding: 0.04rem 0.1rem;
	}
	
	.commentImage {
		width: 100%;
		height: 100%;
		background-color: #F3F4F5;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.replyContent_box {
		width: 100%;
	}
	
	.replyContentlogo {
		width: 100%;
	}
	
	.replyContentlogo img {
		width: 0.15rem;
		height: auto;
		display: block;
		padding-left: 0.3rem;
	}
	
	.replyContent {
		width: 100%;
		box-sizing: border-box;
		padding: 0.05rem 0.14rem;
		background-color: #efeff4;
	}
	
	.replyContentText {
		width: 100%;
	}
	
	.evaluateButton {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 0.18rem 0 0.04rem;
	}
	
	.evaluateButton span {
		font-size: 14.6px;
		font-size: 0.146rem;
		color: #FC9153;
		border: 1px solid #FC9153;
		line-height: 0.18rem;
		padding: 0.07rem 0.14rem;
		border-radius: 0.32rem;
	}
	
	.detailContent {
		width: 100%;
		margin-top: 0.12rem;
		background-color: #fff;
	}
	
	.detailContentTitle_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 3.3%;
		padding: 0 0.14rem;
	}
	
	.detailContentTitle {
		width: 100%;
		font-size: 16px;
		font-size: 0.16rem;
		line-height: 0.2rem;
		color: #222;
		padding: 0.13rem 0;
	}
	
	.productCommodity {
		width: 100%;
		padding-bottom: 0.12rem;
	}
	
	.productCommodityItem {
		display: flex;
		width: 100%;
		align-items: center;
		font-size: 0.14rem;
		padding-top: 0.12rem;
		line-height: 0.2rem;
	}
	
	.productCommodityItem span:nth-child(1) {
		color: #9b9b9b;
		width: 38%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.productCommodityItem span:nth-child(2) {
		color: #000;
		padding-left: 2%;
		flex-grow: 1;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.detailContentMain {
		width: 100%;
	}
	
	.detailContentMain img {
		width: 100%;
		height: auto;
		display: block;
	}
	
	.detailContentMain * {
		width: auto;
		max-width: 100%!important;
		height: auto;
	}
	
	.recommendProduct {
		width: 100%;
	}
	
	.recommendProductTitle {
		width: 100%;
		text-align: center;
		line-height: 0.2rem;
		font-size: 0.16rem;
		padding: 0.16rem 0 0;
	}
	
	.recommendProductList {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	
	.recommendProductItem_box {
		width: 50%;
		box-sizing: border-box;
		margin-top: 0.1rem;
	}
	
	.recommendProductList .recommendProductItem_box:nth-child(2n) {
		padding-left: 0.05rem;
	}
	
	.recommendProductList .recommendProductItem_box:nth-child(2n-1) {
		padding-right: 0.05rem;
	}
	
	.recommendProductItem {
		width: 100%;
	}
	
	.recommendProductphoto {
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-color: #fff;
	}
	
	.kongBottom {
		width: 100%;
		height: 0.65rem;
		background-color: transparent;
	}
	
	.footerButton {
		width: 100%;
		height: 53px;
		height: 0.53rem;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}
	
	.footerButtonMain {
		flex-grow: 2;
		width: 100%;
		height: 90%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	
	.joinShoppingcart {
		width: 29%;
		height: 100%;
		flex-shrink: 0;
		background-color: #FF525D;
		color: #fff;
		font-size: 17.3px;
		font-size: 0.173rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.joinShoppingcart span {
		font-size: 17.3px;
		font-size: 0.173rem;
	}
	
	.goSaveOrder {
		flex-shrink: 0;
		width: 29%;
		height: 100%;
		background-color: #FC9153;
		color: #fff;
		font-size: 17.3px;
		font-size: 0.173rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.goSaveOrder span {
		font-size: 17.3px;
		font-size: 0.173rem;
	}
	
	.shoppingcartNum {
		height: 100%;
		display: flex;
		align-items: center;
		margin-right: 0.4rem;
	}
	
	.shoppingcartNum_box {
		position: relative;
	}
	
	.shoppingcartNum_box img {
		width: 0.45rem;
		height: auto;
		display: block;
	}
	
	#shoppingcartNum {
		background-color: #FC9153;
		color: #fff;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 11px;
		font-size: 0.11rem;
		line-height: 0.14rem;
		padding: 0.02rem;
		text-align: center;
		border-radius: 50%;
		width: 0.14rem;
		height: 0.14rem;
	}
	
	.favoriteImg {
		height: 100%;
		display: flex;
		align-items: center;
		margin-right: 0.2rem;
	}
	
	.favoriteImg_box img {
		width: 0.45rem;
		height: auto;
		display: block;
	}
	
	.favoriteNo {}
	
	.favoriteImg_box img.favoriteYes {
		/*display: none;*/
	}
	
	.bgTangcan {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}
	
	.bugInfo_box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: -webkit-flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
	}
	
	.bugInfo {
		width: 100%;
		position: relative;
		background-color: #fff;
	}
	
	.bugprizeInfo {
		font-size: 0.2rem;
		color: #fc9153;
		box-sizing: border-box;
		padding: 0.25rem 0.14rem;
		width: 100%;
		background-color: #fff;
	}
	
	.bugprizeInfo span {
		font-size: 0.2rem;
		color: #fc9153;
	}
	
	.hadChaooseSkuInfo {
		width: 100%;
		box-sizing: border-box;
		padding: 0.35rem 0.6rem 0 0.14rem;
		margin-bottom: 0.11rem;
		color: #666;
		font-size: 14.6px;
		font-size: 0.146rem;
		line-height: 0.24rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.commoditySku_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem 0.14rem;
		max-height: 2.5rem;
		overflow: auto;
	}
	
	.commoditySkuItems {
		width: 100%;
	}
	
	.skuName {
		color: #aaa;
		font-size: 14px;
		font-size: 0.14rem;
		line-height: 0.4rem;
	}
	
	.commoditySkuItems .skuName:nth-child(1) {
		line-height: 0.32rem;
		padding-top: 0.06rem;
	}
	
	.skuParamName {
		width: 100%;
		font-size: 0.14rem;
	}
	
	.skuParamName span {
		min-width: 1.06rem;
		box-sizing: border-box;
		display: inline-block;
		margin-right: 0.32rem;
		border-radius: 0.03rem;
		font-size: 14px;
		font-size: 0.14rem;
		line-height: 0.2rem;
		padding: 0.1rem 0.1rem;
		margin-top: 0.06rem;
		margin-bottom: 0.06rem;
		text-align: center;
	}
	
	.paramNameN {
		background-color: #f0f0f0;
		color: #555;
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
	
	.paramNameY {
		background-color: #FC9153;
		color: #fff;
	}
	
	.paramNameF {
		background-color: #666;
		color: #fff;
	}
	
	.bugNumber_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0.13rem 0.14rem;
		display: flex;
		align-items: center;
	}
	
	.bugNumberText {
		flex-grow: 2;
		font-size: 0.14rem;
		color: #aaa;
	}
	
	.reducebt {
		width: 0.3rem;
		height: 0.3rem;
		background-image: url(../../../static/images/list_btn_ic_subtract@3x.png);
		background-size: 86% auto;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.reducefall {
		background-image: url(../../../static/images/ic_cut_-no-active-.png)!important;
	}
	
	.addbt {
		width: 0.3rem;
		height: 0.3rem;
		background-image: url(../../../static/images/list_btn_ic_add@3x.png);
		background-size: 86% auto;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.addbfall {
		background-image: url(../../../static/images/ic_add_-active_no.png)!important;
	}
	
	#bugNumber {
		width: 0.33rem;
		height: 0.2rem;
		text-align: center;
		outline: none;
		font-size: 0.16rem;
		line-height: 0.2rem;
	}
	
	.bugAffirm {
		width: 100%;
		box-sizing: border-box;
		padding: 0.17rem;
		text-align: center;
		display: flex;
		align-items: center;
		color: #fff;
		background-color: #FC9153;
		justify-content: center;
		font-size: 17.3px;
		font-size: 0.173rem;
		line-height: 0.2rem;
	}
	
	.bugAffirm span {
		font-size: 17.3px;
		font-size: 0.173rem;
		line-height: 0.2rem;
	}
	
	.closeLogo {
		width: 0.22rem;
		height: 0.22rem;
		position: absolute;
		right: 0.02rem;
		top: 0.01rem;
		padding: 0.12rem;
	}
	
	.closeLogo img {
		width: 100%;
		height: auto;
		display: block;
	}
	/*绑定样式*/
	
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
		height: 2.55rem;
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
	}
	
	.user-pop-code {
		width: 2.56rem;
		margin: 0 auto;
		font-size: 0.14rem;
	}
	
	.user-pop-code input {
		padding-top: 0.24rem;
		width: 1.46rem;
		border-bottom: 1px solid #eee;
		padding-bottom: 0.16rem;
		margin-right: 0.25rem;
		box-sizing: border-box;
		padding-left: 0.14rem;
		line-height: 0.16rem;
		font-size: 0.14rem;
	}
	
	.user-pop-code input::placeholder {
		font-size: 0.14rem;
	}
	
	.user-pop-code span {
		font-size: 0.15rem;
		color: #fc9153;
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
	
	.promotionInfoBox {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
	}
	
	.promotionInfoMain {
		width: 100%;
		padding: 0.08rem 0;
		display: flex;
		display: -webkit-flex;
	}
	
	.promotionInfoMain>span {
		padding-right: 0.12rem;
		font-size: 0.14rem;
		line-height: 0.26rem;
		color: #999;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	
	.promotionInfoList {
		flex-flow: 2;
	}
	
	.promotionInfoItem {
		line-height: 0.26rem;
		font-size: 0.14rem;
		color: #555;
	}
	
	.promotionInfoItem span:first-child {
		height: 0.16rem;
		padding: 0 0.06rem;
		color: #FF525C;
		border: 1px solid #FF525C;
		border-radius: 0.16rem;
	}
	
	.couponInfoBox {
		width: 100%;
		position: absolute;
		bottom: 0;
		max-height: 0;
		overflow: hidden;
		transition-property: max-height;
		transition-duration: 0.6s;
		transition-delay: 0s;
		-webkit-transition-property: max-height;
		-webkit-transition-duration: 0.6s;
		-webkit-transition-delay: 0s;
	}
	
	.couponInfoBoxTitle {
		width: 100%;
		box-sizing: border-box;
		padding: 0.17rem 0.14rem;
		background-color: #fff;
	}
	
	.couponInfoBoxTitleBox {
		width: 100%;
		text-align: center;
		line-height: 0.22rem;
		font-size: 0.16rem;
		position: relative;
	}
	
	.couponInfoBoxTitleBox>span {
		line-height: 0.22rem;
		font-size: 0.16rem;
		color: #333;
	}
	
	.couponInfoBoxTitleBox img {
		width: 0.22rem;
		height: 0.22rem;
		display: block;
		position: absolute;
		right: 0;
		top: 0;
	}
	
	.couponInfoBoxMain {
		width: 100%;
		min-height: 5.3rem;
		max-height: 5.3rem;
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
		flex-grow: 2;
		-webkit-flex-grow: 2;
		height: 1.12rem;
		padding-left: 0.12rem;
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
		padding-left: 0.08rem;
	}
	
	.couponInfoType1 span.quanLogo {
		color: #52acff;
		font-size: 0.11rem;
		line-height: 0.18rem;
		border-radius: 0.03rem;
		background-color: #e4f3ee;
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
		justify-content: space-between;
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
		flex-shrink: 0;
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
		display: flex;
		display: -webkit-flex;
	}
	
	.couponInfoRuleBoxbj div:first-child {
		width: 1.2rem;
		height: 0.06rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	
	.couponInfoRuleBoxbj div:nth-child(2) {
		flex-grow: 2;
		-webkit-flex-grow: 2;
		height: 0.06rem;
		background-image: url(../product/images/bj001.png);
		background-size: auto 100%;
		background-position: 0 0;
		background-repeat: repeat-x;
	}
	
	.couponInfoRule {
		width: 100%;
		display: flex;
		align-items: flex-start;
		display: -webkit-flex;
		-webkit-align-items: flex-start;
	}
	
	.couponInfoRule>div {
		flex-grow: 2;
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
		-webkit-transition-property: max-height;
		-webkit-transition-duration: .6s;
		-webkit-transition-delay: 0s;
	}
	
	.couponInfoRuleAnimat {
		max-height: 2.0rem!important;
	}
	
	.couponInfoRule img {
		width: 0.14rem;
		height: auto;
		padding: 0.1rem 0.14rem 0 0.14rem;
		flex-grow: 0;
		flex-shrink: 0;
		-webkit-flex-grow: 0;
		-webkit-flex-shrink: 0;
	}
</style>