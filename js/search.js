
$(function () {
    var HistoryData={
        list: getHistory()
    };
    // console.log(HistoryData);
    var historyList=template("history-template",HistoryData);
    // console.log(historyList);
    $(".history-list").html(historyList);
});






$(function () {
    getHistoryList();

    //点击搜索按钮，把历史记录存localStorage,跳转到搜索结果页
    //获取搜索按钮，注册点击事件
    $(".search-box span").on("click",function () {
        // 通过调用setHistory,将输入框的内容添加到历史记录
        setHistory($(".search-box input").val());
        //跳转用location.href
        // 难题: 把用户的搜索的词给传输到下一页html中
        // 把参数带到html的？后面 -------是比较好的方案 因为每次跳转都会添加 用户无法干涉
        // 把参数存储到localStorage中------隐身模式不存储数据 怕用户和开发者无意识的把localStorage清空
        location.href="searchList.html?key="+$(".search-box input").val();
        $(".search-box input").val("");
    });


    //点击历史记录列表，将文字当做搜索词搜索
    $(".history-list ul li").on("click","span",function () {
        location.href="searchList.html?key="+$(this).html();
    });



    //点击清空历史记录，把历史记录清空
    $(".history-list .clear").on("click",function () {
        //清空本地存储的全部
        localStorage.removeItem("aHistory");
        //再调用历史记录列表
        getHistoryList();
    });



    //点击删除按钮，找到他的兄弟元素，获取兄弟元素的内容，
    // 调用删除历史的函数，调用历史记录列表函数
    $(".history-list").on("click","i",function () {
        var val=$(this).siblings("span").html();
        delHistory(val);
        getHistoryList();
    })
});

















//搜索历史记录管理模块
//分两种情况
//1 一种是没有历史搜索记录
//2 一种是有历史搜索记录




// 1 如何获取历史记录
var getHistory=function () {
    //获取本地存储---aHistory就是键（key随便设置）
    //如果有历史记录就获取历史记录，如果没有历史记录就获取一个空数组字符串
    return JSON.parse(localStorage.getItem("aHistory")||"[]");//转成数组对象
};




// var cc=getHistory();
// console.log(cc);能够获取本地存储的数据-----数组对象







// 2 如何添加历史记录
//value是用户输入在input里面的字符串---没办法整----所以要转成数组对象（调用上面获取历史记录的函数）
var setHistory=function (value) {

    var ary=getHistory();//-----数组（有本地存储的内容或是空数组----有元素和没有元素两种情况


    //判断输入的值是否在数组中（本地存储中），如果有就不在添加，如果没有就添加
    $.each(ary,function (i,item) {
        if(item == value){
            //找到item等于value的时候对应的索引，把那个索引找到，从那个索引开始切掉一个元素
            ary.splice(i,1);
        }
    });
    ary.push(value);
    localStorage.setItem("aHistory",JSON.stringify(ary));
};
// setHistory ("ad");//刷新数组长度不变









// 3 如何删除历史记录
//localStorage.removeItem不可以----就把value的数组全部清空了

var delHistory=function (value) {
    var ary=getHistory();//还要获取数组对象
    $.each(ary,function (i,item) {
        if(value==item){
            ary.splice(i,1);
        }
    });
    window.localStorage.setItem("aHistory",JSON.stringify(ary))
};



var getHistoryList=function () {
    var HistoryData={
        list:getHistory()
    };
    // console.log(HistoryData);
    var HistoryList=template("history-template",HistoryData);
    // console.log(HistoryList);
    $(".history-list").html(HistoryList);
};

