$(document).ready(function(){
    //加减符号的处理
    var btn_reduce=$(".btn_reduce");
    var btn_add=$(".btn_add");
        btn_add.on("click",function(){
            if($(this).hasClass("disabled")){
                return;
            }
            var thisvalue=$(this).parent().find("input");
            thisvalue.val((+thisvalue.val())+1);
            if((+(thisvalue.val()))>=9){
                $(this).addClass("disabled");
            }
            if((+(thisvalue.val()))>1){
                $(this).parent().find(".btn_reduce").removeClass("disabled");
            }
        });
        btn_reduce.on("click",function(){
            if($(this).hasClass("disabled")){
                return;
            }
            var thisvalue=$(this).parent().find("input");
            thisvalue.val((+thisvalue.val())-1);
            if((+(thisvalue.val()))<=1){
                $(this).addClass("disabled");
            }
            if((+(thisvalue.val()))<10){
                $(this).parent().find(".btn_add").removeClass("disabled");
            }
        });


    //单选框多选框的处理
    var checkall=$(".checkall");
    var checkedproduct=$(".checkedproduct");
    var shoppingcart=$(".shoppingcart");
    //控制全款按钮
    checkall.on("click",function(){
        if(checkall.hasClass("select")){
            checkall.removeClass("select");
            checkedproduct.removeClass("select");
        }else{
            checkall.addClass("select");
            checkedproduct.addClass("select");
        }
    });
    //控制单选选中单个产品按钮
    var list = new Array;
    shoppingcart.on("click",'.checkedproduct',function(){
        list = [];
        if($(this).hasClass("select")){
            if(checkall.hasClass("select")||checkedproduct.hasClass(".select")){
                checkall.removeClass("select");
            }
            $(this).removeClass("select");

            for(var i=0;i<shoppingcart.length;i++)
            {
                if(checkedproduct.eq(i).hasClass('select')){
                    list.push(i);
                    if(shoppingcart.length==list.length)
                    {
                        checkall.removeClass("select");
                    }
                }
                else
                {
                    checkall.removeClass("select");
                }
            }
        }else{
            $(this).addClass("select");
            for(var i=0;i<shoppingcart.length;i++)
            {
                if(checkedproduct.eq(i).hasClass('select')){
                    list.push(i);
                    if(shoppingcart.length==list.length)
                    {
                        checkall.addClass("select");
                    }
                }
                else
                {
                    break;
                }

            }
        }
    });

    //对购物车商品的操作
    $(".deleted").on("click",function(){
        $(".cancel_order_cover").css("display","block");
        $(".confir").css("display","block");
    });
    $(".cancel_order_cover").on("click",function(){
        $(".cancel_order_cover").css("display","none");
        $(".confir").css("display","none");
    });
});

