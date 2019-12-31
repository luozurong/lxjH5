var onscrollStatus = false;
var pageSize = 10;
var pageNum = 1;
var clientType = GetURLParameter("clientType");
var orderStatus = GetURLParameter("orderStatus");
sessionStorage.setItem("host", host);
var token = GetURLParameter("token");

var token = "1521440720450af9b437f0f64879a6a3";
var host = "https://tt.hori-gz.com:8443";
//orderStatus="9";
var timestamp = new Date().getTime();
 if(orderStatus == 4) {
    setTitle("∞‚¶Z??");
} else {
    orderStatus = -1;
}
var backHomePage = GetURLParameter("backHomePage"); //¶^∞h®Ï•Õ¨°≠∫ãÔ
if(backHomePage == "1") {
    backToHomePage();
}
setRefreshOnResume(); //®Í∑s¨…≠±
var params = {};
params.header = {
    token: token,
    time_stamp: timestamp
};
params.body = {
    orderStatus: orderStatus,
    orderDetailNo: "",
    pageSize: pageSize,
    pageNum: pageNum
};
var vue = new Vue({
    el: '#app',
    data: {
        message: '999999',
        jsondate: {},
        orderList: [],
        presentTotal: 10,
        apiurl: host + "/mms/servlet/getCommodityOrderList", //?®˙??´HÆß
        apiurl2: host + "/mms/servlet/getOrderStatusByOrderNo", //®˙Æ¯??´e??
        apiurl3: host + "/mms/servlet/operateOrders", //??æﬁß@
        apiurl4: host + "/mms/servlet/getWelfareAfterConfirmReceived", //…¨¥f±¿∞e
        apiurl5: host + "/mms/servlet/getOrderInfoByOrderNo" //§‰•I´e??
    },
    filters: {
        //????
        statusFlag: function(status, type) {
            var orderStatus;
            if(status == 0) { //•N•I¥⁄
                orderStatus = 'images/ic_obligation@3x.png';
            } else if(status == 1) { //´›âY?

                if(type == 1) { //∞”´~??
                    orderStatus = 'images/ic_waitsend@3x.png';
                } else if(type == 3) { //™AâUôW´¨??
                    orderStatus = 'images/ic_waitserve@3x.png';
                }
            } else if(status == 2) { //´›¶¨?
                if(type == 1) { //∞”´~??
                    orderStatus = 'images/ic_waitget@3x.png';
                } else if(type == 3) { //™AâUôW´¨??
                    orderStatus = 'images/ic_hadserve@3x.png';
                }
            } else if(status == 3) { //∞h¥⁄§§
                orderStatus = 'images/ic_refund@3x.png';
            } else if(status == 4) { //∞‚¶Zâ]≤z§§
                orderStatus = 'images/ic_processing@3x.png';
            } else if(status == 5) { //•Ê©ˆ¶®•\
                orderStatus = 'images/ic_hadfinish@3x.png';
            } else if(status == 6) { //????
                orderStatus = 'images/ic_hadclose@3x.png';
            }
            return orderStatus;
        },

    },
    mounted: function() {
        this.$nextTick(function() {
            //console.log(99999999);
            this.getDatejson(pageSize, 1);
        });

    },
    methods: {
        getDatejson: function(pagesize, pageNum, refreshState,flag) {
            params.body.pageSize = pagesize;
            params.body.pageNum = pageNum;
            params.header.time_stamp=new Date().getTime();
            var paramData = JSON.stringify(params);
            this.$http.jsonp(this.apiurl + "?str=" + encodeURI(paramData), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                onscrollStatus = true;
                // í‡?¶®•\¶^?
                console.log(JSON.stringify(response.body))
                //this.message = JSON.stringify(response.body);
                this.jsondate = response.body;
                if(response.body.result == 0) {

                    if(refreshState) {
                        this.orderList = response.body.orderList;
                    } else {
                        this.orderList = this.orderList.concat(response.body.orderList);
                    }
                    this.presentTotal = Math.ceil(this.orderList.length / 10) * 10;

                }
                if (flag==6&&response.body.result == 0) {
                    lxjTip.msg("??§w†Á∞£", {
                        time: 1000
                    });
                }

            }, function(response2) {
                // í‡???¶^?
                onscrollStatus = true;
                console.log(JSON.stringify(response2.body))
                //	console.log(JSON.stringify(response))
            });
        },
        //??æﬁß@
        updateOrderFlag: function(flag, orderNo) { //flag:3®˙Æ¯??°A2⁄Ã?¶¨???
            var params2 = {};
            params2.header = {
                token: token,
                time_stamp: timestamp
            };
            params2.body = {
                flag: flag,
                orderNo: orderNo
            };
            params2.header.time_stamp=new Date().getTime();
            var paramData2 = JSON.stringify(params2);
            this.$http.jsonp(this.apiurl3 + "?str=" + encodeURI(paramData2), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                // í‡?¶®•\¶^?
                if(flag == 6&&response.body.result==0){
                    setTimeout(function(){
                        vue.getDatejson(vue.presentTotal, 1, true,6);
                    },100)
                }
                this.getDatejson(this.presentTotal, 1, true);
                if(flag == 2) {
                    this.getWel(2, orderNo);
                }
            }, function(response) {
                // í‡???¶^?
                console.log("•¢?")
            });
        },
        //??⁄Ã?¶¨?∞e…¨¥f
        getWel: function(flag, orderNo) { //flag:2⁄Ã?¶¨???
            var params2 = {};
            params2.header = {
                token: token,
                time_stamp: timestamp
            };
            params2.body = {
                flag: 2,
                orderNo: orderNo
            };
            params2.header.time_stamp=new Date().getTime();
            var paramData2 = JSON.stringify(params2);
            this.$http.jsonp(this.apiurl4 + "?str=" + encodeURI(paramData2), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                // í‡?¶®•\¶^?
                this.getDatejson(this.presentTotal, 1, true);
                console.log(JSON.stringify(response.body))
            }, function(response) {
                // í‡???¶^?
                this.getDatejson(this.presentTotal, 1, true);
                console.log("•¢?")
            });
        },
        //??®˙Æ¯´e™∫??
        beforeCancel: function(orderNo) {
            var params2 = {};
            params2.header = {
                token: token,
                time_stamp: timestamp
            };
            params2.body = {
                orderStatus: "-1",
                orderNo: orderNo
            };
            params2.header.time_stamp=new Date().getTime();
            var paramData2 = JSON.stringify(params2);
            this.$http.jsonp(this.apiurl2 + "?str=" + encodeURI(paramData2), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                    // í‡?¶®•\¶^?
                    if(response.body.result == 0) {
                        console.log(JSON.stringify(response.body))
                        var status = response.body.status;
                        var type = response.body.type;
                        if(status == 4 || status == 2) {
                            if(type == 3) {
                                lxjTip.msg("©±?§w¶w±∆™AâU°A§£Ø‡®˙Æ¯??");

                            } else if(type == 1) {
                                lxjTip.msg("©±?§wâY?°A§£Ø‡®˙Æ¯??");
                            }
                            vue.getDatejson(vue.presentTotal, 1, true);
                        } else {
                            if(status == 1) { //§w§‰•I??®˙Æ¯¥£•‹
                                lxjTip.confirm('??®˙Æ¯¶Z¥⁄??¶b1-7üƒ§uß@§È?∞h?®Ï±z§‰•I™∫?è≠', {
                                    skin: 'demo3',
                                    btn: ['¶n™∫', '¶A∑Q∑Q'],
                                    yes: function(index) {
                                        vue.updateOrderFlag(3, orderNo);
                                        lxjTip.close(); //¶p™Gâz©w§Fyes¶^?°Aª›?¶Ê§‚§u??
                                    }
                                });


                            } else if(status == 0) {
                                //•º§‰•I??®˙Æ¯¥£•‹
                                lxjTip.confirm('±z⁄Ã©w≠n®˙Æ¯???°H', {
                                    skin: 'demo3',
                                    yes: function(index) {
                                        vue.updateOrderFlag(3, orderNo);
                                        lxjTip.close(); //¶p™Gâz©w§Fyes¶^?°Aª›?¶Ê§‚§u??
                                    }
                                });
                            }
                        }
                    }
                },
                function(response) {
                    // í‡???¶^?
                    console.log("•¢?")
                });
        },
        //©≥≥°´ˆ?ßP?
        getButtom: function(status, expressage, comment) {
            if(status == 3 && expressage == 0) {
                return false;
            } else if(status == 4 && expressage == 0 && comment == 1) {
                return false;
            } else {
                return true;
            }
        },
        //†Á∞£??æﬁß@
        deleOrder: function(orderNo) {
            lxjTip.confirm('±z⁄Ã©w≠n†Á∞£????°H', {
                skin: 'demo3',
                yes: function(index) {
                    vue.updateOrderFlag(6, orderNo);
                    lxjTip.close(); //¶p™Gâz©w§Fyes¶^?°Aª›?¶Ê§‚§u??
                }
            });

        },
        //⁄Ã?¶¨?æﬁß@
        receivingProduct: function(orderNo) {
            lxjTip.confirm('±z⁄Ã©w§wâr¶¨®Ï?§F?°H', {
                skin: 'demo3',
                yes: function(index) {
                    vue.updateOrderFlag(2, orderNo);
                    lxjTip.close(); //¶p™Gâz©w§Fyes¶^?°Aª›?¶Ê§‚§u??
                }
            });
        },
        //?§J???±°ãÔ≠±
        getOrderDetail: function(orderNo) {
            showActivity(host + "/mms/html5/personal/" + decodeURI("order_details.htm?orderNo=" + orderNo), "???±°");
        },
        //?§J§‰•IãÔ≠±
        goPay: function(orderNo, type) {
            //			if(type != 3) {
            //				showActivity(host + "/mms/html5/personal/" + decodeURI("pay.htm?orderNo=" + orderNo), "•I¥⁄");
            //			} else {
            var params2 = {};
            params2.header = {
                token: token,
                time_stamp: timestamp
            };
            params2.body = {
                orderStatus: -1,
                orderNo: orderNo
            };
            params2.header.time_stamp=new Date().getTime();
            var paramData2 = JSON.stringify(params2);
            this.$http.jsonp(this.apiurl5 + "?str=" + encodeURI(paramData2), {
                emulateJSON: true,
                method: "get",
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsonpCallback: "success_jsonpCallback"
            }).then(function(response) {
                // í‡?¶®•\¶^?
                console.log(JSON.stringify(response.body));
                var odata = response.body;
                if(odata.result == 0) {
                    if(odata.commodityStatus != 0) { //?¶≥§U¨[™∫∞”´~¶b??§§
                        if(odata.payTimeStatus != 0) { //???öV∂W?
                            showActivity(host + "/mms/html5/personal/" + decodeURI("pay.htm?orderNo=" + orderNo), "•I¥⁄");
                        } else {
                            lxjTip.alert('©“?™AâU?öV§w?,??ßY???°I', {
                                skin: 'demo2',
                                yes: function(index) {
                                    vue.updateOrderFlag(3, orderNo);
                                    lxjTip.close(); //¶p™Gâz©w§Fyes¶^?°Aª›?¶Ê§‚§u??
                                }
                            });
                        }
                    } else {
                        lxjTip.alert('??´HÆß§wßÛßÔ°A??ßY???,?≠´∑s??°I', {
                            skin: 'demo2',
                            yes: function(index) {
                                vue.updateOrderFlag(3, orderNo);
                                lxjTip.close(); //¶p™Gâz©w§Fyes¶^?°Aª›?¶Ê§‚§u??
                            }
                        });
                    }
                }
            }, function(response) {
                // í‡???¶^?
                console.log("•¢?")
            });
            //}
        },
        //?§J¨d¨›™´¨yãÔ≠±
        checkLogistics: function(orderNo) {
            showActivity(host + "/mms/html5/personal/" + decodeURI("checkLogistics.htm?orderNo=" + orderNo), "¨d¨›™´¨y");
        },
        //?§J•”?∞‚¶ZãÔ≠±
        goService: function(orderNo) {
            console.log(host + "/mms/html5/personal/" + decodeURI("service.htm?orderNo=" + orderNo))
            showActivity(host + "/mms/html5/personal/" + decodeURI("service.htm?orderNo=" + orderNo), "•”?∞‚¶Z");
        },
        //?§J?…≤ãÔ≠±
        goEvaluate: function(orderNo, length, commodityId) {
            if(length == 1) {
                showActivity(host + "/mms/html5/personal/" + decodeURI("writeproductEvaluate.htm?orderNo=" + orderNo + "&commodityId=" + commodityId), "∞”´~?…≤");
            } else {
                showActivity(host + "/mms/html5/personal/" + decodeURI("productEvaluate.htm?orderNo=" + orderNo), "∞”´~?…≤");
            }
        },
    }
});

