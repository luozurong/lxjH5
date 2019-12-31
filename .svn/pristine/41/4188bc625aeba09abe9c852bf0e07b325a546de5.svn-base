//rem布局动态获取根字体大小
function remDynamicLayout(){
    var $windowWidth = $(window).width();
    function htmlFontZize(){
        $windowWidth = $(window).width();
        if ($windowWidth > 640) {
            $windowWidth = 640; //限定最大宽度为640
        }
        $("html").css("font-size", (100 / 414) * $windowWidth + "px");
    }
    setTimeout(function () {
        htmlFontZize();
    }, 100);
    $(window).resize(function () {
        htmlFontZize();
    });
}
remDynamicLayout();
setTitle("核销兑奖");
//url截取参数
function GetURLParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//获取时间戳
function getTimeStamp(){
    var currentDate = new Date();
    var yyyy = currentDate.getFullYear().toString();
    var MM = (currentDate.getMonth() + 1).toString();
    if (MM.length == 1)
        MM = "0" + MM;
    var DD = currentDate.getDate().toString();
    if (DD.length == 1)
        DD = "0" + DD;
    var HH = currentDate.getHours().toString();
    if (HH.length == 1)
        HH = "0" + HH;
    var mm = currentDate.getMinutes().toString();
    if (mm.length == 1)
        mm = "0" + mm;
    var ss = currentDate.getSeconds().toString();
    if (ss.length == 1)
        ss = "0" + ss;
    var time_stamp = yyyy + MM + DD + HH + mm + ss;
    return time_stamp;
}
//判断空值
function isCondition(param) {
    if(param != null && param != "" && param != undefined){
        return true;
    }
    return false;
}
//toast弹出框
function toast(message){
    layer.msg(message);
}
var awardCode=GetURLParameter("awardCode"); //兑奖码
var checkerMobile=GetURLParameter("checkerMobile");//核销人员手机号
var operation = "";//确认核销
//token值
var token=GetURLParameter(token);
var host=GetURLParameter("host");
var fufenActivityId=GetURLParameter("fufenActivityId");
/*-------   $(document).ready开始   --------*/
$(document).ready(function(){
    getData();
});
//初始化核销兑奖信息
function getData() {
    var time_stamp=getTimeStamp();
    operation = 1;
    var params={};
    params.header={
        token: token,
        time_stamp:time_stamp
    };
    params.body={
        awardCode:awardCode,
        checkerMobile:checkerMobile,
        operation:operation,
        fufenActivityId:fufenActivityId
    };
    var str = JSON.stringify(params);
    console.log(str);
    var reqUrl = host+"/mms/servlet/verifyExchangeAward?str=" + str;
    $.ajax({
        type: "post",
        async: true,
        url:reqUrl,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "success_jsonpCallback",
        success: function(data) {
            //验证通过标志
            var verifyFlag = data.verifyFlag;
            if(verifyFlag=="7"){
                //验证码
                var awardCode=data.awardCode;
                var expiryInfo= _.template($("#expiryTemplate").html());
                $("#expiryBox").append(expiryInfo(data));
                awardCode=data.awardCode+"";
                awardCode = awardCode.replace(/(.{3})/g,"$1 ").replace(/\s+$/g,"");
                $(".expiryNum").html("");
                $(".expiryNum").html(awardCode);

                $(".sureExpiry").click(function(){
                    confirmExpiry();
                });
            }
        }
    });
}
//更改核销兑奖状态
function confirmExpiry(){
    var time_stamp=getTimeStamp();
    operation = 2;
    var params={};
    params.header={
        token: token,
        time_stamp:time_stamp
    };
    params.body={
        awardCode:awardCode,
        checkerMobile:checkerMobile,
        operation:operation,
        fufenActivityId:fufenActivityId
    };
    //更改核销兑奖的请求参数待确认，要新增接口
    var str = JSON.stringify(params);
    var reqUrl = host+"/mms/servlet/verifyExchangeAward?str=" + str;
    $.ajax({
        type: "post",
        async: true,
        url:reqUrl,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "success_jsonpCallback",
        success: function(data) {
            console.log(data);
            var checkStatus = data.checkStatus;
            var verifyFlag = data.verifyFlag;
            if(checkStatus == "1"||verifyFlag == "1"){
                $(".sureExpiry").hide();
                $(".hasExpiry").show();
            }else{
                var message = "确认核销失败";
                toast(message);
            }
        }
    });
}












