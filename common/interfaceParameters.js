/*  后端接口前缀定义
 * 
 * */
//mms项目接口前缀
//var mmsHost = "https://tt.hori-gz.com:8443"; //tt
//var mmsHost = 'https://mms.hori-gz.com:8443';//正式
var mmsHost =window.location.href.indexOf("tt.hori-gz")>=0?"https://tt.hori-gz.com:8443":"https://mms.hori-gz.com:8443";

// uums项目前缀
//var uumsHost = 'https://tt.hori-gz.com:8443';//tt
//var uumsHost = 'https://sso.lxjapp.com:8443';//正式
var uumsHost =window.location.href.indexOf("tt.hori-gz")>=0?"https://tt.hori-gz.com:8443":"https://sso.lxjapp.com:8443";

//ctms项目接口前缀
//var ctmsHost = 'https://tt.hori-gz.com:8443';//tt
//var ctmsHost = "http://bbs.hori-gz.com"; //正式
var ctmsHost =window.location.href.indexOf("tt.hori-gz")>=0?"https://tt.hori-gz.com:8443":"https://bbs.hori-gz.com:8443";

//jfms项目接口前缀
//var jfmsHost = 'https://tt.hori-gz.com:8091';//tt
//var jfmsHost = "http://bbs.hori-gz.com"; //正式

//大数据项目接口前缀
//var horiBigDataHost='https://bdtt.hori-gz.com:8443';//测试
//var horiBigDataHost = ""; //正式

//chims项目接口前缀
//var chimsHost='https://tt.hori-gz.com:8091';//tt
//var chimsHost = ""; //正式

//adms项目接口前缀(广告系统)
var admsHost='https://ad.hori-gz.com';//tt
//var admsHost = ""; //正式