import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { Toast } from 'we-vue'
Vue.use(Router)

import App from '../App.vue'
import home from '../views/home/home.vue'
import prefectureColumn from '@/views/home/prefectureColumn.vue'
import product from '../views/product/product.vue'
import productDetail from '../views/product/productDetail.vue'
import productColumn from '@/views/product/productColumn.vue'
import shoppingcart from '../views/shoppingcart/shoppingcart.vue'
import user from '../views/personal/user.vue'
import communitySelect from '@/views/search/communitySelect'
import citySelect from '@/views/search/citySelect'
import communitySearch from '@/views/search/communitySearch'
import goodsSearch from '@/views/search/goodsSearch'
import confirmOrder from '../views/product/confirmOrder.vue'
import collect from '@/views/personal/collect'
import myOrder from '@/views/personal/myOrder' 
import orderService from '@/views/personal/orderService'
import logistics from '@/views/personal/logistics'
import serviceList from '@/views/service/serviceList'
import address from '@/views/personal/address'
import orderDetail from '@/views/personal/orderDetail'
import writeAddress from '@/views/personal/writeAddress'
import serviceOrderDetail from '@/views/service/serviceOrderDetail'
import productEvaluate from '@/views/personal/productEvaluate'
import service from '@/views/personal/service'
import evaluate from '../views/product/evaluate.vue'
import questionClassification from '../views/personal/questionClassification.vue'
import questionList from '../views/personal/questionList.vue'
import questionDetail from '../views/personal/questionDetail.vue'
import suggestionFeedback from '../views/personal/suggestionFeedback.vue'
import editAddress from '@/views/personal/editAddress'
import paySuccess from '@/views/personal/paySuccess'
import payFail from '@/views/personal/editAddress'
import couponCommodities from '../views/product/couponCommodities.vue'
import discountCoupon from '../views/personal/discountCoupon.vue'


