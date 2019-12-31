<template>
	<div class="evaluate" v-title :data-title="titleWord">
		<div class="evaluate-item" v-for='(item,index) in evaluateItem' :key="index">
			<div class="evalute-item-box">
				<img class="evaluate-pic" :src="item.commodityImg" alt="">
				<div class="evaluate-warp">
					<div class="evaluate-name" v-text="item.commodityName"></div>
					<div class="evaluate-icon">
						<img v-for="(picUrl,list) in item.starUrl" :key="list" @click="evaluateNum(index,list)" :src="picUrl.url"> 
					</div>
				</div>
			</div>
			<textarea  @focus="contentFocus(index)" v-model="evaluateDataSubmit[index].commentContent" maxlength="200" @blur="contentBlur()"  class="evaluate-area" placeholder="亲！说点什么吧，您的感受对其他朋友很重要哦！"></textarea>
			<div class="evaluate-upfile">
				<div class="evaluate-upfile-pic"  v-for="(list,num) in item.baseImages" v-bind:style="{ backgroundImage: 'url('+list+')'}">
					<i @click="delPicture(index,num)"></i>
					<img style="width: 100%" class="pics" @click="showPicPreviews(index,num)" :src="list.o_path" alt="">
				</div>
				<img @click="imageUpload(index)" v-if="item.baseImages.length < 8" src="./images/picture_add.png">
			</div>
		</div>
		<div class="evaluate-fixed" v-if="evaluateSubmitShow">
			<div @click="evaluateSubmit()">发表评论</div>
		</div>
	</div>
