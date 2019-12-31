<template>
	<div class="citySelect" v-title data-title="城市选择">
		<div class="myAddressBox">
			<div class="myAddress">
				<div class="myAddressTitle">所在城市</div>
				<div class="myAddressValBox">
					<div class="myAddressVal" @click='selectLocation' :code='$store.state.locationCode' >{{$store.state.locationCity}}</div>
				</div>
			</div>
			<div class="myAddress">
				<div class="myAddressTitle">合作城市</div>
				<div class="myAddressValBox">
					<div class="myAddressVal" v-for='item in partnerCitys' @click='selectCity(item.cityName,item.cityCode)' :code='item.cityCode' >{{item.cityName}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import wx from 'weixin-js-sdk'
	export default{
		name:'citySelect',
		data(){
			return{
				city:{
					name: this.$store.state.locationCity,
					code: this.$store.state.locationCode
				},
				partnerCitys:[]
			}
		},
		methods:{
			selectCity(cityName,cityCode){
				var that = this;
				var isLocationFlag = this.$store.state.locationCity == cityName ? true : false;
				console.log(isLocationFlag + ' '+ cityName);
				console.log(this.$store.state.locationCity);
				that.$store.commit('setcityname',cityName);
				that.$store.commit('setisLocation',isLocationFlag);
				//that.$store.commit('setcitycode',cityCode);
				that.$store.commit('setisLocationSelect',isLocationFlag);
				that.$store.commit('setLocationCode',cityCode);
				this.$router.go(-1);
			},
			selectLocation(e){
				var that = this;
				that.$store.commit('setcityname',e.target.innerText);
				that.$store.commit('setisLocation',true);
				that.$store.commit('setcitycode',e.target.getAttribute('code'));
				that.$store.commit('setisLocationSelect',true);
				this.$router.go(-1);
			},
			findCooperationCity(){
				var params = {
					body:{},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime(),
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = this.$store.state.cmsHost + "/cms/servlet/findCooperationCity?str="+paramsStr;
	            this.$http.jsonp(httpURL,{
	                emulateJSON: true,
	                method: "get",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	            }).then(function(res){ 
	            	console.log(res);
	            	this.partnerCitys = res.body.citys;
	            },function(res){});
			}
		},
		mounted(){
			this.wxJsdkConfig([]);
			this.findCooperationCity();
		}
	}
</script>
<style scoped="scoped">
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
</style>