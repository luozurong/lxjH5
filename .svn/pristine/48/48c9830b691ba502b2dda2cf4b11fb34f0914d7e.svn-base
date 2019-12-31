<template>
	<div class="goodsSearch" v-title data-title="商品搜索">
		<div class="searchCommunity clearfix">
			<div class="fl">
				<form action="javascript:void(0);" method="post" @submit="onsubmit">
					<input type="search" name="" id="" v-model="keyword" placeholder="搜索商品" v-focus='true'/>
					<span class="clearKeyword" v-if='clearKeywordShow' @click='clearKeyword'></span>
				</form>
			</div>
			<div class="fr" @click="$router.go(-1)">
				取消
			</div>
		</div>
		<div class="historyItems" v-if='!goodsListShow'> 
			<div class="historyTitle">历史搜索</div>
			<ul class="clearfix">
				<li v-for = '(historyItem,index) in historyItems' :key="index" class="fl" @click='selectHistory(index)'>{{historyItem}}</li>
				<li v-if = 'historyItems.length===0' class="noHistory">暂无历史搜索</li>
			</ul>
			<div class="clearhistory" v-if="historyItems.length!=0">
				<span class="" @click='clearHistory'>清除历史搜索</span>
			</div>
		</div>

		<scroller :noDataText="noDataText" :on-infinite="infinite"  ref="my_scroller" class="goodsListBox" v-if='goodsListShow'>
			<div style="height:1px;margin-top:1px"></div>
			<ul class="goodsbox">
				<li class="goods" v-for='gd in goods' :style="{backgroundImage:'url('+gd.logo+')' }" @click='goDetail(gd.id)'>
					<div class="goodsName">{{gd.name}}</div>
					<div class="sku">{{gd.sku}}</div>
					<div class="price">￥{{gd.price}}</div>
				</li>
			</ul>
		</scroller>
		<div class="empty" v-if="emptyFlag">
			<img src="../home/images/search-empty.png">
			<span>暂无商品</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	export default{
		name:'goodsSearch',
		data(){
			return{
				keyword: sessionStorage.getItem('keyword') ? sessionStorage.getItem('keyword') : '',
				historyItems:[],
				goods:[],
				noDataText: '',
				pageNum: 0,
				doneFlag: true,
				goodsListShow: Boolean(sessionStorage.getItem('goodsListShow')) ?  !Boolean(sessionStorage.getItem('goodsListShow')): false,
				clearKeywordShow:false,
				setTime: 0,
				emptyFlag: false,
				mmsHost: this.$store.state.mmsHost,
			}
		},
		directives: {
		    focus: {//自定义指令--自动对焦
		        inserted: function (el, {value}) {
		            if (value) {
		                el.focus();
		            }
		        }
		    }
		},
		methods:{
			search(done){
				var _this = this
				this.pageNum ++;
				this.goodsListShow = true;
				sessionStorage.setItem('goodsListShow',true);
				var params = {
					body: {
						organizationSeq: this.$store.state.organizationSeq,
						keyWord: this.keyword,
						pageSize:10,
						pageNum: this.pageNum
					},
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				console.log(this.pageNum);
				_this.doneFlag = false;
				let httpURL = this.mmsHost + "/mms/servlet/searchCommodity";
	            axios.post(httpURL,params).then(function (res) {
				    console.log(res.data)
				    _this.doneFlag = true;
				    var resData = res.data
					if(resData.result == '0'){
						for(var i = 0; i < resData.list.length; i++){
							_this.goods.push(resData.list[i])
						}
						
					}
					if(resData.list.length < 10){
						_this.doneFlag = false;
					}
					if(_this.goods.length == 0){
						_this.emptyFlag = true;
						_this.noDataText = "";
						
					}else{
						_this.emptyFlag = false;
						_this.noDataText = "没有更多数据了";
						
					} 

					_this.setTime = 500;
					done();
				})
				.catch(function (error) {
				    console.log(error);
				});
			},
			onsubmit(){
				const _this = this
				this.pageNum = 0;
				this.goods = [];
				_this.noDataText = "";
				_this.setTime = 0;
				_this.doneFlag = true;
				const keyword = _this.keyword.replace(/(^\s*)|(\s*$)/g, "")
				if(keyword!='' && keyword!==undefined && keyword!==null){
					_this.setHistoryItems(keyword)
					_this.keyword = keyword;
					_this.infinite(function(){});
				}
			},
			selectHistory(index){
				const _this = this;
				this.pageNum = 0;
				this.goods = [];
				_this.doneFlag = true;
				_this.keyword = this.historyItems[index];

				_this.setHistoryItems(_this.keyword)
				_this.noDataText = "";
				_this.setTime = 0;
				_this.infinite(function(){})
			},
			clearKeyword(){
				this.keyword = ''
			},
			setHistoryItems(keyword){//历史记录
				var historyItems = localStorage.historyItems;
				var items = [];
				if(historyItems===undefined){
					items.push(this.keyword)
					localStorage.setItem('historyItems',JSON.stringify(items))
				}else{
					items = JSON.parse(localStorage.getItem('historyItems'))
					items.unshift(this.keyword)
					localStorage.historyItems = JSON.stringify(items)
				}
				this.historyItems = this.getHistoryItems()
			},
			getHistoryItems(){//去重
				if(localStorage.historyItems!==undefined){
					var historyItems = JSON.parse(localStorage.historyItems);
					historyItems = historyItems.filter(function(value,index,arr){
						return arr.indexOf(value) === index;
					})
					console.log(historyItems)
					return historyItems;
				}else{
					return []
				}
			},
			clearHistory(){
				localStorage.removeItem('historyItems');
				this.keyword = '';
				this.historyItems = this.getHistoryItems();
			},
			infinite(done){
				var that = this;
				if (!this.doneFlag) {
		            setTimeout(function(){
		            	done(true);
		            }, 10)
		            return;
		        }
		        setTimeout(function(){
		        	that.search(function(){
		        		done();
		        	})
		        },that.setTime);	 
			},
			goDetail(id){
				console.log(id);
				this.$router.push({name:'productDetail',params:{commodityId: id}})
			}
		},
		mounted(){
			this.historyItems = this.getHistoryItems();
			if(this.keyword != ''){
				this.infinite(function(){});
			}
			console.log(this.keyword);
			console.log(this.goodsListShow);

			this.wxJsdkConfig([]);

		},
		watch:{
			keyword(newVal,oldVal){
				sessionStorage.setItem('keyword',newVal)
				if(newVal == ''){
					this.clearKeywordShow = false
					this.goodsListShow = false;
					sessionStorage.setItem('goodsListShow',false)
				}else{
					this.clearKeywordShow = true;
				}
			}
		}
	}
</script>
<style scoped>
	.searchCommunity{
		position: relative;
		padding: 0.08rem 0.07rem 0.1rem  0.14rem;
	}
	.searchCommunity .fl{
		width: 88%;
	}
	.searchCommunity .fl input{
		height: 0.3rem;
		width: 100%;
		border-radius: 0.04rem;
		padding-left: .42rem;
		box-sizing: border-box;
		background: url(../../../static/images/btn_ic_search@3x.png) 0.14rem center no-repeat;
		background-size: 0.14rem;
		background-color: #FFFFFF;
	}
	.searchCommunity form{
		position: relative;
	}
	.clearKeyword{
		position: absolute;
		display: inline-block;
		width: 0.12rem;
		height: 0.12rem;
		top: 0.09rem;
		right: 0.05rem;
		background: url(../../../static/images/btn_cancle@3x.png) left center no-repeat;
		background-size: 0.12rem;
	}
	.searchCommunity .fr{
		width: 12%;
		text-align: center;
		color: #FC9153;
		font-size: 0.16rem;
		line-height: .3rem;
	}
	.historyItems{
		padding:0.14rem;
		background-color: #FFFFFF;
	}
	.historyTitle{
		padding-bottom: 0.14rem;
	}
	li.fl{
		display: inline-block;
		box-sizing: border-box;
		line-height: 0.22rem;
		background-color: #F0F0F0;
		color: #555555;
		margin: 0 0.14rem 0.1rem 0;
		padding: 0.06rem 0.16rem;
		border-radius: 0.16rem;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.noHistory{
		text-align: center;
		color: #CCCCCC;
	}
	.clearhistory{
		text-align: center;
		margin-top: 0.1rem;
	}
	.clearhistory span{
		display: inline-block;
		border: 1px solid #FC9153;
		color: #FC9153;
		padding: 0.05rem 0.14rem;
		border-radius: 0.14rem;
	}
	.goodsListBox{
		margin-top: 0.45rem;
		/*padding-top: 45px;*/
		/*box-sizing: border-box;*/
	}
	.goodsbox{
		/*margin:0 0.14rem;*/
		background-color: #FFFFFF;
		padding: 0 0.14rem;
	}
	.goods{
		padding: 0.14rem 0 0.14rem 0.94rem ;
		box-sizing: border-box;
		height: 1.1rem;
		border-bottom: 1px solid #F1F2F3;
	    background: no-repeat left center;
	    background-size: 0.8rem 0.8rem;
	    position: relative;
	}
	.goodsName{
		color: #333333;
		font-size: 0.14rem;
		height: 0.4rem;
		line-height: 0.2rem;
		overflow: hidden;
	}
	.sku{
		color: #AAAAAA;
		font-size: 0.12rem;
	}
	.price{
		color: #FC9153;
		font-size: 0.16rem;
		line-height: 0.2rem;
	}
	._v-container>._v-content>.loading-layer{
		display: none; 
	}
	.empty img{
		display: block;
		width: 1.60rem;
		height: 1.6rem;
		margin: 1.20rem auto 0;
	}
	.empty span{
		display: block;
		text-align: center;
		margin-top: 0.12rem;
		font-size: 0.17rem;
		color: #ccc;
	}
	
</style>