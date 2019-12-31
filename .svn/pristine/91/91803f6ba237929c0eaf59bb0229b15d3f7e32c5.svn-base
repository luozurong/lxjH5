<template>
	<div v-title :data-title="titleWord" class="marketing" id="marketing" v-cloak>
		<scroller :on-infinite="infinite">
			<div class="vue-load"></div>	
			<div class="marketing-floor1" v-if="showType == 1">
				<div class="marketing-banner"><img :src="banner" alt=""></div>
				<div class="marketing-item" @click="productDetail(item.commodityId)" v-for="(item,index) in commodityList" :key="index">
					<img class="marketing-pic" :src="item.commodityThumbLogo"  alt="">
					<div class="marketing-wrap">
						<div class="marketing-name" v-text="item.commodityName"></div>
						<div class="marketing-disc"><span v-text="item.commodityIntroduction"></span></div>
						<div class="marketing-num">
							<div class="marketing-price">
								<span> {{item.currentPrice | pricePre}}</span>
								<div>{{item.currentPrice | priceNext}}</div>
							</div>
							<s :class="{'price-active': item.prePrice == null}" >￥{{item.prePrice}}</s>
						</div>
					</div>
				</div>
			</div>
	        <div class="marketing-floor2" v-if="showType == 2">
	        	<div class="marketing-banner"><img :src="banner" alt=""></div>
	        	<div class="marketing-floor2-wrap">
	        		<div class="marketing-floor2-item" @click="productDetail(item.commodityId)" v-for="(item,index) in commodityList" :key="index">
	        			<div class="marketing-floor2-pic">
	        				<img :src="item.commodityThumbLogo" alt="">
	        				<div class="marketing-floor2-disc" v-if="item.commodityIntroduction != null" v-text="item.commodityIntroduction"></div>
	        			</div>
	        			<div class="marketing-floor2-name" v-text="item.commodityName"></div>
	        			<div class="marketing-floor2-num">
	        				<div class="marketing-floor2-price">
	        					<span>{{item.currentPrice | pricePre}}</span>
	        					<div>{{item.currentPrice | priceNext}}</div>
	        				</div>
	        				<span class="marketing-floor2-people" :class="{'price-active': item.prePrice == null}">{{item.prePrice}}</span>
	        			</div>
	        		</div>
	        	</div>
	        </div>
	        <div class="marketing-floor3" v-if="showType == 3">
	        	<div class="marketing-floor3-item" @click="productDetail(item.commodityId)" v-for="(item,index) in commodityList" :key="index">
	        		<img class="marketing-floor3-pic" :src="item.commodityThumbLogo" alt="">
	        		<div class="marketing-floor3-name" v-text="item.commodityName"></div>
	        		<div class="marketing-floor3-num">
	    				<div class="marketing-floor3-price">
	    					<span>{{item.currentPrice | pricePre}}</span>
	    					<div>{{item.currentPrice | priceNext}}</div>
	    				</div>
	    				<s :class="{'price-active': item.prePrice == null}">￥{{item.prePrice}}</s>
	    			</div>
	        	</div>
	        	
	        </div>
    	</scroller>
	</div>
