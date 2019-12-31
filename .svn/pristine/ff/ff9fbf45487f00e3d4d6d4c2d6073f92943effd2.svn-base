<template>
	<div class="collect" v-title :data-title="titleWord">
		<scroller v-if="collectColumnFlag" :on-infinite="infinite" ref="my_scroller" v-cloak>
			<div style="margin-top:-1px;height:1px;"></div>
			<div class="collect-word" v-if="collectWordFlag">当前小区收藏商品</div>
			<div class="collect-wrap">
				<div class="collect-item"  v-if="listArray.length > 0 && item.commodityStatus == 1" v-for="(item,index) in listArray">
					<router-link class="collect-link" @click.native="collectJump(item.commodityId)" to="">
						<div class="collect-main">
							<img :src="item.commodityImg">
							<div class="collect-center">
								<div class="collect-name" v-text="item.commodityName"></div>
								<div class="collect-price">
									<span>{{item.commodityPrice | pricePre}}</span>
									<span>{{item.commodityPrice | priceNext}}</span>
								</div>
							</div>
						</div>
						<div class="collect-icon">
							<img src="./images/ic_more_grey@3x.png">
						</div>
					</router-link>
					<div class="collect-delecte" @click.stop="collectDelete(item.commodityId,index)">删除</div>
				</div>
				<div class="collect-item"  v-if="listLostArray.length > 0 && item.commodityStatus == 0" v-for="(item,i) in listLostArray">
					<router-link class="collect-link" to="">
						<div class="collect-main">
							<img :src="item.commodityImg">
							<div class="collect-center">
								<div class="collect-name" v-text="item.commodityName"></div>
								<div class="collect-lose ">失效</div>
								<div class="collect-price collect-price-lose">
									<span>{{item.commodityPrice | pricePre}}</span>
									<span>{{item.commodityPrice | priceNext}}</span>
								</div>
							</div>
						</div>
						<div class="collect-icon">
							<img src="./images/ic_more_grey@3x.png">
						</div>
					</router-link>
					<div class="collect-delecte" @click.stop="collectDelete(item.commodityId,i)">删除</div>
				</div>
			</div>
		</scroller>
		<div class="collect-empty" v-if="emptyFlag">
			<img src="./images/collect-empty.png">
			<div class="collect-empty-tip">您还未收藏任何内容</div>
			<router-link to="product">
				<div class="collect-empty-go">去看看</div>
			</router-link>
		</div>
	</div>