</template>
<script>
	import starNor from './images/ic_big-star_nor@3x.png'
	import starPre from './images/ic_big-start_pre@3x.png'
	import Vue from 'vue'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'we-vue'
	Vue.use(wx)
	export default{
		data(){
			return{
				titleWord: '商品评价',
				evaluateItem: [],
				evaluateDataSubmit:[],
				selectPictureIndex: 0,
				evaluateSubmitShow:true,
				textAreaWord:'',
				mmsHost: this.$store.state.mmsHost,
				orderNo: this.$route.params.orderNo,
				token: this.$store.state.token,
				submitFlag: true,
				submitTostFlag: false
			}
		},
		methods:{
			evaluateNum: function(index,list){
				var starArray = [];
				var picUrlNor = {url:starNor};
				var picUrlPre = {url:starPre};
				for(var i = 0; i<5; i++){
					list < i ? starArray.push(picUrlNor) :starArray.push(picUrlPre)
				}
				Vue.set(this.evaluateItem[index],"starUrl",starArray); // 点击星星评论
				Vue.set(this.evaluateDataSubmit[index],"starLevel",list+1); // 点击星星评论获取到的星星个数
			},
			evaluateAjax: function(){
				var params = {
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					},
					body: {
						orderNo: this.orderNo
					}
				};
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = this.mmsHost + "/mms/servlet/getOrderCommodities?str="+paramsStr;
	                this.$http.jsonp(httpURL,{
					emulateJSON: true,
					method: "get",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback"
				}).then(function(res) {	
					console.log(res);
					var evaluateItem = res.body.commodityList;
					for(var i = 0;i < evaluateItem.length; i++){
						evaluateItem[i].commentImages = [];
						evaluateItem[i].baseImages = [];
						evaluateItem[i].serviceImages = [];
					}
					var starItem = [];
					var picUrl = {url:starPre};
					for(var i = 0; i<5 ;i++){
						starItem.push(picUrl);
					}
					for(var i = 0;i < evaluateItem.length; i++){
						evaluateItem[i]["starUrl"] = starItem;
					}
					this.evaluateItem = evaluateItem;
					for(var i = 0; i < evaluateItem.length; i++){   // 评论的内容
						var evaluateSubmitParam = {
							commodityId: evaluateItem[i].commodityId,
							commentContent: '',
							commentImages: [],
							starLevel: '5'
						}
						this.evaluateDataSubmit.push(evaluateSubmitParam);
					}

				},function(res){});	
			},
			evaluateWord: function(event,index){
				this.set(this.evaluateDataSubmit[index],"commentContent",event.srcElement.value);
			},
			evaluateSubmit: function(){
				var that = this;
				if(this.submitFlag == false){
					return false;
				}
				this.submitFlag = false;
				this.submitTostFlag = true;
				Toast.loading({duration: 100000,message: '评论提交中...'});
				var serviceIdsLoadPic = [];
				for(var i = 0; i < that.evaluateItem.length; i++){  //获取每个商品图片个数
					if(that.evaluateItem[i].serviceImages != ''){
						serviceIdsLoadPic = serviceIdsLoadPic.concat(that.evaluateItem[i].serviceImages);
					}
				}
				var mediaIdsString = '['+serviceIdsLoadPic.toString()+']';
	            var httpURL = this.$store.state.uumsHost + "/uums/wxGzh/wxImageUpload?mediaIds="+ mediaIdsString;
	            this.$http.jsonp(httpURL,{
	                emulateJSON: true,
	                method: "post",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	            }).then(function(res){ 
	            	console.log(res);
	            	if(res.body.result == 0){
						var datas = res.body.data;
						for(var i = 0; i < that.evaluateItem.length; i++){  //获取每个商品图片个数
							for(var j = 0; j < that.evaluateItem[i].serviceImages.length; j++){
								for (var s in datas) {
									if(that.evaluateItem[i].serviceImages[j] == s){
										var imgUrlObj = {
											imgUrl: datas[s],
											thumImgUrl: datas[s]
										}; 
										that.evaluateDataSubmit[i].commentImages.push(imgUrlObj);
									}
							    }
							}
						}
						setTimeout(function(){
							 that.evaluateSubmitAjax();
						},100);
	            	}
	            },function(res){
	            	console.log(res);
	            });				
			},
			evaluateSubmitAjax(){
				var that = this;
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						orderNo: this.orderNo,
						commentInfo: this.evaluateDataSubmit
					}
				};
				var paramsStr = encodeURIComponent(JSON.stringify(params));
				console.log(params);
					
				Toast.loading({duration: 10,message: '评论提交中...'});
	            var httpURL = this.mmsHost + "/mms/servlet/commentCommodity?str="+paramsStr;
	                this.$http.jsonp(httpURL,{
					emulateJSON: true,
					method: "post",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback"
				}).then(function(res) {	
					this.submitTostFlag = false;
					if(res.body.result == 0){
						lxjTip.msg("评论成功");
						setTimeout(function(){
							that.$router.back();						
						},2000);
					}else{
						lxjTip.msg(res.body.reason);
					}
					console.log(res.body.result);
				},function(res){});	
			},
			contentFocus: function(index){
				this.evaluateSubmitShow = false;
				console.log(index);
			},
			contentBlur: function(){
				console.log(1111);
				var that = this;
				setTimeout(function(){
					that.evaluateSubmitShow = true;
					var areaLength = document.getElementsByClassName("evaluate-area")
					for(var i = 0; i < areaLength.length; i++){
						areaLength[i].blur();
					}
				},300);
				
			},
			imageUpload: function(index){     //选取图片
				var that = this;
				wx.chooseImage({
				    count: 8-that.evaluateItem[index].commentImages.length,        
				    sizeType: ['original','compressed'],       // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'],            // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) { 
				    	for(var i = 0;i < res.localIds.length; i++){
				    		that.evaluateItem[index].commentImages.push(res.localIds[i])
				    	}  
				        var picUrl = res.localIds;
				        that.getIosLocalImgData(0,picUrl,index);
				    }
				});
			},
			getIosLocalImgData(i,list,index){   //上传图片
				var that = this;
				if( i > list.length-1) return false;
				wx.getLocalImgData({
					localId: list[i],     // 图片的localID
					success: function (iosRes) {
						that.evaluateItem[index].baseImages.push(iosRes.localData);      // localData是图片的base64数据，可以用img标签显示
						wx.uploadImage({
						    localId: list[i].toString(),     // 需要上传的图片的本地ID，由chooseImage接口获得
						    isShowProgressTips: 1,                     // 默认为1，显示进度提示
						    success: function (upres) {
						    	that.evaluateItem[index].serviceImages.push(upres.serverId);
						    	if(i < list.length){
									i++;
									that.getIosLocalImgData(i,list,index);
								}
						    }
						});
					}
				});	
			},

			showPicPreviews(index,num){  //图片预览
				var that = this;
				wx.previewImage({
				    current: that.evaluateItem[index].commentImages[num], // 当前显示图片的http链接
				    urls: that.evaluateItem[index].commentImages // 需要预览的图片http链接列表
				});
			},
			delPicture(index,num){       //删除图片
				var that = this;
				that.evaluateItem[index].commentImages.splice(num,1);
				that.evaluateItem[index].baseImages.splice(num,1);
				that.evaluateItem[index].serviceImages.splice(num,1);
			},
		},
		mounted(){
			var that = this;
			this.evaluateAjax();
			this.wxJsdkConfig(['chooseImage','uploadImage','downloadImage','previewImage']);
			this.$router.beforeEach((to, from, next) => {
				console.log(to);
				if(from.name == 'productEvaluate' && this.submitTostFlag){
					Toast.loading({duration: 10,message: '评论提交中...'});
				}
			    next();
			});	
		}
	}
