
var scrollTop = "";




/*
mmsHost = "https://tt.hori-gz.com:8443";
host = mmsHost;
commodityId = "1540187623912ff3ae4f815742bcbb5a";
organizationSeq = "4400100183";
token = "_15444060121896d708361a0d43a68164";*/


var vue = new Vue({
	el: '#app',
	data: {
		isWxBrowser:isWxBrowser,
		stateZhifu:false,
		mmsHost:mmsHost,
		jsonData:null,
		totalNo:"",
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			this.getbasicData();
			//this.setCookie('token', '1546917542043f54a1ba60c64ea58ae3')
		});

	},
	methods: {
		getData: function() {
			var that = this;
			var params = {
				body: {
					totalNo: this.totalNo
				},
				header: {
					token:this.getCookie("token"),
					time_stamp: new Date().getTime()
				}
			}
			axios.post(this.mmsHost + "/mms/group/getGroupOrdersDetail", params).then(function(res) {
				that.jsonData=res.data;
			}, function(res) {})

		},
	

		
		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},

		
		aminateFun: function() {
			var eleG = document.getElementById("chairmanMoreInfo");
			eleG.style.maxHeight = "0";		
		},
		getbasicData: function() {
			this.stateZhifu=this.GetURLParameter("zhifu")=="success"?true:false;
			this.totalNo=this.GetURLParameter("orderNo");
			
			
			this.getData()
			
			var that = this;
			if (isWxBrowser) {
				this.wxJsdkConfig();
			}		
		},
	},
	watch: {
		
	}
});

//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}