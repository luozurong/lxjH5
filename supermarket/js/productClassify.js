var onscrollStatus = false;
var clientType = GetURLParameter("clientType");
sessionStorage.setItem("host", host);
var token = GetURLParameter("token");
var areaCode = GetURLParameter("organizationSeq");
var parentId = "";
var thirdId = GetURLParameter("thirdId")?GetURLParameter("thirdId"):"";
var thirdIdState=true;
setTitle("全部");



//areaCode = '4400100001';
//token = "1524707159717c72af276bf646779bd1";
//host = "https://tt.hori-gz.com:8443";
//thirdId='148059224228c16f147a9a87480492fb';
//clientType="android";
var timestamp = new Date().getTime();
var isVisitor = false;
if(token && token.indexOf("_") == 0) {
    isVisitor = true;
}
if (isCondition(thirdId)) {
	thirdIdState=false;
}

var backHomePage = GetURLParameter("backHomePage"); //回退到生活首页
if(backHomePage == "1") {
    backToHomePage();
}

var vue = new Vue({
    el: '#app',
    data: {
        jsondate: {},
        presentClassifyid: '',//左侧当前选中id
        classifyList: [],//左侧分类列表
        childList:[],//子分类列表
        apiurl: host+"/mms/servlet/getEntityCategory"
    },
    filters: {
        //状态过滤
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getDatejson();
            //lxjTip.msg(window.location.href,{time:30000})
            var jsonData = {
                eventId: "click26",
                eventName: "商品超市首页浏览次数"
            };
            jsonData = JSON.stringify(jsonData);
            //调用APP接口，添加百度统计
            nativeMethod("baiduStatistics", jsonData);

        });

    },
    methods: {
        //获取左侧三级分类数据
        getDatejson: function() {
            var params = {};
            var timestamp = new Date().getTime();
            params.header = {
                token: token,
                time_stamp: timestamp
            };
            params.body = {
                parentId: parentId
            };
            var paramData = JSON.stringify(params);
            this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                onscrollStatus = true;
                // 响应成功回调
                this.jsondate = response.body;
                if(response.body.result == 0) {
                    this.classifyList = response.body.parentList;
                    this.presentClassifyid =thirdId?thirdId:response.body.parentList[0].categoryId;
                    this.childList=response.body.childList;
                    if (!thirdIdState) {
                    	setTimeout(function(){
                    	   	vue.swiperSlideToIndex(response.body.parentList,thirdId);	
                    	},200)
                    }
                    //childList=data.childList;
                    //for(var j = 0; j < childList.length; j++) {
                    //    if(childList[j].isCheck==0) {
                    //        $('.classify span').removeClass("chooseClassify");
                    //        $(ele).child().addClass("chooseClassify");
                    //    }
                    //}
                }

            }, function(response2) {
                //响应错误回调
                onscrollStatus = true;
                console.log(JSON.stringify(response2.body));
            });
        },
        //获取右侧分类数据
        getproductListDate: function(categoryId, refreshState) {
            var params2 = {};
            var timestamp = new Date().getTime();
            params2.header = {
                token: token,
                time_stamp: timestamp
            };
            params2.body = {
                parentId: categoryId  //左侧三级分类的id
            };
            var paramData = JSON.stringify(params2);
            this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                // 响应成功回调
                console.log(JSON.stringify(response.body));
                if(response.body.result == 0) {
                    this.childList=response.body.childList;
                }
            }, function(response2) {
                // 响应错误回调
                console.log(JSON.stringify(response2.body));
            });
        },
        //改变左边栏状态
        changeCategoryId: function(changeId) {
            vue.presentClassifyid = changeId;
        },
        //改变左边栏状态
        swiperSlideToIndex: function(list,key) {
            for(var i=0;i<list.length;i++){
            	if (list[i].categoryId==key) {
            		mySwiper.slideTo(i, 800, false);
            		break;
            	}
            }
        },
        //跳转到商品分类下的商品列表页
        turnTo: function(id) {
        	  //console.log(host + "/mms/html5/supermarket/goodsList.htm?categoryId=" + id)
            showActivity(host + "/mms/html5/supermarket/goodsList.htm?categoryId=" + id,"商品列表");
        }



    }
});
vue.$watch('classifyList', function(newValue, oldValue) {
    mySwiper.update();
});
vue.$watch('productList', function(newValue, oldValue) {
   // myScroll.refresh();
});
vue.$watch('presentClassifyid', function(newValue, oldValue) {
    //$("#nomore").hide();
  //  document.getElementById("nomore").style.display="none";
    //setTimeout(function(){
    vue.getproductListDate(newValue, true);
    //},100);
});


var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    freeModeMomentumBounce: false
});

//获取URL参数
function activeChoose(ele) {
    $('.classify span').removeClass("chooseClassify");
    $(ele).child().addClass("chooseClassify");
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
     //   $("#nomore").hide();
        //vue.getproductListDate(vue.presentTotal, 1, vue.presentClassifyid, true);
    }, 0);
    return 1;
}
function disableNativeScorll(){

    callNativeMethod('disableNativeScorll');

}

var moveC = false;
