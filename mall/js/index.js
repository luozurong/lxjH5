//setTitle("商城");
setRefreshOnResume();
var pageNum=1;
var pageSize="";
var loadcount=0;
var time_stamp = getTimeStamp();
//小区机构编号
var areaCode = sessionStorage.getItem("areaCode");
initializeSession();
function showView() {
    getData(pageNum);
}
$(window).load(function() {
    if( token == null || token == "" ){
        window.location.href=host+"/mms/html5/common/loading/downloadWarn.htm";
    }else{
        showView();
    }
});
function getData(pageNum) {
    var str ="{\"body\":{\"activityId\":\"\",\"flag\":\"1\",\"areaSeq\":"+areaCode+",\"pageNum\":"+pageNum+",\"pageSize\":4},\"header\":{\"token\":\""+token+"\",\"time_stamp\":\"" + time_stamp + "\"}}";
    $.ajax({
        type: "post",
        async: false,
        url:host+"/mms/servlet/getActivity?str="+str,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsonpCallback: "success_jsonpCallback",
        success: function(data) {
            var activityList= data.activityList;
            if(activityList.length==0){
                if(loadcount>=1){
                    $("#activityLose").hide();
                }else{
                    $("#activityLose").show();
                    $("#pullUp").hide();
                }
            }else{
                $("#activityLose").hide();
                for (var j = 0; j < activityList.length; j++) {
                    var titles = activityList[j];
                    var information= _.template($("#mallTemplate").html());
                    $("#mall_banner").append(information(titles));
                    loadcount++;
                    if(loadcount>=1){
                        $("#activityLose").hide();
                        $("#pullUp").hide();
                    }
                }
            }

            myScroll.refresh();
        }
    });
}
function getActivity(ele){
    var activityId=$(ele).attr("name");
    showActivity(host+"/mms/html5/mall/productOrders.htm?activityId="+activityId,"");
}
function pullDownAction() {
    return false;
}
function pullUpAction() {
    //这里写ajax数据处理
    pageNum++;
    getData(pageNum);
    myScroll.refresh();
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
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(); // Execute custom function (ajax call?)
            }
            /*向上滑动显示我的底部导航条/到达顶部时候隐藏*/
            var winHeight = $("#scroller").offset().top;
            if (winHeight<-100) {
                if(pageNum==1 && pageSize<=3){
                    $('.top').hide(300);
                }else{
                    $('.top').show(300);
                }
            }else{
                $('.top').hide(300);
            }
            $('.top').on('click',function(){
                $("#scroller").css("transform","translate(0px,0px)");
                $(this).hide(300);
            });
        }
    });
    document.getElementById('wrapper').style.left = '0';
}
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loaded, 10);
}, false);
