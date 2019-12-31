    setRefreshOnResume();//刷新页面(防止返回之后，没有重新请求)
    //clearHistory(); // 清除历史缓存记录 缓存清除后，后退会直接关闭当前原生界面
    var pageNum=1;
    var loadCount=0;
    initializeSession();
    //解析url带的id
    var activityId=GetURLParameter("activityId");
    //小区机构编号
    areaCode = sessionStorage.getItem("areaCode");
    //小区机构编号
    activityId="148479058061b88b58c17998498cb545";
    areaCode='4400100001';
    token="1488770548739e2ce583e3084bcca22a";
    host="http://115.28.56.254:8090";
    var time_stamp = getTimeStamp();
    try {
        contact.hideCart();
    } catch (exception) {

    }
    function showView() {
        getData(pageNum);
    }

    if( token == null || token == "" ){
		window.location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
	}else{
		 showView();
	}
    $(function(){
    	   $(".shoppingcart").on("click",function(){
               showActivitySpecial(host+"/mms/html5/mall/shoppingcart.htm","购物车",1,null);
               //window.location.href="shoppingcart.htm"
           });
    });
    function getProductDetail(ele){
        var commodityId=$(ele).attr("name");
//       var category=$(ele).attr("id");
//       if(category=="111"){
//           showActivity(host+"/mms/html5/mall/productDetail.htm?commodityId="+commodityId,"商品详情");
//       //到店型商品
//       }else if(category=="222"){
//           showActivity(host+"/mms/html5/mall/productDetail.htm?commodityId="+commodityId,"预约配送");
//       //服务型商品
//       }else if(category=="000"){
//           showActivity(host+"/mms/html5/specialty/specialtydetails.htm?commodityId="+commodityId,"团购详情");
//       }else{
        if(token==null||token==""){
            showActivity(host+"/mms/html5/common/loading/downloadWarn.htm","下载");
        }else{
            showActivity(host+"/mms/html5/mall/productDetail.htm?commodityId="+commodityId,"商品详情");
        }
//       }
    }
    function getData(pageNum) {
    var str ="{\"body\":{\"activityId\":\""+activityId+"\",\"flag\":\"2\",\"areaSeq\":\""+areaCode+"\",\"pageNum\":"+pageNum+",\"pageSize\":8},\"header\":{\"token\":\""+token+"\",\"time_stamp\":\"" + time_stamp + "\"}}";
    $.ajax({
        type: "post",
        async: true,
        url:host+"/mms/servlet/getActivity?str="+str,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "success_jsonpCallback",
        success: function(data){
            console.log(data);
            loadCount++;
            if(clientType=="ios"){
                try {
                    contact_setTitle(data.title);
                } catch (exception) {

                }
            }else{
                setTitle(data.title);
            }
            //全部商品信息填入
            var commodityList= data.commodityList;
            var canSee=data.canSee;
            //判断活动是否有效
            if(canSee=="Yes"){
                if(commodityList.length==0&& pageNum==1){
                    $("#pullUp").hide();
                    $(".noproduct").show();
                }else {
                    for (var j = 0; j < commodityList.length; j++) {
                        if(commodityList.length<=6){
                            $("#pullUp").hide();
                        }
                            var title = commodityList[j];
                            if(title.minPrice!="9999999"){
                                title.integerT=(title.minPrice  + "").split(".")[0];
                                title.scaleT=(title.minPrice  + "").split(".")[1];
                                var productOrders= _.template($("#productOrderTemplate").html());
                                $("#productOrder").append(productOrders(title));
                            }else{
                                title.integerT=(title.currentPrice  + "").split(".")[0];
                                title.scaleT=(title.currentPrice  + "").split(".")[1];
                                var productOrders= _.template($("#productOrderTemplate").html());
                                $("#productOrder").append(productOrders(title));
                            }
                            //loadcount++;
                            //if(loadcount==1){
                            //    $("#pullUp").hide();
                            //}


                    }
                 }
            }else{
                //$(".overlay").show();
                $("#activityLose").show();
                $("#pullUp").hide();
                $(".top").hide();
                $(".shoppingnum").hide();
                $(".shoppingcart").hide();
            }
            //购物车数量信息的填入
            shoppingCart=data.shoppingCart;
            var shoppingCartinform= _.template($("#shoppingnumTemplate").html());
            if(shoppingCart>=100){
                $("#shoppingnum").empty().append("99+");
            }else{
                $("#shoppingnum").empty().append(shoppingCartinform(data));
            }
            $(".productSales:contains('-1')").css("visibility","hidden");

            //    点击购物车进入到购物车页面
         
            myScroll.refresh();
        }
    });

}

    function pullDownAction() {
        return false;
    }
    function pullUpAction() {
        //这里写ajax数据处理
        setTimeout(function() {
            pageNum++;
            getData(pageNum);
            myScroll.refresh();
        }, 200);
    }
    function loaded() {
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;
        myScroll = new iScroll('wrapper', {
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function() {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = ' ';
                } else
                if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拉';
                }
            },
            onScrollMove: function() {

                if((this.y < this.maxScrollY) && (this.pointY < 1)) {
                    this.scrollTo(0, this.maxScrollY, 300);
                    return;
                } else if(this.y > 0 && (this.pointY > window.innerHeight - 1)) {
                    this.scrollTo(0, 0, 300);
                    return;
                }else if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
                    this.minScrollY = -pullDownOffset;
                } else
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开手刷新';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载8条数据';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function() {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
                    pullDownAction(); // Execute custom function (ajax call?)
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...'
                    pullUpAction(); // Execute custom function (ajax call?)
                }
                
                /*向上滑动显示我的底部导航条/到达顶部时候隐藏*/             
                var winHeight = $("#scroller").offset().top;
//              console.log(winHeight);
                if (winHeight<-100) {
                    $('.top').show(300);
                }else{
                    $('.top').hide(300);
                }
                $('.top').on('click',function(){
                    $("#scroller").css("transform","translate(0px,0px)");
                    $(this).hide(300);
                });
            }
        });
//        setTimeout(function() {
            document.getElementById('wrapper').style.left = '0';
//        }, 1000);
    }
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(loaded, 200);
    }, false);
