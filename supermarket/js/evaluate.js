    setTitle("全部评价");
    switchFullScreen(false);//关闭全屏
    clearHistory(); // 清除缓存
    initializeSession();//初始化
    //解析商品id
    var commodityId=GetURLParameter("commodityId");
    //var pageNum=1;
    //小区id
    areaCode = sessionStorage.getItem("areaCode");
    
/*commodityId="15401767342624c7cee6f67d445f9e9c";
areaCode="4400100001";
token="154155754715dd29a362426c45be901a";
host="https://tt.hori-gz.com:8443";*/

    //时间戳
    //var pageNum=1;

    //验证token次数

    function isCondition(param) {
        if(param != null && param != "" && param != undefined){
            return true;
        }
        return false;
    }
  /*  function getComment() {
        var str ="{\"body\":{\"areaOrgSeq\":\""+areaCode+"\",\"type\":2,\"pageSize\":10,\"pageNum\":\""+pageNum+"\",\"commodityId\":\""+commodityId+"\"},\"header\":{\"token\":\""+token+"\",\"time_stamp\":\"" + time_stamp + "\"}}";
        $.ajax({
            type: "get",
            async: false,
            url:host+"/mms/servlet/getCommodityComments?str="+str,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            jsonpCallback: "success_jsonpCallback",
            success: function(data) {
                console.log(JSON.stringify(data));
                var dataTemplate = _.template($('#commentListTemplate').html());
                $('#commentList').append(dataTemplate({"data":data.commentList}));
                if(data.totalCount == $("#commentList .productevaluatebox").length) {
						$("#nomoretip").show();
						$("#commentList .productevaluatebox:last").css("margin-bottom","0");
				}
                if(data.totalCount > $("#commentList .productevaluatebox").length) {
						$("#pullUp").show();
						$("#wrapper").css("background", "#f3f4f5");
					} else {
						$("#pullUp").css("background", "#f3f4f5");
						$("#pullUp").hide();
				}
                //myScroll.refresh();
                setTimeout("myScroll.refresh()",800);
            }
        });
    }*/




var onscrollStatus = false;

//organizationSeq  = '4400100001';
//token = "1524707159717c72af276bf646779bd1";
//host = "https://tt.hori-gz.com:8443";
//categoryId="152316786104f170e67006e140ef9bbd";
//clientType="android";
var timestamp = new Date().getTime();




var vue = new Vue({
    el: '#marketing',
    data: {
        doneFlag:true,
        setTime: 0,
        commodityList:[],
        apiurl: host+"/mms/servlet/getCommodityComments",
        pageNum: 0
    },
    mounted: function(){
        /*this.infinite(function(){
        	
        });*/
    },
    filters:{
        pricePre: function(value){
            var val = parseInt(value);
            return val;
        },
        priceNext: function(value){
            var val = String(parseFloat(value).toFixed(2)).split('.')[1];
            return val;
        }
    },
    methods: {
        infinite:function(done){
            var that = this;
            if(!this.doneFlag){
                done(true);
                return false
            }
            setTimeout(function(){
                vue.getDatejson(function(){
                    done();
                })
            },that.setTime);
            var jsonData={
                eventId:"click25",
                eventName:"全部评价页浏览次数"
            };
            jsonData=JSON.stringify(jsonData);
            nativeMethod("baiduStatistics",jsonData);
        },
        getDatejson: function(doneFunc) {
            this.pageNum ++;
            var params = {};
            var timestamp = new Date().getTime();

            params.header = {
                token: token,
                time_stamp: timestamp
            };
            params.body = {
            	commodityId:commodityId,
                areaOrgSeq: areaCode,
                type: 2,
                pageNum: this.pageNum,
                pageSize: 10
            };
            var paramData = JSON.stringify(params);
            this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                //jsonpCallback: "success_jsonpCallback"
            }).then(function (response) {
                // ��?���\�^?
               document.querySelector(".loading-layer").style.display = "block";
                if (response.body.result == 0) {
                	var commentListNew=response.body.commentList?response.body.commentList:[];
                    for(var i=0; i< commentListNew.length;i++){
                        this.commodityList.push(response.body.commentList[i]);
                    }
                    if(commentListNew.length < 10){
                        this.doneFlag = false;
                    }
                }else{
                	vue.doneFlag = false;
                }
                doneFunc();
                vue.setTime = 500;
            }, function (response2) {
                //��???�^?
                onscrollStatus = true;
                console.log(JSON.stringify(response2.body));
            });
        },
        

    }
});


//?��URL��?
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
