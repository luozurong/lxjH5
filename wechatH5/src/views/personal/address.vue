<template>
	<div v-title data-title="选择地址" class="addressList">
		<div class="receiverInfo" v-for="(item,index) in receiverList">
			<div class="receiverInfobig_box">
				<div class="receiverLogo">
					<img src="./images/ic_Location@3x.png" />
				</div>
				<div class="receiverInfo_box" v-on:click="selectAddress(item)">
					<div class="receiverName">
						<span v-text="item.username"></span><span v-text="item.mobile"></span>
					</div>
					<div class="receiverDetail" v-text="item.address">

					</div>
				</div>
				<div class="choose" v-show="chooseState&&item.id==hadChooseReceiverId">
					<img src="./images/ic_tick@3x.png" />
				</div>
			</div>
			<div class="line_01">
			</div>
			<div class="receiverButton_box">
				<span class="mr" v-if="item.isDefault==1&&item.full==1">默认</span><span class="fg5"></span><img src="./images/ic_edit@3x.png" v-on:click="goEditAddress(2,item.id)" /><span>编辑</span><img v-on:click="deleAddress(item.id,index,item.isDefault)" src="./images/ic_delete@3x.png" /><span v-on:click="deleAddress(item.id,index,item.isDefault)">删除</span>
			</div>
		</div>
		<div class="padding_bottom">
		</div>
		<footer>
			<div class="bottom_box">
				<div id="footer_bottom" v-on:click="goEditAddress(1)">
					添加新地址
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
		name: 'addressList',
		data() {
			return {
				token: this.$store.state.token,
				mmsHost: this.$store.state.mmsHost,
				receiverList: null,
				hadChooseReceiverId: this.$route.params.hadChooseReceiverId,
				chooseState: this.$route.params.chooseState==1?false:true,
			}
		},
		methods: {
			getUserReceiverInfo: function() {
				var that = this;
				let params = {
					body: {
						type: 2
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.mmsHost + "/mms/servlet/getUserReceiverInfo?str=" + paramsStr;
				axios.post(this.mmsHost + "/mms/servlet/getUserReceiverInfo", params).then(function(res) {
					console.log(res);
					that.receiverList = res.data.receiverList;

				}, function(res) {})
			},
			changeDefault: function() {
				var that = this;
				if(this.receiverList.length > 0 && this.receiverList[0].full == 1) {} else {
					return false;
				}
				let params = {
					body: {
						type: 4,
						receiverInfoId: this.receiverList[0].id
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.mmsHost + "/mms/servlet/getUserReceiverInfo?str=" + paramsStr;
				axios.post(this.mmsHost + "/mms/servlet/setUserReceiverInfo", params).then(function(res) {
					if(res.data.result == 0) {
						that.getUserReceiverInfo();
					}
				}, function(res) {})
			},
			deleYAddress: function(id, index, isDefault) {
				var that = this;
				if(this.receiverList.length <= 1) {
					setTimeout(function() {
						lxjTip.alert('至少保留一个收货地址', {
							skin: 'demo2',
							btn: ['知道了']
						});
					}, 200)
					return false;
				}

				let params = {
					body: {
						type: 3,
						receiverInfoId: id
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.mmsHost + "/mms/servlet/getUserReceiverInfo?str=" + paramsStr;
				axios.post(this.mmsHost + "/mms/servlet/setUserReceiverInfo", params).then(function(res) {
					console.log(res);
					if(res.data.result == 0) {
						that.receiverList.splice(index, 1);
						if(that.chooseState && that.hadChooseReceiverId == id) {
							for(var i = 0; i < that.receiverList.length; i++) {
								if(that.receiverList[i].full == "1") {
									that.hadChooseReceiverId = that.receiverList[i].id;
									break;
								}
							}
						}
						if(isDefault == 1) {
							that.changeDefault();
						}
					}
				}, function(res) {})
			},
			selectAddress:function(item) {
				if(!this.chooseState) {
					return false;
				}
				if(item.full == 1) {
					this.hadChooseReceiverId =item.id;
					setTimeout(() => {
						this.$router.go(-1)
					}, 300);
				} else {
					lxjTip.msg("请补全详细收货地址", {
						time: 1000
					});
					setTimeout(() => {
						this.goEditAddress(2,item.id)
					}, 1200);
				}
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			deleAddress: function(id, indexN, isDefault) {
				var that = this;
				lxjTip.confirm('你确定删除该地址吗？', {
					skin: '',
					yes: function(index) {
						that.deleYAddress(id, indexN, isDefault);
						lxjTip.close(); //如果设定了yes回调，需进行手工关闭
					}
				});
			},
			goEditAddress: function(i, id) {
				this.$router.push({
					path: '/editAddress/',
					name: 'editAddress',
					params: {
						type: i,
						editAddressId: id
					}
				})
			},
			getbasicData: function() {
				if (this.isCondition(this.$route.params.chooseState)) {
					sessionStorage.setItem("addresschooseState", this.$route.params.chooseState==1?false:true)
				}else{
					this.chooseState = sessionStorage.getItem("addresschooseState");
				}
				if(this.chooseState) {
					this.$route.params.hadChooseReceiverId ? sessionStorage.setItem("hadChooseReceiverId", this.$route.params.hadChooseReceiverId) : this.hadChooseReceiverId = sessionStorage.getItem("hadChooseReceiverId");
				}
				this.getUserReceiverInfo();
			},

		},

		mounted: function() {
			//console.log(this.commoditySkuAttrIds);
			this.getbasicData();
			this.wxJsdkConfig([])
		},
		watch: {
			hadChooseReceiverId(newVal, oldVal) {
				sessionStorage.setItem("hadChooseReceiverId", newVal)
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
	
	.receiverInfo {
		width: 100%;
		padding: 0.18rem 0.14rem 0;
		box-sizing: border-box;
		background-color: #fff;
		color: #555;
		font-size: 0.14rem;
		margin-bottom: 0.123rem;
	}
	
	.receiverInfobig_box {
		width: 100%;
		display: flex;
		align-items: center;
		padding-bottom: 0.17rem;
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
	.choose img {
		width: 100%;
		height: auto;
		display: block;
	}
	
	.choose {
		width: 0.18rem;
		padding-right: 0.06rem;
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	.receiverButton_box {
		width: 100%;
		display: flex;
		align-items: center;
		color: #555;
		font-size: 12.6px;
		font-size: 0.13rem;
		line-height: 0.15rem;
		box-sizing: border-box;
		padding: 0.13rem 0;
	}
	
	.fg5 {
		flex-grow: 5;
	}
	
	.mr {
		width: 0.4rem;
		text-align: center;
		font-size: 12px;
		font-size: 0.12rem;
		line-height: 0.14rem;
		padding: 0.02rem 0;
		background-color: #FC9153;
		color: #fff;
		border-radius: 0.18rem;
	}
	
	.receiverButton_box img {
		width: 0.18rem;
		height: auto;
		display: block;
		flex-shrink: 0;
		padding: 0 0.03rem 0 0.1rem;
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
		background-color: #fff;
		padding: 0.12rem 0.14rem;
		border-top: 1px solid #eee;
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