
$(function () {

  //当页面进入的时候要请求数据
  var url=new URLSearchParams(location.search);
  var proname=url.get("key");
  getSearchResult(1,4, proname);




  //1 当页面载入之后，要把搜索词设置给输入框
  $(".search-box input").val(proname);






  var priceFlag=true;
  var numFlag=true;
  //2 当点击价格按钮的时候，让该按钮变成红色，然后使商品列表按照价格排序（降序  升序）
  $('.lt-order [data-type="price"]').on("click",function () {
    // alert(1234567);
    //点击时---移除所有a的类样式，给当前点击的添加上
    $(".lt-order a").removeClass("active");
    $(this).addClass("active");


    //初始化为true，加锁的目的就是进行切换
    if(priceFlag){
      getSearchResult(1,10,proname,2);
      priceFlag=false;
      $(this).find("span").removeClass("fa-angle-up");
      $(this).find("span").addClass("fa-angle-down");

    }else{
      getSearchResult(1,10,proname,1);
      priceFlag=true;
      $(this).find("span").addClass("fa-angle-up");
      $(this).find("span").removeClass("fa-angle-down");
    }
  });


//3 当点击销量按钮的时候，让该按钮变成红色，然后使商品列表按照销量排序（降序  升序）
  $('.lt-order [data-type="num"]').on("click",function () {
    $(".lt-order a").removeClass("active");
    $(this).addClass("active");
    if(numFlag){
      getSearchResult(1,10,proname,null,2);
      numFlag=false;
      $(this).find("span").removeClass("fa-angle-up");
      $(this).find("span").addClass("fa-angle-down");
    }else{
      getSearchResult(1,10,proname,null,1);
      numFlag=true;
      $(this).find("span").addClass("fa-angle-up");
      $(this).find("span").removeClass("fa-angle-down");
    }
  });


  //4 点击立即购买跳转到详情页-----在button中找data-id
  $(".lt-search-result").on("click","button",function () {
    // alert(2222);
    var id=$(this).attr("data-id");
    location.href="detail.html?id="+id;
  });

});









//参数---页码，每页有多少条数据，商品名称，品牌ID，价格（1--升序，2---降序），库存（）
var getSearchResult=function (pageNum,pagesize,proname,price,num,brandid) {

  //推理过程
  // var url=location.href;
  // console.log(url);
  // http://localhost:3000/fe/search/searchList.html?key=nike

  // var url=location;
  // console.log(url);
  //location中有一个属性是search:"?key=nike",最接近Proname，
  // 1  可以用切割字符串的方式，2  也可以用URLSearchParams();


  // 方法2:
  //传入参数--在传入proname的时候，怎么来获取url里的参数
  //URLSearchParams();是一个内置对象，通过这个对象的方法可以获取到url中的参数
  // var url=new URLSearchParams(location.search);
  // console.log(url);
  // var proname=url.get("key");
  // console.log(proname);//nike


  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:{
      page:pageNum||1,//页码-------必传
      pageSize:pagesize||4,//每页有多少条数据-------必传
      proName:proname||"",//产品名称
      brandId:brandid||"",//品牌ID
      price:price||"",//价格（1--升序，2---降序），库存（）
      num:num||""//库存（）
    },
    success:function (data) {
      // console.log(data);
      var result=template("search-template",data);
      // console.log(result);


      //append------加入到什么中，html------替换掉原来的东西，加入到什么中
      $(".lt-search-result").html(result);
      // $(".lt-search-result").append(result);
    }
  })
};











