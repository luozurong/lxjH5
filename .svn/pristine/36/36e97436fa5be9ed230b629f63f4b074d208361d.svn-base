import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'js-md5'
Vue.use(Vuex)

import defalutPic from '../../static/images/ic_default_avatar.png'
import config from '../config/lxjConfig.js'
import {cookie,urlConfig} from '../config/common.js'

const store = new Vuex.Store({
	state:{
		save: sessionStorage.getItem("save") ? Boolean(sessionStorage.getItem("save")) : false,
		accreditFlag: cookie.getCookie("accreditFlag") ? Boolean(cookie.getCookie("accreditFlag")) : true,
		code: cookie.getCookie("code") ? cookie.getCookie("code") : 1,
		codeWechat: sessionStorage.getItem("codeWechat") ? sessionStorage.getItem("codeWechat") : '',
		token: cookie.getCookie("token") ? cookie.getCookie("token") : null,
		userAccount: cookie.getCookie("userAccount") ? cookie.getCookie("userAccount") : '',
		appid: cookie.getCookie("appid") ? cookie.getCookie("appid") : '',
		openid: cookie.getCookie("openid") ? cookie.getCookie("openid") : '',
		gzhAccessToken: cookie.getCookie("gzhAccessToken") ? cookie.getCookie("gzhAccessToken") : '',
		unionid:  cookie.getCookie("unionid") ? cookie.getCookie("unionid") : '',
		nickname: cookie.getCookie("nickname") ? cookie.getCookie("nickname") : '联享家用户',
		sex: cookie.getCookie("sex") ? cookie.getCookie("sex") : 0,
		headimgurl: cookie.getCookie("headimgurl") ? cookie.getCookie("headimgurl") : defalutPic,
		lxjAccount: cookie.getCookie("lxjAccount") ? cookie.getCookie("lxjAccount") : '',  
		organizationSeq: localStorage.getItem("organizationSeq") ? localStorage.getItem("organizationSeq") : '4400100183',//小区机构
		commuintyName: localStorage.getItem("commuintyName") ? localStorage.getItem("commuintyName") : '联享家体验小区',
		organizationSeqFlag: false,
		cityname: '手动选择',
		isLocation: true,//是否所在城市
		citycode: '',
		isLocationSelect: false,
		locationAddr: sessionStorage.getItem("locationAddr") ? sessionStorage.getItem("locationAddr") : '未获取地理位置',
		locationCity: sessionStorage.getItem("locationCity") ? sessionStorage.getItem("locationCity") : '手动选择',
		locationCode: sessionStorage.getItem("locationCode") ? sessionStorage.getItem("locationCode") : '',
		lng: sessionStorage.getItem("lng") ? sessionStorage.getItem("lng") : '', 
		lat: sessionStorage.getItem("lat") ? sessionStorage.getItem("lat") : '', 
		getInforFlag:  sessionStorage.getItem("getInforFlag") ? sessionStorage.getItem("getInforFlag") : false,
		host: urlConfig.host,
		ctmsHost: urlConfig.ctmsHost,
		mmsHost: urlConfig.mmsHost,
		uumsHost: urlConfig.uumsHost,
		admsHost: urlConfig.admsHost,
		tsmsHost: urlConfig.tsmsHost,
		cmsHost: urlConfig.cmsHost,
		/*token:"154466669640df2c95088fab45ee8352",
		code:0*/
	},
	
	mutations:{
		setsave(state,val){
			state.save = val;              //刷新保存数据的状态
			sessionStorage.setItem("save",state.save);
		},
		setcode(state,val){ 
			state.code = val;              //转态码
			cookie.setCookie('code',val,7); 
		},
		setaccreditFlag(state,val){
			state.accreditFlag = val;      //转态码
			cookie.setCookie('accreditFlag',val,7); 
		},
		setcodeWechat(state,val){
			state.codeWechat = val;       //userAccount
			sessionStorage.setItem("codeWechat",state.codeWechat);
		},
		settoken(state,val){
			state.token = val;             //token
			cookie.setCookie('token',val,7);              
		},
		setuserAccount(state,val){
			state.userAccount = val;       //userAccount
			cookie.setCookie('userAccount',val,7); 
		},
		setappid(state,val){ 
			state.appid = val;            //appid
			cookie.setCookie('appid',val,7); 
		},
		setopenid(state,val){ 
			state.openid = val;            //openid
			cookie.setCookie('openid',val,7); 
		},
		setgzhAccessToken(state,val){
			state.gzhAccessToken = val;    //gzhAccessToken
			cookie.setCookie('gzhAccessToken',val,7); 
		},
		setunionid(state,val){
			state.unionid = val;           //unionid
			cookie.setCookie('unionid',val,7); 
		},
		setnickname(state,val){
			state.nickname = val;          //nickname  
			cookie.setCookie('nickname',val,7); 
		},
		setsex(state,val){
			state.sex = val;               //sex
			cookie.setCookie('sex',val,7); 
		},
		setheadimgurl(state,val){
			state.headimgurl = val;        //headimgurl
			cookie.setCookie('headimgurl',val,7); 
		},
		setlxjAccount(state,val){
			state.lxjAccount = val;        //lxjAccount
			cookie.setCookie('lxjAccount',val,7); 
		},
		setcityname(state,val){				  
			state.cityname = val;          // 小区名      
		},
		setisLocation(state,val){         
			state.isLocation = val;       //我的小区
		},
		setcitycode(state,val){               
			state.citycode = val;         //我的城市code
		},
		setisLocationSelect(state,val){               
			state.isLocationSelect = val; //我选择的地址
		},
		changeCommuinty(state,val){				  
			state.commuintyName = val;     //小区名    
			localStorage.setItem("commuintyName",state.commuintyName);    
		},
		changeorganizationSeq(state,val){         
			state.organizationSeq = val;   //我的小区机构编号
			localStorage.setItem("organizationSeq",state.organizationSeq)
		},
		setLocationAddr(state,val){               
			state.locationAddr = val;      //我所在的位置
			sessionStorage.setItem("locationAddr",state.locationAddr)
		},
		setorganizationSeqFlag(state,val){               
			state.organizationSeqFlag = val;//我所在的位置是否改变
		},
		setLocationCity(state,val){               
			state.locationCity = val;      //我所在的城市
			sessionStorage.setItem("locationCity",state.locationCity)
		},
		setLocationCode(state,val){               
			state.locationCode = val;      //我所在的城市code
			sessionStorage.setItem("locationCode",state.locationCode)
		},
		setlng(state,val){                 //我所在的精度
			state.lng = val;
			sessionStorage.setItem("lng",state.lng)
		},
		setlat(state,val){                 //我所在的维度
			state.lat = val;
			sessionStorage.setItem("lat",state.lat)
		},
		setgetInforFlag(state,val){        //是否获取url的参数（user.vue）
			state.getInforFlag = val;
			sessionStorage.setItem("getInforFlag",state.getInforFlag)
		}
	}
})

export default store