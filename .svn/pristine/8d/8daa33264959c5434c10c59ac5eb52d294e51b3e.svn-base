

//var mmsHost = 'http://192.168.51.41:8090';
var vue = new Vue({
	el: '.app',
	data: {
		isWxBrowser: isWxBrowser,
	},
	methods: {
		
		getBaseData: function() {
		
			if(this.isWxBrowser) {
				this.wxJsdkConfig();				
			}else{
				setTitle("规则说明");
				nativeMethod("showClosebutton", null);
			}
		}
	},
	mounted: function() {
		this.getBaseData()
	}
})

function refreshData() {
	setTimeout(function() {
	//	vue.getBaseData();
	}, 0);
	return 1;
}