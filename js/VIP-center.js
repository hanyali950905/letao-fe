/**
 * Created by Administrator on 2017/12/1 0001.
 */
$(function () {
    getCenter();


    $(".mui-5 a").on("click",function () {
        // alert(4321);
        logout();
    })

});



//渲染个人中心的信息
var getCenter=function () {
  $.ajax({
      type:"get",
      url:"/user/queryUserMessage",
      data:{},
      success:function (data) {
          // console.log(data);
          if(data.error==400){
              location.href="../login.html?returnUrl="+location.href;
          }else{
              var center=template("center-template",data);
              $("#li").html(center);
          }
      }
  })
};



var logout=function () {
    $.ajax({
        type:"get",
        url:"/user/logout",
        data:null,
        success:function (data) {
            // console.log(data);
            if(data.success == true){
                // alert(5678);
                location.href="../fe/login.html";
            }
        }
    })
};