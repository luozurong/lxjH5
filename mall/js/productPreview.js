    setTitle("商品详情");
    setRefreshOnResume();//刷新页面(防止返回之后，没有重新请求)
    clearHistory(); // 清除历史缓存记录 缓存清除后，后退会直接关闭当前原生界面
    var commoditySkuAttrIds = "";   //商品SKU属性的ID
    var commodityNumbers=1;
    var productSkuData ="";//商品的SKU数据
    var commodityDetails ="";   //用户选择的商品规格信息
    var pageNum=1;
    var sourceSkuCategoriesId ="";  //商品默认的SKU分类
    var selectSkuCategoriesId ="";  //用户已经选择了的SKU分类id
    var stockQuantity=0;          //当前规格的商品库存数量
    var flag=true;   //是否选择了商品SKU
    var userShoppingInfo = "";    //用户购物车里面的商品信息
    var skuList="";
    var price = 0;    //用户添加到收藏夹的时候，商品的价格
    var hasChonise="No";   //判断用户是否加入过该商品
    var skuAttrIdsRecord="";  //记录用户选择商品SKU
    
    //解析商品id
    var commodityId=GetURLParameter("commodityId");

//    //设置时间戳
    var time_stamp =getTimeStamp();

    function showView() {
            getData();
    }
    $(window).load(function() {
        showView();
    });
    //toast弹出框
    function toast(message){
        layer.msg(message);
    };
    $(document).ready(function(){
        $(".activityLose div").on("click",function(){
            gobackIndex();
        });

        //点击加入购物车对应的商品规则的选择弹出
        $(".addShoppingCart").on("click",function(){
            if(productSkuData.length==0){
            	var push="Yes";
            	if(hasChonise=="Yes"){
                	stockQuantity=sessionStorage.getItem("stockQuantity");
                	var selectNumbers =parseInt(commodityNumbers);
        			if(selectNumbers>stockQuantity){
        				push="No";
                		var message="当前商品库存数不足，请选择其它商品";
                        toast(message);
                	}
        		}else{
        			for(var i=0;i<userShoppingInfo.length;i++){
                		if(userShoppingInfo[i].commodityId==commodityId){
                			var selectNumbers = parseInt(userShoppingInfo[i].count)+parseInt(commodityNumbers);
                			if(selectNumbers>stockQuantity){
                				push="No";
                        		var message="当前商品库存数不足，请选择其它商品";
                                toast(message);
                        	}
                		}
                	}
        		}
            	if(push=="Yes"){
               		 pushShoppingcart();
                    getshoppingNum();

            	}
            }
            else{
                $(".productParam").css("display","block");
                $("#overlay").show();
                $("body").css("overflow","hidden");
            }
        });
        $(".closeSku").on("click",function(){
            $(".productParam").css("display","none");
            $("#overlay").hide();
            $("body").css("overflow","initial");
        });
        $("#overlay").on("click",function(){
            $(".productParam").css("display","none");
            $("#overlay").hide();
            $("body").css("overflow","initial");
        });


        //点击加入购物车
        $("#selected").on("click",function(){
           // pushShoppingcart();
           // getshoppingNum();
        });
        //点击购物车跳转到购物车页面
        $(".shoppingcart").on("click",function(){
            showActivitySpecial(host+"/mms/html5/mall/shoppingcart.htm","购物车",1,null);
        });

        //设置商品的数量
        $('.productvalue').bind('input propertychange', function() {
                commodityNumbers = $(".productvalue").val();
//                if(userShoppingInfo.length==0){  //当前用户购物车没有商品  直接判断购买的数量与库存
//                	appAlert("检测的时候库存数目：",stockQuantity);
                	if(parseInt(commodityNumbers) > stockQuantity){
                        var message="当前选择的商品数量超过库存数！";
                        toast(message);
                        //将库存数量等同进去
                        if(stockQuantity==0){
                        	  $(".productvalue").val(1);
                        	  commodityNumbers = 1;
                        }else{
                        	 $(".productvalue").val(stockQuantity);
                             commodityNumbers = stockQuantity;
                        }
                        $(".btn_add").addClass("disabled");   //将添加数量的按钮置灰色
                        $(".btn_reduce").removeClass("disabled");
                        return ;
                    }else if(commodityNumbers==0||commodityNumbers==1){
                    	$(".btn_add").removeClass("disabled");   
                        $(".btn_reduce").addClass("disabled");
                    }else if(commodityNumbers==stockQuantity){
                    	$(".btn_add").addClass("disabled");   
                        $(".btn_reduce").removeClass("disabled");
                    }else{
                    	$(".btn_add").removeClass("disabled");   
                        $(".btn_reduce").removeClass("disabled");
                    }
//                }else{
////                	appAlert("检测的时候库存数目222：",stockQuantity);
//                        appAlert("stockQuantity",stockQuantity);
//                        appAlert("commodityNumbers",commodityNumbers);
//                            if(parseInt(commodityNumbers)>stockQuantity){
//                                if(stockQuantity>0){
//                                	 var message="当前选择的商品数量超过库存数！";
//                                     toast(message);
//                                    $(".productvalue").val(stockQuantity);
//                                    commodityNumbers = stockQuantity;
//                                    $(".btn_add").addClass("disabled");
//                                    $(".btn_reduce").removeClass("disabled");
//                                }
//                                return ;
//                            }else if(commodityNumbers=0||commodityNumbers==1){
//                            	$(".btn_add").removeClass("disabled"); 
//                                $(".btn_reduce").addClass("disabled");
//                            }else if(commodityNumbers==stockQuantity){
//                            	appAlert("相等：","0.0");
//                            	$(".btn_add").addClass("disabled");   
//                                $(".btn_reduce").removeClass("disabled");
//                            }else{
//                            	appAlert("其它：","-。-");
//                            	$(".btn_add").removeClass("disabled");   
//                                $(".btn_reduce").removeClass("disabled");
//                            }
////                        }
////                    }
//                }
//        	}
        });

    });
    //购物车数量信息的填入
    function getshoppingNum() {
        var str ="{\"body\":{\"areaOrgSeq\":\""+areaCode+"\",\"commodityId\":\""+commodityId+"\"},\"header\":{\"token\":\""+token+"\",\"time_stamp\":\"" + time_stamp + "\"}}";
        $.ajax({
            type: "get",
            async: false,
            url:host+"/mms/servlet/getCommodityDetail?str="+str,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            jsonpCallback: "success_jsonpCallback",
            success: function(data) {
                var shoppingCart=data.shoppingCart+1;
                var shoppingCartinform= _.template($("#shoppingCartTemplate").html());
                if(shoppingCart>100){
                    $("#shoppingCart").empty().append("99+");
                }else{
                    $("#shoppingCart").empty().append(shoppingCartinform(data));
                }
            }
            });
    }
    function getData() {
        var str ="{\"body\":{\"areaOrgSeq\":\"\",\"commodityId\":\""+commodityId+"\"},\"header\":{\"token\":\"\",\"time_stamp\":\"" + time_stamp + "\"}}";
        $.ajax({
            type: "get",
            async: false,
            url:host+"/mms/servlet/getCommodityPreviewDetail?type=1&str="+str,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            jsonpCallback: "success_jsonpCallback",
            success: function(data) {
            	userShoppingInfo = data.shoppingCartInfo;
            	//sessionStorage.setItem("sellerId",data.sellerId);
            	skuList = data.skuList;
            	if(data.commoditySku.length==0){
            		stockQuantity  = data.totalStockQuantity;
            	}
                var photo=data.product[0].photo;
                //遍历product里面的photo数组
                for(var i=0;i<photo.length;i++){
                        var imgUrl=photo[i];
                        var product= _.template($("#productTemplate").html());
                        $("#product").append(product(imgUrl));    //推进图片数组
                }
                if(photo.length>1){
                    //对应的左边翻页看banner事件
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true ,
                        autoplay : 2000,
                        autoplayDisableOnInteraction : false
                    });
                }


                //原价如果为0的时候就不显示
                //var originalPrice= parseFloat(productName.originalPrice);
                //$(".originalPrice:contains('0.00')").hide();


                var productName=data.product[0];
                var maxPrice= parseFloat(productName.maxPrice);

                if(maxPrice==0){
                	//商品名称信息填入
                    var productInformation= _.template($("#productInformationTemplate").html());
                    $("#productInformation").append(productInformation(productName));
                    $(".currentPrice").show();
                    $(".minPrice").hide();
                    $("#line_Box").hide();
                    $(".originalPrice").hide();
                    price = productName.currentPrice;
                }else{
                    //商品名称信息填入
                    var productInformation= _.template($("#productInformationTemplate").html());
                    $("#productInformation").append(productInformation(productName));
                    $(".currentPrice").hide();
                    price = productName.minPrice;
                }

                var Bigcarriage= _.template($("#BigcarriageTemplate").html());
                $("#Bigcarriage").append(Bigcarriage(data));
                var carriage=data.carriage;
                var promotionInfo=data.promotionInfo;
                if(carriage==0){
                    $("#carriage").hide();
                }
                if(promotionInfo==0){
                    $("#promotionInfo").hide();
                }


                //服务保障信息填入
                var sevice=data.product[0];
                var safeguard= _.template($("#safeguardTemplate").html());
                $("#safeguard").append(safeguard(sevice));
                if(sevice.sevenDay=="0"){
                    $(".sevenDay").hide()
                }
                if(sevice.ppsq=="0"){
                    $(".ppsq").hide()
                }
                if(sevice.zpbz=="0"){
                    $(".zpbz").hide()
                }

                 //在商品参数页里推入对应的商品参数信息
                var productCommodity=data.productCommodity[0];
                if(data.hasParams=="No"&& data.hasParam2=="No"){
                   // $("#NoproductCommodity").show();
                }else{
                    var productCommodityinform= _.template($("#productCommodityTemplate").html());
                    $("#productCommodity").append(productCommodityinform(productCommodity));
                        var customParams = data.productCommodity[1].customParamsList; //自定义参数
                        if(customParams.length>0){
                            var productcustomParams = _.template($("#customParamsTemplate").html());
                            for(var key=0;key<customParams.length;key++){
                                $("#productCommodity").append(productcustomParams(customParams[key]));
                            }
                        }
                }


                //在商品详情页里推入对应的商品详情页信息
                var productDetail=data.productDetail;
                if(productDetail=="000x000"){
                    $("#NoproductDetail").show();
                    $("#NoproductCommodity").hide();
                }else{
                    var productDetailinform= _.template($("#productDetailTemplate").html());
                    $("#productDetail").append(productDetailinform(data));

                }
                //对应的商品详情和商品参数按钮对应的信息的显示和隐藏
                $(".cutInformation a").on("click",function(){
                    $(this).addClass("current");
                    $(this).siblings().removeClass("current");
                    if($(this).attr("id")=="detailBox") {
                        if (productDetail == "000x000") {
                            $("#NoproductDetail").show();
                            $("#NoproductCommodity").hide();
                            $("#productCommodity").css("display","none");

                        } else{
                            $("#productDetail").css("display","block");
                            $("#productCommodity").css("display","none");
                            $("#NoproductDetail").hide();
                            $("#NoproductCommodity").hide();
                        }
                    }else{
                        if(data.hasParams=="No"&& data.hasParam2=="No"){
                            $("#NoproductCommodity").show();
                            $("#NoproductDetail").hide();
                            $("#productDetail").css("display","none");
                        }else{
                            $("#productDetail").css("display","none");
                            $("#productCommodity").css("display","block");
                            $("#NoproductDetail").hide();
                            $("#NoproductCommodity").hide();
                        }

                    }
                });
                //当商品没有折扣信息时候隐藏
                if(data.product[0].rebate===""){
                    $(".price_3").css("display","none");
                }
                //点击商品参数对应一些属性隐藏和显示
                var commodity=data.productCommodity[0];
                if(commodity.productNote=="0"){
                    $("#productNote").css("display","none")
                }else{
                    $("#productNote").css("display","flex")
                }
                if(commodity.specification=="0"){
                    $("#specification").css("display","none")
                }else{
                    $("#specification").css("display","flex")
                }
                if(commodity.productSize=="0") {
                    $("#productSize").css("display","none")
                }else{
                    $("#productSize").css("display","flex")
                }
                if(commodity.productColor=="0"){
                    $("#productColor").css("display","none")
                }else{
                    $("#productColor").css("display","flex")
                }
                if(commodity.productWeight=="0") {
                    $("#productWeight").css("display","none")
                }else{
                    $("#productWeight").css("display","flex")
                }
                if(commodity.productPlace=="0") {
                    $("#productPlace").css("display","none")
                }else{
                    $("#productPlace").css("display","flex")
                }
                //    点击收藏图标时候商品收藏属性的变化
                if(data.favorite=="0"){
                    $("#favorite>a>img").attr("src","images/ic_no-collection-@3x.png");
                }else{
                    $("#favorite>a>img").attr("src","images/favorites.png");
                }
                //初始化商品规格信息
                productSkuData=data.commoditySku;
                for(var j=0;j<productSkuData.length;j++){  
//                	  sourceSkuCategoriesId=sourceSkuCategoriesId+","+productSkuData[j].skuId;
                	  var skuName= _.template($("#productCommoditySkuTemplate").html());
                      $("#productCommoditySku").append(skuName(productSkuData[j]));
                      var skuParams=productSkuData[j].skuValues;
                      var skuID=productSkuData[j].skuName;
                      for(var z=0;z<skuParams.length;z++){
                    	  $("#"+skuID+"").append("<li id="+skuParams[z].paramId+">"+skuParams[z].paramName+"</li>");
                      }
                }
                //点击选择当前商品规则型号
                $(".colorClassify>li").on("click",function(){
                    if($(this).hasClass("current")){
                        $(this).removeClass("current");
                    }else{
                        $(this).addClass("current");
                    }
                    $(this).siblings("li").removeClass("current");
                    $(".productvalue").val()+1;
                    commoditySkuAttrIds = new Array();
                    commodityDetails  = "";
                    $("#productCommoditySku li").each(function(){
                    	if($(this).attr("class")=="current"){
                    		//第一次选择将此规格的商品加入购物车
                			commoditySkuAttrIds=commoditySkuAttrIds+","+$(this).attr("id");
                   		    var parentNode=$(this).parent();      
                            var preParentNode=parentNode.prev(); //获取到规格的div 
                            if(commodityDetails==""){
                           	 commodityDetails=""+preParentNode.text()+":"+$(this).html();
                            }else{
                           	 commodityDetails=""+preParentNode.text()+":"+$(this).html()+""+"; "+commodityDetails;
                            }
                            commoditySkuAttrIds_box=commoditySkuAttrIds.slice(1,commoditySkuAttrIds.length);  //去掉字符串前面id的逗号跟空格
                            skuAttrIdsRecord = sessionStorage.getItem("skuAttrIdsRecord");
//                            appAlert("skuAttrIdsRecord,commoditySkuAttrIds_box",skuAttrIdsRecord+"-------"+commoditySkuAttrIds_box);
                            if(skuAttrIdsRecord==commoditySkuAttrIds_box&&hasChonise=="Yes"){
                            	stockQuantity=sessionStorage.getItem("stockQuantity");
                    		}else{  
                               for(var i=0;i<skuList.length;i++){   //设置对应规格的商品库存数
                                   var reoucesIds=skuList[i].skuId;
                                   if(commoditySkuAttrIds_box==reoucesIds){   //判断商品规格的id是否相同，即是判断选择的规格
//                                       stockQuantity = skuList[i].stockQuantity;
                                       if(userShoppingInfo.length==0){
                                   		stockQuantity = skuList[i].stockQuantity;
                                   	}else{
                                   		var isExit= false;  //标志购物车是否存在这个商品
                                   		for(var j=0;j<userShoppingInfo.length;j++){
                                      		 if(userShoppingInfo[j].skuId==commoditySkuAttrIds_box){
                                      			stockQuantity =  parseInt(skuList[i].stockQuantity)-parseInt(userShoppingInfo[j].count);
                                      			isExit = true;
                                      		 }
                                      		 if(isExit){
                                      			 break;
                                      		 }
                                      	 }
                                   		if(!isExit){
                                   			stockQuantity = skuList[i].stockQuantity;
                                   		}
                                   	} 
                                   }
                               }
                    		}
                            $(".productvalue").val(1);
                            commodityNumbers = 1;
                            if(stockQuantity==1){    //当前规格的商品库存恰好为1
                            	$(".btn_add").addClass("disabled");
                            }else{
                            	$(".btn_add").removeClass("disabled");
                            }
                            $(".btn_reduce").addClass("disabled");
                    	}
                    });

                });
                //购物车数量信息的填入
                var shoppingCart=data.shoppingCart+1;
                var shoppingCartinform= _.template($("#shoppingCartTemplate").html());
                if(shoppingCart>100){
                    $("#shoppingCart").empty().append("99+");
                }else{
                    $("#shoppingCart").empty().append(shoppingCartinform(data));
                }
                //商品数量加减符号的控制
                var btn_reduce=$(".btn_reduce");
                var btn_add=$(".btn_add");
                btn_add.on("click",function(){
                	var thisvalue=$(this).parent().find("input");
                    if(commoditySkuAttrIds.length!=0){
//                    	commoditySkuAttrIds_box=commoditySkuAttrIds.slice(1,commoditySkuAttrIds.length);  //去掉字符串前面id的逗号跟空格
//                        for(var i=0;i<skuList.length;i++){
//                             var reoucesIds=skuList[i].skuId;
//                            if(commoditySkuAttrIds_box==reoucesIds){   //判断商品规格的id是否相同，即是判断选择的规格
//                            	if(userShoppingInfo.length==0){
//                            		stockQuantity = skuList[i].stockQuantity;
//                            	}else{
//                            		for(var j=0;j<userShoppingInfo.length;j++){
//                               		 if(userShoppingInfo[j].skuId==commoditySkuAttrIds_box){
//                               			stockQuantity =  parseInt(skuList[i].stockQuantity)-parseInt(userShoppingInfo[j].count);
//                               		 }
//                               	 }
//                            	} 
//                                
//                            }
//                        }
                    	
                    	var tagBox  =  $('ul[name="skuBox"]');
                        var skuIdString = "";
                        var message="No";
                        for(var i=0;i<tagBox.length;i++){
                            var items=$(tagBox[i]).find('li');
                            for(var j=0;j<items.length;j++){
                                if($(items[j]).hasClass("current")){
                                    flag  = false;
                                }
                            }
                            if(flag){
                                //提示用户选出商品对应的规则型号
                                message=message+tagBox[i].id+"&nbsp";
                            }else{
                                flag = true;
                            }
                        }
                        if(message=="No"){
                            flag = false;
                        }
                        if(productSkuData.length>0 && flag){      //判断用户是否将商品SKU选择完整
                        	thisvalue.val((+thisvalue.val())+1);
                        	$(this).parent().find(".btn_reduce").removeClass("disabled");
                            return;
                        }else{
//                        	console.log("11");
                        	 if($(this).hasClass("disabled")){  //判断+是否为不可点击状态
                                 return;
                             }
//                        	 console.log("2"+"库存数量："+stockQuantity);
                             thisvalue.val((+thisvalue.val())+1);
                             if(thisvalue.val()>=stockQuantity){
                             	    if(stockQuantity<0){
                             	    	 $(this).addClass("disabled");
                                          thisvalue.val(1);
                             	    }else{
                             	    	 $(this).addClass("disabled");
                             	    	 if(stockQuantity==0){
                             	    		thisvalue.val(1);
                             	    	 }else{
                             	    		thisvalue.val(stockQuantity);
                             	    	 }
                                          
                             	    }
                             }
                             if((+(thisvalue.val()))>=1){
                                 $(this).parent().find(".btn_reduce").removeClass("disabled");
                             }
                             commodityNumbers = thisvalue.val();   //商品的数量
                        }
                    }else{
                    	thisvalue.val((+thisvalue.val())+1);
                        if((+(thisvalue.val()))>=1){
                            $(this).parent().find(".btn_reduce").removeClass("disabled");
                        }
                           commodityNumbers = thisvalue.val();   //商品的数量
                    }
                });
                    btn_reduce.on("click",function(){
                        if($(this).hasClass("disabled")){
                            return;
                        }
                        var thisvalue=$(this).parent().find("input");
                        thisvalue.val((+thisvalue.val())-1);
                        commodityNumbers = thisvalue.val();   //商品的数量
                        if((+(thisvalue.val()))<=1){
                            $(this).addClass("disabled");
                        }
                        if((+(thisvalue.val()))<stockQuantity){
                            $(this).parent().find(".btn_add").removeClass("disabled");
                        }
                    });
            }
        });
    }
    //键盘弹出定位的解决
    function newviewopen(x) {
        setTimeout(function() {
            var viewBottom = window.innerHeight;
            var weizhi;
            //输出viewBottom
            var element = document.getElementById(x);
            var getElementPosition = function(elem) {
                var defaultRect = {
                    top: 0,
                    left: 0
                };
                weizhi = elem.getBoundingClientRect();
            }
            getElementPosition(element);
            var elementBottom = weizhi.bottom;
            //输出
            if (viewBottom >= elementBottom) {
                //input可视范围内
            } else {
                var vuleheight = elementBottom - viewBottom + 100;
                $(window).scrollTop(vuleheight);
                window.scrollTo(0, vuleheight);
            }
        }, 500);
        $(".productParam").css({
            'position':'fixed',
            'bottom': '0'
        });
        $("#productCommoditySku").css("overflow","hidden");
        $("body").css("overflow","hidden");
    }
    //键盘收起
    var $windowHeight = $(window).height();
    $(window).resize(function() {
        if ($windowHeight <= $(window).height()) {
            $('.productParam').css({
                'position': 'fixed',
                'bottom': '0'
            });
            $("#productCommoditySku").css("overflow-y","initial");
        }

    });

    //添加商品到购物车
    function pushShoppingcart() {
        var tagBox  =  $('ul[name="skuBox"]');
        var message="请选择";
        for(var i=0;i<tagBox.length;i++){
            var items=$(tagBox[i]).find('li');
            for(var j=0;j<items.length;j++){
                if($(items[j]).hasClass("current")){
                    flag  = false;
                }
            }
            if(flag){
                //提示用户选出商品对应的规则型号
                message=message+tagBox[i].id+"&nbsp";
            }else{
                flag = true;
            }
        }
        if(message=="请选择"){
            flag = false;
        }
        if(productSkuData.length>0 && flag){
            //请选择商品规则型号提示语
            var messageImg="<img src='images/ic_a@3x.png' style='width:0.28rem;'/>";
            var message=messageImg+'<br>'+message;
            toast(message);
            return;
        }else if(productSkuData.length==0||flag){
            commoditySkuAttrIds="\"\"";
            commodityDetails = "";
        }else{    //存在商品SKU规格信息。并且
            skuIdString = commoditySkuAttrIds.slice(1,commoditySkuAttrIds.length);  //去掉字符串前面id的逗号跟空格;
//            for(var i=0;i<skuList.length;i++){
//                var reoucesIds=skuList[i].skuId;
//               if(reoucesIds==skuIdString){   //判断商品规格的id是否相同，即是判断选择的规格
//            	   stockQuantity = skuList[i].stockQuantity;
//               }
//           }
        	if(commoditySkuAttrIds.indexOf("[")==-1){
        		  commoditySkuAttrIds = commoditySkuAttrIds.split(",");
                  var boxSku=new Array();
                  for(var key=0;key<commoditySkuAttrIds.length;key++){
                      if(commoditySkuAttrIds[key]!=""){
                          if(key>=1){
                              boxSku[key-1] = commoditySkuAttrIds[key];
                          }
                      }
                  }
                  sessionStorage.setItem("skuAttrIdsRecord",boxSku);//将当前用户加入购物车的商品SKU记录下来
                  commoditySkuAttrIds = JSON.stringify(boxSku);
        	}
            if(commodityNumbers==0||commodityNumbers==null){
                var message="请添加商品数量";
                toast(message);
                return ;
            }
            
            	 if(parseInt(commodityNumbers) > stockQuantity){
                     var message="当前商品库存数不足，请选择其它商品";
                     toast(message);
                     //将库存数量等同进去
//                     console.log("最后的库存量："+stockQuantity);
                     if(stockQuantity<=0){
                    	 $(".productvalue").val(1);
          			      commodityNumbers = 1;
          			    $(".btn_add").addClass("disabled");   //将添加数量的按钮置灰色
          			    $(".btn_reduce").addClass("disabled");   //将添加数量的按钮置灰色
                     }else{
            		 $(".productvalue").val(stockQuantity);
        			   commodityNumbers = stockQuantity;
        			   $(".btn_add").addClass("disabled");   //将添加数量的按钮置灰色
                     }
                     return ;
            	 }
        }
      //将用户购买的商品数量减去库存，剩下的能够购买的商品库存记录下来
        sessionStorage.setItem("stockQuantity",parseInt(stockQuantity)-(commodityNumbers));  
        commodityDetails=urlEncode(commodityDetails);

        var params={};
		params.header={
			 token: token,
			 time_stamp:time_stamp
		};
		
		params.body={
			 commodityId: commodityId,
			 areaOrgSeq:areaCode,
			 count:commodityNumbers,
			 commoditySkuAttrIds:commoditySkuAttrIds,
			 commodityDetails:commodityDetails
		};
		var param=JSON.stringify(params);
        
        $.ajax({
            type: "post",
            async: false,
            url:host+"/mms/servlet/addShoppingcart?str="+ param,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            jsonpCallback: "success_jsonpCallback",
            success: function(data) {
                $(".productParam").css("display","none");
                $("#overlay").hide();
                $("body").css("overflow","auto");
                if(data.result=="0"){
                   $(".productvalue").val(1);
                    commoditySkuAttrIds="";
                    commodityNumbers =1;
                    flag=true;
                    commodityDetails="";
                    hasChonise="Yes";
                    $(".colorClassify>li").siblings("li").removeClass("current");
                    var message="加入购物车成功";
                    toast(message);
                   
                }
                // else if(data.result=="17"){
                //    $(".activityLose").show();
                //}
                 else{
                    var message="加入购物车失败";
                    toast(message);
                }
            },
        });
    }
    function gobackIndex(){
        if (clientType=="android") {
            contact.goBack();
        }else{//ios
            contact_closeActivity();
        }
    }
    
    function urlEncode(url){
    	return escape(url).replace(/\+/g,'%2B');
    }
