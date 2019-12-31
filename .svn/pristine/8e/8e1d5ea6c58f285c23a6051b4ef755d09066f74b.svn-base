<template>
	<div v-title :data-title="editAddressTitle" class="address editAddress">
		<div class="address-lofistics">
			<span>收货人</span>
			<input type="text" v-model="peopleName" maxlength="11" placeholder="请输入真实的收货人姓名">
		</div>
		<div class="address-lofistics">
			<span>手机号码</span>
			<input type="tel" maxlength="11" v-model="mobile" placeholder="请输入手机号码">
		</div>
		<div class="city-picker">
			<wv-group>
				<wv-cell title="省 市 区" is-link :value="cityAddress" @click="addressPickerFun()" />
			</wv-group>
			<wv-picker :visible.sync="addressPickerShow" ref="addressPicker" :columns="addressColumns" value-key="name" @change="onAddressChange" @confirm="confirmAddress"></wv-picker>
			<img src="./images/ic_more_grey@3x.png" alt="">
		</div>
		<div class="street city-picker">
			<wv-group>
				<wv-cell title="街道" is-link :value="street" @click="streetPickerFun()" />
			</wv-group>
			<wv-picker :visible.sync="streetPickerShow" ref="streetPicker" :columns="streetColumns" value-key="name" @confirm="streetConfirmName" /></wv-picker>
			<img src="./images/ic_more_grey@3x.png" alt="">
		</div>
		<div class="street">
			<textarea v-model="area" placeholder="详细地址" maxlength="45" minlength="4"></textarea>
		</div>
		<div class="address_default wid_max" v-on:click="changeDefault()" id="">
			<img v-show="isDefault==0" src="./images/btn_ic_nor@3x.png" />
			<img v-show="isDefault==1" src="./images/btn_ic_press@3x.png" />
			<span>设为默认</span>
		</div>
		<div class="address-fixed">
			<div v-bind:class="{falsebt:saveState}" @click="addressSubmit()">保存</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'

	export default {
		data() {
			return {
				token: this.$store.state.token,
				editAddressTitle: this.$route.params.type == 2 ? '编辑地址' : "新增地址",
				editaddressType: this.$route.params.type,
				editAddressId: this.$route.params.editAddressId,
				addressPickerShow: false,
				streetPickerShow: false,
				peopleName: '',
				mobile: '',
				cityAddress: '',
				street: '',
				area: '',
				isDefault: 0,
				receiverData: null,
				addressColumns: [{
					values: [] //省
				}, {
					values: [] //市
				}, {
					values: [] //区县
				}],
				streetColumns: [{
					values: []
				}],
				ajaxState: false,
				cityPickerCode: null,
				streetCode: null,
				addressData: {},
				saveState: false,

				streetCodeValue: '',

				mmsHost: this.$store.state.mmsHost,
			}
		},

		mounted() {
			//console.log(this.addressColumns)
			//console.log(JSON.stringify(this.addressColumns))
			this.wxJsdkConfig([])
			this.getbasicData();
			//console.log(this.$refs.addressPicker)
		},

		methods: {
			getReceiverInfo: function() {
				var that = this;
				let params = {
					body: {
						type: 3,
						id: this.editAddressId
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				let httpURL = this.mmsHost + "/mms/servlet/getUserReceiverInfo?str=" + paramsStr;
				axios.post(this.mmsHost + "/mms/servlet/getUserReceiverInfo", params).then(function(res) {
					that.receiverData = res.data;
					that.peopleName = res.data.receiver.username;
					that.mobile = res.data.receiver.mobile;
					that.cityAddress = res.data.receiver.provinceName + " " + res.data.receiver.cityName + " " + res.data.receiver.areaName;
					that.street = res.data.receiver.townName ? res.data.receiver.townName : "暂不选择";
					that.area = res.data.receiver.detailAddress;
					that.isDefault = res.data.receiver.isDefault ? res.data.receiver.isDefault : 0;
					that.cityPickerCode = [{
						code: res.data.receiver.provinceCode
					}, {
						code: res.data.receiver.cityCode
					}, {
						code: res.data.receiver.areaCode
					}];
					that.streetCode = [{
						code: res.data.receiver.townCode ? res.data.receiver.townCode : '9999999'
					}];
					that.getProvinces(1, res.data.receiver)
				}, function(res) {})
			},
			getProvinces: function(type, receiverdata) {
				var that = this;
				let params = {
					body: {
						type: type,
						parentCode: ""
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				axios.post(this.mmsHost + "/mms/servlet/getAdministrativeDivision", params).then(function(res) {
					if(type == 1) {
						that.addressColumns[0].value = res.data.areaList;
						that.addressData = res.data.areaList;
						that.$refs.addressPicker.setColumnValues(0, that.addressColumns[0].value);

						if(that.isCondition(receiverdata)) {
							that.getCitydata(2, receiverdata.provinceCode, receiverdata);
						} else {
							that.getCitydata(2, res.data.areaList[0].code);
						}
						//sessionStorage.setItem("addressColumns",JSON.stringify(res.data.areaList))
					} else {

					}
				}, function(res) {})
			},
			getCitydata: function(type, parentCode, receiverdata) {
				var that = this;
				let params = {
					body: {
						type: 2,
						parentCode: parentCode
					},
					header: {
						token: this.token,
						time_stamp: new Date().getTime()
					}
				}
				let paramsStr = encodeURI(JSON.stringify(params));
				this.ajaxState = true;
				axios.post(this.mmsHost + "/mms/servlet/getAdministrativeDivision", params).then(function(res) {
					if(type == 2) {
						that.ajaxState = false;
						that.addressColumns[1].value = res.data.areaList;
						that.$refs.addressPicker.setColumnValues(1, that.addressColumns[1].value);
						if(res.data.areaList.length > 0) {
							if(that.isCondition(receiverdata)) {
								that.getCitydata(3, receiverdata.cityCode, receiverdata);
							} else {
								that.getCitydata(3, res.data.areaList[0].code);
							}
						} else {
							that.$refs.addressPicker.setColumnValues(2, []);
						}
					} else if(type == 3) {
						that.ajaxState = false;
						that.addressColumns[2].value = res.data.areaList;
						that.$refs.addressPicker.setColumnValues(2, that.addressColumns[2].value);
						if(that.isCondition(receiverdata)) {
							that.getCitydata(4, receiverdata.areaCode, receiverdata);
							setTimeout(() => {
								that.$refs.addressPicker.setValues([receiverdata.provinceName, receiverdata.cityName, receiverdata.areaName])
							}, 80);
						} else {

						}

					} else if(type == 4) {
						that.ajaxState = false;
						var list = res.data.areaList;
						var noneObject = {
							code: "9999999",
							name: "暂不选择"
						}
						list.push(noneObject);
						that.streetColumns[0].value = list;
						that.$refs.streetPicker.setColumnValues(0, that.streetColumns[0].value)
						if(that.isCondition(receiverdata)) {
							setTimeout(() => {
								that.$refs.streetPicker.setValues([receiverdata.townName ? receiverdata.townName : '暂不选择'])
							}, 80);
						}
					}
				}, function(res) {})
			},
			// 获取某一省下的市
			getCities(picker) {
				console.log(picker);
			},
			onAddressChange: function(picker, addressValues, slotIndex) {
				const _this = this;
				if(slotIndex === 0) { //滑动第一版 省					
					//_this.$refs.addressPicker.setColumnValues(1,[]);
					//_this.$refs.addressPicker.setColumnValues(2,[]);
					_this.getCitydata(2, addressValues[0].code);

				} else if(slotIndex === 1) { //滑动第二版 市
					//_this.$refs.addressPicker.setColumnValues(2,[]);
					_this.getCitydata(3, addressValues[1].code);

				} else if(slotIndex === 2) { //滑动第二版 市
					//_this.$refs.addressPicker.setColumnValues(2,[]);
					//_this.getCitydata(4, addressValues[2].code);
				}
			},
			cancelAddress: function(picker) {

			},
			confirmAddress: function(picker) {
				var address = '';
				var pickerArray = [];
				for(var i = 0; i < picker.getValues().length; i++) {
					if(picker.getValues()[i] != undefined) {
						address = address + picker.getValues()[i].name + " ";
						pickerArray.push(picker.getValues()[i]);
					}
				}
				//console.log(picker.getValues())
				if(!this.ajaxState) {
					this.cityAddress = address;
				}
				this.cityPickerCode = picker.getValues();

				//this.$emit('streetCode', streetData, pickerArray[2]);
				//picker.setValues(['辽宁省', '鞍山市', '立山区'])

			},
			streetConfirmName: function(picker) {
				if(!this.ajaxState) {
					this.street = picker.getValues()[0].name;
				}
				this.streetCode = picker.getValues();
			},
			addressPickerFun: function() {
				this.addressPickerShow = true;
			},
			streetPickerFun: function() {
				if(this.streetColumns[0].values.length == 0) {
					lxjTip.msg("暂无街道信息");
					return false;
				}
				this.streetPickerShow = true;
			},
			changeDefault: function() {
				if(this.isDefault == 1) {
					this.isDefault = 0;
				} else {
					this.isDefault = 1;
				}
			},

			addressSubmit: function() {
				//	var mobileRex = /[0-9]{11}/;
				var that = this;
				if(this.peopleName == '') {
					lxjTip.msg("请输入收件人");
					return;
				}
				if(this.mobile == '' || !(/^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/.test(this.mobile))) {
					lxjTip.msg("请输入正确的手机号码");
					return;
				}
				if(this.cityAddress == '') {
					lxjTip.msg("请选择省市区");
					return;
				}
				if(this.street == '') {
					lxjTip.msg("请选择街道");
					return;
				}
				if(this.area == '') {
					lxjTip.msg("请输入详细地址");
					return;
				}
				if(this.area.length < 5 || this.area.length > 45) {
					lxjTip.msg('详细地址限5-45个字符以内', {
						time: 2000
					});
					return false;
				}
				var params = {
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						type: 2,
						receiverInfoId: this.editAddressId,
						householdSerial: "",
						userName: this.peopleName,
						detailAddress: this.area,
						mobile: this.mobile,
						isDef: this.isDefault,
						provinceCode: this.cityPickerCode[0].code,
						cityCode: this.cityPickerCode[1].code,
						areaCode: this.cityPickerCode[2].code,
						townCode: this.streetCode[0].code != '9999999' ? this.streetCode[0].code : '',
					}
				}
				if(!this.isCondition(this.editAddressId)) { //新增保存操作
					params.body.type = 1;
				}
				if(this.saveState) {
					return false;
				}
				var paramData = JSON.stringify(params);
				/*	this.$http.jsonp(this.host + "/mms/servlet/setUserReceiverInfo?str=" + encodeURI(paramData), {
						emulateJSON: true,
						method: "get",
						dataType: "jsonp",
						jsonp: "jsoncallback",
						jsonpCallback: "success_jsonpCallback"
					}).then((res) => {*/
				this.saveState = true;
				axios.post(this.mmsHost + "/mms/servlet/setUserReceiverInfo", params).then((res) => {
					if(res.data.result == 0) {
						lxjTip.msg('保存成功', {
							time: 2000
						});
						setTimeout(() => {
							that.$router.back()
						}, 2000);

					} else {
						this.saveState = false;
						lxjTip.msg('保存失败，请不要添加表情或特殊符号', {
							time: 1000
						});
						return false;
					}
				}, (error) => {
					this.saveState = false;
					lxjTip.msg("哎呀，当前网络不太好，请重新保存", {
						time: 2000
					});
				})
			},
			isCondition: function(param) {
				if(param != null && param != "" && param != undefined) {
					return true;
				}
				return false;
			},
			getbasicData: function() {
				this.$route.params.type ? sessionStorage.setItem("editaddressType", this.$route.params.type) : this.editaddressType = sessionStorage.getItem("editaddressType");
				if(this.editaddressType == 2) { //编辑状态
					this.editAddressTitle = '编辑地址';
					this.$route.params.editAddressId ? sessionStorage.setItem("editAddressId", this.$route.params.editAddressId) : this.editAddressId = sessionStorage.getItem("editAddressId");
					this.getReceiverInfo();
					//this.getProvinces(1, '')
				} else {
					this.editAddressTitle = '新增地址';
					sessionStorage.removeItem("editAddressId");
					this.getProvinces(1, '')
				}
			},
		},
		watch: {
			cityPickerCode(newVal, oldVal) {
				try {
					if(this.isCondition(oldVal)) {
						if(this.cityPickerCode[2].code == oldVal[2].code) {} else {
							this.street = '';
							this.getCitydata(4, this.cityPickerCode[2].code);
						}
					} else {						
						//this.street = '';
						this.getCitydata(4, this.cityPickerCode[2].code);
					}
				} catch(e) {
					if(!this.isCondition(this.editAddressId)) {
						this.street = '';
						this.$refs.streetPicker.setColumnValues(0, [])
					}
				}
			}
		}
	}
</script>
<style scoped="scoped">
	input {
		font-size: 0.15rem;
	}
	
	.address {
		background: #fff;
		box-sizing: border-box;
		padding: 0 0.14rem;
		font-size: 0.15rem;
	}
	
	.address-lofistics {
		overflow: hidden;
		line-height: 0.5rem;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
	}
	
	.address-lofistics span {
		float: left;
		display: inline-block;
		width: 0.73rem;
		font-size: 0.15rem;
		color: #333;
	}
	
	.address-lofistics input {
		float: left;
		flex-grow: 2;
		font-size: 0.15rem;
		color: #333;
		/*margin-top: 0.16rem;*/
	}
	
	.address-lofistics:first-child {}
	
	.address div img {
		width: 0.08rem;
		height: 0.15rem;
		display: block;
		float: right;
		margin-top: 0.18rem;
	}
	
	.city-picker {
		position: relative;
		border-bottom: 1px solid #eee;
	}
	
	.city-picker img {
		position: absolute;
		right: 0;
		top: 0;
	}
	
	.street textarea {
		margin-top: 0.15rem;
		width: 100%;
		height: 0.7rem;
		margin-bottom: 0.06rem;
		border: none;
		-webkit-appearance: none;
		outline: none;
		font-size: 0.15rem;
		resize: none;
	}
	
	.street textarea::placeholder {
		color: #ccc;
	}
	
	.address-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		padding: 0.12rem 0.14rem;
		box-sizing: border-box;
	}
	
	.address-fixed div {
		width: 100%;
		height: 0.44rem;
		line-height: 0.44rem;
		text-align: center;
		color: #fff;
		background: #fc9153;
		font-size: 0.17rem;
		letter-spacing: 0.03rem;
	}
	
	.address-lofistics {
		position: relative;
	}
	
	.address-lofistics img {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
	}
	
	.streetx {
		border-bottom: none;
	}
	
	.wid_max {
		font-size: 14px;
		font-size: 0.14rem;
		clear: left;
		padding-top: 0.16rem;
		padding-bottom: 0.16rem;
		color: #222222;
	}
	
	.address_default {
		width: 50%;
		float: left;
		margin: 0;
		padding: 0;
		margin-top: 0.16rem;
		box-sizing: border-box;
		background-color: #f3f4f5;
	}
	
	.address div.address_default img {
		width: 0.19rem;
		height: 0.19rem;
		margin-top: 0.03rem;
		display: block;
		float: left;
	}
	
	.address_default span {
		height: 0.26rem;
		width: 60%;
		padding-left: 0.09rem;
		line-height: 0.26rem;
		display: block;
		float: left;
		color: #aaaaaa;
		font-size: 0.14rem;
	}
	
	.address-fixed div.falsebt {
		background-color: #bbb
	}
	
	.address-lofistics input::-webkit-input-placeholder {
		color: #CCCCCC;
	}
</style>
<style type="text/css">
	.weui-cell_access {
		width: 90%;
		box-sizing: border-box;
		padding: 0.14rem 0 !important;
	}
	
	.weui-cell__bd p {
		width: 0.73rem;
		display: inline-block;
	}
	
	.weui-cell__ft {
		display: block;
		width: 100%;
		text-align: left;
		font-size: 0.15rem;
		color: #333;
		line-height: 0.2rem;
	}
	
	.weui-cell_access .weui-cell__ft:after {
		display: none;
	}
	
	.weui-cells {
		margin-top: 0!important;
	}
	
	.weui-cells p {
		font-size: 0.15rem;
	}
	
	.weui-cell_access:active {
		background: transparent;
	}
	
	.address .city-picker .weui-cells:after,
	.weui-cells:before {
		border: none!important;
	}
	
	.address .city-picker .weui-cell_access .weui-cell__ft:after {
		display: none!important;
	}
	
	.editAddress .weui-cells {
		padding: 0!important;
	}
	
	.editAddress .weui-cell__ft {
		color: #333;
		text-align: left;
	}
</style>