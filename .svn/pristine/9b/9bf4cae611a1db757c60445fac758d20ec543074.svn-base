<template>
	<div v-title data-title="意见反馈" class="suggestionFeedback">
		<div id="textarea_box">
			<div class="content">
				问题描述（必填）
			</div>
			<div class="textarea_box1">
				<textarea v-model="message" v-on:focus="onfocusopen()" v-on:blur="onbluropen()" id="feedBackContent" name="feedBackContent" rows="5" placeholder="请描述您遇到的问题" maxlength="200" onkeyup="value=value.replace(/[\&\%\#]/g,'')" onpaste="value=value.replace(/[\&\%\#]/g,'')" oncontextmenu="value=value.replace(/[\&\%\#]/g,'')" /></textarea>
			</div>
			<div class="bottomborder">
			</div>
		</div>
		<div id="img_box">
			<div class="content">
				问题截图（选填{{imgServerId.length}}/9）
			</div>
			<div class="img_box1">
				<div class="bgimg_box" v-for='(item,index) in img64List'>
					<div class="bgimg" v-on:click="previewImage(index)" v-bind:style="{ backgroundImage: 'url('+item+')' }">
						<div class="dele_img" v-on:click="imgCancel(index)">
						</div>
					</div>
				</div>

				<div class="bgimg_box addimg">
					<div class="bgimg" v-on:click="imageUpload()">
					</div>
				</div>
			</div>
		</div>

		<div class="padding_bottom">
		</div>
		<footer>
			<div class="bottom_box">
				<div id="footer_bottom" v-if="onfocusState" v-on:click="beforsaveFeedback()">
					提交
				</div>
			</div>
		</footer>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'we-vue'
	export default {
		name: 'suggestionFeedback',
		data() {
			return {
				token: this.$store.state.token,
				mmsHost: this.$store.state.mmsHost,
				ctmsHost: this.$store.state.ctmsHost,
				message: '',
				onfocusState: true,
				applyState: false,
				 submitTostFlag: false,
				feedBackImages: [],
				imglocalId: [],
				img64List: [],
				imgServerId: [],
			}
		},
		methods: {
			saveFeedback: function(imgList) {
				var that = this;
				if(that.applyState) {
					return;
				}
				that.applyState = true;
				var params2 = {};
				var feedBackImages = that.feedBackImages;
				var feedBackContent = that.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				var feedBackContent2 = trim(feedBackContent);
				if(feedBackContent2.length <= 0) {
					lxjTip.msg("内容不能为空");
					that.applyState = false;
					setTimeout(function() {
						//document.getElementById("feedBackContent").focus();
					}, 1000);
					return false;
				}
				var timestamp = new Date().getTime();
				params2.header = {
					token: this.token,
					time_stamp: timestamp
				};
				//JSON.parse(JSON.stringify(feedBackImages).replace(/picturePath/g, "url"))
				params2.body = {
					topicPictureList: imgList,
					content: feedBackContent
				};
				var paramData2 = JSON.stringify(params2);
				this.$http.jsonp(this.ctmsHost + "/ctmsApi/feedback/saveFeedback" + "?str=" + encodeURIComponent(paramData2), {
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback"
				}).then(function(response) {
					this.submitTostFlag = false;
					if(response.body.result == 0) {
						Toast.loading({
							duration: 10,
							message: '提交中请不要离开本页面...'
						});
						lxjTip.msg("感谢您的反馈，我们会尽快处理",{time:1000});
						setTimeout(() => {
							that.$router.go(-1)
						}, 300);
					} else {
						lxjTip.msg("提交失败" + " 原因：" + response.body.reason);
						vue.applyState = false;
					}
					localStorage.removeItem("suggestion_feedbackMessage");
					localStorage.removeItem("suggestion_feedbackUploadimgs");
				}, function(response) {
					// 响应错误回调
					lxjTip.msg("提交失败");
					that.applyState = false;
				});
			},
			imageUpload: function() {
				var that = this;
				wx.chooseImage({
					count: 9 - that.imglocalId.length,
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						for(var i = 0; i < res.localIds.length; i++) {
							that.imglocalId.push(res.localIds[i])
						}
						var picUrl = res.localIds;
						that.getIosLocalImgData(0, picUrl);
					}
				});
			},
			getIosLocalImgData: function(i, list) { //上传图片
				var that = this;
				if(i > list.length - 1) return false;
				wx.getLocalImgData({
					localId: list[i], // 图片的localID
					success: function(iosRes) {
						that.img64List.push(iosRes.localData); // localData是图片的base64数据，可以用img标签显示
						wx.uploadImage({
							localId: list[i].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
							isShowProgressTips: 1, // 默认为1，显示进度提示
							success: function(upres) {
								that.imgServerId.push(upres.serverId);
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
				window.event.cancelBubble = true;
				var that = this;
				this.img64List.splice(i, 1);
				this.imglocalId.splice(i, 1);
				this.imgServerId.splice(i, 1);
			},
			beforsaveFeedback: function() {
				var that = this;
				if(this.imgServerId.length == 0) {
					this.saveFeedback([]);
					return false;
				}
				var feedBackContent = that.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				var feedBackContent2 = trim(feedBackContent);
				if(feedBackContent2.length <= 0) {
					lxjTip.msg("内容不能为空");
					setTimeout(function() {
						//document.getElementById("feedBackContent").focus();
					}, 1000);
					return false;
				}
				Toast.loading({
					duration: 100000,
					message: '提交中请不要离开本页面...'
				});
				this.submitTostFlag = true;
				var mediaIdsString = '[' + this.imgServerId.toString() + ']';
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
								picturePath: datas[i]
							}
							if(imgUrlObj.picturePath!=''){
								imgUrlList.push(imgUrlObj);
							}			
						}
						this.saveFeedback(imgUrlList);
					}
				}, function(res) {
					console.log(res);
				});
			},
			previewImage(i){ //图片预览
				window.event.cancelBubble = true;
				wx.previewImage({
				    current: this.img64List[i], // 当前显示图片的http链接
				    urls: this.img64List // 需要预览的图片http链接列表
				});
			},
			onfocusopen: function() {

			},
			onbluropen: function() {

			},
			getbgcolor: function() {

			},
			getbasicData: function() {

			},

		},
		mounted: function() {
			this.wxJsdkConfig(['chooseImage', 'uploadImage', 'downloadImage', 'previewImage']);
			setTimeout(function() {
				var text = document.getElementById("feedBackContent");
				autoTextarea(text);
			}, 300);
			this.$router.beforeEach((to, from, next) => {
				if(from.name == 'suggestionFeedback' && this.submitTostFlag) {
					Toast.loading({
						duration: 10,
						message: '提交中...'
					});
				}
				next();
			});
		},
		watch: {

		}
	}

	function lTrim(str) {
		if(str.charAt(0) == " ") {
			str = str.slice(1);
			str = lTrim(str);
		}
		return str;
	}

	function rTrim(str) {
		var iLength;
		iLength = str.length;
		if(str.charAt(iLength - 1) == " ") {
			str = str.slice(0, iLength - 1);
			str = rTrim(str);
		}
		return str;
	}

	function trim(str) {
		return lTrim(rTrim(str));
	}
	var autoTextarea = function(elem, extra, maxHeight) {
		extra = extra || 0;
		var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
			isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
			addEvent = function(type, callback) {
				elem.addEventListener ?
					elem.addEventListener(type, callback, false) :
					elem.attachEvent('on' + type, callback);
			},
			getStyle = elem.currentStyle ? function(name) {
				var val = elem.currentStyle[name];

				if(name === 'height' && val.search(/px/i) !== 1) {
					var rect = elem.getBoundingClientRect();
					return rect.bottom - rect.top -
						parseFloat(getStyle('paddingTop')) -
						parseFloat(getStyle('paddingBottom')) + 'px';
				};

				return val;
			} : function(name) {
				return getComputedStyle(elem, null)[name];
			},
			minHeight = parseFloat(getStyle('height'));

		elem.style.resize = 'none';

		var change = function() {
			var scrollTop, height,
				padding = 0,
				style = elem.style;

			if(elem._length === elem.value.length) return;
			elem._length = elem.value.length;

			if(!isFirefox && !isOpera) {
				padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
			};
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			elem.style.height = minHeight + 'px';
			if(elem.scrollHeight > minHeight) {
				if(maxHeight && elem.scrollHeight > maxHeight) {
					height = maxHeight - padding;
					style.overflowY = 'auto';
				} else {
					height = elem.scrollHeight - padding;
					style.overflowY = 'hidden';
				};
				style.height = height + extra + 'px';
				scrollTop += parseInt(style.height) - elem.currHeight;
				document.body.scrollTop = scrollTop;
				document.documentElement.scrollTop = scrollTop;
				elem.currHeight = parseInt(style.height);
			};
		};

		addEvent('propertychange', change);
		addEvent('input', change);
		addEvent('focus', change);
		change();
	};