export default new Router({
  	routes: [
	    {
	        path: '/',
	        component:resolve => require(['../App.vue'],resolve), 
	      	children:[{
		        path: '/',
		        meta: {
			        title: '首页'
			    },
		        component:resolve => require(['../views/home/home.vue'],resolve) 
		    },{
		        path: 'home',
		        meta: {
			        title: '首页'
			    },
		        component:resolve => require(['../views/home/home.vue'],resolve) 
		    },{
		        path: 'product',
		        meta: {
			        title: '所有商品'
			    },
		        component:resolve => require(['../views/product/product.vue'],resolve) 
		    },{
		        path: 'shoppingcart',
		        meta: {
			        title: '购物车'
			    },
		        component:resolve => require(['../views/shoppingcart/shoppingcart.vue'],resolve) 
		    },{
		        path: 'user',
		        meta: {
			        title: '我的'
			    },
		        component:resolve => require(['../views/personal/user.vue'],resolve) 
		    }]
	    },
	    {
	    	path: '/communitySelect',
	    	name:'communitySelect',
	    	//component:communitySelect,
	    	component:resolve => require(['@/views/search/communitySelect'],resolve) 
	    },
	    {
	    	path: '/communitySearch',
	    	name:'communitySearch',
	    	component:resolve => require(['@/views/search/communitySearch.vue'],resolve) 
	    },
	     {
	    	path: '/citySelect',
	    	name:'citySelect',
	    	component:resolve => require(['@/views/search/citySelect.vue'],resolve) 
	    },
	    {
	    	path: '/goodsSearch',
	    	name:'goodsSearch',
	    	component:resolve => require(['@/views/search/goodsSearch.vue'],resolve) 
	    },
	    {
	    	path: '/productColumn/:categoryId',
	    	name:'productColumn',
	    	component:resolve => require(['@/views/product/productColumn.vue'],resolve) 
	    },    
	    {
	    	path: '/productDetail/:commodityId',
	    	name:'productDetail',
	    	meta: {keepAlive: false},
	        component:resolve => require(['@/views/product/productDetail.vue'],resolve) 
	    },
	    {
	    	path: '/couponCommodities/:couponId',
	    	name:'couponCommodities',
	        component:resolve => require(['@/views/product/couponCommodities.vue'],resolve) 
	    },
	     {
	    	path: '/evaluate',
	    	name:'evaluate',
	        component:resolve => require(['@/views/product/evaluate.vue'],resolve) 
	    },
	     {
	    	path: '/confirmOrder',
	    	name:'confirmOrder',
	    	//component: confirmOrder
	        component:resolve => require(['@/views/product/confirmOrder.vue'],resolve) 
	    },
	    {
	    	path: '/prefectureColumn/:marketId/:recommendName',
	    	name:'prefectureColumn',
	    	meta: {keepAlive: true},
	        component:resolve => require(['@/views/home/prefectureColumn.vue'],resolve) 
	    },
	    {
	    	path: '/collect',
	    	name:'collect',
	        component:resolve => require(['@/views/personal/collect.vue'],resolve) 
	    },
	    {
	    	path: '/myOrder/:orderStatus/:orderStatusName',
	    	name:'myOrder',
	        component:resolve => require(['@/views/personal/myOrder.vue'],resolve) 
	    },
	    {
	    	path: '/orderService/:orderStatus',
	    	name:'orderService',
	        component:resolve => require(['@/views/personal/orderService.vue'],resolve) 
	    },
	    {
	    	path: '/logistics/:orderNo',
	    	name:'logistics',
	        component:resolve => require(['@/views/personal/logistics.vue'],resolve) 
	    },
	    {
	    	path: '/address',
	    	name:'address',
	        component:resolve => require(['@/views/personal/address.vue'],resolve) 
	    },
	    {
	    	path: '/serviceList/:activityId',
	    	name:'serviceList',
	        component:resolve => require(['@/views/service/serviceList.vue'],resolve) 
	    },
	    {
	    	path: '/orderDetail/:orderNo/:orderStatus',
	    	name:'orderDetail',
	        component:resolve => require(['@/views/personal/orderDetail.vue'],resolve) 
	    },
	    {
	    	path: '/writeAddress/:safeguardNo/:orderNo',
	    	name:'writeAddress',
	        component:resolve => require(['@/views/personal/writeAddress.vue'],resolve) 
	    },
	    {
	    	path: '/serviceOrderDetail/:orderNo',
	    	name:'serviceOrderDetail',
	        component:resolve => require(['@/views/service/serviceOrderDetail.vue'],resolve) 
	    },
	    {
	    	path: '/productEvaluate/:orderNo',
	    	name:'productEvaluate',
	        component:resolve => require(['@/views/personal/productEvaluate.vue'],resolve) 
	    },
	    {
	    	path: '/service/:orderNo/:commitPrice/:skuId/:counts',
	    	name:'service',
	        component:resolve => require(['@/views/personal/service.vue'],resolve) 
	    },
	    {
	    	path: '/questionClassification',
	    	name:'questionClassification',
	        component:resolve => require(['@/views/personal/questionClassification.vue'],resolve) 
	    },
	    {
	    	path: '/questionList',
	    	name:'questionList',
	        component:resolve => require(['@/views/personal/questionList.vue'],resolve) 
	    },
	    {
	    	path: '/questionDetail',
	    	name:'questionDetail',
	        component:resolve => require(['@/views/personal/questionDetail.vue'],resolve) 
	    },
	    {
	    	path: '/suggestionFeedback',
	    	name:'suggestionFeedback',
	        component:resolve => require(['@/views/personal/suggestionFeedback.vue'],resolve) 
	    },
	     {
	    	path: '/editAddress/:type/:editAddressId',
	    	name:'editAddress',
	        component:resolve => require(['@/views/personal/editAddress.vue'],resolve) 
	    },
	    {
	    	path: '/paySuccess',
	    	name:'paySuccess',
	        component:resolve => require(['@/views/personal/paySuccess.vue'],resolve) 
	    },
	    {
	    	path: '/payFail',
	    	name:'payFail',
	        component:resolve => require(['@/views/personal/payFail.vue'],resolve) 
	    },
	     {
	    	path: '/discountCoupon',
	    	name:'discountCoupon',
	        component:resolve => require(['@/views/personal/discountCoupon.vue'],resolve) 
	    },
	    
  	]
})
