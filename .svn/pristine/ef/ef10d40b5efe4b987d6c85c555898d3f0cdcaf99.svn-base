<template>
	<div class="confirmOrder" v-title data-title="提交订单">
		<div class="receiverInfo" v-on:click="selectAddress()">
			<div class="receiverLogo" v-if="receiverId!='null'">
				<img src="../../../static/images/ic_-Location-@3x.png" />
			</div>
			<div class="receiverNone" v-if="receiverId=='null'||receiverId==''">
				请选择收货地址
			</div>
			<div class="receiverInfo_box" v-if="receiverId!='null'">
				<div class="receiverName">
					<span v-text="receiverName"></span><span v-text="receiverphone"></span>
				</div>
				<div class="receiverDetail" v-text="address">
				</div>
			</div>

			<div class="moreLogo">
				<img src="../../../static/images/ic_more-@3x.png" />
			</div>
		</div>
		<div class="sellerList" v-if="sellerList.length>0" v-for="(items,index) in sellerList">
			<div class="sellerName">
				<img src="../../../static/images/sellerName_logo.png" />
				<span v-text="items.sellerName"></span>
			</div>
			<!--<div class="line_01box">
				<div class="line_01">

				</div>
			</div>-->
			<div class="commodity" v-for="(item,index2) in items.commodityList">
				<div class="commodityImg" :style="{ backgroundImage: 'url('+item.commodityLogo+')' }">
				</div>
				<div class="commodityInfo">
					<div class="commodityName" v-text="item.commodityName"></div>
					<div class="commodityDetail" v-text="item.commodityDetail"></div>
					<div class="commodityPrice">
						<span class="commodityPriceS">¥<span v-text="String(parseFloat(item.commodityPrice).toFixed(2)).split('.')[0]"></span>.<span class="minproductPrice" v-text="String(parseFloat(item.commodityPrice).toFixed(2)).split('.')[1]"></span></span>
						<div class="commodityNumber">
							<div class="reducebt" v-on:click="reduceData(item.id?item.id:item.commodityId,shoppingCartCount[item.id?item.id:item.commodityId])" v-bind:class="{reducefall:shoppingCartCount[item.id?item.id:item.commodityId]<=1}">
							</div>
							<input type="tel" v-model="shoppingCartCount[item.id?item.id:item.commodityId]" v-on:blur="blurInput(item.id?item.id:item.commodityId,item.stockQuantity,shoppingCartCount[item.id?item.id:item.commodityId])" v-on:focus="focusInput()" name="bugNumber" class="bugNumber" id="bugNumber" value="1" />
							<div class="addbt" v-on:click="addData(item.id?item.id:item.commodityId,shoppingCartCount[item.id?item.id:item.commodityId],item.stockQuantity)" v-bind:class="{addbfall:shoppingCartCount[item.id?item.id:item.commodityId]>=100||shoppingCartCount[item.id?item.id:item.commodityId]>=item.stockQuantity}">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="orderInfo">
				<div class="freightInfo_box">
					<span>运费</span><span v-show="getSellerPriceItem(items,sellerFavorableToatlList,'freight')>0">¥{{getSellerPriceItem(items,sellerFavorableToatlList,'freight')}}</span><span v-if="getSellerPriceItem(items,sellerFavorableToatlList,'freight')<=0&&receiverId!=''">免邮</span>
				</div>
				<div class="line_01">
				</div>
				<div class="freightInfo_box">
					<span>运费优惠</span><span>减 ¥{{getSellerPriceItem(items,sellerFavorableToatlList,'redecefreight')?getSellerPriceItem(items,sellerFavorableToatlList,'redecefreight'):0.00}}</span>
				</div>
				<div class="line_01">
				</div>
				<div class="freightInfo_box">
					<span>满减优惠</span><span>减 ¥{{getSellerPriceItem(items,sellerFavorableToatlList,'redecedFee')?getSellerPriceItem(items,sellerFavorableToatlList,'redecedFee'):0.00}}</span>
				</div>
				<div class="line_01">
				</div>
				<div class="leaveWord_box">
					<span>留言：</span>
					<textarea class="leaveWord" v-model="sellerRemark[index].content" name="" rows="" placeholder="选填给商家留言(45字内)" maxlength="45" cols=""></textarea>
				</div>
				<div class="line_01">
				</div>
				<div class="storeTotalprice">
					<span class="flew_grow2"></span><span>共{{getSellerPriceItem(items,sellerFavorableToatlList,'counts')}}件商品</span><span> 小计：</span><span class="commodityPriceS" v-show="getSellerPriceItem(items,sellerFavorableToatlList,'price')>=0">¥<span v-text="String(parseFloat(getSellerPriceItem(items,sellerFavorableToatlList,'price')).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(getSellerPriceItem(items,sellerFavorableToatlList,'price')).toFixed(2)).split('.')[1]">00</span></span>
				</div>
			</div>
		</div>

		<div class="invalidList" v-if="invalidList.length>0">
			<div class="sellerName">
				失效 商品(不在配送范围)
			</div>
			<div class="commodity" v-for="(item3,index3) in invalidList">
				<div class="commodityImg" :style="{ backgroundImage: 'url('+item3.commodityLogo+')' }">
				</div>
				<div class="commodityInfo">
					<div class="commodityName">
						{{item3.commodityName}}
					</div>
					<div class="commodityDetail">
						{{item3.commodityName}}
					</div>
					<div class="commodityPrice">
						<span class="commodityPriceS">¥<span v-text="String(parseFloat(item3.commodityPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(item3.commodityPrice).toFixed(2)).split('.')[1]">00</span></span>
						<div class="commodityNumber">
							x{{item3.commodityCount}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="totalInfoBox">
			<!--文案（未使用，不用用）-->
			<div class="chooseCouponBox">
				<div class="chooseCouponText1">
					优惠券
				</div>
				<div class="chooseCouponText2">
					{{couponMoneyText}}
				</div>
				<img v-on:click="showCouponInfo()" src="../product/images/ic_mroeI.png" />
			</div>
			<div class="chooseCouponBox2">
				<div class="couponPriceInfo">
					<div class="couponPriceTextBox">
						<span>商品总价</span><span class="moneyTotal">¥{{totalPrice}}</span>
					</div>
					<div class="couponPriceTextBox">
						<span>满减</span><span class="moneyTotalR">-¥{{totalReducePrice}}</span>
					</div>
					<div class="couponPriceTextBox">
						<span>配送费</span><span class="moneyTotalF">¥{{totalFreight}}</span>
					</div>
					<!--<div class="couponPriceTextBox">
						<span>运费优惠</span><span class="moneyTotalFR">-¥0.00</span>
					</div>-->
					<div class="couponPriceTextBox">
						<span>优惠券</span><span class="moneyTotalcouponMoney">-¥{{couponMoney}}</span>
					</div>
				</div>
				<div class="line_01">
				</div>
				<div class="couponPriceInfo2">
					<div class="pay couponPriceTextBox2" data-value="0.00">
						应付款：<span class="commodityPriceS">¥<span  v-text="String(parseFloat(commitPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(commitPrice).toFixed(2)).split('.')[1]">00</span></span>
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
				<div class="totailPrice">
					<span class="totailPricetext">应付款：</span>
					<span class="commodityPriceS">¥<span  v-text="String(parseFloat(commitPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(commitPrice).toFixed(2)).split('.')[1]">00</span></span>
				</div>
				<div class="saveOrder" v-on:click="beforesaveMultiCommodityOrder()">
					<span>
						提交订单
					</span>
				</div>
			</div>
		</div>
		<!--优惠券领取-->
		<div class="bgTangcan" v-show="couponSelectInfoShow">
			<div id="couponInfoI" class="couponInfoBox">
				<div class="couponInfoBoxTitle">
					<div class="couponInfoBoxTitleBox">
						<span>优惠券</span>
						<img v-on:click="aminateFun()" src="../product/images/btn_ic_close@3x.png" />
					</div>
				</div>
				<div class="couponInfoBoxTitle2">
					<div class="yesCouponInfo" v-bind:class="{focuOn:couponShowModel==1}" v-on:click="changeModel(1)">
						<div class="couponInfoTitle2Text">
							可用优惠券({{availableList.length}})
						</div>
						<div class="couponInfoTitle2colorR"></div>
					</div>
					<div class="nothing1"></div>
					<div class="noCouponInfo" v-bind:class="{focuOn:couponShowModel==2}" v-on:click="changeModel(2)">
						<div class="couponInfoTitle2Text">
							不可用优惠券({{unavailableList.length}})
						</div>
						<div class="couponInfoTitle2colorR"></div>
					</div>
				</div>
				<div class="yesCouponBoxMain1 yesCouponBoxMainS" v-show="couponShowModel==1&&availableList.length!=0&&couponId2==''">
					请选择优惠券
				</div>
				<div class="yesCouponBoxMain1 yesCouponBoxMainS" v-show="couponShowModel==1&&availableList.length!=0&&couponId2!=''">
					您已选择一张优惠券，共可抵扣<span>¥{{couponMoneyC}}</span>
				</div>
				<div class="couponInfoBoxMain yesCouponBoxMainS" v-bind:class="{yesCouponBoxMainShort:availableList.length!=0}" v-show="couponShowModel==1" id="yesCouponBoxMain">
					<div class="imgKongCoupon" v-if="availableList.length==0">
						<div class="imgKongCouponImg">
							<img src="../product/images/coupon-empty.png" />
						</div>
						<div class="imgKongCouponText">
							暂无可用优惠券
						</div>
					</div>
					<div class="couponInfoItem" v-if="availableList.length!=0" v-for="(itemco,indexco) in availableList">
						<div class="couponInfo">
							<div class="couponInfo1" dataCouponId="itemco.couponId" dataCouponMoney="itemco.couponMoney" v-on:click="chooseCoupon(itemco.couponId,itemco.couponMoney,indexco)">
								<div class="couponInfo1bj">
									<div class="couponInfoP">
										<span class="couponInfoPB">
										<span class="smallF" v-if="itemco.type==1">¥</span>
										<span class="bigF" v-if="itemco.type==1">{{itemco.denomination}}</span>
										<span class="bigF" v-if="itemco.type==2">{{itemco.denomination}}</span>
										<span class="smallF" v-if="itemco.type==2">折</span>
										</span>
									</div>
									<div class="couponInfoR" v-if="itemco.couponCondition==1">
										无门槛使用
									</div>
									<div class="couponInfoR" v-if="itemco.couponCondition==2">
										满{{itemco.conditionMoney}}元可用
									</div>
								</div>
								<div class="couponInfoType">
									<div class="couponInfoType1">
										<span class="quanLogo" v-if="itemco.type==1&&itemco.couponCondition==2">满减券</span>
										<span class="quanLogo" v-if="itemco.type==2">折扣券</span>
										<span v-if="itemco.scope==1">适用于全部商品</span>
										<span v-if="itemco.scope==2">适用于部分商品</span>
									</div>
									<div class="couponInfoTime">
										<span>{{itemco.effectiveStart}}-{{itemco.effectiveEnd}}</span>
									</div>

								</div>
								<img  v-show="conponId2Index!=indexco" v-bind:src="imgquan1"  />
								<img  v-show="conponId2Index==indexco" v-bind:src="imgquan2"  />
							</div>
							<div class="couponInfoRuleBox">
								<div class="couponInfoRuleBoxbj">
									<div></div>
									<div></div>
								</div>
								<div class="couponInfoRule">
									<div>{{itemco.useMsg}}</div>
									<img v-if="itemco.useMsg.length>20" dataState='1' dataStateC='1' v-on:click="ruleShowAnimate($event)" src="../product/images/ic_put-up@3x.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="couponInfoBoxMain noCouponBoxMainS" id="noCouponBoxMain" v-show="couponShowModel==2">
					<div class="imgKongCoupon" v-if="unavailableList.length==0">
						<div class="imgKongCouponImg">
							<img src="../product/images/coupon-empty.png" />
						</div>
						<div class="imgKongCouponText">
							暂无不可用优惠券
						</div>
					</div>
					<div class="couponInfoItem" v-if="unavailableList.length>0" v-for="(itemcon,indexcon) in unavailableList">
						<div class="couponInfo">
							<div class="couponInfo1">
								<div class="couponInfo1bj">
									<div class="couponInfoP">
										<span class="couponInfoPB">
										<span class="smallF" v-if="itemcon.type==1">¥</span>
										<span class="bigF" v-if="itemcon.type==1">{{itemcon.denomination}}</span>
										<span class="bigF" v-if="itemcon.type==2">{{itemcon.denomination}}</span>
										<span class="smallF" v-if="itemcon.type==2">折</span>
										</span>
									</div>
									<div class="couponInfoR" v-if="itemcon.couponCondition==1">
										无门槛使用
									</div>
									<div class="couponInfoR" v-if="itemcon.couponCondition==2">
										满{{itemcon.conditionMoney}}元可用
									</div>
								</div>
								<div class="couponInfoType">
									<div class="couponInfoType1">
										<span class="quanLogo" v-if="itemcon.type==1&&itemcon.couponCondition==2">满减券</span>
										<span class="quanLogo" v-if="itemcon.type==2">折扣券</span>
										<span v-if="itemcon.scope==1">适用于全部商品</span>
										<span v-if="itemcon.scope==2">适用于部分商品</span>
									</div>
									<div class="couponInfoTime">
										<span>{{itemcon.effectiveStart}}-{{itemcon.effectiveEnd}}</span>
									</div>
								</div>
							</div>
							<div class="couponInfoRuleBox">
								<div class="couponInfoRuleBoxbj">
									<div></div>
									<div></div>
								</div>
								<div class="couponInfoRule">
									<div>{{itemcon.useMsg}}</div>
									<img v-if="itemcon.useMsg.length>20" dataState='1' dataStateC='1' v-on:click="ruleShowAnimate($event)" src="../product/images/ic_put-up@3x.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="couponConfirm yesCouponBoxMainS" v-show="couponShowModel==1&&availableList.length!=0">
					<div class="line_01"></div>
					<div class="couponConfirmbt" v-on:click="aminateFun(true)">
						确定
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import imgup1 from '../product/images/btn_ic_put-up.png'
	import imgdown1 from '../product/images/ic_put-up@3x.png'
	import imgquan1 from '../product/images/ic_gray_circle@3x.png'
	import imgquan2 from '../product/images/ic_choise_yes.png'
	export default {
		name: 'confirmOrder',
		data() {
			return {
				token: this.$store.state.token,
				commodityId: this.$route.params.commodityId,
				shoppingCartIds: this.$route.params.shoppingCartIds,
				areaCode: this.$store.state.organizationSeq,
				mmsHost: this.$store.state.mmsHost,
				uumsHost: this.$store.state.uumsHost,
				orderInfoData: null, //下单商品数据
				OrderFreightdata: null, //下单商品费用信息
				sellerList: [],
				sellerRemark: [], //留言分店铺数组
				shoppingCartCount: {}, //商品数量控制
				invalidList: [], //失效商品列表
				inputFocusState: false,
				bugType: this.$route.params.bugType, //下单类型，1为购物车下单2为单个商品购买
				commoditySkuAttrIds: this.$route.params.commoditySkuAttrIds, //商品规格
				commodityCounts: this.$route.params.commodityCounts, //商品数量
				receiverId: "", //收货地址id
				address: null,
				receiverName: null,
				receiverphone: null,
				totalPrice: null, //总价金额
				commitPrice: 0.00, //付款金额
				sellerFavorableToatlList: [], //订单费用细分店铺优惠和店铺运费
				appId: '', //支付参数公众号
				saveState: false, //下单点击控制快速点击
				couponSelectInfoShow: false,
				availableList: [],
				unavailableList: [],
				cTotalPriceMap: null,
				redecedKeyMap: null,
				totalReducePrice: "0.00",
				totalFreight: "0.00",
				couponMoney: "0.00",
				couponMoneyC:"0.00",
				couponId: sessionStorage.getItem("couponId")?sessionStorage.getItem("couponId"):"",
				couponId2: sessionStorage.getItem("couponId")?sessionStorage.getItem("couponId"):"",
				conponId2Index:0,
				couponMoneyText: "还未选择优惠券",
				firstChooseState:true,
				couponShowModel:1,
				haveChose:false,
				imgquan1:imgquan1,
				imgquan2:imgquan2,
			}
		},
		methods: {
			getUserReceiverInfo: function(receiverInfoId) { //查询是否有默认地址或者根据地址id查询相关地址信息
				var that = this;
				let params = {
					body: {
						type: 1, //type=1是查默认地址，id不用
						id: receiverInfoId
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				if(this.isCondition(receiverInfoId)) { //type=3是根据id查地址信息
					params.body.type = 3;
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.mmsHost + "/mms/servlet/getUserReceiverInfo?str=" + paramsStr;
				/*this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				})*/
				axios.post(this.mmsHost + "/mms/servlet/getUserReceiverInfo", params).then(function(res) {

					if(res.data.receiverFlag == 1) { //receiverFlag=1，该地址可用
						if(that.isCondition(receiverInfoId)) { //页面地址展示拼接
							that.receiverId = receiverInfoId;
							that.address = res.data.receiver.provinceName + res.data.receiver.cityName + res.data.receiver.areaName + res.data.receiver.townName + res.data.receiver.detailAddress;
							that.receiverName = res.data.receiver.username;
							that.receiverphone = res.data.receiver.mobile;
						} else { //页面地址展示
							that.receiverId = res.data.defaultReceiver.id;
							that.address = res.data.defaultReceiver.address;
							that.receiverName = res.data.defaultReceiver.username;
							that.receiverphone = res.data.defaultReceiver.mobile;
						}
						that.getconfirmOrderDetail(); //根据地址查询商品是否在配送范围
					} else { //该地址不可用，或者没有地址
						that.getconfirmOrderDetail(); //根据地址查询商品是否在配送范围
					}

				}, function(res) {})

			},
			getconfirmOrderDetail: function() {
				var that = this;
				let params = {};
				if(this.bugType == 2) { //单个商品下单的请求参数
					params.body = {
						commodityId: this.commodityId,
						receiverId: this.receiverId,
						commoditySkuAttrIds: this.commoditySkuAttrIds,
						commodityCount: this.commodityCounts
					}
				} else if(this.bugType == 1) { //购物车下单的请求参数
					params.body = {
						shoppingCartIds: this.shoppingCartIds.join(","), //购物车id，数组字符串
						receiverId: this.receiverId,
					}
				} else {
					return false;
				}
				params.header = {
					token: this.token,
					time_stamp: new Date().getTime()
				}
				axios.post(this.mmsHost + "/mms/servlet/confirmOrder", params).then(function(res) {
					that.orderInfoData = res.data;
					that.sellerList = res.data.sellerList; //有效商品列表
					that.invalidList = res.data.invalidList; //无效商品列表
					//that.sellerRemark=[];
					for(let i = 0; i < res.data.sellerList.length; i++) { //生成留言控制数组
						var s = {
							sellerId: res.data.sellerList[i].sellerId,
							content: ''
						}
						that.sellerRemark.push(s);
					}
					//if(that.bugType == 1){
					if(that.isCondition(sessionStorage.getItem("shoppingCartCount"))) {
						that.shoppingCartCount = JSON.parse(sessionStorage.getItem("shoppingCartCount"))
					} else {
						that.shoppingCartCount = that.getCommodityCounts(that.sellerList);
					}
					that.calculateOrderFreight();
					//}

				}, function(res) {})

			},
			calculateOrderFreight: function(id, num) {
				var that = this;
				if(that.isCondition(id)) {
					that.shoppingCartCount[id] = num;
					sessionStorage.setItem("shoppingCartCount", JSON.stringify(that.shoppingCartCount));
				}
				let params = {};
				if(this.bugType == 2) {
					params.body = {
						//shoppingCartIds: this.shoppingCartIds,
						commodityId: that.commodityId,
						receiverId: that.receiverId,
						commoditySkuAttrIds: that.commoditySkuAttrIds,
						commodityCount: that.shoppingCartCount[that.commodityId]
					}

				} else if(that.bugType == 1) {
					params.body = {
						shoppingCartCount: that.shoppingCartCount,
						receiverId: that.receiverId,
					}
				} else {
					return false;
				}
				params.header = {
					token: that.token,
					time_stamp: new Date().getTime()
				}
				if(that.isCondition(that.couponId)) {
					params.body.couponId = that.couponId;
				}
				axios.post(this.mmsHost + "/mms/servlet/calculateOrderFreight", params).then(function(res) {
					that.OrderFreightdata = res.data;
					that.sellerFavorableToatlList = res.data.sellerFavorableToatlList;
					that.totalPrice = res.data.totalPrice;
					//that.commitPrice = parseFloat(Number(res.data.realTotalPrice) + Number(res.data.totalFreight ? res.data.totalFreight : 0)).toFixed(2);

					that.commitPrice = parseFloat(Number((parseFloat(Number(res.data.realTotalPrice) - res.data.couponMoney)) > 0 ? (parseFloat(Number(res.data.realTotalPrice) - res.data.couponMoney)) : "0.00") + Number(res.data.totalFreight ? res.data.totalFreight : 0)).toFixed(2);
					that.cTotalPriceMap = res.data.cTotalPriceMap;
					that.redecedKeyMap = res.data.redecedKeyMap;
					that.totalReducePrice = res.data.totalReducePrice;
					that.totalFreight = res.data.totalFreight ? res.data.totalFreight : "0.00";
					that.couponMoney = res.data.couponMoney ? res.data.couponMoney : "0.00";

					if(that.couponMoney <= 0) {
						that.couponId = "";
						that.couponId2= "";
						that.conponId2Index=-1;
					}
					if (!that.firstChooseState||that.couponId!='') {
						that.couponMoneyText = "优惠了" + that.couponMoney + "元";
					}			
					that.getConfirmOrderCoupon();
					if(res.data.result == 0) {
						if(that.isCondition(id)) {
							that.shoppingCartCount[id] = num;
							sessionStorage.setItem("shoppingCartCount", JSON.stringify(that.shoppingCartCount));
						}
					}
					/*for (let i=0;i<res.data.commoditySku.length;i++) {
						that.skuSelectList.push('0000')
					}*/
				}, function(res) {})
			},
			getConfirmOrderCoupon: function() {
				var that = this;
				let params = {};
				params.body = {
					cTotalPriceMap: that.cTotalPriceMap,
					redecedKeyMap: that.redecedKeyMap
				}
				params.header = {
					token: this.token,
					time_stamp: new Date().getTime()
				}
				axios.post(this.mmsHost + "/mms/servlet/getConfirmOrderCoupon", params).then(function(res) {
					that.availableList = res.data.availableList;
					that.unavailableList = res.data.unavailableList;
					if (that.couponId2!='') {
						for(var i=0;i<res.data.availableList.length;i++){
							if (res.data.availableList[i].couponId==that.couponId2) {
								that.couponMoneyC=res.data.availableList[i].couponMoney;
								that.conponId2Index=i;
								break;
							}
						}
					}
				}, function(res) {})

			},
			saveMultiCommodityOrder: function(categoryType, shoppingCartCount, commodityCount, commoditySkuId) {
				var that = this;
				let params = {};
				if(shoppingCartCount == 'aaa') {
					params.body = {
						categoryType: 2,
						orderSource: 2, //下单来源微信
						areaOrgaSeq: this.areaCode,
						commodityId: this.commodityId,
						commodityCount: that.shoppingCartCount[that.commodityId],
						commoditySkuId: commoditySkuId,
						receiverId: this.receiverId,
						totalPrice: this.totalPrice,
						commitPrice: this.commitPrice,
						freightList: this.OrderFreightdata.sellerFreight,
						sellerReducedFeeList: this.OrderFreightdata.sellerReducedFeeList,
						sellerRemark: this.sellerRemark,
					};
				} else {
					params.body = {
						categoryType: 2,
						orderSource: 2,
						shoppingCartCount: this.shoppingCartCount,
						areaOrgaSeq: this.areaCode,
						receiverId: this.receiverId,
						totalPrice: this.totalPrice,
						commitPrice: this.commitPrice,
						freightList: this.OrderFreightdata.sellerFreight,
						sellerReducedFeeList: this.OrderFreightdata.sellerReducedFeeList,
						sellerRemark: this.sellerRemark,
					};
				}
				params.header = {
					token: this.token,
					time_stamp: new Date().getTime()
				};
				if(!this.isCondition(this.receiverId)) {
					lxjTip.msg('请选择收货地址', {
						time: 3000
					});
					return false;
				}
				if(this.saveState) {
					return false;
				}
				if(this.isCondition(this.couponId)) {
					params.body.couponId = this.couponId;
				}
				this.saveState = true;
				axios.post(this.mmsHost + "/mms/servlet/saveMultiCommodityOrder", params).then(function(res) {
					//that.OrderFreightdata = res.data;
					if(res.data.result == 0) {
						var newCommitPrice = res.data.newCommitPrice ? res.data.newCommitPrice : "0.00";
						if( newCommitPrice <= 0) {
							lxjTip.msg('支付成功');
								setTimeout(() => {
									that.$router.replace({
										name: 'paySuccess',
										params: {}
									});
								}, 500);													
						} else {
							that.verifyCommodityOrder(res.data.orderNo);
						}
											
					} else {
						if(res.data.result == "005"&&res.data.reason =="Incorrect result size: expected 1, actual 0"){
							lxjTip.alert("优惠券已被使用")
						}else{
							lxjTip.alert(res.data.reason)
						    that.saveState = false;
						}
						
					}
				}, function(res) {
					that.saveState = false;
				})
			},
			accreditAjax: function() {
				var that = this;
				var params = {
					body: {
						surl: window.location.href.split('#')[0],
						signatureUrl: window.location.href.split('#')[0],
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
						that.appId = res.data.appid
						wx.config({
							debug: false,
							appId: res.data.appid,
							timestamp: res.data.timestamp,
							nonceStr: res.data.noncestr,
							signature: res.data.signature,
							jsApiList: ["hideAllNonBaseMenuItem", 'chooseWXPay']
						});
						wx.ready(function() {
							wx.hideAllNonBaseMenuItem();
						});
					}
				}, function(res) {});
			},
			verifyCommodityOrder: function(orderN) {
				var that = this;
				let params = {
					body: {
						orderNo: orderN,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/verifyCommodityOrder", params).then(function(res) {
					if(res.data.result == 0) {
						if(res.data.statusFlag == 1 && res.data.priceFlag == 1 && res.data.giftBagLimitFlag == 1) {
							that.getPayInfo(orderN);
						} else {
							if(res.data.statusFlag == 0) { //没有此商品,关闭订单
								lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
									skin: 'demo3',
									yes: function(index) {
										lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									}
								});
								that.cancelOrder(orderN);
							} else if(res.data.priceFlag == 0) {
								//订单价格信息有变动
								that.getChangedOrderInfo(orderN);
							}
						}
					}

				}, function(res) {})
			},
			//关闭订单
			cancelOrder: function(orderN) {
				var that = this;
				let params = {
					body: {
						totalOrderNo: orderN,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/cancelNotPayOrder", params).then(function(res) {}, function(res) {})
			},
			//订单价格变更
			getChangedOrderInfo: function(orderN) {
				var that = this;
				let params = {
					body: {
						totalOrderNo: orderN,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getChangeOrderInfo", params).then(function(res) {
					if(res.data.result == 0) {
						if(res.data.breakOrderStatus != 1) {
							lxjTip.confirm('订单信息已更改，请重新确认!', {
								skin: 'demo3',
								yes: function(index) {
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
									that.verifyCommodityOrder(orderN);
								}
							});
							that.commitPrice = res.data.payPrice;
						} else {
							lxjTip.confirm('订单信息已更改，订单即将关闭，请重新购买！', {
								skin: 'demo3',
								yes: function(index) {
									lxjTip.close(); //如果设定了yes回调，需进行手工关闭
								}
							});
							that.cancelOrder(orderN);
						}
					}
				}, function(res) {})
			},
			//开始生成预付款订单信息
			getPayInfo: function(orderN) {
				var that = this;
				let params = {
					body: {
						pay_method: "5",
						orderNo: orderN,
						appid: this.appId,
						channel_flag: "3",
						openid: this.$store.state.openid,
						//openid: this.$store.state.openid,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getWxPrepayidRequest", params).then(function(res) {
					var sd = res.data;
					//lxjTip.msg(res.data);
					//that.onBridgeReady(sd.obj.appid, sd.obj.timestamp, sd.obj.noncestr, sd.obj.package, sd.obj.sign, orderN)
					wx.chooseWXPay({
						timestamp: sd.obj.timestamp,
						nonceStr: sd.obj.noncestr,
						package: sd.obj.package,
						signType: "MD5",
						paySign: sd.obj.sign,
						success: function(res) {
							//var msgee=JSON.stringify(res)
							that.getWxPayOrderStatus(orderN, that.appId)
						},
						cancel: function(res) {
							//var msgee=JSON.stringify(res)
							that.getWxPayOrderStatus(orderN, that.appId)
						},
						fail: function(res) {
							//var msgee=JSON.stringify(res)
							lxjTip.alert(res)
						}
					});
					//that.OrderFreightdata = res.data;
					/*for (let i=0;i<res.data.commoditySku.length;i++) {
						that.skuSelectList.push('0000')
					}*/
				}, function(res) {})
			},
			onBridgeReady: function(appId, timeStamp, nonceStr, ppackage, paySign, orderN) {
				var that = this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": appId,
						"timeStamp": timeStamp,
						"nonceStr": nonceStr,
						"package": ppackage,
						"signType": "MD5",
						"paySign": paySign
					},
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {
							//lxjTip.msg('支付成功');
							that.getWxPayOrderStatus(orderN, appId)
						} else {
							lxjTip.msg('取消支付');
							that.getWxPayOrderStatus(orderN, appId)
						} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
					}
				);
			},
			//获取支付结果
			getWxPayOrderStatus: function(orderN, appid) {
				var that = this;
				let params = {
					body: {
						orderNo: orderN,
						pay_method: "5",
						channel_flag: "3",
						appid: appid,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/getWxPayOrderStatus", params).then(function(res) {
						if(res.data.result == 0) {
							if(res.data.obj.trade_state == 'SUCCESS') {
								lxjTip.msg('支付成功');
								setTimeout(() => {
									that.$router.replace({
										name: 'paySuccess',
										params: {}
									});
								}, 500);
							} else {
								that.$router.replace({
									name: 'myOrder',
									params: {
										orderStatus: "0",
										orderStatusName: "待付款"
									}
								});
							}
						} else {
							that.$router.replace({
								name: 'myOrder',
								params: {
									orderStatus: "0",
									orderStatusName: "待付款"
								}
							});
						}
					},
					function(res) {
						lxjTip.msg("网络失败")
					})
			},
			//缓存商品数量
			getCommodityCounts: function(list) {
				let shoppingCartCountg = {};
				for(var i = 0; i < list.length; i++) {
					for(var j = 0; j < list[i].commodityList.length; j++) {
						shoppingCartCountg[list[i].commodityList[j].id ? list[i].commodityList[j].id : list[i].commodityList[j].commodityId] = list[i].commodityList[j].commodityCount;
					}
				}
				return shoppingCartCountg;
			},
			beforesaveMultiCommodityOrder: function() {
				if(this.bugType == '2') {
					//开始商品购买流程
					this.saveMultiCommodityOrder(2, 'aaa', this.commodityCounts, this.sellerList[0].commodityList[0].commoditySkuId)
				} else {
					//开始购物车购买流程

					this.saveMultiCommodityOrder(2, this.shoppingCartCount)
				}

			},
			getSellerPriceItem: function(items, list, key) {
				let PriceItem = {};
				for(var i = 0; i < list.length; i++) {
					if(list[i].sellerId == items.sellerId) {
						var numt = 0;
						PriceItem["price"] = Number(list[i].sellerTotalPrice) + Number(list[i].freight ? list[i].freight : 0) - Number(list[i].redecedFee ? list[i].redecedFee : 0);
						for(var j = 0; j < items.commodityList.length; j++) {
							numt = this.shoppingCartCount[items.commodityList[j].id ? items.commodityList[j].id : items.commodityList[j].commodityId] + numt
						}
						PriceItem["counts"] = numt;
						PriceItem["privilege"] = (list[i].freePriceInfo ? list[i].freePriceInfo : '') + "   " + (list[i].freightInfo ? list[i].freightInfo : '');
						PriceItem["freightInfo"] = (list[i].freightInfo ? list[i].freightInfo : '');
						PriceItem["freight"] = (list[i].originalFreight ? String(parseFloat(list[i].originalFreight).toFixed(2)) : "0.00");
						PriceItem["redecefreight"] = String(parseFloat((list[i].originalFreight ? list[i].originalFreight : 0) - (list[i].freight ? list[i].freight : 0)).toFixed(2));
						PriceItem["redecedFee"] = (list[i].redecedFee ? String(parseFloat(list[i].redecedFee).toFixed(2)) : "0.00");
						break;
					}
				}
				return PriceItem[key];
			},
			//增加数量操作
			addData: function(id, num, stockQuantity) {
				//this.getWxPayOrderStatus(0,0);
				//return false;
				//var newItem = item;
				if(num >= stockQuantity) {
					lxjTip.msg('亲，老板没那么多存货呢!', {
						time: 1500
					});
					return false;
				}
				if(num >= 100) {
					lxjTip.msg('亲，商品购买数量已达上限了!', {
						time: 1500
					});
					return false;
				}
				num++;
				this.calculateOrderFreight(id, num);
				//newItem.shoppingCartCount = Number(item.shoppingCartCount) + 1;
				//vue.addShoppingcart(newItem.id, count, e, newItem);
			},
			//减少数量操作
			reduceData: function(id, num) {
				if(num <= 1) {
					return false;
				}
				num--;
				this.calculateOrderFreight(id, num);
				//vue.addShoppingcart(newItem.id, cont, e, newItem);
			},
			focusInput: function() {
				this.inputFocusState = true;
			},
			blurInput: function(id, stockQuantity, num) {
				if(num == '') {
					num = 1;
				}
				if(isNaN(num)) {
					num = 1;
				}
				if(num <= 0) {
					num = 1;
				}
				if(num > 100) {
					lxjTip.msg('亲，商品购买数量已达上限了!', {
						time: 1500,
						skin: 'demo1'
					});
					num = 100;
				}
				if(stockQuantity < num) {
					lxjTip.msg('亲，老板没那么多存货呢!', {
						time: 1500,
						skin: 'demo1'
					});
					num = stockQuantity;
				}
				this.calculateOrderFreight(id, num);
			},
			selectAddress: function() {
				this.$router.push({
					path: '../personal/address/',
					name: 'address',
					params: {
						hadChooseReceiverId: this.receiverId,
						chooseState: 2
					}
				})
			},
			showCouponInfo: function() {
				this.couponSelectInfoShow = true;
				this.firstChooseState=false;
				this.couponMoneyText = "优惠了" + this.couponMoney + "元";
				var eleG = document.getElementById("couponInfoI");
				setTimeout(function() {
					eleG.style.maxHeight = "9rem";
				}, 10)
			},
			aminateFun: function(state) {
				var that = this;
				var eleG = document.getElementById("couponInfoI");
				eleG.style.maxHeight = "0";
				setTimeout(function() {
					that.couponSelectInfoShow = false;
				}, 600)
				if(state) {
					this.couponId = this.couponId2;
					sessionStorage.setItem("couponId",this.couponId)
					this.calculateOrderFreight();
				}else{
					this.couponId2 = this.couponId;
					if (this.couponId2!='') {
						for(var i=0;i<this.availableList.length;i++){
							if (this.availableList[i].couponId==this.couponId2) {
								this.couponMoneyC=this.availableList[i].couponMoney;
								this.conponId2Index=i;
								break;
							}
						}
					}else{
						this.conponId2Index=-1;
					}
				}
			},
			ruleShowAnimate: function(event) {
				var e=event.target;

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
			changeModel: function(i) {
				this.couponShowModel=i
			},
			chooseCoupon: function(id,money1,indexN) {
				if(indexN==this.conponId2Index){
					this.couponId2="";
					this.conponId2Index=-1;
				}else{
					this.couponId2=id;
					this.couponMoneyC=money1;
					this.conponId2Index=indexN;
				}
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			getbasicData: function() {
				this.$route.params.bugType ? sessionStorage.setItem("confirmOrderbugType", this.$route.params.bugType) : this.bugType = sessionStorage.getItem("confirmOrderbugType");
				if(this.bugType == 1) {
					this.$route.params.shoppingCartIds ? sessionStorage.setItem("confirmOrdershoppingCartIds", this.$route.params.shoppingCartIds) : this.shoppingCartIds = (sessionStorage.getItem("confirmOrdershoppingCartIds")).split(',');
				} else {
					this.$route.params.commoditySkuAttrIds ? sessionStorage.setItem("confirmOrdercommoditySkuAttrIds", this.$route.params.commoditySkuAttrIds) : this.commoditySkuAttrIds = (sessionStorage.getItem("confirmOrdercommoditySkuAttrIds")).split(',');
					this.$route.params.commodityId ? sessionStorage.setItem("confirmOrdercommodityId", this.$route.params.commodityId) : this.commodityId = sessionStorage.getItem("confirmOrdercommodityId");
					this.$route.params.commodityCounts ? sessionStorage.setItem("confirmOrdercommodityCounts", this.$route.params.commodityCounts) : this.commodityCounts = sessionStorage.getItem("confirmOrdercommodityCounts");
				}
				if(this.isCondition(sessionStorage.getItem("hadChooseReceiverId"))) {
					this.getUserReceiverInfo(sessionStorage.getItem("hadChooseReceiverId"));
				} else {
					this.getUserReceiverInfo();
				}
				this.accreditAjax();
			},

		},
		mounted: function() {
			if(window.location.href.indexOf("pageFrom=wx") >= 0) {} else {
				var sst = this.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx" + window.location.hash;
				window.location.replace(sst)
			}
			console.log(this.commoditySkuAttrIds);
			this.getbasicData();
		},
		watch: {
			shoppingCartCount(newVal, oldVal) {},
			commitPrice(newVal, oldVal) {
				this.commitPrice = newVal;
			},
			couponId2(newVal, oldVal) {
				
			},

		}
	}

	//function 
	/*if(typeof WeixinJSBridge == "undefined") {
		if(document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if(document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}*/
</script>
<style scoped="scoped">
	.line_01 {
		width: 100%;
		height: 1px;
		background-color: #eee;
		/*transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5)*/
	}
	
	.line_01box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
	}
	
	.receiverInfo {
		width: 100%;
		padding: 0.18rem 0.14rem 0.17rem;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background-color: #fff;
		color: #555;
		font-size: 0.14rem;
	}
	
	.receiverNone {
		flex-grow: 2;
		color: #555;
		font-size: 0.14rem;
		line-height: 0.16rem;
	}
	
	.receiverLogo {
		width: 0.18rem;
		flex-grow: 0;
		flex-shrink: 0;
		padding-right: 0.14rem;
	}
	
	.receiverInfo_box {
		width: 10%;
		flex-grow: 3;
	}
	
	.receiverName {
		width: 100%;
		display: flex;
	}
	
	.receiverName span:nth-child(1) {
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.receiverName span:nth-child(2) {
		flex-shrink: 0;
		padding-left: 0.2rem;
	}
	
	.receiverDetail {
		width: 100%;
		padding-top: 0.1rem;
		line-height: 0.2rem;
	}
	
	.receiverLogo img,
	.moreLogo img {
		width: 100%;
		height: auto;
		display: block;
	}
	
	.moreLogo {
		width: 0.07rem;
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	.sellerList {
		width: 100%;
		box-sizing: border-box;
		margin-top: 0.12rem;
		background-color: #fff;
	}
	
	.sellerName {
		width: 100%;
		box-sizing: border-box;
		padding: 0.12rem 0.14rem;
		display: flex;
		align-items: center;
	}
	
	.sellerName img {
		width: 0.18rem;
		height: auto;
		display: block;
		flex-shrink: 0;
		flex-grow: 0;
		padding-right: 0.14rem;
	}
	
	.sellerName span {
		color: #333;
		font-size: 15px;
		font-size: 0.153rem;
		line-height: 0.2rem;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.sellerList .commodity,
	.invalidList .commodity {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #f8f8f8;
		color: #333;
		display: flex;
		align-items: flex-start;
		margin-top: 0.1rem;
	}
	
	.invalidList {
		width: 100%;
		box-sizing: border-box;
		margin-top: 0.12rem;
		background-color: #fff;
		padding-bottom: 0.1rem;
	}
	
	.invalidList .sellerName {
		color: #FC9153;
	}
	
	.invalidList .commodityName {
		color: #aaa;
	}
	
	.invalidList .commodityPriceS {
		color: #aaa;
	}
	
	.invalidList .commodityNumber {
		color: #aaa;
		font-size: 0.17rem;
	}
	
	.sellerList .commodity:nth-child(2),
	.invalidList .commodity:nth-child(2) {
		margin-top: 0;
	}
	
	.commodityImg {
		width: 0.8rem;
		height: 0.8rem;
		flex-shrink: 0;
		flex-grow: 0;
		margin: 0.15rem 0.14rem 0.15rem 0;
		background-color: #fff;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}
	
	.commodityInfo {
		flex-grow: 2;
	}
	
	.commodityInfo .commodityName {
		width: 100%;
		line-height: 0.22rem;
		font-size: 14px;
		font-size: 0.14rem;
		height: 0.44rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		margin-top: 0.11rem;
	}
	/*.sellerList .commodityInfo .commodityName {
		width: 100%;
		line-height: 0.22rem;
		height: 0.44rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}*/
	
	.commodityInfo .commodityDetail {
		line-height: 0.22rem;
		width: 100%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		color: #aaa;
		font-size: 12.6px;
		font-size: 0.126rem;
	}
	
	.commodityPrice {
		width: 100%;
		display: flex;
		align-items: flex-end;
	}
	
	.commodityPriceS {
		flex-grow: 2;
		color: #FC9153;
		font-size: 17.3px;
		font-size: 0.173rem;
	}
	
	.commodityPriceS span {
		font-size: 17.3px;
		font-size: 0.173rem;
	}
	
	.commodityPriceS span.minproductPrice {
		font-size: 12px;
		font-size: 0.12rem;
	}
	
	.commodityNumber {
		display: flex;
		align-items: center;
	}
	
	.reducebt {
		width: 0.26rem;
		height: 0.26rem;
		background-image: url(../../../static/images/list_btn_ic_subtract@3x.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.addbt {
		width: 0.26rem;
		height: 0.26rem;
		background-image: url(../../../static/images/list_btn_ic_add@3x.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.reducefall {
		background-image: url(../../../static/images/ic_cut_-no-active-.png)!important;
	}
	
	.addbfall {
		background-image: url(../../../static/images/ic_add_-active_no.png)!important;
	}
	
	.bugNumber {
		width: 0.33rem;
		height: 0.2rem;
		text-align: center;
		outline: none;
		font-size: 0.16rem;
		line-height: 0.2rem;
		background-color: #F8F8F8;
	}
	
	.orderInfo {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
	}
	
	.freightInfo_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0.2rem 0;
		display: flex;
		align-items: center;
	}
	
	.freightInfo_box span:nth-child(1) {
		flex-grow: 2;
		line-height: 0.2rem;
		font-size: 0.14rem;
		flex-shrink: 0;
		color: #333;
	}
	
	.freightInfo_box span:nth-child(2) {
		flex-grow: 0;
		line-height: 0.2rem;
		font-size: 0.14rem;
		text-decoration: line-through;
		color: #333;
	}
	
	.privilege span:nth-child(2) {
		text-decoration: none;
	}
	
	.freightInfo_box span:last-child {
		flex-grow: 0;
		padding-left: 0.08rem;
		line-height: 0.2rem;
		font-size: 0.14rem;
		color: #333;
		text-decoration: none;
	}
	
	.privilege span:last-child {
		color: #555;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.leaveWord_box {
		width: 100%;
		display: flex;
		align-items: flex-start;
	}
	
	.leaveWord_box span {
		font-size: 15px;
		font-size: 0.15rem;
		line-height: 0.21rem;
		padding-top: 0.15rem;
	}
	
	.leaveWord_box textarea {
		flex-grow: 2;
		margin: 0.16rem 0 0.14rem;
		font-size: 0.14rem;
		line-height: 0.2rem;
		height: 0.6rem;
		outline: none;
		resize: none;
		border: none;
	}
	
	.leaveWord_box textarea::-webkit-input-placeholder {
		color: #CCCCCC;
	}
	
	.storeTotalprice {
		width: 100%;
		display: flex;
		align-items: flex-end;
		font-size: 0.14rem;
		line-height: 0.3rem;
		box-sizing: border-box;
		padding: 0.08rem 0;
	}
	
	.storeTotalprice .commodityPriceS {
		flex-grow: 0;
		height: 0.3rem;
	}
	
	.flew_grow2 {
		flex-grow: 2;
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
		align-items: center;
		justify-content: flex-end;
	}
	
	.saveOrder {
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
	
	.saveOrder span {
		font-size: 17.3px;
		font-size: 0.173rem;
	}
	
	.totailPrice {
		flex-grow: 2;
		padding-left: 0.14rem;
	}
	
	.totailPricetext {
		font-size: 0.16rem;
		color: #222;
	}
	
	.totalInfoBox {
		width: 100%;
		margin-top: 0.1rem;
	}
	
	.chooseCouponBox {
		width: 100%;
		background-color: #fff;
		line-height: 0.5rem;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
	}
	
	.chooseCouponText1 {
		font-size: 0.14rem;
		line-height: 0.5rem;
		padding-left: 0.14rem;
		text-align: left;
		flex-grow: 2;
		-webkit-flex-grow: 2;
		color: #333;
	}
	
	.chooseCouponText2 {
		font-size: 0.14rem;
		line-height: 0.5rem;
		text-align: left;
		color: #555;
	}
	
	.chooseCouponColor {
		color: #999;
	}
	
	.chooseCouponBox img {
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		width: 0.16rem;
		height: 0.16rem;
		padding: 0.12rem 0.14rem 0.12rem 0.12rem;
		display: block;
	}
	
	.chooseCouponBox2 {
		width: 100%;
		background-color: #fff;
		margin-top: 0.1rem;
		padding: 0 0.14rem;
		box-sizing: border-box;
	}
	
	.couponPriceInfo {
		width: 100%;
		padding: 0.11rem 0;
		box-sizing: border-box;
	}
	
	.couponPriceTextBox {
		width: 100%;
		display: flex;
		display: -webkit-flex;
	}
	
	.couponPriceTextBox span {
		font-size: 0.144rem;
		line-height: 0.246rem;
		color: #555;
	}
	
	.couponPriceTextBox span:nth-child(1) {
		flex-grow: 2;
		-webkit-flex-grow: 2;
		text-align: left;
	}
	
	.couponPriceTextBox span:nth-child(2) {}
	
	.couponPriceInfo2 {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-direction: row-reverse;
		flex-direction: row-reverse;
	}
	
	.couponPriceTextBox2 {
		min-width: auto;
		line-height: 0.446rem;
		font-size: 0.14rem;
	}
	/*优惠券弹窗*/
	
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
		background-color: #fff;
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
		min-height: 4.79rem;
		max-height: 4.79rem;
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
	
	#yesCouponBoxMain .couponInfoItem:first-child {
		padding-top: 0;
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
		color: #fff;
	}
	
	.couponInfoPB .smallF {
		font-size: 0.2rem;
		line-height: 0.33rem;
		color: #fff;
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
		font-size: 0.14rem;
		color: #333;
		padding-left: 0.08rem;
	}
	
	.couponInfoType1 span.quanLogo {
		color: #52acff;
		font-size: 0.11rem;
		line-height: 0.18rem;
		border-radius: 0.026rem;
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
		height: 0.193rem;
		background-color: #FC9153;
		border-radius: 0.13rem;
		color: #fff;
		font-size: 0.14rem;
		line-height: 0.18rem;
		text-align: center;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		margin-right: 0.14rem;
	}
	
	.couponInfoTime .couponGetbt {
		width: 0.78rem;
		height: 0.193rem;
		background-color: #fff;
		border-radius: 0.13rem;
		border: 1px solid #FC9153;
		color: #FC9153;
		font-size: 0.14rem;
		line-height: 0.18rem;
		text-align: center;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		margin-right: 0.14rem;
	}
	
	.couponInfoTime span:first-child {
		font-size: 0.12rem;
		color: #999;
		line-height: 0.193rem;
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
		font-size: 0.13rem;
		line-height: 0.18rem;
		padding-left: 0.14rem;
		max-height: 0.18rem;
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
		max-height: 3rem!important;
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
	
	.couponInfoBoxTitle2 {
		width: 100%;
		height: 0.51rem;
		box-sizing: border-box;
		padding: 0 0.5rem;
		background-color: #fff;
		display: flex;
		display: -webkit-flex;
	}
	
	.yesCouponInfo {}
	
	.nothing1 {
		flex-grow: 2;
		-webkit-flex-grow: 2;
	}
	
	.couponInfoTitle2Text {
		height: 0.476rem;
		line-height: 0.51rem;
		color: #aaa;
		font-size: 0.15rem;
	}
	
	.couponInfoTitle2colorR {
		height: 0.03rem;
		background-color: #fff;
	}
	
	.focuOn .couponInfoTitle2colorR {
		background-color: #FC9153;
	}
	
	.focuOn .couponInfoTitle2Text {
		color: #333;
	}
	
	.yesCouponBoxMain1 {
		color: #555;
		font-size: 0.15rem;
		line-height: 0.4rem;
		height: 0.4rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #F3F4F5;
	}
	
	.yesCouponBoxMain1>span {
		color: #FC9153;
	}
	
	.yesCouponBoxMainShort {
		min-height: 3.74rem;
		max-height: 3.74rem;
	}
	
	.couponConfirm {
		width: 100%;
	}
	
	.couponConfirmbt {
		margin: 0.11rem 0.14rem;
		text-align: center;
		line-height: 0.43rem;
		font-size: 0.173rem;
		color: #FFF;
		background-color: #FC9153;
	}
	
	.noCouponBoxMainS {
	}
	
	.couponInfo1 img {
		width: 0.22rem;
		height: 0.22rem;
		padding-right: 0.14rem;
		padding-top: 0.45rem;
	}
	
	.imgKongCoupon {
		width: 100%;
	}
	
	.imgKongCouponImg {
		width: 100%;
		text-align: center;
		padding-top: 1.2rem;
	}
	
	.imgKongCouponImg img {
		width: 1.8rem;
		height: 1.8rem;
		display: inline-block;
	}
	
	.imgKongCouponText {
		width: 100%;
		color: #ccc;
		font-size: 0.173rem;
		line-height: 0.45rem;
		text-align: center;
	}
</style>