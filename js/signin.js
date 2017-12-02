/**
 * Created by Administrator on 2017/12/1 0001.
 */
$(function () {
    //点击注册按钮，将表单数据作为参数，调用注册信息的函数
    $(".mui-5").on("click",function () {
        var formData=$(".form").serialize();
        getSigninData(formData);
    });

    //点击获取验证码按钮，调用封装的利用ajax获取后台的获取验证码的函数
    $(".mui-4 .button").on("click",function () {
        getCodeData();
    })
});




//封装后台注册信息函数
var getSigninData=function (option) {
    $.ajax({
        type:"post",
        url:"/user/register",
        data:option,
        beforeSend:function () {
            if($('[name="username"]').val()==""){
                mui.toast("用户名不能为空");
                return false;
            }
            var reg=/^1[34578]\d{9}$/;
            if(!reg.test($('[name="mobile"]').val())){
                mui.toast("请输入正确的手机号");
                return false;
            }
            if($('[name="password"]').val()==""){
                mui.toast("密码不能为空");
                return false;
            }
            if($('[name="repassword"]').val()!==$('[name="password"]').val()){
                mui.toast("两次密码不一致");
                return false;
            }
            if($('[name="vCode"]').val()==""){
                mui.toast("请点击按钮获取正确的验证码");
                return false;
            }
        },
        success:function (data) {
            // console.log(data);
            if(data.success=true){
                location.href="../fe/login.html";
            }
        }
    })
};


//封装 利用ajax获取后台数据的函数
var getCodeData=function () {
    $.ajax({
        type:"get",
        url:"/user/vCode",
        data:{},
        success:function (data) {
            console.log(data);
        }
    })
};