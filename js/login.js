/**
 * Created by Administrator on 2017/12/1 0001.
 */
$(function () {
    //点击登录，调用封装的利用ajax获取后台登录数据的函数
    $(".mui-5").on("click",function () {
        var formdata=$("form").serialize();
        // console.log(formdata);
        loginPage(formdata);
    });
});


//封装的利用ajax获取后台登录数据的函数
var loginPage=function(data){
  $.ajax({
      type:"post",
      url:"/user/login",
      data:data,
      success:function (data) {
            // console.log(data);
          if(data.error==403){
              // alert(111);
              mui.toast(data.message);
          }
          if(data.success==true){
              var searchUrl=new URLSearchParams(location.search);
              var url=searchUrl.get("returnUrl");
              // console.log(url);
              location.href=url||"../fe/letao.html";
          }
      }
  })
};