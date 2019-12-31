var pageNum = 1;
var pageSize = 10;
clearHistory(); //清楚缓存
initializeSession();
function refreshData() {
	setTimeout(function() {}, 0);
	return 1;
}
//
//areaCode = "4400100001";
//token = "15241883168404f94daf641446708aee";
//host="https://tt.hori-gz.com:8443";
//tokens="5BE87B21878DAD191612ED136DB58683";
//adttHost="https://tt.hori-gz.com:8443";

var isVisitor=false;
if (token.indexOf("_")==0) {
	isVisitor=true;
}

$(function() {
	setTitle("服务到家");
	var jsonData = {
		eventId: "click28",
		eventName: "服务到家首页浏览次数"
	};
	jsonData = JSON.stringify(jsonData);
	//调用APP接口，添加百度统计
	nativeMethod("baiduStatistics", jsonData);
	var myScroll;
	var pullDownEl;
	var pullDownOffset;
	var pullUpEl;
	var pullUpOffset;
	loaded();
	showView(pageNum);

});


var flag = 0; //判断下拉是否有数据 0表示有
var dataListLength;
function showView(pageNum) {
	var time_stamp = getTimeStamp();
	var params = {};
	params.header = {
		token: token,
		time_stamp: time_stamp
	};
	params.body = {
		flag: "1",
		activityId: "",
		areaSeq: areaCode,
		pageSize: pageSize,
		pageNum: pageNum

	};

	var paramData = JSON.stringify(params);
	var reqUrl = host + "/mms/servlet/getActivity?str=" + paramData;
	$.ajax({
		type: "get",
		async: true,
		url: reqUrl,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.result == 0) {
				var dataList = data.activityList;
				dataListLength = dataList.length;
				//            	顶部图数据插入 
				$('#introduceClumn img').attr('src', data.advertPic);
				//      		首次加载无数据
				if(dataListLength > 0) {
					$(".activitylose").hide();
					$('.box-wrap').hide();
					$('#clumnList .introduce-clumn').show();
					$('.introduce-clumn img').attr('src', data.advertPic);
					for(var i = 0; i < dataListLength; i++) {
						var activity = dataList[i];
						var clumnList = _.template($("#clumnListTemplate").html());
						$("#clumnList").append(clumnList(activity));
					}

					myScroll.refresh();
				}
				if(pageNum == 1) {

					if(dataListLength == 0) {
						$("#pullUp").hide();
						$('.noData').hide();
						$('#wrapper').hide();
						$('.box-wrap').show();
						$('#clumnList .introduce-clumn').hide();
						$(".activitylose").show();
						$("body").css("background-color",'#fff');
						flag = 1;
					} else if(dataListLength > 0 && dataListLength < 10) {
						$("#pullUp").hide();
						//		                $('.noData').show();
						$(".activitylose").hide();
						flag = 1;
					} else if(dataListLength == 10) {
						$("#pullUp").show();
						$('.noData').hide();
						$(".activitylose").hide();
						flag = 0;
					}
				} else {
					if(dataListLength < 10) {
						$("#pullUp").hide();
						$('.noData').show();
						$(".activitylose").hide();
						flag = 1;
					}
				}
				setTimeout('showadPic()',100);
				myScroll.refresh();
			}
		},
		error: function(res) {
			$("#pullUp").hide();
			$('.noData').hide();
			$('#wrapper').hide();
			$(".activitylose").show();
			$("body").css("background-color",'#fff');
			$('.box-wrap').show();
			$('#clumnList .introduce-clumn').hide();
			flag = 1;
		}
	});
}
function showadPic() {
	var time_stamp = getTimeStamp();
	var passwd = "EA3vWPmfxhWUit2s";
	var tokens = md5(passwd+time_stamp).toUpperCase();
	var params = {};
	params.header = {
		token: tokens,
		time_stamp: time_stamp,
		passwd:passwd
	};
	params.body = {
		organizationSeq: areaCode,
		posionCode:"007"
	};

	var paramData = JSON.stringify(params);
	var reqUrl = admsHost + "/adms/servlet/getAppPalyList?str=" +paramData;
	$.ajax({
		type: "get",
		async: true,
		url: reqUrl,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		//jsonpCallback: "success_jsonpCallback",
		success: function(data) {
			console.log(data);
			//console.log(data.sourceList[0].sourceURL);
			$('.introduce-clumn img').attr('src', data.sourceList[0].sourceURL);
		},
	});
}
var b = true; //iscoll点击事件会默认触发touchstart和touchend两个事件形成点击两次，定义中间变量处理
function getActivity(ele) {
	if(b) {
		b = false;
		setTimeout(function() {
			b = true;
		}, 500);//0.5毫秒之后才可点击第二次
		var activityId = ele.attr('name');
		showActivity(host + '/mms/html5/mall/serviceList.htm?activityId=' + activityId, '');
	}
}

function pullDownAction() {
	myScroll.refresh();
	return false;
}

function pullUpAction() {
	//这里写ajax数据处理
	if(flag == 0) {
		setTimeout(function() {
			pageNum++;
			showView(pageNum);
			//	            myScroll.refresh();
		}, 300);
	} else if(flag == 1) {
		myScroll.refresh();
		return false;
	}
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		hScroll: false,
		onBeforeScrollStart: null,
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function() {
			if(pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = ' ';
			} else
			if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拉';
			}

		},
		onScrollMove: function() {
			//			if($("#scroller").height() < $(window).height()) this.maxScrollY = 0;
			if((this.y < this.maxScrollY) && (this.pointY < 1)) {
				this.scrollTo(0, this.maxScrollY, 300);
				return;
			} else if(this.y > 0 && (this.pointY > window.innerHeight - 1)) {
				this.scrollTo(0, 0, 300);
				return;
			} else if(this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
				this.minScrollY = 0;
			} else if(this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
				//				this.minScrollY = -pullDownOffset;
			} else
			if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开手刷新';
				this.maxScrollY = this.maxScrollY;
			} else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载8条数据';

				this.maxScrollY = pullUpOffset;
			}
			if(dataListLength < pageSize) {
				$(".noData").show();
			}
			//			myScroll.refresh(); 
		},
		onScrollEnd: function() {
			if(pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
				pullDownAction(); // Execute custom function (ajax call?)
			} else
			if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				pullUpAction(); // Execute custom function (ajax call?)
			}
			//			myScroll.refresh();
			//			console.log('end')
			//          if(dataListLength < pageSize){
			$(".noData").hide();
			//         	}
		}
	});
	document.getElementById('wrapper').style.left = '0';
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
//  document.addEventListener('DOMContentLoaded', function() {
//      setTimeout(loaded, 200);
//  }, false);