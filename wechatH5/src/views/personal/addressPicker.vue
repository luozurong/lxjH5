<template>
	<div class="page page-with-padding addressPicker">
		<div class="page page-with-padding">
			<wv-group><wv-cell title="省 市 区" is-link :value="address" @click.native="addressPickerShow = true" />
			</wv-group>
			<wv-picker :visible.sync="addressPickerShow" :columns="addressColumns" value-key="name" @change="onAddressChange" @confirm="confirmAddress"></wv-picker>
		</div>
	</div>
</template>
<script>
export default {
	name:'AddressPicker',
	data() {
		return {
			cities:[],
  			addressPickerShow: false,
			address:'',
			addressColumns: [{
		        values:[]//省
		        },{
		        	values:[]//市
		        },{
		        	values:[]//区县
		        }
	    	]
		}
	},
	mounted() {
		const _this = this
		this.getProvinces(1,'')//省
		this.getCities('110000')//北京市
		this.getAreas('110100')//区/县
		var mask = document.getElementsByClassName('weui-mask')
		for(var i= 0;i<mask.length;i++){
			mask[i].addEventListener('click',function(){
				_this.addressPickerShow = false
			})
		}
	},
	methods: {
		//获取省
		getProvinces(type,parentCode,isArea,callback){
			let data = []
			const _this = this
			const host = this.$store.state.mmsHost;
			const params = {}
			params.header = {
				token: this.$store.state.token,
				time_stamp : new Date().getTime(),
			}
			params.body = {
				type:type,
				parentCode:parentCode
			}
			const paramData = JSON.stringify(params)
			this.$http.jsonp(host + "/mms/servlet/getAdministrativeDivision?str=" + encodeURI(paramData),{
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                //jsonpCallback: "success_jsonpCallback"
            }).then((success)=>{
            	console.log(success)
				data = success.data
				if(typeof(callback)==='function'){
					callback(data.areaList)
				}else{//首次默认加载没回调函数
					if(isArea){//区县
						_this.addressColumns[2].values = data.areaList
					}else{
						if(type === 1){
							_this.addressColumns[0].values = data.areaList
						}else if(type === 2){
							_this.addressColumns[1].values = data.areaList
						}
					}
				}
			},(error)=>{
				console.log(error)
			})
		},
	    // 获取某一省下的市
		getCities(parentCode,callback){
			const isArea = false//用于区分市、区县
			this.getProvinces(2,parentCode,isArea,callback)
		},
	    // 获取某一市下的区/县
		getAreas(parentCode,callback){
			const isArea = true//用于区分市、区县
			this.getProvinces(2,parentCode,isArea,callback)
		},
        //滑动地址面板
		onAddressChange(picker,addressValues,slotIndex){
			const _this = this
			if(slotIndex === 0){//滑动第一版 省
				_this.getCities(addressValues[0].code,function(cities){
					picker.setColumnValues(1,cities)//设置第二版 市数据
					if(cities.length!=0){
						_this.getAreas(cities[0].code,function(areas){
							picker.setColumnValues(2,areas)
						})
					}else{//第二版没数据
						picker.setColumnValues(2,[])//清空第三版
					}
				})
			}else if(slotIndex === 1){//滑动第二版 市
				_this.getAreas(addressValues[1].code,function(areas){
					picker.setColumnValues(2,areas)
				})
			}
		},
		//确定地址
		confirmAddress(picker){
			var address = '';
			var pickerArray = [];
			console.log(picker.getValues())
			for(var i = 0;i<picker.getValues().length;i++){
				if(picker.getValues()[i]!=undefined){
					address += picker.getValues()[i].name;
					pickerArray.push(picker.getValues()[i]);
				}
			}
			this.address = address;
			let streetData = {};
			streetData.address = address;
			this.$emit('streetCode',streetData,pickerArray[2]);

		},	
	}
}
</script>
