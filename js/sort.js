/**
 * Created by Administrator on 2017/11/28 0028.
 */
var myScroll =new IScroll("#list-left");



//1 声明一个函数----不限次数的发起ajax请求
var getFirstCategory = function () {
    //2 发起ajax请求---获取数据---查看借口文档
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        data:{},
        success:function (data) {
            // console.log(data);
            //3 把数据渲染到页面上----模板引擎
            var firstData=template("first-template",data);
            $(".list-left #segmentedControls").html(firstData);



            //功能：当页面加载进来，就要去加载一级分类运动馆下的二级分类的内容
            //1 获取一级分类的id---- data.rows[0].id
           var firstId=data.rows[0].id;
            getSecondCategory(firstId);

            //2 把一级分类的id传参给getSecondCategory

        }
    })
};
getFirstCategory();




// 二级分类联动渲染
// 步骤
//1 声明一个函数-----原因是要随着用户的点击去请求二级的分类
//进入页面的第一个二级分类也是动态的------第一个要被请求的数据
//2 发起ajax请求----为了把二级分类写页面上
var getSecondCategory=function (id) {
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{id:id},
        success:function (data) {
            // console.log(data);//-------获取到数据后就去写模板
            //3 调用模板引擎的方法，方便去渲染页面
            //4 把绑定好的数据插入到页面中
            var secondData=template("second-template",data);
            $(".mui-table-view").html(secondData);
        }
    })
};





//点击一级分类动态添加二级分类
//1 获取元素的注册事件----因为a是动态添加上去的，所以要用事件委托注册事件
//2 先改变类名----删除所有---再添加
//3 获取一级分类id
//4 调用getSecondCategory获取二级分类数据
$(".list-left #segmentedControls").on("click","a",function () {
    // console.log(111);
    $("#segmentedControls").find("a").removeClass("active");
    $("#segmentedControls").find("a").removeClass("mui-active");


    $(this).addClass("mui-active");
    var firstId=$(this).attr("data-id");
    getSecondCategory(firstId);

});































