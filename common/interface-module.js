define([],function(){
	var GetURLParameter=function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	};
	var url=window.location.search; 
	var host ="http://"+ window.location.host;//主机名,包含端口
	var clientType=GetURLParameter("clientType");
	sessionStorage.setItem("clientType",clientType); 
	
	var iosTitle="";
	//设置标题
	var setTitle=function (title){
		if (clientType=="android") {
			contact.setTitle(title);
		}else{//ios
			iosTitle=title;
		}

		
	};
	var setIosTitle=function (){
		return iosTitle;
	};
	//弹出一个原生的提示框
	var appAlert=function (title,message){
		try {
			if (clientType=="android") {
				contact.alert(title,message);
			}else{//ios
				contact_alert(title,message);
			}
		} catch (e) {
		}
	};
	//以原生界面activity的形式打开一个url
	var showActivity=function (url,title){
			if (clientType=="android") {
				contact.showActivity(url,title);
			}else{//ios
				contact_showActivity(url,title);
			}
	};
	
	var clearHistoryStatus=0;
	// 清除历史缓存记录
	// 缓存清除后，后退会直接关闭当前原生界面
	var clearHistory=function (){
		try {
			if (clientType=="android") {
				contact.clearHistory();
			}else{//ios
				clearHistoryStatus=1;
			}
		} catch (e) {
		}
	};
	var setClearHistory=function (){
		return clearHistoryStatus;
	};
	
	//关闭当前的原生界面
	var goBack=function (){
		try {
			if (clientType=="android") {
				contact.goBack();
			}else{//ios
				contact_closeActivity();
			}
		} catch (e) {
		}
	};
	
	var refreshStatus=0;
	//界面刷新
	var setRefreshOnResume=function (){
		try {
			if (clientType=="android") {
				contact.setRefreshOnResume();
			}else{//ios
				refreshStatus=1;
			}
		} catch (e) {
		}
	};
	var iosRefresh=function (){
		return refreshStatus;
	};
	
	// 实时聊天联系某人
	//@param jid       xmpp账号
	var chatWith=function (jid){
		try {
			if (clientType=="android") {
				contact.chatWith(jid);
			}else{//ios
				contact_chatWith(jid);
			}
		} catch (e) {
		}
	};
	//弹出登录框
	//判断当前的token是否是需要登录
	var needLogin=function (token){
		var flag;
		try {
			if (clientType=="android") {
				flag=contact.needLogin(token);
			}else{//ios
				flag=contact_needLogin(token);
			}
		} catch (e) {
		}
		return flag;
	};
	//判断是否安装支付宝客户端
	var isAliPayInstall=function (){
		var flag;
		try {
			if (clientType=="android") {
				flag=contact.isAliPayInstall();
			}else{//ios
				flag=contact_isAliPayInstall();
			}
		} catch (e) {
		}
		return flag;
	};
	//跳转到支付宝支付界面(旧版的web方式支付)
	var showAliPayActivity=function (url){
		try {
			if (clientType=="android") {
				contact.showAliPayActivity(url);
			}else{//ios
				contact_showAliPayActivity(url);
			}
		} catch (e) {
		}
	};
	//@param type               1，微信支付2支付宝
	//@param data               支付参数组成的JSON，具体看接口
	//                          微信：https://pay.weixin.qq.com/wiki/doc/api
	//                          /app/app.php?chapter=9_12&index=2
	//@param queryOrderUrl      订单支付结果查询url地址
	//@param successCallbackUrl 成功回调url地址
	//@param failureCallBackUrl 失败回调url地址
	/*function pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl){
	//	appAlert("新增参数",cancleCallBackUrl);
		if (clientType=="android") {
			contact.pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl);
		}else{//ios
			contact_pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl);
		}
	}*/
	var pay=function (type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl,cancleCallBackUrl){
		var i=0;
		try {
			if (clientType=="android") {
				try {//判断此处参数是否无定义或null  解决旧版本只有5个参数的问题 空字符串有特殊用途
					i=contact.pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl,cancleCallBackUrl);
				} catch (e) {
					contact.pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl);
				}
			}else{//ios
				try {
					i=contact_pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl,cancleCallBackUrl);
				} catch (e) {
					contact_pay(type, data, queryOrderUrl, successCallBackUrl, failureCallBackUrl);
				}
			}
		} catch (e) {
		}
		return i;
	};
	
	var result="";
	//*
	// 调用原生客户端从图库或者摄像头选择图片并上传
	// 可选择单张或者多张图片
	// 图片上传之后调用js返回结果给网页 onPictureSelected(String json)
	// json的结果为图片上传结果返回的消息bean ImagesUploadResult
	//
	// @param maxPicture 最大上传数量
	///
	var selectPicture=function (maxPicture) {
		try {
			if (clientType=="android") {
				contact.selectPicture(maxPicture);
			}else{
				contact_selectPicture(maxPicture);
			}
		} catch (e) {
		}
	};
	
	//打开个人中心我的订单界面
	var showMyOrdersActivity=function (){
		try {
			if (clientType=="android") {
				contact.showMyOrdersActivity();
			}else{
				contact_showMyOrdersActivity();
			}
		} catch (e) {
		}
	};
	// 从历史stack一个一个的pop出来，知道页面与page相同
	// 即 http://1.1.1.1/XXXX.html?a=1
	 //* pop2Page(XXXX.html)跳到上一个XXXX.html
	   // * 如果是stack里面最后一个，则直接显示该地址
	var pop2Page=function (pageUrl){
		try {
			if (clientType=="android") {
				contact.pop2Page(pageUrl);
			}else{
				contact_pop2Page(pageUrl);
			}
		} catch (e) {
		}
	};
	
	//返回显示上一个界面
	var popUrl=function (){
		try {
			if (clientType=="android") {
				contact.popUrl();
			}else{
				setTimeout(function(){
					contact_popUrl();
				},200);
			}
		} catch (e) {
		}
	};
	
	//返回生活首页
	var backToHomePage=function (){
		try {
			if (clientType=="android") {
				contact.backToHomePage();
			}else{
				clearHistoryStatus=2;
			}
		} catch (e) {
		}
	};
	
	//*
	// 以原生界面activity的形式打开一个url
	// 该界面有一些特殊的设置
	//
	// @param url       url地址
	// @param title     界面显示的标题
	// @param type      标题或者特殊分类 1（有编辑/完成按钮）购物车2 购物车详情（共3件的提示），4...
	// @param data      特殊JSON数据，type1填null，type2是bean，里面有message，如{message:共3件}
	var showActivitySpecial =function (url, title, type, data){
		try {
			if (clientType=="android") {
				contact.showActivitySpecial(url, title, type, data);
			}else{
				contact_showActivitySpecial(url, title, type, data);
			}
		} catch (e) {
		}
	};
	//*
	// 调用原生客户端进行地图导航
	// @param name 地点名称(店铺名)
	// @param addressName 地址名称
	// @param lon  经度参数，以字符串方式传输，自己转换成浮点数据
	// @param lat  纬度参数，以字符串方式传输，自己转换成浮点数据
	var showMap=function (name,addressName, lon, lat){
		try {
			if (clientType=="android") {
				contact.showMap(name,addressName,lon, lat);
			}else{
				contact_showMap(name,addressName, lon, lat);
			}
		} catch (e) {
		}
	};
	
	return{
		GetURLParameter:GetURLParameter,
		setTitle:setTitle,
		setIosTitle:setIosTitle,
		appAlert:appAlert,
		showActivity:showActivity,
		clearHistory:clearHistory,
		setClearHistory:setClearHistory,
		goBack:goBack,
		setRefreshOnResume:setRefreshOnResume,
		iosRefresh:iosRefresh,
		chatWith:chatWith,
		needLogin:needLogin,
		isAliPayInstall:isAliPayInstall,
		showAliPayActivity:showAliPayActivity,
		pay:pay,
		selectPicture:selectPicture,
		showMyOrdersActivity:showMyOrdersActivity,
		pop2Page:pop2Page,
		backToHomePage:backToHomePage,
		showActivitySpecial:showActivitySpecial,
		showMap:showMap
	}
})