//?®˙URLâÎ?
function GetURLParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}

function refreshData() {
    setTimeout(function() {
        vue.getDatejson(vue.presentTotal, 1, true);
        //		var listnumber = $(".orderInformation li").length;
        //		if(listnumber<10){
        //			listnumber=10;
        //			currentPageNum=1;
        //		}else{
        //			currentPageNum=Math.ceil(listnumber/10);
        //			listnumber=Math.ceil(listnumber/10)*10;
        //		}
        //		getOrderList(listnumber, true);
    }, 0);
    return 1;
}
//çÂâVòÁ¶bY?§W™∫çÂâV∂Z÷√
function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if(document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//§Â?™∫âf∞™´◊

function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if(document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

//??æπây§f™∫∞™´◊

function getWindowHeight() {
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

window.onscroll = function() {
    //console.log(getScrollTop()+'   '+getWindowHeight()+'   '+getScrollHeight())
    if(getScrollHeight() - getScrollTop() - getWindowHeight() < 1000 && onscrollStatus) {
        onscrollStatus = false;
        if(vue.orderList.length>=vue.presentTotal){
            pageNum=Math.ceil(vue.presentTotal / 10)+1;
        }else{
            pageNum=Math.ceil(vue.presentTotal / 10);
        }
        if (pageNum>1&&pageNum>Math.ceil(vue.presentTotal / 10)) {
            vue.getDatejson(10, pageNum);
        }
    }
};