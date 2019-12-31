var list = [];
var unuselist = [];
var couponMap = new Map();
limitUseMap = new Map();
var oldLimitUseMap = sessionStorage.getItem("limitUseMap");
var limitUseFlag = false;
var limitUseMap = new Map();
if(!oldLimitUseMap){
	limitUseFlag = true;
}else{
	oldLimitUseMap = JSON.parse(oldLimitUseMap);
	for(var i = 0; i <oldLimitUseMap.elements.length;i++){
		limitUseMap.put(oldLimitUseMap.elements[i].key,oldLimitUseMap.elements[i].value);
	}
}
//总优惠金额
var couponPrice=0.0;
//优惠券id和详情id组合字符串
var couponStr="";
$(function(){
	var selectedUse=[];
	var disabledUse=[];
	
	setTitle("选择优惠券");
	sessionStorage.setItem("status","1");//不再自动预约请求
	 var token=sessionStorage.getItem("token");
	 var totalPrice = sessionStorage.getItem("tp");
	 var commodityInfo = sessionStorage.getItem("commodityInfo");
	 var sellerId = sessionStorage.getItem("sellerId");
	 var areaId = sessionStorage.getItem("areaId");
	 var startTime;
	 var endTime;
	 var unStartTime;
	 var unEndTime;
	 //调用访问
	 var resqData = getCouponsForOrder(token,totalPrice,commodityInfo,0,sellerId,areaId);
	 
	 list=resqData.couponList;
	 unuselist=resqData.unUseList;
	 $("#validCount").html(list.length);
	 $("#inValidCount").html(unuselist.length);
	 if (list.length==0) {
		 $(".no_order").show();
	 }
	 for (var i = 0; i < list.length; i++) {
		 couponMap.put(list[i].detailId,i);
		 if(limitUseFlag){
			 limitUseMap.put(list[i].couponId,0);
		 }
		 startTime=list[i].effectiveStartDate.replace(/\-/g,"."); 
		 endTime=list[i].effectiveEndDate.replace(/\-/g,".");
		 var ohtml="<li class='list' id='"+list[i].detailId+"'  name='"+list[i].couponId+"'>"+
		 "<div class='imgBox_2' >"+
		 "<p class='card_name' >"+list[i].name+"</p>"+
		 "<p class='price_1' name='"+list[i].denomination+"'>¥"+list[i].denomination+"</p>"+
		 "</div>"+
		 "<div class='coupons_detail'>"+
		 "<p class='name'>满"+list[i].useConditionAmount+"可用</p>"+
		 "<p class='condition'>仅限<span>"+list[i].commodityUse+"</p>"+
		 "<p class='time_limit'>有效期：<span>"+startTime+"-"+endTime+"</span></p>"+
		 "</div></li>";
		 $("#available_list").append(ohtml);
		 if(list[i].commodityUse==""){
		 	$("#available_list li:last-child").find(".condition").html("不限制");
		 }
		 if(sessionStorage.selectedUse){
			 	if(sessionStorage.selectedUse.indexOf(list[i].detailId) >= 0){
			 		$("#available_list li:last-child").addClass("checked");
			 	}
		 }
	     if(sessionStorage.disabledUse){
		 	if(sessionStorage.disabledUse.indexOf(list[i].detailId)>=0){
		 		$("#available_list li:last-child").addClass("background_list");
		 		$("#available_list li:last-child").find(".imgBox_2").addClass("background_imgBox");
		 	}
		 }

	 }
	 
	 //appAlert(unuselist.length);
	 for (var i = 0; i < unuselist.length; i++) {
	 	 unStartTime=unuselist[i].effectiveStartDate.replace(/\-/g,".");
	     unEndTime=unuselist[i].effectiveEndDate.replace(/\-/g,".");
		 var uhtml="<li class='list' name='"+unuselist[i].couponId+"'>"+
		 "<div class='imgBox_2'>"+
		 "<p class='card_name'>"+unuselist[i].name+"</p>"+
		 "<p class='price_1'>¥"+unuselist[i].denomination+"</p>"+
		 "</div>"+
		 "<div class='coupons_detail'>"+
		 "<p class='name'>满"+unuselist[i].useConditionAmount+"可用</p>"+
		 "<p class='condition'>仅限<span>"+unuselist[i].commodityUse+"</p>"+
		 "<p class='time_limit'>有效期：<span>"+unStartTime+"-"+unEndTime+"</span></p>"+
		 "</div></li>";
		 $("#disabled_list").append(uhtml);
		 if(unuselist[i].commodityUse==""){
		 	$("#disabled_list li:last-child").find(".condition").html("不限制");
		 }
	 }


	$(document).on("click","#available_list .list",function(){
		//session记住每次点击优惠券的id，下次进入页面默认选中该优惠券
		if($(this).hasClass("background_list")){
			/*alert("已禁用");*/
		}else{
			var currentdetailId = $(this).attr("id");
			var currentIndex = couponMap.get(currentdetailId);
			var currentCouponId = list[currentIndex].couponId;
			if(!$(this).hasClass("checked")){
				//$(this).toggleClass("checked");
				$(this).addClass("checked");
				//获取当前优惠券已选择的数量
				selectedCount = parseInt(limitUseMap.get(currentCouponId))+1;
				limitUseMap.put(currentCouponId,selectedCount);
				$("#available_list .list").each(function(){
					if(currentdetailId != $(this).attr("id")){

						var index = couponMap.get($(this).attr("id"));
						if(list[currentIndex].couponId == list[index].couponId){
							 /*appAlert("selectedCount",selectedCount);
							 appAlert("list[index].limitUseCount",list[index].limitUseCount);*/
							if(selectedCount >=list[index].limitUseCount)
							{
								if(!$(this).hasClass("checked")){
									$(this).addClass("background_list");
									$(this).find(".imgBox_2").addClass("background_imgBox");
								}
							}
						}else{
							if(list[currentIndex].commodityUseId != "" ){
								if(list[index].commodityUseId == ""){
									//$(this).addClass("background_list");
									//$(this).find(".imgBox_2").addClass("background_imgBox");
									disabledSelect($(this));
								}else if(hasSameElement(list[currentIndex].commodityUseId.split(","),list[index].commodityUseId.split(","))){
									//$(this).addClass("background_list");
									//$(this).find(".imgBox_2").addClass("background_imgBox");
									disabledSelect($(this));
								}
							}else if(list[currentIndex].commodityUseId == "" ){
								//$(this).addClass("background_list");
								//$(this).find(".imgBox_2").addClass("background_imgBox");
								disabledSelect($(this));
							}
						}

					}
				})
				//遍历出选中的优惠券
				$(".list").each(function(){
					if ($(this).hasClass("checked")) {
						var couponDetailId=$(this).attr("id");
						var couponId=$(this).attr("name");
						couponStr+=couponDetailId+"|"+couponId+",";
						var a=$(this).find("p :eq(1)").attr("name");
						couponPrice+=(a*100)/100;
					}
				});
				sessionStorage.setItem("couponStr",couponStr.substring(0,couponStr.length-1));
				sessionStorage.setItem("couponPrice",couponPrice);
				if (couponPrice>0) {
					sessionStorage.setItem("couponStatus","1");
				}else{
					sessionStorage.setItem("couponStatus","0");
				}
				couponStr="";
				couponPrice=0.0;
			}else{
				//反选操作
				$(this).removeClass("checked");
				//获取当前优惠券已选择的数量并保存
				selectedCount = parseInt(limitUseMap.get(currentCouponId))-1;
				limitUseMap.put(currentCouponId,selectedCount);

				var disabledCoupons = $("#available_list .background_list");
				var checkedCoupons = $("#available_list .checked");
				for(var i = 0; i < disabledCoupons.length; i++){
					var repeatFlag = false;
					var disabledCouponObj = $(disabledCoupons[i]);
					var disabledCouponDetailId = disabledCouponObj.attr("id");
					var disabledIndex = couponMap.get(disabledCouponDetailId);
					var disabledCoupon = list[disabledIndex];
					for(var j = 0; j < checkedCoupons.length; j++){
						var checkedCouponObj = $(checkedCoupons[j]);
						var checkedCouponDetailId = checkedCouponObj.attr("id");
						var checkedIndex = couponMap.get(checkedCouponDetailId);
						var checkedCoupon = list[checkedIndex];

						if(checkedCoupon.commodityUseId == "" && checkedCoupon.couponId != disabledCoupon.couponId){
							repeatFlag = true;
						}else if(checkedCoupon.commodityUseId == "" && checkedCoupon.couponId == disabledCoupon.couponId){
							if(disabledCoupon.limitUseCount <= limitUseMap.get(disabledCoupon.couponId)){
								repeatFlag = true;
							}
						}

						if(checkedCoupon.commodityUseId != "" && disabledCoupon.commodityUseId == ""){
							repeatFlag = true;
						}

						if(checkedCoupon.commodityUseId != "" && disabledCoupon.commodityUseId != "" && checkedCoupon.couponId != disabledCoupon.couponId){
							if(hasSameElement(checkedCoupon.commodityUseId.split(","),disabledCoupon.commodityUseId)){
								repeatFlag = true;
							}
						}

						if(checkedCoupon.commodityUseId != "" && disabledCoupon.commodityUseId != "" && checkedCoupon.couponId == disabledCoupon.couponId){
							if(disabledCoupon.limitUseCount <= limitUseMap.get(disabledCoupon.couponId)){
								repeatFlag = true;
							}
						}
						if(repeatFlag){
							break;
						}

					}

					if(!repeatFlag){
						enabledSelect(disabledCouponObj);
					}
				}
				//遍历出选中的优惠券
				$(".list").each(function(){
					if ($(this).hasClass("checked")) {
						var couponDetailId=$(this).attr("id");
						var couponId=$(this).attr("name");
						couponStr+=couponDetailId+"|"+couponId+",";
						var a=$(this).find("p :eq(1)").attr("name");
						couponPrice+=(a*100)/100;
					}
				});
				sessionStorage.setItem("couponStr",couponStr.substring(0,couponStr.length-1));
				sessionStorage.setItem("couponPrice",couponPrice);
				if (couponPrice>0) {
					sessionStorage.setItem("couponStatus","1");
				}else{
					sessionStorage.setItem("couponStatus","0");
				}
				couponStr="";
				couponPrice=0.0;
			}
		}
		
		selectedUse=[];
		$.each($("#available_list .checked"),function(index,value){
			selectedUse.push($(this).attr("id"));
			
		})
		sessionStorage.setItem("selectedUse",selectedUse.toString());
		
		
		disabledUse=[];
		$.each($("#available_list .background_list"),function(index,value){
			disabledUse.push($(this).attr("id"));
			
		})
		sessionStorage.setItem("disabledUse",disabledUse.toString());
		sessionStorage.setItem("limitUseMap",JSON.stringify(limitUseMap));
	})

	$(".available").click(function(){
		$("#disabled_list").css("display","none");
		$(".disabled .arrow").css("display","none");
		$("#available_list").css("display","block");
		$(".available .arrow").css("display","block");
		$(".no_order").hide();
		if(list.length==0){
			$(".no_order").show();
		}
	});
	$(".disabled").click(function(){
		$("#available_list").css("display","none");
		$(".available .arrow").css("display","none");
		$("#disabled_list").css("display","block");
		$(".disabled .arrow").css("display","block");
		$(".no_order").hide();
		if(unuselist.length==0){
			$(".no_order").show();
		}
	});
	
	
})




function disabledSelect(currentObj){
	currentObj.removeClass("checked");
	currentObj.addClass("background_list");
	currentObj.find(".imgBox_2").addClass("background_imgBox");
}

function enabledSelect(currentObj){
	currentObj.removeClass("checked");
	currentObj.removeClass("background_list");
	currentObj.find(".imgBox_2").removeClass("background_imgBox");
}

function hasSameElement(source,target){
	var flag = false;

	for(var i = 0; i < source.length;i++){
		if(target.indexOf(source[i]) >= 0){
			flag = true;
			break;
		}
	}
	return flag;
}




