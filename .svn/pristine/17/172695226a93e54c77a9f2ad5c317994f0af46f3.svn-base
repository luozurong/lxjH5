var vue = new Vue({
	el:".coupon",
	data: {
		clickFlag: 0,
		overduedList: [],
		unUsedList: [],
		usedList: [],
		token: GetURLParameter("token"),
		ctmsHost: ctmsHost,
		mms: mmsHost,
		/*token: '154147296991bc4e538c4e9c457889d7',
		ctmsHost: 'http://tt.hori-gz.com:8090',
		mms: 'http://tt.hori-gz.com:8090'*/
	},
	methods:{
		clickNav: function(index){
			this.clickFlag = index;
		},
		goBuy: function(couponId){
			showActivity(this.mms + "/mms/html5/supermarket/couponCommodities.htm?couponId=" + couponId, "优惠商品使用列表");
		},
	},
	filters:{
		dateTime: function(value){
			return value.replace(/-/g,".")
		}
	},
	mounted: function(){
		console.log(11);
		var params = {
			body:{

			},
			header:{
				token: this.token,
				time_stamp: new Date().getTime()
			}
		}
		console.log(params);
		var paramsStr = encodeURI(JSON.stringify(params));
        var httpURL = this.mms+"/mms/servlet/getNewCoupons?str="+paramsStr;
        this.$http.jsonp(httpURL,{
            emulateJSON: true,
            method: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        }).then(function(res){ 
        	console.log(res);
        	if(res.body.result == 0){
        		this.usedList = res.body.usedList;
        		this.unUsedList = res.body.unUsedList;
        		this.overduedList = res.body.overduedList;
        	}
				
        },function(res){});
	}
})

function ruleShowAnimate(e) {
	var clickState = e.getAttribute("dataState") == 1 ? true : false;
	var clickState2 = e.getAttribute("dataStateC");
	if(clickState2 == "2") {
		return false;
	}
	var eleG = e;
	var eleT = eleG.previousSibling;
	eleG.setAttribute("dataStateC", "2");
	setTimeout(function(){
		eleG.setAttribute("dataStateC", "1");
	},600)
	if(clickState) {
		eleT.previousSibling.classList.add("couponInfoRuleAnimat")
		eleT.previousSibling.style.whiteSpace = 'normal';
		eleG.setAttribute("dataState", "2");
		eleG.src="../supermarket/images/btn_ic_put-up.png";
	} else {
		eleT.previousSibling.classList.remove("couponInfoRuleAnimat");
		eleG.src="../supermarket/images/ic_put-up@3x.png";
		setTimeout(function() {
			eleT.previousSibling.style.whiteSpace = 'nowrap';
			eleG.setAttribute("dataState", "1");
		}, 600)
	}
}

function GetURLParameter(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}