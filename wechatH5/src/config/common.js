//cookie封装
export const cookie = {
	setCookie(name, value, Days){
		if(Days <= 0) Days = 7;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString()+";path=/";
	},
	getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg)){
	        return decodeURI(arr[2]);
	    }else{
	        return null;
	    }
	}
}

//url判断
var url = window.location.host;
var reg = RegExp(/tt/);
var regLocal = RegExp(/localhost/);
if(url.match(reg) || url.match(regLocal)){
    var host = 'http://tt.hori-gz.com';
	var ctmsHost = 'https://tt.hori-gz.com:8443';
	var mmsHost = 'https://tt.hori-gz.com:8443';
	var uumsHost = 'https://tt.hori-gz.com:8443';
	var admsHost = 'https://adtt.hori-gz.com';
	var tsmsHost = 'https://tt.hori-gz.com:8443';
	var cmsHost = 'https://tt.hori-gz.com:8443';  
}else{
	var host = 'https://mms.hori-gz.com';
	var ctmsHost = 'https://bbs.hori-gz.com:8443';
	var mmsHost = 'https://mms.hori-gz.com';
	var uumsHost = 'https://sso.lxjapp.com:8443';
	var admsHost = 'https://ad.hori-gz.com';
	var tsmsHost = 'https://lxj.hori-gz.com:8443';
	var cmsHost = 'https://lxj.hori-gz.com:8443';  
}
export const urlConfig = {
    host: host,
	ctmsHost: ctmsHost,
	mmsHost: mmsHost,
	uumsHost: uumsHost,
	admsHost: admsHost,
	tsmsHost: tsmsHost,
	cmsHost: cmsHost 
}