</script>
<style>
	.evaluate{
		margin-bottom: 0.66rem;
	}
	.evaluate-item{
		width: 100%;
		box-sizing: border-box;
		padding: 0.1rem 0.14rem 0;
		background: #fff;
		margin-bottom: 0.1rem;
	}
	.evalute-item-box{
		display: flex;
		padding-bottom: 0.1rem;
		border-bottom: 1px solid #eee;
	}
	.evaluate-pic{
		flex-shrink: 0;
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		margin-right: 0.15rem;
	}
	.evaluate-warp{
		flex-grow: 2;

	}
	.evaluate-name{
		font-size: 0.15rem;
		color: #222;
		text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	.evaluate-icon{
		overflow: hidden;
		padding-top: 0.07rem;
	}
	.evaluate-icon img{
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		margin-right: 0.07rem;
	}
	.evaluate-area{
		width: 100%;
		display: block;
		min-height: 0.42rem;
		color: #222;
		font-size: 0.15rem;
		margin-top: 0.14rem;
		border: 1px solid transparent;
		text-align: justify;
		padding-bottom: 0.19rem;
		outline: none;
		resize: none;
		word-break: break-all;
	} 
	.evaluate-area:empty:before{
	    content: attr(placeholder);
	    color:#ccc;
	}
	.evaluate-upfile{
		overflow: hidden;
		padding-bottom: 0.13rem;
	}
	.evaluate-upfile-img{
		float: left;
		overflow: hidden;
	}
	.evaluate-upfile-pic{
		margin-left: 0.06rem;
		margin-right: 0.04rem;
		position: relative;
		width: 0.86rem;
		height: 0.86rem;
		float: left;
		padding-top: 0.1rem;
	    background-position: center;
		background-size: contain;
		box-sizing: border-box;
	    margin-top: 0.1rem;
	    background-repeat: no-repeat; 
	}
	.evaluate-upfile-pic img{
		width: 0.86rem;
		height: 0.86rem;
		display: block;
		opacity: 0;
	}
	.evaluate-upfile-pic i{
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
	.evaluate-upfile>img{
		display: block;
		width: 0.86rem;
		height: 0.86rem;
		float: left;
		margin-left: 0.06rem;
		padding-top: 0.1rem;
	}
	.evaluate-fixed{
		background: #fff;
		width: 100%;
		height: 0.66rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		border-top: 1px solid #eee;
	}
	.evaluate-fixed div{
		margin: 0 0.14rem;
		background: #fc9153;
		height: 0.44rem;
		text-align: center;
		color: #fff;
		font-size: 0.18rem;
		line-height: 0.44rem;
		margin-top: 0.11rem;
	}
</style>