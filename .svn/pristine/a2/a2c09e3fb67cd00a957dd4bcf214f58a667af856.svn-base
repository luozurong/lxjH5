var onscrollStatus = false;
var clientType = GetURLParameter("clientType");
var token = GetURLParameter("token");
var organizationSeq = GetURLParameter("organizationSeq");
var categoryId=GetURLParameter("categoryId");
setTitle("商品列表");

/*organizationSeq  = '4400100001';
token = "152566160707d81b42337bc547dcb9de";
host = "https://tt.hori-gz.com:8443";
categoryId="152265457613e7899bbe868e44008fc2";*/
//clientType="android";
var timestamp = new Date().getTime();
var isVisitor = false;
if(token && token.indexOf("_") == 0) {
    isVisitor = true;
}



var vue = new Vue({
    el: '#marketing',
    data: {
        doneFlag:true,
        setTime: 0,
        noDataText4:'抱歉，没有更多了',
        commodityList:[],
        commodityListNoneState:false,
        apiurl: host+"/mms/servlet/getCategoryCommodity",
        pageNum: 0
    },
    mounted: function(){
        this.infinite(function(){});
    },
    filters:{
        pricePre: function(value){
            var val = parseInt(value);
            return val;
        },
        priceNext: function(value){
            var val = String(parseFloat(value).toFixed(2)).split('.')[1];
            return val;
        }
    },
    methods: {
        infinite:function(done){
            var that = this;
            if(!this.doneFlag){
               setTimeout(function() {
					done(true);
				}, 10)
                return;
            }
            setTimeout(function(){
                vue.getDatejson(function(){
                    done();
                })
            },that.setTime);
        },
        getDatejson: function(doneFunc) {
            this.pageNum ++;
            var params = {};
            var timestamp = new Date().getTime();
            params.header = {
                token: token,
                time_stamp: timestamp
            };
            params.body = {
                organizationSeq: organizationSeq,
                categoryId: categoryId,
                pageNum: this.pageNum,
                pageSize: 10
            };
            vue.doneFlag = false;
            var paramData = JSON.stringify(params);
            this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                //jsonpCallback: "success_jsonpCallback"
            }).then(function (response) {
            	vue.doneFlag = true;
                // ��?���\�^?
                if (response.body.result == 0) {
                    for(var i=0; i< response.body.commodityList.length;i++){
                        this.commodityList.push(response.body.commodityList[i]);
                    }
                    console.log(response.body.commodityList);
                    if(response.body.commodityList.length < 10){
                        this.doneFlag = false;
                    }
                }else{
                	vue.doneFlag = false;
                }
                if (!vue.commodityListNoneState&&vue.commodityList.length==0) {             	
                	setTimeout(function(){
                		if (vue.commodityList.length==0) {
                			vue.commodityListNoneState=true;
                		}
                	},300)
                }
                doneFunc();
                vue.setTime = 500;
                
            }, function (response2) {
                //��???�^?
                onscrollStatus = true;
                console.log(JSON.stringify(response2.body));
            });
        },
        //��?��?����
        turnTo: function(id) {
        	console.log(host + "/mms/html5/supermarket/ProductDetail.htm?commodityId=" + id);
            showActivity(host + "/mms/html5/supermarket/ProductDetail.htm?commodityId=" + id, "商品详情");
        }

    }
});


vue.$watch('commodityListNoneState', function(newValue, oldValue) {
	document.getElementsByClassName("_v-container")[0].style.display='none';
});




//?��URL��?
function GetURLParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}

function refreshData() {
    setTimeout(function() {
        //   $("#nomore").hide();
        //vue.getproductListDate(vue.presentTotal, 1, vue.presentClassifyid, true);
    }, 0);
    return 1;
}
