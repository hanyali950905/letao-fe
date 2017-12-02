/**
 * Created by Administrator on 2017/12/1 0001.
 */
$(function () {

    getCartData();

    $(".mui-table-view").on("click",".mui-btn-red",function () {
        var cartid=$(this).attr("data-id");
        delCartData(cartid);
    });

});


// 查询购物车
var getCartData=function () {
    $.ajax({
        url:" /cart/queryCart",
        type:"get",
        data:{},
        success:function (data) {
            console.log(data);
            var cart=template("cart-template",{list:data});
            $(".mui-table-view").html(cart);
        }
    })
};




//删除购物车
var delCartData=function (cartid) {
    $.ajax({
        url:"/cart/deleteCart",
        type:"get",
        data:{
            id:cartid
        },
        success:function (data) {
            // console.log(data);
            if(data.success=true){
                getCartData();
            }
        }
    })
};