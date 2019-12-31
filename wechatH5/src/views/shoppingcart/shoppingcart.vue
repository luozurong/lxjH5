<template>
	<div v-title data-title="购物车" class="shoppingcar">
		<div class="headerbt" v-on:click="changePageState()" v-if="shoppingCartsInfo!=null&&sellerList.length>0&&countList.length>0">
			<span v-text="pageState"></span>
		</div>
		<div class="sellerList" v-if="shoppingCartsInfo!=null&&sellerList.length>0&&countList.length>0" v-for="(items,index) in sellerList">
			<div class="sellerName">
				<img class="chooseLogo" v-show="!countList[index].sellerState" v-on:click="chooseSeller(true,countList[index],index)" src="../../../static/images/ic_gray_circle@3x.png" />
				<img class="chooseLogo" v-show="countList[index].sellerState" v-on:click="chooseSeller(false,countList[index],index)" src="../../../static/images/ic_choise_yes.png" />
				<img src="../../../static/images/sellerName_logo.png" />
				<span v-text="items.sellerName"></span>
			</div>
			<div class="commodity" v-for="(item,index2) in items.shoppingCartList">
				<div class="line_01">
				</div>
				<div class="commodity_box">
					<img class="chooseLogo" v-show="!countList[index].shoppingCartList[index2].state" v-on:click="chooseCommodity(true,countList[index],countList[index].shoppingCartList[index2],index,index2)" src="../../../static/images/ic_gray_circle@3x.png" />
					<img class="chooseLogo" v-show="countList[index].shoppingCartList[index2].state" v-on:click="chooseCommodity(false,countList[index],countList[index].shoppingCartList[index2],index,index2)" src="../../../static/images/ic_choise_yes.png" />
					<div class="commodityImg" :style="{ backgroundImage: 'url('+item.photo+')' }">
					</div>
					<div class="commodityInfo">
						<div class="commodityName" v-text="item.commodityName"></div>
						<div class="commodityDetail" v-text="item.commodityDetails"></div>
						<div class="commodityPrice">
							<span class="commodityPriceS">¥<span v-text="String(parseFloat(item.price).toFixed(2)).split('.')[0]"></span>.<span class="minproductPrice" v-text="String(parseFloat(item.price).toFixed(2)).split('.')[1]"></span></span>
							<div class="commodityNumber" v-show="pageState=='编辑'">
								<div class="reducebt" v-on:click="reduceData(item.id,countList[index].shoppingCartList[index2].count,item.stockQuantity,index,index2)" v-bind:class="{reducefall:countList[index].shoppingCartList[index2].count<=1}">
								</div>
								<input type="tel" v-model="countList[index].shoppingCartList[index2].count" v-on:blur="blurInput(item.id,countList[index].shoppingCartList[index2].count,item.stockQuantity,index,index2)" v-on:focus="focusInput()" name="bugNumber" class="bugNumber" id="" value="1" />
								<div class="addbt" v-on:click="addData(item.id,countList[index].shoppingCartList[index2].count,item.stockQuantity,index,index2)" v-bind:class="{addbfall:countList[index].shoppingCartList[index2].count>=100||countList[index].shoppingCartList[index2].count>=item.stockQuantity}">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="line_01box" v-if="items.activityName&&items.activityName.length>0">
				<div class="line_01">
				</div>
			</div>
			<div class="shop_reduced" v-if="items.activityName&&items.activityName.length>0">
				<span>促销</span><span v-text="items.activityName"></span>
			</div>
		</div>
		<div class="invalidList" v-if="shoppingCartsInfo!=null&&shoppingCartsInfo.invalidList.length>0">
			<div class="commodity" v-for="(item,index2) in shoppingCartsInfo.invalidList">
				<div class="commodity_box">
					<span class="xiajiaLogo">失效</span>
					<div class="commodityImg" :style="{ backgroundImage: 'url('+item.photo+')' }">
					</div>
					<div class="commodityInfo">
						<div class="commodityName" v-text="item.commodityName"></div>
						<div class="commodityDetail" v-text="item.commodityDetails"></div>
						<div class="commodityPrice">
							商品已经下架
						</div>
					</div>
				</div>
				<div class="line_01">
				</div>
			</div>
			<div class="deleshoppingcloseListButtom">
				<span v-on:click="deleteShoppingcartCommodity(2)">清空失效商品</span>
			</div>
		</div>
		<div class="Noshopping" style="width: 100%;background-color: #f3f4f5;display: -webkit-flex;-webkit-flex-direction: column;-webkit-align-items: center;" v-show="shoppingCartsInfo!=null&&sellerList&&sellerList.length==0&&shoppingCartsInfo.invalidList.length==0">
			<div id="displaynone" style="width:100%;height: 103.4px;">
			</div>
			<div class="nothing_img_box" style="text-align: center;width:100%;"><img id="nothing_img" src="./images/noshopping.png" style="width:90px;" alt="" /></div>
			<div class="displaynone10" style="width:100%;height: 10px;">
			</div>
			<div class="nothing_text" style="text-align: center;width: 100%;font-size: 16px;height: 70px;line-height: 70px;color:#999;">购物车怎么能为空呢？</div>
			<div v-on:click="goShoppingpage()" class="nothing_text" style="text-align:center;width:0.8rem;color:#fc9103;font-size: 14px;border:1px solid #fc9103;border-radius: 0.2rem;line-height:1;padding: 5px 0;">逛一逛</div>
		</div>
		<div class="kongBottom">
		</div>
		<div class="footerButton" v-if="shoppingCartsInfo!=null&&sellerList.length>0&&countList.length>0">
			<div class="line_01">
			</div>
			<div class="footerButtonMain">
				<div class="totailPrice">
					<img class="chooseLogo" v-show="!allchooseState" v-on:click="chooseAll(true)" src="../../../static/images/ic_gray_circle@3x.png" />
					<img class="chooseLogo" v-show="allchooseState" v-on:click="chooseAll(false)" src="../../../static/images/ic_choise_yes.png" />
					<span class="totailPricetext1">全选</span>
					<div class="totailPricebox" v-show="pageState=='编辑'">
						<div class="totailPricetext">
							<span class="totailPricetext2">合计:</span><span class="commodityPriceS">¥<span v-text="String(realTotalPrice).split('.')[0]">0</span>.<span class="minproductPrice" v-text="String(realTotalPrice).split('.')[1]">00</span></span><span class="totailPricetext3">不含运费</span>
						</div>
						<div class="totalReducePrice" v-if="totalReducePrice>0">
							<span>已优惠：</span>¥ <span v-text="totalReducePrice"></span>
						</div>
					</div>
				</div>
				<div class="saveOrder" v-on:click="goPay()">
					<span v-text="buttonText">
						去买单
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	export default {
		name: 'shoppingcar',
		data() {
			return {
				token: this.$store.state.token,
				areaCode: this.$store.state.organizationSeq,
				mmsHost: this.$store.state.mmsHost,
				shoppingCartsInfo: null,
				sellerList: [],
				shoppingCartIds: [], //已选择的商品购物车id
				ordershoppingIds: this.$route.query.shoppingCartIds,//再次购买跳转过来的选中状态
				countList: [],//数量管理列表
				allchooseState: false,//全选状态
				totalReducePrice: 0,
				realTotalPrice: 0,
				shopcarPricedata: null,
				buttonText: '去买单',
				pageState: '编辑',
				invalidList: [],//失效商品列表
				inputFocusState: false,
			}
		},
		methods: {
			getshoppingCartsInfo: function(refreshstate) {//获取购物车数据
				let that = this;
				let params = {
					body: {
						type: 1,//获取购物车类型
						pageNum: 1,
						pageSize: 1000,//获取数据量大小
						areaOrgSeq: this.$store.state.organizationSeq,//当前指定小区购物车
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				//let httpURL = this.mmsHost + "/mms/servlet/getUserReceiverInfo?str=" + paramsStr;
				/*this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				})*/
				axios.post(this.mmsHost + "/mms/servlet/findShoppingcartList", params).then(function(res) {
					if(refreshstate) {//重新刷新页面数据
						that.shoppingCartsInfo = res.data;
						that.sellerList = res.data.sellerList;
						that.countList = that.getcountList(res.data, false);
					} else {//首次加载数据
						that.shoppingCartsInfo = res.data;
						that.sellerList = res.data.sellerList;
						that.countList = that.getcountList(res.data, false);//组建商品数量控制列表
						if(that.isCondition(that.ordershoppingIds)) {//判断是否为再次购买
							setTimeout(() => {
								that.zaiciGoumai();//准备自动选中再次购买的商品
							}, 200);
						}
					}
				}, function(res) {
					lxjTip.msg('亲，网络请求失败了!', {
						time: 1500
					});
				})

			},
			isCondition: function(param) {//判断是否为空
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			calculateShoppingcartPrice: function() {//计算选择的商品的总价及优惠
				let that = this;
				let params = {
					body: {
						shoppingCartIds: this.shoppingCartIds.join(","),//选择的商品
						areaOrgSeq: this.$store.state.organizationSeq,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/calculateShoppingcartPrice", params).then(function(res) {
					that.shopcarPricedata = res.data;
					that.realTotalPrice = res.data.realTotalPrice ? res.data.realTotalPrice : 0;//已选商品的总价（已减满减的金额）
					that.totalReducePrice = res.data.totalReducePrice ? res.data.totalReducePrice : 0;//已选商品的满减的金额
				}, function(res) {})

			},
			editShoppingcartCount: function(id, count, i, j) {//编辑购物车
				let that = this;
				let params = {
					body: {
						id: id,//编辑的商品的购物车id
						count: count,//编辑的商品的数量
						shoppingCartIds: this.shoppingCartIds.join(","),//已选的商品id组
						areaOrgSeq: this.$store.state.organizationSeq,
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				axios.post(this.mmsHost + "/mms/servlet/editShoppingcartCount", params).then(function(res) {
					if(res.data.result == '0') {//编辑商品数量成功
						that.$set(that.shoppingCartsInfo.sellerList[i].shoppingCartList[j], "count", count);//修改相应数量，以免数据错乱
						that.$set(that.countList[i].shoppingCartList[j], "count", count);//修改页面展示相应数量
						that.shopcarPricedata = res.data;
						that.realTotalPrice = res.data.realTotalPrice ? res.data.realTotalPrice : 0;
						that.totalReducePrice = res.data.totalReducePrice ? res.data.totalReducePrice : 0;
					}
					/*for (let i=0;i<res.data.commoditySku.length;i++) {
						that.skuSelectList.push('0000')
					}*/
				}, function(res) {})
			},
			//增加数量操作
			addData: function(id, num, stockQuantity, i, j) {//数量增加按钮操作事件响应（id:购物车id,num:当前数量，stockQuantity：商品库存，ij数据索引标识）
				if(num >= stockQuantity) {//数量增加超出相应商品库存
					lxjTip.msg('亲，老板没那么多存货呢!', {
						time: 1500
					});
					return false;
				}
				if(num >= 100) {//单个商品最大购买数为100
					lxjTip.msg('亲，商品购买数量已达上限了!', {
						time: 1500
					});
					return false;
				}
				num++;
				this.editShoppingcartCount(id, num, i, j);//开始修改购物车数量
			},
			//减少数量操作
			reduceData: function(id, num, stockQuantity, i, j) {//数量减少按钮操作事件响应（id:购物车id,num:当前数量，stockQuantity：商品库存，ij数据索引标识）
				if(num <= 1) {//单个商品最小购买数为1
					return false;
				}
				num--;
				this.editShoppingcartCount(id, num, i, j);//开始修改购物车数量
			},
			//数量操作（预备，实时输入框变化，弊端大）
			inputChange: function(e, item) {
			},
			getcountList: function(data, stat) {//创建数量操作数组，是否选中状态
				var list = new Array();
				if(data != null && data.sellerList.length > 0) {
					for(var i = 0; i < data.sellerList.length; i++) {
						var list2 = new Array();
						for(var j = 0; j < data.sellerList[i].shoppingCartList.length; j++) {
							var asd = {
								id: data.sellerList[i].shoppingCartList[j].id,
								state: stat,
								count: data.sellerList[i].shoppingCartList[j].count
							}
							list2.push(asd);
						}
						var obliste = {
							sellerId: data.sellerList[i].sellerId,
							sellerState: stat,
							shoppingCartList: list2
						}
						list.push(obliste);
					}
					return list;
				} else {
					return [];
				}
			},
			getCommodityChooseList: function(list) {//获取选中的商品的购物车id
				var listg = new Array();
				for(var i = 0; i < list.length; i++) {
					for(var j = 0; j < list[i].shoppingCartList.length; j++) {
						if(list[i].shoppingCartList[j].state) {
							listg.push(list[i].shoppingCartList[j].id);
						}
					}
				}
				return listg;
			},
			chooseCommodity: function(state, items, item, i, j) {//商品选中状态切换
				var newitem = null;
				var newitem2 = null;
				newitem = item;
				newitem2 = items;
				if(state) {//商品未选中状态变选中
					newitem2.shoppingCartList[j].state = true;
					newitem2.sellerState = true;
					for(var a = 0; a < newitem2.shoppingCartList.length; a++) {//商品的上一级店铺是否选中状态
						if(!newitem2.shoppingCartList[a].state) {
							newitem2.sellerState = false;
							break;
						}
					}
					this.$set(this.countList, i, newitem2);//页面更新画图
				} else {//商品选中状态变未选中
					newitem2.shoppingCartList[j].state = false;
					newitem2.sellerState = false;
					this.$set(this.countList, i, newitem2);//页面更新画图
				}
			},
			chooseSeller: function(state, items, i) {//店铺选中状态切换
				var newitem = null;
				newitem = items;
				if(state) {//店铺未选中状态变选中
					newitem.sellerState = true;
					for(var a = 0; a < newitem.shoppingCartList.length; a++) {
						newitem.shoppingCartList[a].state = true;
					}
					this.$set(this.countList, i, newitem);
				} else {//店铺选中状态变未选中
					newitem.sellerState = false;
					for(var a = 0; a < newitem.shoppingCartList.length; a++) {
						newitem.shoppingCartList[a].state = false;
					}
					this.$set(this.countList, i, newitem);
				}
			},
			chooseAll: function(state) {//全选选中状态切换
				if(state) {//全选未选中状态变选中
					this.allchooseState = true;
					this.countList = this.getcountList(this.shoppingCartsInfo, true);
				} else {//全选选中状态变未选中
					this.allchooseState = false;
					this.countList = this.getcountList(this.shoppingCartsInfo, false);
				}
			},
			//再次购买商品选中状态添加
			zaiciGoumai: function() {
				var list = this.countList;
				var keyId = this.ordershoppingIds;
				console.log(keyId)
				for(var i = 0; i < list.length; i++) {
					for(var j = 0; j < list[i].shoppingCartList.length; j++) {
						if(keyId.indexOf(list[i].shoppingCartList[j].id) >= 0) {
							this.chooseCommodity(true, list[i], list[i].shoppingCartList[j], i, j)
						}
					}
				}
			},
			focusInput: function() {
				this.inputFocusState = true;
			},
			blurInput: function(id, num, stockQuantity, i, j) {//失焦后修改相应商品数量
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
				this.editShoppingcartCount(id, num, i, j);
			},
			deleteShoppingcartCommodity: function(type) {//删除购物车商品 2为失效商品删除
				let that = this;
				let params4 = {};
				let timestamp = new Date().getTime();
				let idList = [];
				if(type == 2) {
					for(var i = 0; i < this.shoppingCartsInfo.invalidList.length; i++) {
						idList.push(this.shoppingCartsInfo.invalidList[i].id);
					}
				} else {
					idList = this.shoppingCartIds;
				}
				params4.header = {
					token: this.token,
					time_stamp: timestamp
				};
				params4.body = {
					ids: idList,
				};
				var paramData = JSON.stringify(params4);

				axios.post(this.mmsHost + "/mms/servlet/deleteShoppingcart", params4).then(function(res) {
					//this.jsondate = response.body;
					if(res.data.result == 0) {
						if(type == 2) {
							that.getshoppingCartsInfo();
						} else {
							that.getshoppingCartsInfo(true);
						}
					}
				}, function(response2) {
					// 响应错误回调				
					console.log(JSON.stringify(response2.body))
					//	console.log(JSON.stringify(response))
				});
			},
			goPay: function() {//点击下单按钮响应
				var that = this;
				if(this.pageState == '完成') {
					if(this.shoppingCartIds.length <= 0) {
						lxjTip.msg('请选择要删除的商品', {
							time: 3000,
							skin: 'demo1'
						});
						return false;
					} else {
						lxjTip.confirm('您确定删除选中的商品吗？', {
							skin: 'demo3',
							btn: ['确定', '取消'],
							yes: function(index) {
								that.deleteShoppingcartCommodity(1);
								lxjTip.close(); //如果设定了yes回调，需进行手工关闭
							}
						});
					}
				} else {
					if(this.shoppingCartIds.length <= 0) {
						return false;
					} else {
						//移除之前的购物车下单数据
						sessionStorage.removeItem("shoppingCartCount");
						sessionStorage.removeItem("hadChooseReceiverId");
						sessionStorage.removeItem("couponId");
						this.$router.push({
							path: '../product/confirmOrder/',
							name: 'confirmOrder',
							params: {
								bugType: 1,
								shoppingCartIds: this.shoppingCartIds
							}
						})
					}
				}
			},
			goShoppingpage: function() {
				this.$router.push({
					path: '/product',
					params: {}
				})
			},
			changePageState: function() {
				if(this.pageState == '编辑') {
					this.pageState = '完成';
					this.buttonText = "删除";
				} else {
					this.pageState = '编辑';
					if(this.shoppingCartIds.length > 0 && this.pageState == '编辑') {
						this.buttonText = '去买单(' + this.shoppingCartIds.length + ')';
					} else if(this.shoppingCartIds.length == 0 && this.pageState == '编辑') {
						this.buttonText = '去买单';
					}
				}
			},
			getbasicData: function() {
				if(this.isCondition(this.token)) {
					if(this.token.indexOf("_") == 0) {
						this.shoppingCartsInfo = {
							invalidList: [],
							sellerList: []
						}
					} else {
						this.getshoppingCartsInfo();
					}
				}

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
		mounted: function() {
			//console.log(this.commoditySkuAttrIds);
			this.getbasicData();
			this.wxJsdkConfig();
			var windowwidth = document.documentElement.clientWidth;
			var windowheight = document.documentElement.clientHeight;
			document.getElementById("nothing_img").style.width = 180 * windowwidth / 414 + "px";
			document.getElementById("displaynone").style.height = (windowheight - 180 * windowwidth / 414 - 70) * 0.3 + "px";
		},
		activated() {
			this.ordershoppingIds=this.$route.query.shoppingCartIds;
			this.getbasicData();
			this.wxJsdkConfig();
			this.setDocumentTitle("购物车");
			
		},
		watch: {
			countList(newVal, oldVal) {
				var allstatea = true;
				for(var i = 0; i < this.countList.length; i++) {
					if(!this.countList[i].sellerState) {
						allstatea = false;
						break;
					}
				}
				if(this.allchooseState != allstatea) {
					this.allchooseState = allstatea;
				}
				this.shoppingCartIds = this.getCommodityChooseList(this.countList);
			},
			shoppingCartIds(newVal, oldVal) {
				this.calculateShoppingcartPrice();
				if(this.shoppingCartIds.length > 0 && this.pageState == '编辑') {
					this.buttonText = '去买单(' + this.shoppingCartIds.length + ')';
				} else if(this.shoppingCartIds.length == 0 && this.pageState == '编辑') {
					this.buttonText = '去买单';
				}
			}
		}
	}
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
	
	.headerbt {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: row-reverse;
		background-color: #fff;
	}
	
	.headerbt span {
		color: #333;
		font-size: 16px;
		font-size: 0.16rem;
		line-height: 0.2rem;
		padding: 0.15rem 0.14rem;
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
	
	.sellerName img.chooseLogo {
		width: 0.22rem;
		height: 0.22rem;
		align-self: center;
		flex-shrink: 0;
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
	}
	
	.invalidList .commodity {
		padding: 0 0.14rem 0 0;
	}
	
	.commodity_box {
		width: 100%;
		background-color: #fff;
		color: #333;
		display: flex;
		align-items: flex-start;
		/*margin-top: 0.1rem;*/
	}
	
	.invalidList {
		width: 100%;
		box-sizing: border-box;
		margin-top: 0.12rem;
		background-color: #fff;
		display: flex;
		flex-direction: column;
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
	
	.invalidList .commodityPrice {
		font-size: 14px;
		color: #333;
		font-size: 0.14rem;
	}
	
	.sellerList .commodity:nth-child(2),
	.invalidList .commodity:nth-child(2) {
		margin-top: 0;
	}
	
	.commodity .chooseLogo {
		width: 0.22rem;
		height: 0.22rem;
		padding-right: 0.14rem;
		align-self: center;
		flex-shrink: 0;
	}
	
	.commodity .xiajiaLogo {
		width: 0.38rem;
		margin: 0 0.06rem;
		color: #fff;
		background-color: #aaa;
		font-size: 12px;
		font-size: 0.12rem;
		align-self: center;
		line-height: 0.14rem;
		text-align: center;
		padding: 0.02rem 0;
		border-radius: 0.18rem;
		flex-shrink: 0;
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
		font-size: 153px;
		font-size: 0.153rem;
		height: 0.44rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		margin-top: 0.11rem;
	}
	
	.shop_reduced {
		width: 100%;
		box-sizing: border-box;
		padding: 0.115rem 0.14rem 0.115rem 0.5rem;
		display: flex;
		align-items: flex-start;
	}
	
	.shop_reduced span:nth-child(1) {
		font-size: 12px;
		font-size: 0.12rem;
		color: #fff;
		background-color: #ff525c;
		line-height: 0.14rem;
		padding: 0.02rem 0.04rem;
		border-radius: 0.18rem;
		margin-right: 0.14rem;
		flex-shrink: 0;
	}
	
	.shop_reduced span:nth-child(2) {
		color: #333;
		font-size: 14px;
		font-size: 0.14rem;
		line-height: 0.18rem;
		overflow: hidden;
		-webkit-line-clamp: 9;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
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
		line-height: 0.14rem;
		width: 100%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		color: #aaa;
		font-size: 12px;
		font-size: 0.12rem;
		padding-top: 0.02rem;
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
		line-height: 1;
	}
	.commodityPriceS span{
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
		background-size:contain;
		background-position: center;
		background-repeat: no-repeat;
		flex-shrink: 0;
	}
	
	.reducefall {
		background-image: url(../../../static/images/ic_cut_-no-active-.png)!important;
	}
	
	.addbt {
		width: 0.26rem;
		height: 0.26rem;
		background-image: url(../../../static/images/list_btn_ic_add@3x.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		flex-shrink: 0;
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
		background-color: #fff;
	}
	
	.orderInfo {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.14rem;
		background-color: #fff;
	}
	
	.deleshoppingcloseListButtom {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
		display: flex;
		justify-content: center;
	}
	
	.deleshoppingcloseListButtom span {
		font-size: 15.3px;
		font-size: 0.153rem;
		line-height: 0.18rem;
		padding: 0.06rem;
		width: 1.2rem;
		text-align: center;
		color: #FC9153;
		border: 1px solid #FC9153;
		border-radius: 0.3rem;
	}
	
	.flew_grow2 {
		flex-grow: 2;
	}
	
	.kongBottom {
		width: 100%;
		height: 1.2rem;
		background-color: transparent;
	}
	
	.footerButton {
		width: 100%;
		height: 53px;
		height: 0.53rem;
		position: fixed;
		bottom: 0.55rem;
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
	.saveOrder span{
		font-size: 17.3px;
		font-size: 0.173rem;
	}
	
	.totailPrice {
		flex-grow: 2;
		padding-left: 0.14rem;
		display: flex;
		align-items: center;
	}
	
	.totailPrice .chooseLogo {
		width: 0.22rem;
		height: 0.22rem;
		padding-right: 0.14rem;
		align-self: center;
		flex-shrink: 0;
	}
	
	.totailPricetext1 {
		font-size: 17.3px;
		font-size: 0.173rem;
		line-height: 0.18rem;
		color: #333;
		flex-shrink: 0;
	}
	
	.totailPricebox {
		/*flex-grow: 2;*/
		padding-left: 0.1rem;
	}
	
	.totailPricetext {
		font-size: 0.16rem;
		color: #555;
		text-align: left;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.totailPricetext2 {
		color: #555;
		font-size: 15px;
		font-size: 0.15rem;
	}
	
	.totailPricetext3 {
		font-size: 12px;
		font-size: 0.12rem;
		line-height: 0.13rem;
		color: #999;
		padding-right: 0.1rem;
		padding-left: 0.1rem;
		flex-shrink: 0;
	}
	
	.totalReducePrice {
		padding-top: 5px;
		font-size: 0.12rem;
		color: #999;
	}
</style>