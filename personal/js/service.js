var clientType = GetURLParameter("clientType");
var commodityPrice = GetURLParameter("commodityPrice");
var commodityNum = GetURLParameter("commodityNum");
var skuId = GetURLParameter("skuId");
var host = host;
var token = GetURLParameter("token");
var orderNo = GetURLParameter("orderNo");
var timestamp = new Date().getTime();
var pageFrom = GetURLParameter("pageFrom");

/*var orderNo = "201805080509068559998"; //201803281417189314497
var token = "1526347458477a7e0818c0b942c69769";
var host = "https://tt.hori-gz.com:8443";
var skuId = "1524302114472655f13016844ab093f7";
var commodityPrice = 0.01;
var commodityNum = 2;*/

//售后类型
var picker = new mui.PopPicker();
if(commodityPrice > 0) {
	if(pageFrom == "group") {
		picker.setData([{
				value: '2',
				text: '仅退款'
			},
			{
				value: '3',
				text: '退货退款'
			},
			{
				value: '4',
				text: '换货'
			}
		]);
	} else {
		picker.setData([{
				value: '2',
				text: '仅退款'
			},
			{
				value: '3',
				text: '退货退款'
			},
			{
				value: '4',
				text: '换货'
			},
			{
				value: '5',
				text: '维修'
			}
		]);
	}

} else {
	picker.setData([{
			value: '4',
			text: '换货'
		},
		{
			value: '5',
			text: '维修'
		}
	]);
}

function pickerFunc() {
	picker.show(function(selectItems) {
		var serviceChoose = selectItems[0].text; //智子
		vue.serviceChoose = serviceChoose;
		vue.applyType = selectItems[0].value; //zz 
	})
}

var orderStatus = -1;
var backHomePage = GetURLParameter("backHomePage"); //回退到生活首页
if(backHomePage == "1") {
	backToHomePage();
}

