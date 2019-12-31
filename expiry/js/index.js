//刷新页面
setRefreshOnResume();
//设置原生头部标题
setTitle("商家登录");
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
//url截取
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
//获取空值
function isCondition(param) {
    if(param != null && param != "" && param != undefined) {
        return true;
    }
    return false;
}
//toast弹出框
function toast(message){
    layer.msg(message);
}
//token值
var token = GetURLParameter("token");
//活动id
var fufenActivityId = GetURLParameter("fufenActivityId");

//host="http://tt.hori-gz.com:8090";
host="https://mms.hori-gz.com:8443";
/*-------   $(document).ready开始   --------*/
$(document).ready(function(){
    //清除输入手机号的空格,只能输入11位；叉号显示与隐藏
    $(".phone").focus(function(){
        $(this).keyup(function(){
            var phoneDelete = $(".phone-delete");
            var phoneValue = $(this).val();
            phoneValue = phoneValue.replace(/\s+/g,"");
            var phoneLength = phoneValue.length;
            if(phoneLength>11){
                phoneValue = phoneValue.substring(0,11);
            }
            $(this).val(phoneValue);
            if(phoneLength > 0){
                phoneDelete.show();
            }else{
                phoneDelete.hide();
            }
        });
    });
    //清除输入密码的空格,叉号显示与隐藏
    $(".password").focus(function(){
        $(this).keyup(function(){
            var passwordDelete = $(".password-delete");
            var passwordValue = $(this).val();
            passwordValue = passwordValue.replace(/\s+/g,"");
            var phoneLength = passwordValue.length;
            $(this).val(passwordValue);
            if(phoneLength > 0){
                passwordDelete.show();
            }else{
                passwordDelete.hide();
            }
        });
    });
    //点击删除按钮，全删已输入内容
    $(".phone-delete").click(function(){
        $(".phone").val("");
    });
    $(".password-delete").click(function(){
        $(".password").val("");
    });
    //点击登录按钮验证、登录
    $(".register-info").on("click",function(){
        //判断是否已填入11位手机号码、密码
        checkPhone();

    });
});
//判断是否已填入11位手机号码
function checkPhone(){
    var phone = $(".phone").val();
    phone = phone.replace(/\s+/g,"");
    var phoneRule = /^1\d{10}$/;
    var message = "";
    if(phone.length=="0"){
        message = "请填写手机号码";
        toast(message);
        return false;
    }else if(!(phoneRule.test(phone))){
        message = "请填写正确手机号码";
        toast(message);
        return false;
    }else{
        //判断是否已填入密码
        checkPassword();
    }
}
//判断是否已填入密码
function checkPassword(){
    var passwordValue = $(".password").val();
    passwordValue = passwordValue.replace(/\s+/g,"");
    if(passwordValue.length=="0"){
        var message = "请填写密码";
        toast(message);
        return false;
    }else{
        getData();
    }
}
//请求后台，登录
function getData(){
    var mobile = $(".phone").val();//核销人员手机号
    mobile = mobile.replace(/\s+/g,"");
    var password = $(".password").val();//核销人员登录密码
    password = password.replace(/\s+/g,"");
    var time_stamp=getTimeStamp();
    var params={};
    params.header={
        token: token,
        time_stamp:time_stamp
    };
    params.body={
        mobile:mobile,
        password:password,
        fufenActivityId:fufenActivityId
    };
    var str = JSON.stringify(params);
    var reqUrl = host+"/mms/servlet/exchangeAwardCheckerLogin?str=" + str;
    $.ajax({
        type: "post",
        async: true,
        url:reqUrl,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "success_jsonpCallback",
        success: function(data) {
            console.log(data);
            console.log(data.reason);
            var result = data.result;
            var loginStatus = data.loginStatus;
            if(result==0){
            	rememberPasswd(mobile,password);
                toLogin(loginStatus,mobile);
            }
        }
    });
    
    
}
//登录
function toLogin(loginStatus,mobile){
    var message = "";
    switch (loginStatus){
        case 1:
            message="密码不正确";
            toast(message);
            break;
        case 2:
            message="账号不存在";
            toast(message);
            break;
        case 3:
            location.href=host+"/mms/html5/expiry/verify.htm?mobile=" + mobile +"&host="+host+"&fufenActivityId="+fufenActivityId;
            break;
        default:
    }
}

function rememberPasswd(mobile,password){
	localStorage.setItem("loginAccount",mobile);
	localStorage.setItem("loginPassword",password);
}

function initPasswd(){
	if(localStorage.getItem("loginAccount") && localStorage.getItem("loginPassword")){
		var mobile = $(".phone").val(localStorage.getItem("loginAccount"));//核销人员手机号
	    var password = $(".password").val(localStorage.getItem("loginPassword"));//核销人员登录密码
	}
}

initPasswd();
