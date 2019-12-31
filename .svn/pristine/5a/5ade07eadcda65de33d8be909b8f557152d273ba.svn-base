define([],function(){
	var GetURLParameter=function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
   };
    //获取时间戳
    var getTimeStamp=function (){
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
    };


    var initializeSession=function (){
        var url = window.location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substring(1);
            var strs = str.split("&");
            var key = [];
            for (var i = 0; i < strs.length; i++) {
                key[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
            token = key['token'];
            sessionStorage.setItem("token", token);
            //小区机构编号
            areaCode = key['organizationSeq'];
            sessionStorage.setItem("areaCode", areaCode);

            // 客户端类型ios/android
            clientType = key['clientType'];
            sessionStorage.setItem("clientType", clientType);
            
        	//住户编号 
    		householdSerial = key['householdSerial'];
    		sessionStorage.setItem("householdSerial", householdSerial);
        }
    };
    
    return{
    	GetURLParameter:GetURLParameter,
    	getTimeStamp:getTimeStamp,
    	initializeSession:initializeSession
    }
})
    
    