</template>
<script>
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'

	export default{
		data(){
			return{
				titleWord: '商品收藏',
				collectColumnFlag: true,
				emptyFlag:false,
				infiniteFlag: true,
				collectWordFlag: false,
				setTime: 0,
				listArray: [],
				listLostArray: [],
				pageNum: 0
			}
		},
		methods:{
			infinite: function(done){
				var that = this;
				if (!this.infiniteFlag) {
		            setTimeout(function(){
		            	done(true);
		            }, 10)
		            return;
		        }
		        setTimeout(function(){
		        	that.collectAjax(function(){
		        		done();
		        	})
		        },that.setTime);
			},
			collectAjax(doneFunc){
				var that = this;
				that.pageNum ++;
				var params = {
					body:{
						areaSeq: this.$store.state.organizationSeq,
						pageSize: 10,
						pageNum: that.pageNum,
						type:1,
						commodityType: 2
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/searchComdityUserLove?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
				 	for(var i = 0; i < res.data.list.length;i++){
				 		that.listArray.push(res.data.list[i]);
				 		that.listLostArray.push(res.data.list[i]);
				 	}
				 	if(res.data.list.length < 10){
				 		that.infiniteFlag = false;
				 	}
				 	if(that.listArray.length == 0){
				 		that.emptyFlag = true;
				 		that.collectColumnFlag = false;
				 	}else{
				 		that.collectWordFlag = true;
				 	}

				 	if(that.listArray.length == 0){
				 		that.emptyFlag = true;
				 		that.collectColumnFlag = false;
				 	}

				 	doneFunc();
				 	setTimeout(function(){
				 		that.touchSwiper();
				 	},500)
				 	
				 	that.setTime = 500;
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			collectAjaxAgain(){
				var that = this;
				var params = {
					body:{
						areaSeq: this.$store.state.organizationSeq,
						pageSize: 10*that.pageNum-10,
						pageNum: 1,
						type:1,
						commodityType: 2
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				that.pageNum --;
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/searchComdityUserLove?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
	            	console.log(res);
	            	that.listArray = [];
	            	that.listLostArray = [];
				 	for(var i = 0; i < res.data.list.length; i++){
				 		that.listArray.push(res.data.list[i]);
				 		that.listLostArray.push(res.data.list[i]);
				 	}
			
				 	if(that.listArray.length == 0){
				 		that.emptyFlag = true;
				 		that.collectColumnFlag = false;
				 	}
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			collectJump: function(commodityId){
				this.$router.push({name: 'productDetail', params: {commodityId:commodityId}});
			},
			collectDelete: function(id,index){
				console.log(id + " " + index);
				var that = this;
				that.pageNum ++;
				var params = {
					body:{
						commodityId: id,
						type:1,
						commodityType: 2
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/addUserComOrSellerLove?str="+paramsStr;
	            
	            axios.post(httpURL).then(function (res) {
				 	if(res.data.result == 0){
			 			var item = document.getElementsByClassName("collect-link");
			 			var itemDelete = document.getElementsByClassName("collect-delecte"); 
				 		for(var j = 0; j < item.length; j++) {
			                item[j].style.webkitTransform="translate("+0+"px, 0px)";
			                itemDelete[j].style.webkitTransform="translate("+0+"px, 0px)";
			            }
			            lxjTip.msg("删除成功");
			 			that.collectAjaxAgain();

			 			if(that.listArray.length == 0){
					 		that.emptyFlag = true;
					 		that.collectColumnFlag = false;
					 	}
				 		
				 	}else{
				 		lxjTip.msg("删除失败")
				 	}
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			touchSwiper: function(){
				var moveX;
		        var moveXTemp = 0;
		        var touchstart;
				var item = document.getElementsByClassName("collect-link"); 
				var itemDelete = document.getElementsByClassName("collect-delecte"); 
				var deleteWidth = document.getElementsByClassName('collect-delecte')[0].clientWidth;
				var indexFlag;
				var moveFlag = true;
		        for(var i = 0; i < item.length; i++) {             
		            (function(i) {
		                item[i].addEventListener('touchstart', function(){
		                    console.log('第'+i+'个');
		                });      
		                item[i].ontouchstart =function(event) {   
		                    touchstart = event.touches[0].clientX;  
		                    if(indexFlag != i){
		                   		for(var j = 0; j < item.length; j++) {
					                item[j].style.webkitTransform="translate("+0+"px, 0px)";
					                itemDelete[j].style.webkitTransform="translate("+0+"px, 0px)";
					            }
		                    }   
		                };  
		                item[i].ontouchmove = function(event){
		                	moveX = event.changedTouches[0].clientX - touchstart; 
		                	if(indexFlag != i){	
			                	if(moveX < -deleteWidth) moveX = -deleteWidth;	
			                	if(moveX > 0) moveX = 0;		                	 
	                    		item[i].style.webkitTransform = "translate("+moveX+"px, 0px)";
	                    		itemDelete[i].style.webkitTransform = "translate("+moveX+"px, 0px)";  
		                	}	
		                }       
		                item[i].ontouchend =function(event) {  
		                	indexFlag = i;
		                    moveX = event.changedTouches[0].clientX - touchstart;
		                    if(moveX <= -deleteWidth){
		                        moveXTemp = -deleteWidth;
		                        for(var j = 0; j < item.length; j++) {
					                item[j].style.webkitTransform="translate("+0+"px, 0px)";
					                itemDelete[j].style.webkitTransform="translate("+0+"px, 0px)";
					            }
		                    }else if(moveX > -deleteWidth){
		                        moveXTemp = 0;
		                        indexFlag = null;
		                    }
		                    item[i].style.webkitTransform="translate("+moveXTemp+"px, 0px)";
		                    itemDelete[i].style.webkitTransform="translate("+moveXTemp+"px, 0px)";          
		                    moveXTemp = -50; 
		                };  
		            })(i);
		        }
			}
			
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
		}, 
		mounted: function(){
			this.wxJsdkConfig([]);
		}
	}
</script>
<style>
	[v-cloak]{
		display: none;
	}
	.collect-wrap{
		width: 100%;
		background: #fff;
		box-sizing: border-box;
	}
	.collect-word{
		line-height: 0.4rem;
		font-size: 0.15rem;
		color: #222;
		box-sizing: border-box;
		margin-left: 0.14rem;
	}
	.collect-icon img{
		width: 0.08rem;
		height: 0.14rem;
		margin-top: 0.45rem;
	}
	.collect-item{
		width: 100%;
		padding: 0 0.14rem;
		background: #fff;
		box-sizing: border-box;
		margin-top: 0.014rem;
		position: relative;
	}
	.collect-item a{
		border-bottom: 1px solid #eee;
	}
	.collect-delecte{
		position: absolute;
		top: 0;
		right: -0.6rem;
		z-index:10000000000000000;
		line-height: 1.03rem;
		width: 0.6rem;
		background: red;
		color: #fff;
		text-align: center;
	}
	.collect-item a{
		display: flex;
		display: -webkit-flex;
	}
	.collect-item:last-child a{
		margin-top: 0;
		border-bottom: none;
	}
	.collect-main{
		flex-grow: 2;
		-webkit-flex-grow: 2;
		display: flex;
		display: -webkit-flex;
		padding: 0.1rem 0;
	}
	.collect-icon{
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	.collect-lose{
		width: 0.4rem;
		text-align: center;
		background: #ccc;
		line-height: 0.24rem;
		border-radius: 0.12rem;
		color: #fff;
		border: 1px solid #eee;
	}
	.collect-main img{
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
		width: 0.8rem;
		height: 0.8rem;
	}
	.collect-center{
		box-sizing: border-box;
		padding-left: 0.14rem;
	}
	.collect-name{
		font-size: 0.15rem;
		color: #555;
		line-height:0.2rem;
    	height:0.4rem;
   		overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
       -webkit-box-orient: vertical;
	}
	.collect-price{
		color: #fc9163;
		margin-top: 0.17rem;
	}
	.collect-price span{
		/*vertical-align: text-bottom;*/
	}
	.collect-price-lose{
		margin-top: 0rem;
	}
	.collect-price span:first-child{
		font-size: 0.15rem;
	}
	.collect-price span:first-child:before{
		content: "￥";
		margin-right: -0.02rem;
	}
	.collect-price span:last-child{
		font-size: 0.12rem;
		margin-left: -0.03rem;

	}
	.collect-empty img{
		width: 1.8rem;
		height: 1.8rem;
		margin: 1.2rem auto 0;
		display: block;
	}
	.collect-empty-tip{
		font-size: 0.17rem;
		color: #ccc;
		text-align: center;
		margin-top: 0.1rem;
	}
	.collect-empty-go{
		width: 1.1rem;
		height: 0.36rem;
		margin: 0 auto;
		text-align: center;
		color: #fc9153;
		border: 1px solid #fc9153;
		line-height: 0.36rem;
		border-radius: 0.18rem;
		margin-top: 0.3rem;
	}
</style>