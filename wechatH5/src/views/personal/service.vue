<template>
	<div v-if="orderDetails != null" v-title data-title="申请售后">
		<div class="order-no">订单编号：{{orderDetails.orderNo}}</div>
		<div class="order-wrap">
			<img class="order-pic" :src="orderDetails.thumbLogo" height="420" width="1242">
			<div class="order-goods">
				<div class="order-name" v-text="orderDetails.commodityName"></div>
				<div class="order-standent" v-text="orderDetails.commodityDetails"></div>
			</div>
			<div class="order-right">
				<div class="order-price" v-text="orderDetails.commodityPrice"></div>
				<div class="order-num">
					<span>x</span>
					<input type="tel" maxlength="3" v-on:blur="countsBlur(counts)" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="counts">
				</div>
			</div>
		</div>
		<div class="service-type">
			<wv-group>
				<wv-cell title="售后类型" is-link :value="service[0].name" @click.native="servicePickerShow = true" /></wv-group>
			<wv-picker :visible.sync="servicePickerShow" :columns="serviceColumns" value-key="name" @confirm="confirmPerson" /> </wv-picker>
			<img src="./images/ic_more_grey@3x.png">
		</div>
		<div class="service-word">
			<div class="service-word-line">问题描述</div>
			<div class="service-word-num">
				<textarea maxlength="300" v-on:input="textAreaInput(textArea)" v-model="textArea" placeholder="请在此描述详细问题"></textarea>
				<div>
					<span v-text="textLength">0</span>
					<span>/300</span>
				</div>
			</div>
		</div>
		<div class="service-upload">
			<div class="service-upload-word">
				<span>上次图片</span>
				<span>(最多上次3张,每张不超过5M,仅支持JPG/PNG/BMP)</span>
			</div>
			<div class="evaluate-upfile">
				<div v-if="!isIOSBrowser&&chooseImagePic.length > 0" class="evaluate-upfile-pic" v-for="(item,index) in chooseImagePic" v-bind:style="{ backgroundImage: 'url('+item+')'}">
					<i @click="imgCancel(index)"></i>
					<img @click="previewImage(index)" :src="item">
				</div>
				<div v-if="isIOSBrowser&&chooseImagePic.length > 0" class="evaluate-upfile-pic" v-for="(item,index) in localBasePic" v-bind:style="{ backgroundImage: 'url('+item+')'}">
					<i @click="imgCancel(index)"></i>
					<img @click="previewImage(index)" :src="item">
				</div>
				<img @click="addPic()" v-if="addPicFlag" :src="addImg" alt="">
			</div>
		</div>
		<div>{{aa}}</div>
		<div class="service-submit">
			<div @click="serviceSubmit()">提交申请</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import axios from '../../common/js/http.js'
	import addImg from './images/picture_add.png'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'we-vue'
	Vue.use(wx)
	export default {
		data() {
			return {
				addImg: addImg,
				servicePickerShow: false,
				service: [{
					name: '仅退款',
					type: 2
				}],
				serviceColumns: [{
					values: [{
							name: '仅退款',
							type: 2
						},
						{
							name: '退货退款',
							type: 3
						},
						{
							name: '换货',
							type: 4
						},
						{
							name: '维修',
							type: 5
						}
					]
				}],
				token: this.$store.state.token,
				orderNo: this.$route.params.orderNo,
				commodityPrice: this.$route.params.commitPrice,
				commodityNum: this.$route.params.counts,
				skuId: this.$route.params.skuId,
				orderDetails: null,
				counts: this.$route.params.counts,
				textArea: '',
				textLength: 0,
				addPicFlag: true,
				localBasePic: [],
				chooseImagePic: [],
				serviceIdsLoadPic: [],
				submitTostFlag: false,
				aa: '',
				pageForm: "",
				isIOSBrowser:false,
			}
		},
		methods: {
			serviceAjax(orderType) {
				var that = this;
				var params = {
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				};
				if(orderType == 9) {
					params.body = {
						orderNo: this.orderNo,
						commodityPrice: this.commodityPrice,
						commodityId: this.skuId,
						skuId: "",
						commodityNum: this.commodityNum
					}
				} else {
					params.body = {
						orderNo: this.orderNo,
						commodityPrice: this.commodityPrice,
						skuId: this.skuId,
						commodityNum: this.commodityNum
					}
				}

				var paramData = JSON.stringify(params);
				var httpURL = "/mms/servlet/getChildOrderMessage?str=" + paramData;
				axios.post(httpURL).then(function(res) {
						console.log(res);
						that.orderDetails = res.data.orderDetails;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			addPic() {
				var that = this;
				wx.chooseImage({
					count: 3 - that.chooseImagePic.length,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						for(var i = 0; i < res.localIds.length; i++) {
							that.chooseImagePic.push(res.localIds[i])
						}
						if(that.chooseImagePic.length == 3) {
							that.addPicFlag = false;
						}
						var picUrl = res.localIds;
						that.getIosLocalImgData(0, picUrl);
					}
				});
			},
			getIosLocalImgData(i, list) { //上传图片
				var that = this;
				if(i > list.length - 1) return false;
				wx.getLocalImgData({
					localId: list[i], // 图片的localID
					success: function(iosRes) {
						that.localBasePic.push(iosRes.localData); // localData是图片的base64数据，可以用img标签显示
						wx.uploadImage({
							localId: list[i].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
							isShowProgressTips: 1, // 默认为1，显示进度提示
							success: function(upres) {
								that.serviceIdsLoadPic.push(upres.serverId);
								if(i < list.length) {
									i++;
									that.getIosLocalImgData(i, list);
								}
							}
						});
					}
				});
			},
			imgCancel(i) { //删除图片
				var that = this;
				this.localBasePic.splice(i, 1);
				this.chooseImagePic.splice(i, 1);
				this.serviceIdsLoadPic.splice(i, 1);
				setTimeout(function() {
					if(that.chooseImagePic.length < 3) {
						that.addPicFlag = true;
					}
				}, 100);

			},
			previewImage(i) { //图片预览
				//lxjTip.msg(i+"  "+this.localBasePic[i],{time:10000});
				wx.previewImage({
					current: this.chooseImagePic[i], // 当前显示图片的http链接
					urls: this.chooseImagePic // 需要预览的图片http链接列表
				});
			},
			serviceSubmit() { //微信服务器图片下载到联享家服务器
				var that = this;
				if(this.submitTostFlag) {
					return false;
				}
				Toast.loading({
					duration: 5000,
					message: '申请提交中...'
				});
				this.submitTostFlag = true;

				var mediaIdsString = '[' + this.serviceIdsLoadPic.toString() + ']';
				var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxImageUpload?mediaIds=" + mediaIdsString;
				this.$http.jsonp(httpURL, {
					emulateJSON: true,
					method: "post",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				}).then(function(res) {

					if(res.body.result == 0) {
						var datas = res.body.data;
						var imgUrlList = [];
						for(var i in datas) {
							var imgUrlObj = {
								imgUrl: datas[i],
								thumImgUrl: datas[i]
							}
							imgUrlList.push(imgUrlObj);
						}
						this.serviceSubmitAjax(imgUrlList);
					}
				}, function(res) {
					console.log(res);
				});
			},
			serviceSubmitAjax(imgUrlList) { //提交售后服务信息
				var that = this;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				};
				if(this.pageForm == "wxGroup") { //团购售后区分
					params.body = {
						orderNo: this.orderNo,
						commodityId: this.skuId,
						skuId: "",
						applyType: this.service[0].type,
						returnMoney: parseInt(this.commodityPrice),
						commodityNum: this.counts,
						problemDescription: this.textArea,
						imgUrlList: imgUrlList
					}
				} else {
					params.body = {
						orderNo: this.orderNo,
						skuId: this.skuId,
						applyType: this.service[0].type,
						returnMoney: parseInt(this.commodityPrice),
						commodityNum: this.counts,
						problemDescription: this.textArea,
						imgUrlList: imgUrlList
					}
				}

				var paramData = JSON.stringify(params);
				var httpURL = "/mms/servlet/applySafeguard?str=" + paramData;
				axios.post(httpURL).then(function(res) {
						console.log(res);
						if(res.data.result == 0) {
							Toast.loading({
								duration: 10,
								message: '申请提交中...'
							});
							lxjTip.msg('申请成功');

							if(that.pageForm == "wxGroup") {
								history.go(-1)
							} else {
								setTimeout(function() {
									that.$router.back();
								}, 2000);
							}

						} else {
							lxjTip.msg(response.body.reason);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			textAreaInput(textArea) {
				this.textLength = textArea.length;
			},
			confirmPerson(picker) {
				this.service = picker.getValues();
			},
			countsBlur(num) {
				if(Number(num).toString() === NaN.toString()) {
					this.counts = this.commodityNum;
				} else {
					if(parseInt(num) < this.commodityNum) {
						this.counts = parseInt(num);
					} else {
						this.counts = this.commodityNum;
					}
				}
			},
			onChange(picker, value) {
				this.$nextTick(() => {
					console.log(picker.getValues())
				})
			},
			isIos() {
				var u = navigator.userAgent;
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				return isiOS;
			},
			GetURLParameter: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
			}
		},
		mounted() {
			if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
				this.isIOSBrowser=true;
			}
			
			
			this.pageForm = this.GetURLParameter("pageFrom") ? this.GetURLParameter("pageFrom") : "0";
			if(this.pageForm == "wxGroup") { //团购订单
				this.serviceAjax(9);
			} else {
				this.serviceAjax();
			}

			if(Number(this.commodityPrice) > 0) {
				if(this.pageForm == "wxGroup") {
					this.serviceColumns = [{
						values: [{
								name: '仅退款',
								type: 2
							},
							{
								name: '退货退款',
								type: 3
							},
							{
								name: '换货',
								type: 4
							}
						]
					}];
				}
			} else {
				this.service = [{
					name: '换货',
					type: 4
				}];
				this.serviceColumns = [{
					values: [{
							name: '换货',
							type: 4
						},
						{
							name: '维修',
							type: 5
						}
					]
				}];
			}

			this.wxJsdkConfig(['chooseImage', 'uploadImage', 'downloadImage', 'previewImage']);
			this.$router.beforeEach((to, from, next) => {
				if(from.name == 'service' && this.submitTostFlag) {
					Toast.loading({
						duration: 10,
						message: '申请提交中...'
					});
				}
				next();
			});
		}
	}
</script>
<style scoped>
	.order-no {
		font-size: 0.15rem;
		color: #999;
		padding-left: 0.14rem;
		line-height: 0.5rem;
	}
	
	.order-wrap {
		padding: 0.15rem 0.14rem;
		background: #fff;
		overflow: hidden;
	}
	
	.order-pic {
		width: 0.7rem;
		height: 0.7rem;
		float: left;
	}
	
	.order-goods {
		width: 2.12rem;
		float: left;
		margin-left: 0.14rem;
	}
	
	.order-container .order-wrap:last-child {
		border-bottom: 0;
	}
	
	.order-name {
		text-align: left;
		line-height: 20px;
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 0.15rem;
		color: #333;
	}
	
	.order-standent {
		overflow: hidden;
		margin-top: 0.03rem;
		color: #aaa;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.order-standent div {
		float: left;
		margin-right: 0.12rem;
	}
	
	.order-standent div span {
		color: #aaa;
		font-size: 0.13rem;
	}
	
	.order-right {
		width: 0.83rem;
		float: right;
		text-align: right;
	}
	
	.order-price {
		font-size: 0.15rem;
		color: #333;
	}
	
	.order-price:before {
		content: "￥";
		margin-right: -0.03rem;
	}
	
	.order-num {
		font-size: 0.18rem;
		color: #aaa;
		font-size: 0.14rem;
		margin-top: 0.15rem;
	}
	
	.order-num input {
		display: inline-block;
		width: 0.3rem;
		border: 1px solid #888;
		text-align: center;
		color: #888;
	}
	
	.weui-cells {
		margin-top: 0;
		padding: 0 0.14rem;
	}
	
	.weui-cell_access {
		font-size: 0.15rem;
		/*width: 100% !important;*/
		padding: 0.14rem !important;
		margin: 0 auto;
	}
	
	.service-word {
		padding: 0 0.14rem 0.31rem;
		background: #fff;
		margin-top: 0.12rem;
	}
	
	.service-type {
		position: relative;
	}
	
	.service-type img {
		position: absolute;
		top: 0.18rem;
		right: 0.14rem;
		z-index: 1;
		width: 0.08rem;
		height: 0.15rem;
	}
	
	.weui-cell_access .weui-cell__ft:after {
		display: none;
	}
	
	.service-word-line {
		line-height: 0.34rem;
	}
	
	.service-word-num {
		height: 1.16rem;
		border: 1px solid #eee;
		position: relative;
	}
	
	.service-word-num textarea {
		height: 0.86rem;
		width: 100%;
		outline: none;
		resize: none;
		border: none;
		box-sizing: border-box;
		padding: 0.14rem 0.09rem 0;
		text-align: justify;
	}
	
	.service-word-num div {
		position: absolute;
		bottom: 0.08rem;
		right: 0.04rem;
		z-index: 1;
		color: #ccc;
	}
	
	.service-word-num div span:first-child {
		margin-right: -0.04rem;
	}
	
	.service-upload {
		padding: 0 0.14rem;
		background: #fff;
		margin-top: 0.12rem;
	}
	
	.service-upload-word span:first-child {
		font-size: 0.14rem;
		color: #333;
		line-height: 0.4rem;
	}
	
	.service-upload-word span:last-child {
		font-size: 0.12rem;
		color: #ccc;
		line-height: 0.4rem;
	}
	
	.evaluate-upfile {
		overflow: hidden;
		padding-bottom: 0.13rem;
	}
	
	.evaluate-upfile-img {
		float: left;
		overflow: hidden;
	}
	
	.evaluate-upfile-pic {
		margin-left: 0.06rem;
		margin-right: 0.04rem;
		position: relative;
		width: 0.86rem;
		height: 0.86rem;
		float: left;
		padding-top: 0.1rem;
		background-position: center;
		background-size: cover;
		box-sizing: border-box;
		margin-top: 0.1rem;
		background-repeat: no-repeat;
	}
	
	.evaluate-upfile-pic img {
		width: 0.86rem;
		height: 0.86rem;
		display: block;
		opacity: 0;
	}
	
	.evaluate-upfile-pic i {
		display: inline-block;
		height: 0.24rem;
		width: 0.24rem;
		background: url(./images/btn_ic_cancel@3x.png) no-repeat;
		background-size: contain;
		position: absolute;
		top: -0.06rem;
		left: -0.06rem;
		z-index: 1;
	}
	
	.evaluate-upfile>img {
		display: block;
		width: 0.86rem;
		height: 0.86rem;
		float: left;
		margin-left: 0.06rem;
		padding-top: 0.1rem;
	}
	
	.service-submit {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 0.66rem;
		background: #fff;
		border-top: 1px solid #eee;
		box-sizing: border-box;
		padding: 0 0.14rem;
	}
	
	.service-submit div {
		width: 100%;
		height: 0.43rem;
		background: #fc9153;
		text-align: center;
		color: #fff;
		font-size: 0.17rem;
		margin-top: 0.1rem;
		line-height: 0.43rem;
	}
	
	.weui-cell_access .weui-cell__ft:after {
		border: none;
	}
</style>