</template>
<script>
	import Vue from 'vue'
	import VueResource  from 'vue-resource'
	import wx from 'weixin-js-sdk'
	Vue.use(VueResource) 
	export default{
		data(){
			return {
				showType: 1,
				titleWord: (this.$route.params.recommendName == undefined ? '商品列表' : this.$route.params.recommendName),
				banner: '',
				commodityList: [],
				collectFlag: true,
				setTime: 0,
				pageNum: 0,
				ctmsHost: this.$store.state.ctmsHost,
				marketId: this.$route.params.marketId
			}
		},
		methods:{
			infinite: function(done){
				var that = this;
				if (!this.collectFlag) {
		            setTimeout(function(){
		            	done(true);
		            }, 10)
		            return;
		        }
		        setTimeout(function(){
		        	that.marketingAjax(function(){
		        		done();
		        	})
		        },that.setTime)
			},
			marketingAjax: function(doneFunc){
				this.pageNum ++;
				var that = this;
	        	var params = {
	                body:{
	                	pageNum: this.pageNum,
						pageSize: 10,
						organizationSeq: this.$store.state.organizationSeq,
						marketId: this.marketId
	                },
	                header:{
	                    token:this.$store.state.token,
	                    time_stamp: new Date().getTime()
	                }
	            }
	            var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = this.$store.state.mmsHost+"/mms/servlet/getRecommendRegionCommodity?str="+paramsStr;
	            this.$http.jsonp(httpURL,{
	                emulateJSON: true,
	                method: "get",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	            }).then(function(res){ 
					console.log(res);
	                that.showType = res.data.showType;
	                that.banner = res.data.banner;
	               // that.titleWord = res.data.name
	                for(var i = 0;i < res.data.commodityList.length; i++){
	               		that.commodityList.push(res.data.commodityList[i]);
	                }
	                if(res.data.commodityList.length < 10){
	               		that.collectFlag = false
	                }
	               
	               doneFunc();
	               that.setTime = 500;
	            },function(res){});
			},
			productDetail(commodityId){
				this.$router.push({name:'productDetail',params:{commodityId:commodityId}});
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			}

		},
		mounted() {
			var that=this;
			if(!this.isCondition(this.$store.state.token)) {
				var setToken = this.tokenMd5();
				this.$store.commit('settoken', setToken);
			}
			this.wxJsdkConfig(['onMenuShareAppMessage', "onMenuShareTimeline"], function() {
				var imgLogo = that.$store.state.mmsHost + "/mms/html5/wechatH5/lxjlogo.png";
				var shareLink=that.$store.state.host+"/mms/html5/wechatH5/dist/index.htm?pageFrom=wx#/prefectureColumn/"+that.marketId+"/"+that.titleWord;
				var obj = {
					title: that.titleWord, //标题
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
		filters:{
			pricePre: function(value){
				var val = parseInt(value);
				return val;
			},
			priceNext: function(value){
				var val = '.'+String(parseFloat(value).toFixed(2)).split('.')[1];
				return val;
			}
		}
	}
</script>
<style>
	*{
		padding: 0;
		margin: 0;
		font-size: 0.14rem;
		font-family: "PingFang SC", Helvetica, Tahoma, "Microsoft YaHei",sans-serif;
	}
	body{
		background: #f3f4f5;
	}
	[v-cloak]{
		display: none;
	}
	.marketing{
		background: #fff;
	}
	.marketing-banner,.marketing-banner img{
		display: block;
		width: 100%;
		height: 1.32rem;
	}
	.marketing-floor1,.marketing-floor2,.marketing-floor3{
		background: #fff;
	}
	.marketing-item{
		box-sizing: border-box;
		margin: 0 0.14rem;
		border-bottom: 1px solid #eee;
		display: flex;
		display: -webkit-flex;
		padding: 0.12rem 0;
	}
	.marketing-item:last-child{
		border-bottom: none;
	}
	.marketing-pic{
		width: 1.17rem;
		height: 1.17rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	.marketing-wrap{
		flex-grow: 2;
		-webkit-flex-grow: 2;
		margin-left: 0.14rem;
	}
	.marketing-name{
		font-size: 0.16rem;
		color: #333;
		line-height: 0.24rem;
		height: 0.48rem;
		margin-top: 0.03rem;
		text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.marketing-disc span{
		display: inline-block;
		font-size: 0.14rem;
		line-height: 0.26rem;
		color: #aaa;
		text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	    height: 0.21rem;
	    overflow: hidden;
	}
	/* .marketing-disc span:last-child{
		margin-left:0.1rem;
	} */
	.marketing-num{
		display: flex;
		display: -webkit-flex;
		padding-top: 0.18rem;
	}
	.marketing-price{
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		overflow: hidden;
		display: flex;
		display: -webkit-flex;
		 
	}
	.marketing-price span{
		font-size: 0.17rem;
		color:#fc9153;
		margin-left:-0.03rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		line-height: 0.24rem;
		display: inline-block;
		height:0.23rem;
	}
	.marketing-price span:before{
		content: "￥";
		margin-right: -0.07rem;
	}
	.marketing-price div{
		font-size: 0.12rem;
		color:#fc9153;
		flex-grow: 2;
		-webkit-flex-grow: 2;
		height: 0.22rem;
		line-height: 0.26rem;
	}
	@media screen and (max-width: 374px) {
	   .marketing-price div{
			line-height: 0.27rem;
		}
	}
	@media  (max-width: 375px) and (max-width: 413px) {
	   .marketing-price div{
			line-height: 0.28rem;
		}
	}
	.marketing-num s{
		display: inline-block;
		flex-grow: 2;
		-webkit-flex-grow: 2;
		color: #999;
		margin-top: 0.01rem;
		float: left;
		box-sizing: border-box;
		margin-left: 0.14rem;
		line-height: 0.23rem;
	}
	.marketing-floor2-wrap{
		overflow: hidden;
		padding-top: 0.14rem;
	}
	.marketing-floor2-item{
		width:50%;
		float: left;
		box-sizing: border-box;
		padding: 0rem 0.14rem 0.2rem;
	}
	.marketing-floor2-item:nth-child(2n-1){
		padding-right: 0.07rem;
	}
	.marketing-floor2-item:nth-child(2n){
		padding-left: 0.07rem;
	} 
	.marketing-floor2-pic{
		position: relative;
	}
	.marketing-floor2-pic img{
		width: 100%;
		height: 1.86rem;
		display: block;
	}
	.marketing-floor2-disc{
		line-height: 0.2rem; 
		padding: 0.05rem 0;
		background: rgba(0,0,0,0.4);
		text-align: center;
		color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 100%;
		display:block;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
	.marketing-floor2-name{
		height: 0.4rem;
		margin-top: 0.11rem;
		margin-bottom: 0.1rem;
		font-size: 0.16rem;
		line-height: 0.2rem;
		color: #333;
		display: block;
		box-sizing: border-box;
		padding: 0 0.07rem;
		text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.marketing-floor2-num{
		display: flex;
		display: -webkit-flex;
		padding: 0 0.04rem;
	}
	.marketing-floor2-price{
		/* display: flex;
		display: -webkit-flex; */
		display: table;
	}
	.marketing-floor2-price span{
		font-size: 0.17rem;
		color: #fc9153;
		margin-left: -0.03rem;
		/* flex-shrink: 0;
		-webkit-flex-shrink: 0; */
		display: inline-block;
		line-height: 0.23rem;
	}
	.marketing-floor2-price span:before{
		content:"￥";
		margin-right: -0.03rem;
	}
	.marketing-floor2-price div{
		font-size: 0.12rem;
		color: #fc9153;
		/* height: 0.23rem; */
		/* line-height: 0.26rem; */
		display: table-cell;
		vertical-align: text-bottom;
	}
	@media screen and (max-width: 374px) {
	  .marketing-floor2-price div{
			line-height: 0.27rem;
		}
	}
	.marketing-floor2-people{
		display: inline-block;
		color: #999;
		padding-top: 0.02rem; 
		margin-left: 0.24rem;
		line-height: 0.22rem;
		text-decoration: line-through;
	}
	.marketing-floor2-people:before{
		content: "￥";
	}
	.marketing-floor3{
		padding: 0 0.14rem;
	}
	.marketing-floor3-item{
		width: 100%;
		border-bottom: 1px solid #eee;
	}
	.marketing-floor3-item:last-child{
		border-bottom: none;
	}
	.marketing-floor3-pic{
		width: 100%;
		height: 1.8rem;
		margin-top: 0.14rem;
	}
	.marketing-floor3-name{
		margin-top: 0.1rem;
		font-size: 0.17rem;
		line-height: 0.24rem;
		color: #333;
		text-overflow: -o-ellipsis-lastline;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.marketing-floor3-num{
		display: flex;
		display: -webkit-flex;
		margin-top: 0.13rem;
		padding-bottom: 0.11rem;
	}
	.marketing-floor3-price{
		overflow: hidden;
		display: flex;
		display: -webkit-flex;
	}
	.marketing-floor3-price span{
		font-size: 0.17rem;
		margin-left: -0.03rem;
		display: inline-block;
		line-height: 0.23rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		color: #fc9153;
	}
	.marketing-floor3-price span:before{
		content: "￥";
		margin-right: -0.03rem;
	}
	.marketing-floor3-price div{
		font-size: 0.12rem;
		height: 0.23rem;
		line-height: 0.26rem;
		flex-grow: 2;
		-webkit-flex-grow: 2;
		color: #fc9153;
	}
	@media screen and (max-width: 374px) {
	   .marketing-floor3-price div{
			line-height: 0.27rem;
		}
	}
	.marketing-floor3-num s{
		padding-top: 0.02rem;
		margin-left: 0.14rem;
		color: #999;
		font-size: 0.13rem;
		line-height: 0.23rem;
	}
	.price-active{
		opacity: 0;
	}
</style>