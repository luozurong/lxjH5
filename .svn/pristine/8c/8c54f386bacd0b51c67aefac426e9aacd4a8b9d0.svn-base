/*var mmsHost = 'https://tt.hori-gz.com:8443';
var token = '15470989253131fe56c7fbc34c7d989a'

var isWxBrowser = true;
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	isWxBrowser = true;
} else {
	isWxBrowser = false;
}*/

var vue = new Vue({
	el: '#app',
	data: {
		token: "",

	},
	methods: {
		GetURLParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;

		},
		commanderInfoAjax: function() {
			var params = {
				body: {},
				header: {
					token: this.GetURLParameter("token"),
					time_stamp: new Date().getTime(),
				}
			}
			console.log(params);
			var paramsStr = encodeURI(JSON.stringify(params));
			var httpURL = mmsHost + "/mms/group/searchLeaderInfoStatus?str=" + paramsStr;
			this.$http.jsonp(httpURL, {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).then(function(res) {
				console.log(res);
				this.status = res.body.status;
				if(this.status!=1){
					 showActivity(mmsHostN + "/mms/html5/groupon/commander/commander.htm", "团长招募");
				}else{
					 showActivity(mmsHostN + "/mms/html5/groupon/commander/grouponActivity.htm", "拼团活动");
				}
			}, function(res) {});
		},

	},
	mounted: function() {
		this.commanderInfoAjax()
}
})

function refreshData() {
	setTimeout(function() {
		setTimeout("goBack()", 10);
	}, 0);
	return 1;
}