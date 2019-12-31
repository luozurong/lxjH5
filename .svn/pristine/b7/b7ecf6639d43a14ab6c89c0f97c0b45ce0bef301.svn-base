//刷新页面
setRefreshOnResume();
setTitle("验证兑奖");
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
var operation = 1;//验证兑奖码
token = GetURLParameter("token");
var host=GetURLParameter("host");
//活动id
var fufenActivityId=GetURLParameter("fufenActivityId");

/*-------   $(document).ready开始   --------*/
$(document).ready(function(){

    //验证码输入非数字或非12位时，红框提示;每4位加一个空格
    $(".text").focus(function(){
        $(this).keyup(function(){
            var num = /^[0-9]*$/;
            var verifyValue = $(this).val();
            var deleteLogo = $(".delete-logo");

            verifyValue=verifyValue.replace(/\s+/g,"");

            if(verifyValue.length > 9){
                verifyValue = verifyValue.substring(0,9);
            }

            if(!num.test(verifyValue)||verifyValue.length!=9){
                $(".text").css("border","1px solid #ff661b");
            }else{
                $(".text").css("border","1px solid #cecece");
            }

            if(num.test(verifyValue)&&verifyValue.length==9){
                flg = 1;
                $(".verify").css("background","#ff661b");

            }else{
                $(".verify").css("background","#a9a9a9");
            }
            verifyValue = verifyValue.replace(/(.{3})/g,"$1 ").replace(/\s+$/g,"");

            $(this).val(verifyValue);

            if(verifyValue.length > 0){
                deleteLogo.show();
            }else{
                deleteLogo.hide();
            }
        });
    });
    //点击叉号（×），全删已输入内容
    $(".delete-logo").click(function(){
        var text = $(".text");
        text.val("");
        text.css("border","none");
        $(this).hide();
    });

    $(".verify").click(function(){
        getData();
    });

});
//验证请求
function getData() {
    var checkerMobile = GetURLParameter("mobile");
    var awardCode =$(".text").val();//兑奖码
    awardCode=awardCode.replace(/\s+/g,"");
    var time_stamp=getTimeStamp();
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
    var reqUrl = host+"/mms/servlet/verifyExchangeAward?str=" + str;
    $.ajax({
        type: "post",
        async: true,
        url:reqUrl,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "success_jsonpCallback",
        success: function(data) {
            var verifyFlag = data.verifyFlag;
            var awardCode = data.awardCode;
            verifyToast(verifyFlag,awardCode,checkerMobile);
        }
    });
}
//验证提示，验证跳转
function verifyToast(verifyFlag,awardCode,checkerMobile){
    switch (verifyFlag){
        case 0:
            message="该兑奖码不存在";
            toast(message);
            break;
        case 1:
            message="该兑奖码已兑换";
            toast(message);
            break;
        case 2:
            message="奖品已过期";
            toast(message);
            break;
        case 3:
            message="非实物礼品";
            toast(message);
            break;
        case 4:
            message="非本小区住户";
            toast(message);
            break;
        /*case 5:
            message="该小区不存在";
            toast(message);
            break;*/
        case 6:
            message="大奖请等待专员联系";
            toast(message);
            break;
        case 7:
            location.href=host+"/mms/html5/expiry/cancel.htm?awardCode=" + awardCode+"&checkerMobile="+checkerMobile+"&host="+host+"&fufenActivityId="+fufenActivityId;
            break;
        case 8:
            message="核销账号错误！";
            toast(message);
            break;
        default:
    }
}