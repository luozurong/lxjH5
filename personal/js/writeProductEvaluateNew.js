var vue = new Vue({
	el: ".evaluate",
	data: {
		evaluateItem: [],
		evaluateDataSubmit:[],
		selectPictureIndex: 0,
		evaluateSubmitShow:true,
		textAreaWord:'',
		mmsHost: host,
		orderNo: this.GetURLParameter("orderNo"),
		token: this.GetURLParameter("token"),
		submitFlag: true,
		/*mmsHost: "https://tt.hori-gz.com:8443",
		orderNo: "201805021719463938473",
		token: "15252489895084d31a262cf148e09d53",*/
	},
	methods:{
		evaluateNum: function(index,list){
			var starArray = [];
			var picUrlNor = {url:"images/ic_big-star_nor@3x.png"};
			var picUrlPre = {url:"images/ic_big-start_pre@3x.png"};
			for(var i = 0; i<5; i++){
				list < i ? starArray.push(picUrlNor) :starArray.push(picUrlPre)
			}
			Vue.set(this.evaluateItem[index],"starUrl",starArray); // 点击星星评论
			Vue.set(this.evaluateDataSubmit[index],"starLevel",list+1); // 点击星星评论获取到的星星个数
		},
		evaluateAjax: function(){
			var params = {
				header: {
					token: this.token,
					time_stamp: new Date().getTime()
				},
				body: {
					orderNo: this.orderNo
				}
			};
			var paramsStr = encodeURI(JSON.stringify(params));
            var httpURL = this.mmsHost + "/mms/servlet/getOrderCommodities?str="+paramsStr;
                this.$http.jsonp(httpURL,{
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(res) {	
				console.log(res);
				var evaluateItem = res.body.commodityList;
				for(var i = 0;i < evaluateItem.length; i++){
					evaluateItem[i].commentImages = [];
				}
				var starItem = [];
				var picUrl = {url:"images/ic_big-start_pre@3x.png"};
				for(var i = 0; i<5 ;i++){
					starItem.push(picUrl);
				}
				for(var i = 0;i < evaluateItem.length; i++){
					evaluateItem[i]["starUrl"] = starItem;
				}
				this.evaluateItem = evaluateItem;
				for(var i = 0; i < evaluateItem.length; i++){   // 评论的内容
					var evaluateSubmitParam = {
						commodityId: evaluateItem[i].commodityId,
						commentContent: '',
						commentImages: [],
						starLevel: '5'
					}
					this.evaluateDataSubmit.push(evaluateSubmitParam);
				}

			},function(res){});	
		},
		evaluateWord: function(event,index){
			//console.log(event.srcElement.value);
			//event.srcElement.textContent = event.srcElement.textContent.substr(0,200);
			//console.log(event);
			
			Vue.set(this.evaluateDataSubmit[index],"commentContent",event.srcElement.value);
		},
		evaluateSubmit: function(){
			if(this.submitFlag == false){
				return false;
			}
			this.submitFlag = false;
			var params = {
				header: {
					token: this.token,
					time_stamp: new Date().getTime()
				},
				body: {
					orderNo: this.orderNo,
					commentInfo: this.evaluateDataSubmit
				}
			};
			var paramsStr = encodeURIComponent(JSON.stringify(params));
            var httpURL = this.mmsHost + "/mms/servlet/commentCommodity?str="+paramsStr;
                this.$http.jsonp(httpURL,{
				emulateJSON: true,
				method: "post",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(res) {	
				
				if(res.body.result == 0){
					lxjTip.msg("评论成功");
					setTimeout(function(){
						goBack();
					},2000)
				}else{
					lxjTip.msg(res.body.reason);
				}
				console.log(res.body.result);
			},function(res){});	
		},
		contentFocus: function(index){
			vue.evaluateSubmitShow = false;
			console.log(index);
		},
		contentBlur: function(){
			setTimeout(function(){
				vue.evaluateSubmitShow = true;
				var areaLength = document.getElementsByClassName("evaluate-area")
				for(var i = 0; i < areaLength.length; i++){
					areaLength[i].blur();
				}
			},300);
			
		},
		imageUpload: function(index){
			vue.selectPictureIndex = index;
			var picturenum = vue.evaluateDataSubmit[index].commentImages.length;
			var maxPicture = 5 - parseInt(picturenum);
			if(maxPicture > 0) {
				selectPicture(maxPicture);
			}
		},
		delPicture: function(index,num){
			vue.evaluateItem[index].commentImages.splice(num,1);
			vue.evaluateDataSubmit[index].commentImages.splice(num,1);
		},
		pictureJson: function(json){
			var josnObj = JSON.parse(json);
			if(josnObj.result == '0') {
				var imageArray = josnObj.list;
				for(var i = 0; i < imageArray.length; i++) {
					vue.evaluateDataSubmit[vue.selectPictureIndex].commentImages.push(imageArray[i]);
					vue.evaluateItem[vue.selectPictureIndex].commentImages.push(imageArray[i]);
				}
			}
			var ss = JSON.parse(JSON.stringify(vue.evaluateDataSubmit).replace(/o_path/g,"imgUrl").replace(/t_path/g, "thumImgUrl"));
			vue.evaluateDataSubmit = ss;
		},
		showPicPreviews: function(index,num){
			var picList = [];
			var evaluateItemPic = vue.evaluateItem[index].commentImages;
			for(var i = 0; i < evaluateItemPic.length; i++){
				var previewImg = { 
					url: evaluateItemPic[i].o_path
				}
				picList.push(previewImg);
			}

			var jsonData = {
				selectedIndex: num,
				picList: picList
			}
			jsonData = JSON.stringify(jsonData);
			nativeMethod("showPicPreview", jsonData)
		},
		GetURLParameter: function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		}
	},
	mounted: function(){	
		this.evaluateAjax();
	}
});

function onPictureSelected(json) {
	vue.pictureJson(json);
}
function refreshData() {
	setTimeout(function() {
		
	}, 0);
	return 1;
}
var wHeight = document.documentElement.clientHeight;
window.onresize = function() {
	var newHeight = document.documentElement.clientHeight;
	if (clientType=="ios") {
		return false;
	}
	if(newHeight >= wHeight) {
		//document.querySelectorAll(".contentBlurs").blur();
		vue.evaluateSubmitShow = true;
	} else {
		vue.evaluateSubmitShow = false;
	}
}