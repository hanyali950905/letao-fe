/**
 * Created by Administrator on 2017/11/30 0030.
 */
$(function () {
    var url=new URLSearchParams(location.search);
    var id=url.get("id");
    // console.log(id);
    getProductDetail(id);




    //点击尺码添加和移除类样式---注意委托的父元素不能是动态添加的
    $(".mui-content").on("click",".product-size span",function () {
        // console.log(123);
        $(".product-size span").removeClass("active");
        $(this).addClass("active");
    });


    //点击购物车，调用传入id，尺码，数量的函数，发送ajax请求，跳转到登录页面
    $(".lt-footer .add-cart").on("click",function () {
        // console.log(222222);
        var productid=id;

        var size=$(".product-size span.active").html();


        var num = mui(".mui-numbox").numbox().getValue();

        if(!productid){
            mui.toast("无效的商品");
            return false;
        }

        if(!size){
            mui.toast("请选择尺码");
            return false;
        }

        if(num<=0){
            mui.toast("至少选择一件商品");
            return false;
        }

        addCart(productid,size,num);


    })
});




//渲染商品详情页
var getProductDetail=function (id) {
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:id
        },
        success:function (data) {
            // console.log(data);
            var detailResult=template("detail-template",data);
            $(".mui-content").html(detailResult);


            var size=data.size;
            // console.log(size);40-50
            var sizeArr=size.split("-");
            // console.log(sizeArr);["40","50"]
            var start=sizeArr[0];
            var end=sizeArr[1];
            var sizedata={
                start:start,
                end:end
            };
            // console.log(sizedata);
            var sizeResult=template("size-template",sizedata);

            $(".product-size").append(sizeResult);




            // 轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 500//自动轮播周期，若为0则不自动播放，默认为0；
            });


            // 数字输入框手动初始化
            mui(".mui-numbox").numbox();
        }


    })
};





//加入购物车
var addCart=function (productid,size,num) {
      $.ajax({
          type:"post",
          url:"/cart/addCart",
          data:{
              productId:productid,
              size:size,
              num:num
          },
          dataType:"json",
          success:function (data) {
              console.log(data);
                if(data.error == 400){
                    location.href="../login.html?returnUrl="+location.href;
                }
          }
      })
};