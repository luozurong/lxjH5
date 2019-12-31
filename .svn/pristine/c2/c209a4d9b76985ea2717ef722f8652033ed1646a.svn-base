<template>
	<div v-title data-title="优惠商品使用列表" class="couponCommodities">

		<div class="marketing" id="marketing">
			<!--<scroller :noDataText="noDataText" :on-infinite="infinite">
				<div class="vue-load" style="margin-top:-1px;height:1px;"></div>
				<div class="prefecture-floor2">
					<div class="listBox">
						<div class="prefecture-floor2-item" v-for="(item,index) in commodityListArray" v-on:click="turnToproductDetail(item.id)" :key="index">
							<div class="picture"><img v-bind:src="item.logo" alt="" /></div>
							<div class="info">
								<div class="title">
									{{item.name}}
								</div>
								<div class="introduce">{{item.commodityDetails}}</div>
								<div class="price">¥{{splitNum(item.currentPrice)[0]}}.<span class="minfont">{{splitNum(item.currentPrice)[1]}}</span><span class="fufen" v-show="item.fufen>0">赠<span class="fufenNum">{{item.fufen}}</span>福分</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroller>-->

			<scroller :no-Data-Text="noDataText4" :on-infinite="infinite">
				<div class="vue-load"></div>
				<div class="marketing-floor1">
					<div class="marketing-banner" :class="{bannerNone:banner==''}"></div>
					<div class="commodityItemBox">
						<div class="commodityItemBox2" v-for="(item,index) in commodityList">
							<div class="commodityItem" v-on:click="goDetail(item.id)">
								<img class="commodityItemImg" v-bind:src="item.thumLogo" />
								<div class="commodityInfo">
									<div class="commodityName">
										{{item.name}}
									</div>
									<div class="commodityPrice">
										<span class="prcieBox"><span class="newPrice bigPrice">¥<span class="bigPrice" v-text="String(parseFloat(item.skuMinPrice).toFixed(2)).split('.')[0]">0</span>.<span v-text="String(parseFloat(item.skuMinPrice).toFixed(2)).split('.')[1]" class="smallPrice">00</span></span><span class="oldPrice" v-if="item.originalPrice>0">¥{{item.originalPrice}}</span></span>
										<img v-on:click="selectSku(item.id)" src="../product/images/btn_ic_shopping-car@3x.png" />
									</div>
								</div>
							</div>
							<div class="line_01">
							</div>
						</div>

					</div>
				</div>
			</scroller>
			<div class="footerButton" v-on:click="goShoppingcart()">
				去购物车
			</div>
		</div>
		<div class="bgTangcan" v-show="skuShowstate>0">
			<div class="bugInfo_box" v-show="bugInfoAminateS">
				<div class="bugInfo" id="bugInfoAminate" v-if="productInfoData!=null">
					<div class="closeLogo" v-on:click="closeSelecSku()">
						<img src="../product/images/btn_ic_close@3x.png" />
					</div>
					<div class="bugprizeInfo" v-show="!inputFocusState">
						¥<span v-if="selectPrice!=null&&giftbagId==''"><span v-text="String(parseFloat(selectPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(selectPrice).toFixed(2)).split('.')[1]">00</span></span><span v-if="selectPrice==null&&giftbagId==''"><span v-text="String(parseFloat(productInfoData.product[0].minPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.product[0].minPrice).toFixed(2)).split('.')[1]">00</span></span><span v-if="productInfoData.product[0].minPrice<productInfoData.product[0].maxPrice&&selectPrice==null"> ~ ¥<span><span v-text="String(parseFloat(productInfoData.product[0].maxPrice).toFixed(2)).split('.')[0]"></span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.product[0].maxPrice).toFixed(2)).split('.')[1]">00</span></span>
						</span>
						<span v-if="giftbagId!=''"><span v-text="String(parseFloat(productInfoData.giftBagPrice).toFixed(2)).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(parseFloat(productInfoData.giftBagPrice).toFixed(2)).split('.')[1]">00</span>
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
						<input type="tel" v-model="bugNumber" v-on:blur="blurInput()" disabled="disabled" v-on:focus="focusInput()" name="bugNumber" id="bugNumber" value="1" />
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
				/*noDataText: '没有更多了',
				infiniteFlag: true,
				commodityListArray: [],
				setTime: 0,
				pageNum: 0,
				advertisingImg: "",
				shoppingCarInfo: {
					realTotalPrice: "0.00",
					reason: "",
					result: "0",
					totalCount: 0,
					totalPrice: "0.00",
					totalReducePrice: "0.00",
					userAccount: ""
				},//购物车默认数据
				mmsHost: this.$store.state.mmsHost,
				activityId: this.$route.params.activityId,*/

				//	isVisitor: isVisitor, //游客判断
				shoppingCartInfo: [], //购物车信息
				commodityNId: null,
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
				bugInfoAminateS: false,
				couponId: this.$route.params.couponId, //15242051008915e7cbb58d28473a9fde//153898123780e69b65fe7acf43d78d1d
				shoppingCartIdList: [],
				giftbagId: "",

				banner: '',

				commodityList: [],
				collectFlag: true,
				noDataText4: '抱歉，没有更多了',
				setTime: 0,
				pageNum: 0,
				titleName: '',
				mmsHost: this.$store.state.mmsHost,

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
				if(!this.collectFlag) {
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
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},

			splitNum(numberN) {
				var Num = numberN;
				var Nums = new Array();
				Nums = (Num + "").split(".");
				return Nums;
			},
			getshoppingNum() {
				var that = this;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						type: "1",
						areaOrgSeq: this.$store.state.organizationSeq
					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getShoppingcartCountServlet?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					if(response.data.result == 0) {
						that.shoppingCarInfo = response.data;
					}
				});
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
						pageNum: this.pageNum,
						pageSize: 10,
						organizationSeq: this.$store.state.organizationSeq,
						couponId: this.couponId

					}
				};
				var paramsStr = JSON.stringify(params);
				var httpURL = "/mms/servlet/getCouponComoditys?str=" + paramsStr;
				axios.post(httpURL).then(function(response) {
					console.log(response);

					/*if(response.data.result == 0) {
						for(var i = 0; i < response.data.commodityList.length; i++) {
							that.commodityList.push(response.data.commodityList[i]);
						}
						if(response.data.commodityList.length < 8) {
							that.infiniteFlag = false;
						}
					}
					doneFunc();
					that.setTime = 500;*/

					that.banner = "1";
					for(var i = 0; i < response.data.commodityList.length; i++) {
						that.commodityList.push(response.data.commodityList[i]);
					}
					if(response.data.commodityList.length < 10) {
						that.collectFlag = false
					}

					doneFunc();
					that.setTime = 500;
				});
			},
			getCommodityDetail: function(commodityId) {
				var that = this;
				var params = {
					body: {
						areaOrgSeq: this.$store.state.organizationSeq,
						commodityId: commodityId,
						shoppingCartType: '1',
						giftbagId: this.giftbagId
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
				var httpURL = this.mmsHost + "/mms/servlet/getCommodityDetail?str=" + paramsStr;
				/*this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				})*/
				axios.post(this.mmsHost + "/mms/servlet/getCommodityDetail", params).then(function(res) {
					that.productInfoData = res.data;
					that.shoppingCartInfo = res.data.shoppingCartInfo;
					that.commoditySku = res.data.commoditySku;
					that.commodityNId = commodityId;
					that.skuList = res.data.skuList;
					that.skuSelectList = new Array(res.data.commoditySku.length);
					that.skuSelectDetailList = new Array(res.data.commoditySku.length);
					that.getskuisSelect(res.data.commoditySku);
					that.skuShowstate = 1;
				}, function(res) {})
			},
			addShoppingcart: function() {
				var that = this;
				var params = {
					body: {
						commodityId: this.commodityNId,
						areaOrgSeq: this.$store.state.organizationSeq,
						count: this.bugNumber,
						commoditySkuAttrIds: this.skuSelectList,
						commodityDetails: this.skuSelectDetailList.join("; "),
						type: 1
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/addShoppingcart", params).then(function(res) {
					//that.shoppingcartCount=res.data.totalCount<100?res.data.totalCount:'…';                  
					if(res.data.result == "0") {
						that.closeSelecSku();
						//that.skuShowstate = 0;
						lxjTip.msg("加入购物车成功");
						//that.getShoppingcartCount();
						that.getCommodityDetail(that.commodityNId);
						that.skuSelectList = new Array(that.productInfoData.commoditySku.length);
						that.skuSelectDetailList = new Array(that.productInfoData.commoditySku.length);
						if(that.shoppingCartIdList.length == 0 || that.shoppingCartIdList.join(',').indexOf(res.data.id) < 0) {
							that.shoppingCartIdList.push(res.data.id)
						}
					} else {
						lxjTip.msg("加入购物车失败");
					}
				}, function(res) {})
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
					/*sessionStorage.removeItem("shoppingCartCount");
					sessionStorage.removeItem("hadChooseReceiverId");
					showActivity(host + "/mms/html5/supermarket/confirmOrderNew.htm?commodityId=" + this.commodityId + "&commoditySkuAttrIds=" + this.skuSelectList + "&commodityCount=" + this.bugNumber + "&buyType=" + "2" + "&giftbagId=" + giftbagId, "确认订单");
					//this.skuShowstate = 0;
					that.closeSelecSku();
					this.skuSelectList = new Array(this.productInfoData.commoditySku.length);
					this.skuSelectDetailList = new Array(this.productInfoData.commoditySku.length);*/

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
			selectSku: function(id) {
				window.event.cancelBubble = true;
				//游客状态先走授权绑定流程
				/*if(this.isVisitor) {

					this.gologinFun();

					return false;
				}*/
				this.getCommodityDetail(id)
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
			closeSelecSku: function() {
				var that = this;
				var eleG = document.getElementById("bugInfoAminate");
				eleG.style.maxHeight = "0";
				setTimeout(function() {
					that.skuShowstate = 0;
				}, 600)
				//this.skuShowstate = 0;
			},
			focusInput: function() {
				this.inputFocusState = true;
			},
			blurInput: function() {
				this.inputFocusState = false;
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
				var lista = new Array();
				for(var i = 0; i < list.length; i++) {
					var listab = new Array();
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
			getTagBox: function() {
				var tagBoxList = new Array();
				var tagBox = this.commoditySku;
				for(var i = 0; i < this.skuSelectList.length; i++) {
					if(!this.isCondition(this.skuSelectList[i])) {
						var aa = {
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

			GetURLParameter: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;

			},
			/*goShoppingcart: function() {
				var shoppingCartIds = vue.shoppingCartIdList.join(',');
				showActivitySpecial(host + "/mms/html5/supermarket/" + decodeURI("shoppingcart.htm?shoppingCartIds=" + shoppingCartIds + "&type=1"), "购物车", 1, null);
			},*/
			goDetail: function(id) {
				window.event.cancelBubble = true;
				this.$router.push({
					name: 'productDetail',
					params: {
						commodityId: id
					}
				});
			},
			goShoppingcart: function() {
				window.event.cancelBubble = true;
				console.log(this.shoppingCartIdList)
				this.$router.push({
					path: '/shoppingcart',
					query: {
						shoppingCartIds: this.shoppingCartIdList
					}
				})

			},
		},
		mounted() {
			var that = this;
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			//if (this.$store.state.token.indexOf("_")>=0) {
			this.getshoppingNum();
			//}
			//
			this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function() {
				var imgLogo = that.$store.state.mmsHost + "/mms/html5/wechatH5/lxjlogo.png";
				var shareLink = that.$store.state.host + "/mms/html5/wechatH5/dist/index.htm?pageFrom=wx";
				var obj = {
					title: "联享家商城", //标题
					desc: '联享家商城，享优质新生活', //描述
					//link: window.location.href,
					link: shareLink,
					imgUrl: imgLogo
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
		},
		watch: {
			skuSelectList: function(newVal, oldVal) {
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
						if(this.isCondition(this.giftbagId)) {
							this.maxstockQuantity = 1;
						} else {
							this.maxstockQuantity = (this.totalStockQuantity < 100 ? this.totalStockQuantity : 100);
						}

					} else {
						this.maxstockQuantity = (this.totalStockQuantity < 100 ? this.totalStockQuantity : 100) - (this.getshoppingcarCount(this.skuSelectList.join(',')) ? this.getshoppingcarCount(this.skuSelectList.join(',')) : 0);
					}
				}
			},
			bugNumber: function(newVal, oldVal) {
				if(newVal == '') {}
				if(!isNaN(newVal)) {
					if(newVal > this.maxstockQuantity && this.maxstockQuantity > 0) {
						this.bugNumber = this.maxstockQuantity;
					}
				}
			},
			skuShowstate: function(newVal, oldVal) {

				if(newVal > 0) {
					this.bugInfoAminateS = true;
					setTimeout(function() {
						var eleG = document.getElementById("bugInfoAminate");
						eleG.style.maxHeight = "9rem";
					}, 10)
				} else {
					this.bugInfoAminateS = false;
				}
			}
		}
	}
</script>
<style scoped>
	.bannerNone {
		height: 1px;
	}
	
	input {
		outline: none;
		/*去ios内阴影、圆角*/
		-webkit-appearance: none;
		border-radius: 0;
		border: none;
		margin: 0;
		padding: 0;
		font-weight: normal;
	}
	
	input,
	textarea,
	a {
		-webkit-tap-highlight-color: transparent;
	}
	
	body {
		background: #f3f4f5;
	}
	
	[v-cloak] {
		display: none;
	}
	
	.marketing {
		background: #F3F4F5;
	}
	
	.marketing-floor1,
	.marketing-floor2,
	.marketing-floor3 {
		background: #F3F4F5;
	}
	
	._v-container {
		background: #F3F4F5;
	}
	
	.commodityItemBox {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
	}
	
	.commodityItemBox2 {
		width: 100%;
	}
	
	.commodityItemBox .commodityItemBox2:last-child .line_01 {
		display: none;
	}
	
	.line_01 {
		width: 100%;
		height: 1px;
		background-color: #cecece;
	}
	
	.commodityItem {
		width: 100%;
		padding: 0.14rem 0;
		height: 1.16rem;
		display: flex;
		display: -webkit-flex;
	}
	
	.commodityItemImg {
		width: 1.16rem;
		height: 1.16rem;
		display: block;
		background-color: #fff;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		border: none;
	}
	
	.commodityInfo {
		height: 1.16rem;
		flex-grow: 2;
		-webkit-flex-grow: 2;
		padding-left: 0.14rem;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: column;
		-webkit-justify-content: space-between;
		-webkit-flex-direction: column;
	}
	
	.commodityName {
		width: 100%;
		padding-top: 0.04rem;
		line-height: 0.24rem;
		color: #333;
		font-size: 0.16rem;
		word-break: break-all;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.commodityPrice {
		width: 100%;
		display: flex;
		justify-content: space-between;
		display: -webkit-flex;
		-webkit-justify-content: space-between;
		padding-bottom: 0.06rem;
	}
	
	.commodityPrice .prcieBox {
		color: #FC9153;
		font-size: 0.17rem;
		line-height: 0.18rem;
		display: flex;
		align-items: flex-end;
		display: -webkit-flex;
		-webkit-align-items: flex-end;
	}
	
	.commodityPrice .prcieBox .newPrice {
		font-size: 0.17rem;
	}
	
	.commodityPrice .prcieBox .oldPrice {
		color: #999;
		font-size: 0.12rem;
		padding-left: 0.14rem;
		text-decoration: line-through;
	}
	
	.commodityPrice .prcieBox .bigPrice {
		font-size: 0.17rem!important;
	}
	
	.commodityPrice .prcieBox .smallPrice {
		font-size: 0.12rem!important;
	}
	
	.commodityPrice img {
		width: 0.32rem;
		height: 0.32rem;
		display: block;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	/*规格 */
	
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
		-webkit-align-items: center;
		-webkit-justify-content: flex-end;
		-webkit-flex-direction: column;
	}
	
	.bugInfo {
		width: 100%;
		position: relative;
		background-color: #fff;
	}
	
	#bugInfoAminate {
		max-height: 0;
		overflow: hidden;
		transition-property: max-height;
		transition-duration: 0.6s;
		transition-delay: 0s;
		-webkit-transition-property: max-height;
		-webkit-transition-duration: 0.6s;
		-webkit-transition-delay: 0s;
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
		/*background-color: #666;*/
		color: #aaa;
	}
	
	.bugNumber_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0.13rem 0.14rem;
		display: flex;
		align-items: center;
		display: -webkit-flex;
		-webkit-align-items: center;
	}
	
	.bugNumberText {
		flex-grow: 2;
		font-size: 0.14rem;
		color: #aaa;
		-webkit-flex-grow: 2;
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
	
	#bugNumber:disabled {
		color: #222;
		opacity: 1;
		-webkit-text-fill-color: #222;
		-webkit-opacity: 1;
	}
	
	input[disabled],
	input:disabled,
	input.disabled {
		color: #222;
		-webkit-text-fill-color: #222;
		-webkit-opacity: 1;
		opacity: 1;
		background-color: #fff;
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
		display: -webkit-flex;
		-webkit-align-items: center;
		-webkit-justify-content: center;
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
	
	.bugprizeInfo span.minproductPrice,
	.productPrice span.minproductPrice {
		font-size: 15.3px;
		font-size: 0.153rem;
	}
	
	.productPrice span.minproductPrice {
		font-size: 18px;
		font-size: 0.18rem;
	}
	
	.footerButton {
		width: 100%;
		height: 0.53rem;
		line-height: 0.53rem;
		text-align: center;
		background-color: #ff525d;
		color: #fff;
		font-size: 0.17rem;
		bottom: 0;
		position: fixed;
	}
	
	.kongbai {
		width: 100%;
		height: 0.53rem;
		background-color: #F3F4F5;
	}
	
	.marketing ._v-container>._v-content>.loading-layer {
		padding-bottom: 0.53rem;
	}
</style>
<style type="text/css">

</style>