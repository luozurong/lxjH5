<template>
	<div class="address" v-title data-title="填写地址">
		<div class="address-lofistics">
			<wv-group><wv-cell title="快递公司" is-link :value="lofistics" @click.native="lofisticsPickerShow = true" /></wv-group>
		    <wv-picker :visible.sync="lofisticsPickerShow" :columns="lofisticsColumns" value-key="name" @confirm="confirmName"/>
		    <img src="./images/ic_more_grey@3x.png" alt="">
		</div>
		<div class="address-lofistics">
			<span>快递单号</span>
			<input v-model="companyNum" type="tel" maxlength="15">
		</div>
		<div class="address-lofistics">
			<span>收货人</span>
			<input type="text" v-model="returnName" maxlength="5" placeholder="请输入真实的收货人姓名">
		</div>
		<div class="address-lofistics">
			<span>手机号码</span>
			<input type="tel" maxlength="11" v-model="returnPhone" placeholder="请输入手机号码">
		</div>
		<div class="address-info">
			<div class="address-info-on">商家收货地址详情信息:</div>
			<div class="address-info-on">请通过该地址寄送退换物品给商家</div>
			<div class="address-info-container">
				<div>
					<img src="./images/ic_deliver.png">
				</div>
				<div v-text="returnAddress"></div>
			</div>
		</div>
		<div class="address-fixed">
			<div @click="addressSubmit()">保存</div>
		</div>
	</div>
</template>
<script>
	import addressPicker from '../personal/addressPicker.vue'
	import axios from '../../common/js/http.js'
	import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				lofisticsPickerShow: false,
				streetPickerShow: false,
				streetPickerFlag: false,
		        lofistics: '',
		        companyNum: '',
		        peopleName: '',
		        mobile: '',
		        street: '',
		        streetCodeValue: '',
		        address: '',
		        area: '',
		        lofisticsColumns: [{
		            values: [
		                {name: '圆通'},
		                {name: '中通'},
		                {name: '申通'},
		                {name: '顺丰'},
		                {name: '宅急送'},
		                {name: 'EMS'},
		                {name: '天天'},
		                {name: '速尔'},
		                {name: '德邦'},
		                {name: '其他'}]
		            }
		        ],
		        streetColumns: [{values:[]}],
		        returnAddress: '',
		        returnName: '',
		        returnPhone: ''
			}
		},
		components:{
			addressPicker
		},
		
		methods:{
		    confirmName (picker) {
		      this.lofistics = picker.getValues()[0].name
		    },
		    receiverMessage(){
		    	var that = this;
				var params = {
					body:{
						safeguardNo: this.$route.params.safeguardNo
					},
					header:{
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					}
				}
				var paramsStr = encodeURI(JSON.stringify(params));
	            var httpURL = "/mms/servlet/getBusinessReceiveMessage?str="+paramsStr;
	            axios.post(httpURL).then(function (res) {
				   that.returnAddress = res.data.returnAddress;
				   that.returnName = res.data.returnName;
				   that.returnPhone = res.data.returnPhone;

				})
				.catch(function (error) {
				    console.log(error);
				});
		    },
			addressSubmit(){
				var that = this;
				var mobileRex = /[0-9]{11}/;
				if(this.lofistics == ''){
					lxjTip.msg("请输入快递公司");
					return;
				}
				if(this.companyNum == ''){
					lxjTip.msg("请输入快递单号");
					return;
				}
				if(this.returnName == ''){
					lxjTip.msg("请输入收货人姓名");
					return;
				}
				if(this.returnPhone == ''){
					lxjTip.msg("请输入收货人手机号码");
					return;
				}
				var params ={
					header: {
						token: this.$store.state.token,
						time_stamp: new Date().getTime()
					},
					body: {
						childOrderNo: this.$route.params.orderNo,
						safeguardNo: this.$route.params.safeguardNo,
						logisticsName: this.lofistics,
						logisticsNo: this.companyNum,
						receiverName: this.returnName,
						receiverPhone: this.returnPhone,
						receiverAddress: this.returnAddress
					} 
				}
				var paramData  = JSON.stringify(params);
				this.$http.jsonp(this.$store.state.mmsHost + "/mms/servlet/saveUserReturnAddress?str=" + encodeURI(paramData),{
	                emulateJSON: true,
	                method: "get",
	                dataType: "jsonp",
	                jsonp: "jsoncallback",
	                jsonpCallback: "success_jsonpCallback"
	            }).then((res)=>{
	            	console.log(res.body.data);
					lxjTip.msg(res.body.result);
					if(res.body.result == 0){
						lxjTip.msg("保存成功");
						setTimeout(function(){
							that.$router.back();						
						},2000);
					}
				},(error)=>{
					console.log(error)
				})
			}
		},
		mounted(){
			this.wxJsdkConfig([]);
			this.receiverMessage();
		}	
	}
</script>
<style scoped>
	input{
		font-size: 0.15rem;
	}
	.address{
		background: #fff;
		box-sizing: border-box;
		padding: 0 0.14rem;
		font-size: 0.15rem;
	}
	.address-lofistics{
		overflow: hidden;
		line-height: 0.5rem;
		border-bottom: 1px solid #eee;
	}
	.address-lofistics span{
		float:left;
		display: inline-block;
		width: 0.73rem;
	}
	.address-lofistics input{
		float: left;
		padding: 0.14rem 0;
		width: 80%;
	}
	.address-lofistics:first-child{
		border: none;
	}
	.address-lofistics img{
		width: 0.08rem;
		height: 0.15rem;
		display: block;
		float:right;
		margin-top: 0.18rem;
	}
	.weui-cell_access{
		width: 100% !important;
		box-sizing: border-box;
		padding: 0.14rem 0 !important;
	}
	.weui-cell__bd p{
		width: 0.73rem;
		display: inline-block;
		font-size: 0.15rem;
	}
	.address-lofistics:first-child .weui-cell__ft{
		margin-top: 0.03rem;
	}
	.weui-cell__ft{
		display: block;
		width: 100%;
		text-align: left;
		font-size: 0.15rem;
		color: #333;
		line-height: 0.2rem;
	}
	.weui-cell_access .weui-cell__ft:after{
		display: none;
	}
	.address-fixed{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		padding: 0.12rem 0.14rem;
		box-sizing: border-box;
	}
	.address-fixed div{
		width: 100%;
		height: 0.44rem;
		line-height: 0.44rem;
		text-align: center;
		color: #fff;
		background: #fc9153;
		font-size: 0.17rem;
		letter-spacing: 0.03rem;
	}
	.weui-cells{
		margin-top: 0;
		padding: 0 !important;
	}
	.weui-cells p{
		font-size: 0.15rem;
	}
	.address-lofistics{
		position: relative;
	}
	.address-lofistics img{
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
	}
	.streetx{
		border-bottom: none;
	}
	.weui-cell_access:active{
		background: transparent;
	}
	.address-info{
		font-size: 0.14rem;
		color: #333;
		padding-top: 0.1rem;
	}
	.address-info-container{
		padding-top: 0.14rem;
		display: flex;
		display: -webkit-flex;
		padding-bottom: 0.18rem;
	}
	.address-info-container div:first-child{
		flex-shrink: 0;
		height: auto;
		display:flex;
  		align-items: center;
	}
	.address-info-container div img{
		width: 0.18rem !important; 
		height: 0.18rem !important;
		margin-right: 0.14rem;
	}
	.address-info-container div:last-child{
		flex-grow: 2;
		font-size: 0.15rem;
		color: #666;
	}
</style>