<template>
	<div class="communitySelect" v-title data-title="小区选择">
		<div class="searchCommunity clearfix">
			<div class="fl">
				<input type="search" name="" id="" placeholder="搜索小区" @click="oninput"/>
			</div>
			<div class="fr" @click="goCitySelect">
				<span class="icon"></span>
				{{$store.state.cityname}}
			</div>
		</div>
		<div class="myAddressBox" v-show='$store.state.isLocation'>
			<div class="myAddress">
				<div class="myAddressTitle">所在位置</div>
				<div class="myAddressValBox">
					<div class="myAddressVal">{{$store.state.locationAddr}}</div>
					<!-- <div id="l-map"></div> -->
				</div>
			</div>
			<div class="myAddress" v-show='$store.state.isLocation'>
				<div class="myAddressTitle">我的小区</div>
				<div class="myAddressValBox">
					<div class="myAddressVal" @click='selectCommunnity(item.areaName,item.organizationSeq)' v-for='item in myCommunitys'>{{item.areaName}}</div>
					<div class="myAddressVal null"  v-show='myCommunitys.length == 0'>暂无小区</div>
				</div>
			</div>
			<div class="myAddress" v-show='$store.state.isLocation'>
				<div class="myAddressTitle">附近的小区</div>
				<div class="myAddressValBox">
					<div class="myAddressVal" v-if='$store.state.locationAddr != "未获取地理位置"' v-for='item in cooperationAreas' @click='selectCommunnity(item.areaName,item.organizationSeq)'>{{item.areaName}}</div>
					<div class="myAddressVal null" v-show='cooperationAreas.length == 0 || $store.state.locationAddr == "未获取地理位置"'>暂无小区</div>
				</div>
			</div>
		</div>
		<div class="myAddressBox" v-show='!$store.state.isLocation && !$store.state.isLocationSelect'>
			<div class="myAddress">
				<div class="myAddressTitle">所有小区</div>
				<div class="myAddressValBox">
					<div class="myAddressVal" v-for='(item,index) in allCommunitys' :key="index" @click='selectCommunnity(item.areaName,item.organizationSeq)'>{{item.areaName}}</div>
					<div class="myAddressVal null" v-show='allCommunitys.length === 0'>暂无小区</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import wx from 'weixin-js-sdk'
	export default{
		name:'communitySelect',
		data(){
			return{
				allCommunityShow:false,
				mylxjAddress:'',
				myCommunitys:[],
				cooperationAreas:[],
				allCommunitys:[]
			}
		},
		mounted(){
			this.wxJsdkConfig([]);
		},
		methods:{
			goCitySelect(){
				this.$router.push({path:'/citySelect'})
			},
			oninput(){
				this.$router.push({path:'/communitySearch'})
			},
			selectCommunnity(areaName,organizationSeq){
				this.$store.commit('changeCommuinty',areaName);//修改x小区
				this.setCookie("commuintyName",areaName,7);
				this.$store.commit('changeorganizationSeq',organizationSeq);
				this.$store.commit('setorganizationSeqFlag',true);
				this.$router.go(-1);
			},
			cityInfoAjax(){ //附近小区
				if(this.$store.state.lng == ''){
					return false;
				}
				var params = {
					body:{
						areaName:'',
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
			bindAreaAjax(){ //绑定的小区
				var params = {
					body:{
						userAccount: this.$store.state.lxjAccount
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime(),
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = this.$store.state.tsmsHost + "/tsms/servlet/queryBindAddress?str="+paramsStr;
	            this.$http.jsonp(httpURL,{
	                emulateJSON: true,
	                method: "get",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	            }).then(function(res){ 
	            	console.log(res);
	            	this.myCommunitys = res.body.list;
	            },function(res){});
			},
			findCooperationCityAreas(){ //城市合作小区
				/*if(this.$store.state.lng == ''){
					return false;
				}*/
				var params = {
					body:{
						cityCode: this.$store.state.locationCode
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime(),
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = this.$store.state.cmsHost + "/cms/servlet/findCooperationCityAreas?str="+paramsStr;
	            this.$http.jsonp(httpURL,{
	                emulateJSON: true,
	                method: "get",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	            }).then(function(res){ 
	            	console.log(res);
	            	this.allCommunitys = res.body.areas;
	            },function(res){});
			},
			wechatHomeShareAndLocation(){
				var that = this;
				this.wxJsdkConfig(['getLocation'],function(id){
	    			setTimeout(function(){
			    		that.getLocation();		
			    	},100);
		    	},["menuItem:share:appMessage", "menuItem:share:timeline"]);
			},
			getLocation(){
				if(sessionStorage.getItem("LocationFlag") != null){
					return false;
				}
				var that = this;
				wx.getLocation({
				    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				    success: function (res) {
				        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				        var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
				        var speed = res.speed; // 速度，以米/每秒计
				        var accuracy = res.accuracy; // 位置精度
				        that.$store.commit('setlat',res.latitude);
				        that.$store.commit('setlng',res.longitude);
				        that.mylxjAddressFunc();
				    },
				    cancel: function() {
						sessionStorage.setItem("LocationFlag",false);
					}
				});
			},
			mylxjAddressFunc(){ //获取定位信息
				var that = this;
				var x = this.$store.state.lng;
			    var y =  this.$store.state.lat;
			    var ggPoint = new BMap.Point(x,y);
		      	var map = new BMap.Map("l-map");      
				map.centerAndZoom(ggPoint, 30);      				     
				var myGeo = new BMap.Geocoder();      // 创建地理编码实例 
				myGeo.getLocation(ggPoint, function(result){    // 根据坐标得到地址描述   
				    if (result){      
				    	var addr = result.addressComponents;
				    	var mylxjAddress = addr.province + addr.city + addr.district + addr.street;   
						that.$store.commit('setcityname',addr.city);
						that.$store.commit('setisLocation',true);
						that.$store.commit('setcitycode','');
						for(var i = 0; i < that.partnerCitys.length; i++){
							if(that.partnerCitys[i].cityName == addr.city){
								that.$store.commit('setLocationCode',that.partnerCitys[i].cityCode);		
							}
						}
				    }      
				});
			},
		},
		mounted(){
			var that = this;
			this.cityInfoAjax();
			this.bindAreaAjax();

			//that.$store.commit('setcityname',this.$store.state.locationCity);
			//that.$store.commit('setcitycode',this.$store.state.setLocationCode);

			this.findCooperationCityAreas();
			if(this.$store.state.lng == ''){
				that.wechatHomeShareAndLocation();
			}
		}
	}
</script>
<style scoped="scoped">
	.searchCommunity{
		padding: 0.05rem 0.07rem 0.05rem  0.14rem;
		display: flex;
		display: -webkit-flex;
	}
	.fl{
		flex-grow: 2; 
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
		text-align: center;
		color: #333333;
		font-size: 0.16rem;
		line-height: .3rem;
		flex-shrink: 0
	}
	.icon{
		display: inline-block;
		width: 0.14rem;
		height: 0.3rem;
		background: url(../../../static/images/nav_btn_ic_location@3x.png) left 0.06rem no-repeat;
		background-size: 0.14rem 0.14rem;
		vertical-align: middle;
		margin-top: 0.03rem;
		margin-left: 0.1rem;
	}
	.myAddress{
	}
	.myAddressTitle,.myAddressVal{
		padding: 0 0.14rem;
		height: .4rem;
		line-height: .4rem;
		color: #FC9153;
		font-size: .16rem;
	}
	.myAddressValBox{
		background-color: #FFFFFF;
	}
	.myAddressVal{
		padding: 0;
		margin: 0 0.14rem;
		color: #333333;
		border-top: 1px solid #F1F2F3;
	}
	.myAddressVal:first-child{
		border: none;
	}
	.null{
		color: #CCCCCC;
	}
	#l-map{
		background-color: #fff !important;
		opacity: 0;
	}
</style>