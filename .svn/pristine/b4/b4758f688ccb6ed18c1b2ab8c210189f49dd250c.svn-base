<template>
	<div class="communitySearch" v-title data-title="小区搜索">
		<div class="searchCommunity clearfix">
			<div class="fl">
				<form action="javascript:void(0);" method="post" @submit="onsubmit">
					<input type="search" name="" id="" v-model="inputVal" placeholder="搜索小区" v-focus='true'/>
					<span class="clearKeyword" v-if='clearKeywordShow' @click='clearKeyword'></span>
				</form>
			</div>
			<div class="fr" @click="$router.go(-1)">
				取消
			</div>
		</div>
		<div class="communitysBox">
			<div class="community" v-for="item in cooperationAreas" @click='selectCommunnity(item.areaName,item.organizationSeq)'>{{item.areaName}}</div>
			<div id="l-map"></div>
		</div>
	</div>
</template>	
<script type="text/javascript">
	import wx from 'weixin-js-sdk'
	export default{
		name:'communitySearch',
		data(){
			return{
				inputVal:'',
				cooperationAreas:[],
				clearKeywordShow:false
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
		mounted(){
			this.wxJsdkConfig([]);
			this.zhuan();
		},
		methods:{
			onsubmit(){
				this.cityInfoAjax();
			},
			selectCommunnity(areaName,organizationSeq){
				this.$store.commit('changeCommuinty',areaName)//修改x小区
				this.$store.commit('changeorganizationSeq',organizationSeq)//修改x小区
				this.$store.commit('setorganizationSeqFlag',true)//修改x小区
				this.$router.go(-2)
			},
			clearKeyword(){
				this.inputVal = ''
			},
			cityInfoAjax(){
				var params = {
					body:{
						areaName: this.inputVal,
						lng: this.$store.state.lng,
						lat: this.$store.state.lat
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime(),
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = this.$store.state.cmsHost + "/cms/servlet/findAreaInfos?str="+paramsStr;
	            this.$http.jsonp(httpURL,{
	                emulateJSON: true,
	                method: "get",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	            }).then(function(res){ 
	            	console.log(res);
	            	this.cooperationAreas = res.body.cooperationAreas;
	            },function(res){});
			},
			zhuan(){
				
			}
		},
		watch:{
			inputVal(newVal,oldVal){
				if(newVal===''){
					this.clearKeywordShow = false
				}else{
					this.clearKeywordShow = true
				}
			}
		}
	}
</script>
<style scoped="scoped">
	.searchCommunity{
		padding: 0.05rem 0.07rem 0.05rem  0.14rem;
	}
	.fl{
		width: 88%;
	}
	.fl input{
		height: 0.3rem;
		width: 100%;
		border-radius: 0.04rem;
		padding-left: .42rem;
		box-sizing: border-box;
		background: url(../../../static/images/btn_ic_search@3x.png) 0.14rem center no-repeat;
		background-size: 0.14rem;
		background-color: #FFFFFF;
	}
	.fr{
		width: 12%;
		text-align: center;
		color: #FC9153;
		font-size: 0.16rem;
		line-height: .3rem;
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
	.communitysBox{
		background-color: #FFFFFF;
	}
	.community{
		margin: 0 0.14rem;
		height: 0.4rem;
		line-height: 0.4rem;
		border-top: 1px solid #F1F2F3;
	}
	.community:first-child{
		border: none;
	}
</style>