require.config({
	paths:{
		index:"index",
		//productOrders:"productOrders",
		common:"common-module",
		iscroll:"iscroll",
		underscore:"underscore",
		jquery:"../../common/jquery-2.1.4",
		interface:"../../common/interface-module"
	},
	shim:{
		underscore:{
			exports:"_"
		},
		iscroll:{
			deps:['jquery']
		}
	}
});

require(['index'],function(index){
    setTimeout(index.loaded(), 10);
	index.showView();
});
//require(['productOrders'],function(productOrders){
//	setTimeout(productOrders.loaded(), 10);
//	productOrders.showView();
//});