</script>

<style scoped="scoped">
	#textarea_box {
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		padding: 0 0.14rem;
	}
	
	.content {
		line-height: 1;
		padding: 0.24rem 0 0.18rem 0;
		font-size: 16px;
		font-size: 0.16rem;
		color: #555;
	}
	
	.textarea_box1 {
		width: 100%;
		padding-bottom: 0.12rem;
	}
	
	textarea {
		-webkit-appearance: none;
		width: 100%;
		border: none;
		resize: none;
		padding: 0;
		word-break: break-all;
		text-align: justify;
		font-size: 14.6rem;
		font-size: 0.146rem;
		line-height: 0.19rem;
		height: 1.16rem;
		outline: none;
	}
	
	textarea:focus {
		outline: none;
	}
	
	textarea::-webkit-input-placeholder {
		color: #ccc;
	}
	
	#img_box {
		width: 100%;
		box-sizing: border-box;
		padding: 0 0 0.21rem 0.14rem;
		background-color: #fff;
	}
	
	#img_box .content {
		padding-bottom: 0.13rem;
	}
	
	.img_box1 {
		width: 100%;
		display: -webkit-flex;
		-webkit-flex-direction: row;
		-webkit-flex-wrap: wrap;
	}
	
	.bgimg_box {
		width: 0.86rem;
		height: 0.86rem;
		padding: 0.05rem;
		-webkit-flex-shrink: 0;
		-webkit-flex-grow: 0;
	}
	
	.img_box1 .bgimg_box:nth-child(1),
	.img_box1 .bgimg_box:nth-child(5),
	.img_box1 .bgimg_box:nth-child(9) {
		padding-left: 0;
	}
	
	.img_box1 .bgimg_box:nth-child(10) {
		display: none;
	}
	
	.bgimg {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		height: 100%;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		border: 1px dashed #aaa;
	}
	
	.addimg .bgimg {
		border: none;
		background-image: url(./images/btn_ic_addphoto@3x.png);
	}
	
	.dele_img {
		width: 0.22rem;
		height: 0.22rem;
		background-position: 0 0;
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-image: url(./images/issue_btn_ic_cancel@3x.png);
		position: absolute;
		top: -1px;
		right: -1px;
	}
	
	.bottomborder {
		width: 100%;
		height: 1px;
		background-color: #ccc;
		transform: scaleY(0.33);
		-webkit-transform: scaleY(0.33);
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
		background-color: #F3F4F5;
		padding: 0.12rem 0.14rem;
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