var vue = new Vue({
	el: '#app',
	data: {
		orderNo: orderNo,
		jsondate: {},
		message: '',
		jsonget: {},
		orderDetails: '',
		applyType: 2,
		commodityNum: 0,
		commodityNumValue: 0,
		commodityPrice: 0,
		onfocusState: true,
		applyState: false,
		applyText: '提交申请',
		serviceChoose: '仅退款',
		feedBackImages: [],
		apiurl: host + "/mms/servlet/getChildOrderMessage", //获取订单信息
		apiurl3: host + "/mms/servlet/applySafeguard", //订单操作
	},
	filters: {
		//状态过滤

	},
	mounted: function() {
		this.$nextTick(function() {
			//console.log(99999999);
			this.getDatejson(-1, orderNo);
			if(commodityPrice <= 0) { //新增付款金额为0时默认只能换货维修
				this.applyType = 4;
				this.serviceChoose = "换货";
			}
		});
	},
	watch: {
		commodityNum: function(val) {
			console.log(val);
			/*if(val > vue.commodityNumValue){
				lxjTip.msg("不能大于购买商品件数");
				vue.commodityNum = vue.commodityNumValue;
			}else if(val > vue.commodityNumValue && val != ""){
				vue.commodityNum = parseInt(vue.commodityNum);
			}*/
		}
	},
	methods: {
		getDatejson: function(orderStatus, orderNo) {
			var params = {};
			var timestamp = new Date().getTime();
			params.header = {
				token: token,
				time_stamp: timestamp
			};
			if(pageFrom == "group") {
				params.body = {
					orderNo: orderNo,
					commodityPrice: commodityPrice,
					commodityId: skuId,
					skuId: "",
					commodityNum: commodityNum
				};

			} else {
				params.body = {
					/*orderStatus: orderStatus,
					orderDetailNo: orderNo,
					pageSize: 0,
					pageNum: 0,*/
					orderNo: orderNo,
					commodityPrice: commodityPrice,
					skuId: skuId,
					commodityNum: commodityNum
				};
			}

			params.header.time_stamp = new Date().getTime();
			var paramData = JSON.stringify(params);
			this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				console.log(response);
				vue.jsonget = response.body.result;
				vue.orderDetails = response.body.orderDetails;
				vue.commodityNumValue = response.body.orderDetails.counts;
				vue.commodityNum = response.body.orderDetails.counts;
				vue.commodityPrice = response.body.orderDetails.commodityPrice
				//lxjTip.msg(vue.commodityPrice+"1");
				//console.log(JSON.stringify(response.body));
				// 响应成功回调
				//this.message = JSON.stringify(response.body);
				/*this.jsonget = response.body;
				vue.commodityNum = response.body.orderDetail.commodityOrderList[0].counts;
				vue.commodityNumValue = response.body.orderDetail.commodityOrderList[0].counts;
				if(response.body.result == 0) {
					this.jsondate = response.body.orderDetail;
					if(response.body.orderDetail.status == 5) {
						vue.applyState = false;
						setTimeout(function() {
							var text = document.getElementById("feedBackContent");
							autoTextarea(text);
						}, 300)
					} else {
						vue.applyState = true;
						vue.applyText = '抱歉！该订单已经申请售后或已关闭';
					}
				}*/

			}, function(response2) {
				console.log(JSON.stringify(response2.body))
			});
		},
		areaPicker: function() {

		},
		commodityNumBlur: function(v) {
			console.log("失去焦点");
			if(vue.commodityNum == '' || vue.commodityNum == 0) {
				vue.commodityNum = vue.commodityNumValue;
			}

			if(vue.commodityNum > vue.commodityNumValue) {
				lxjTip.msg("不能大于购买商品件数");
				vue.commodityNum = vue.commodityNumValue;
			} else if(val > vue.commodityNumValue && val != "") {
				vue.commodityNum = parseInt(vue.commodityNum);
			}
		},
		//订单操作
		updateOrderFlag: function(flag, orderNo) { //
			if(vue.commodityNum == '' || vue.commodityNum == 0) {
				lxjTip.msg("请输入商品数量");
			}
			if(vue.applyState) {
				return;
			}
			vue.applyState = true;
			var params = {};
			var feedBackImages = vue.feedBackImages;
			var feedBackContent = vue.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			var timestamp = new Date().getTime();

			params.header = {
				token: token,
				time_stamp: timestamp
			};
			if(pageFrom == "group") {

				params.body = {
					orderNo: orderNo,
					commodityId: skuId,
					skuId: "",
					applyType: vue.applyType,
					returnMoney: parseInt(vue.applyType),
					commodityNum: vue.commodityNum,
					problemDescription: feedBackContent,
					imgUrlList: JSON.stringify(feedBackImages).replace(/o_path/g, "imgUrl").replace(/t_path/g, "thumImgUrl").replace(/\"/g, "'")
				};
			} else {
				params.body = {
					orderNo: orderNo,
					skuId: skuId,
					applyType: vue.applyType,
					returnMoney: parseInt(vue.applyType),
					commodityNum: vue.commodityNum,
					problemDescription: feedBackContent,
					imgUrlList: JSON.stringify(feedBackImages).replace(/o_path/g, "imgUrl").replace(/t_path/g, "thumImgUrl").replace(/\"/g, "'")
				};
			}

			var paramData = JSON.stringify(params);
			this.$http.jsonp(this.apiurl3 + "?str=" + encodeURI(paramData), {
				emulateJSON: true,
				method: "get",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback"
			}).then(function(response) {
				if(response.body.result == 0) {
					lxjTip.msg('申请成功');
					setTimeout(function() {
						/*showActivity(host + "/mms/html5/personal/my_order.htm?orderStatus=4&token=" + token, "售后订单");*/
						goBack();

					}, 2000);
				} else {
					lxjTip.msg(response.body.reason);
				}
			}, function(response) {
				// 响应错误回调
				console.log("失败")
			});
		},
		//点击上传图片按钮
		imageUpload: function() {
			var picturenum = vue.feedBackImages.length;
			var maxPicture = 3 - parseInt(picturenum);
			if(maxPicture > 0) {
				selectPicture(maxPicture);
			}
		},
		//点击删除图片按钮
		delePicture: function(url) {
			window.event.cancelBubble = true;
			var upLoadimglenght = vue.feedBackImages.length;
			for(var i = 0; i < upLoadimglenght; i++) {
				if(vue.feedBackImages[i].o_path == url) {
					vue.feedBackImages.splice(i, 1);
					break;
				}
			}
		},
		//点击书写内容时
		onfocusopen: function() {
			vue.onfocusState = false;
		},
		onbluropen: function() {
			setTimeout(function() {
				vue.onfocusState = true;
				document.getElementById("feedBackContent").blur();
			}, 300)
		},
		newviewopen: function() {
			window.event.cancelBubble = true;
			var eleId = 'feedBackContent';
			setTimeout(function() {
				var viewBottom = window.innerHeight;
				var weizhi;
				//输出viewBottom
				var element = document.getElementById(eleId);
				var getElementPosition = function(elem) {
					var defaultRect = {
						top: 0,
						left: 0
					};
					weizhi = elem.getBoundingClientRect();
				}
				getElementPosition(element);
				var elementBottom = weizhi.bottom;
				if(viewBottom >= elementBottom) {} else {
					var vuleheight = elementBottom - viewBottom + 50;
					window.scrollTo(0, vuleheight);
				}
			}, 300);
		},
		pickerService: function() {
			pickerFunc();
		},
		showPicPreviews: function(index) {
			//lxjTip.msg(JSON.stringify(vue.feedBackImages));
			var picList = [];
			for(var i = 0; i < vue.feedBackImages.length; i++) {
				var previewImg = {
					url: vue.feedBackImages[i].o_path
				}
				picList.push(previewImg);
			}

			var jsonData = {
				selectedIndex: index,
				picList: picList
			}

			jsonData = JSON.stringify(jsonData);
			//lxjTip.msg(jsonData);
			nativeMethod("showPicPreview", jsonData);
		}
	}
});

function onPictureSelected(json) {
	var josnObj = JSON.parse(json);
	if(josnObj.result == '0') {
		var imageArray = josnObj.list;
		/*lxjTip.msg(JSON.stringify(imageArray));*/
		if(imageArray.length > 0) {
			// 获取到上传图片的路径
			for(var i = 0; i < imageArray.length; i++) {
				vue.feedBackImages.push(imageArray[i]);
			}
			/*lxjTip.msg(JSON.stringify(vue.feedBackImages)+"1",{time:30000});*/
		}
	}
}
//获取URL参数
function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function refreshData() {
	setTimeout(function() {

	}, 0);
	return 1;
}

var wHeight = document.documentElement.clientHeight;
window.onresize = function() {
	var newHeight = document.documentElement.clientHeight;
	if(clientType == "ios") {
		return false;
	}
	if(newHeight >= wHeight) {
		document.getElementById("feedBackContent").blur();
		vue.onfocusState = true;
	} else {
		vue.onfocusState = false;
	}
}