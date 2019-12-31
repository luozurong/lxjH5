var orderNo = GetURLParameter("orderNo");
var token = GetURLParameter("token");
$(function() {
	//var host="http://118.190.8.134:8090";
	//orderNo="201703140910117682829";
	var params = {};
	//var token="14894712013489fecd05bfae4006afcd";
	var time_stamp = new Date().getTime();
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		orderNo: orderNo
	};
	var str = JSON.stringify(params);

	if(sessionStorage.getItem("lxjversionsName") >= 5000) {
		showProgressDialog();
	}
	$.ajax({
		type: "get",
		url: host + "/mms/servlet/getLogisticsTrace?str=" + str,
		async: true,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			if(sessionStorage.getItem("lxjversionsName") >= 5000) {
				closeProgressDialog();
			}
			if(data.result == 0) {
				console.log(JSON.stringify(data));
				$(".delivery .imgBox").css("background-image", "url(" + data.imgUrl + ")");
				if(data.deliveryType == 1) {
					var sellerDelivery = data.sellerDelivery;
					var shopTem = _.template($("#shopTem").html());
					$(".delivery").append(shopTem(sellerDelivery));
					var status = sellerDelivery.state;
					switch(status) {
						case 2:
							$(".status").html("配送中");
							break;
						case 3:
							$(".status").html("已签收");
							break;
						default:
							break;
					}
				} else {
					var traceList = data.traceList[0];
					var state = traceList.state;
					var thirdTem = _.template($("#thirdTem").html());
					$(".delivery").append(thirdTem(traceList));
					switch(state) {
						case 2:
							$(".status").html("配送中");
							break;
						case 3:
							$(".status").html("已签收");
							break;
						case 4:
							$(".status").html("问题件");
							break;
						default:
							break;
					}
					handleData(traceList);
				}

			}
		}
	});
})

function GetURLParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function handleData($data) {
	var traces = $data.traces;
	var dLength = $data.traces.length - 1;
	var lhtml = "";
	for(var i = dLength; i >= 0; i--) {
		var list = _.template($("#traces").html());
		lhtml += list(traces[i]);
	}
	$(".listBox").append(lhtml);
}