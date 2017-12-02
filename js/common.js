/**
 * Created by Administrator on 2017/11/27 0027.
 */
/**
 * ITCAST WEB
 * Created by zhousg on 2016/12/27.
 */
if(!LeTao) var LeTao = {};
/*甯哥敤鍦板潃*/
LeTao.LOGIN_URL = '/mobile/user/login.html';
LeTao.SEARCH_LIST_URL = '/mobile/searchList.html';
LeTao.CART_URL = '/mobile/cart.html';
LeTao.USER_URL = '/mobile/user/';

/*鍏ㄥ眬ajax宸ュ叿鍑芥暟*/
LeTao.ajax = function(options){
    if(!options.url) return false;
    $.ajax({
        url:options.url,
        type:options.type||'post',
        data:options.data||'',
        dataType:options.dataType||'json',
        timeout:options.timeout||50000,
        beforeSend:function(){
            options.beforeSend && options.beforeSend();
        },
        success:function(data){
            /*400浠ｈ〃鏈櫥褰�*/
            if(data && data.error == '400'){
                window.location.href = LeTao.LOGIN_URL+'?returnUrl='+decodeURI(location.href);
                return false;
            }
            setTimeout(function(){
                options.success && options.success(data);
            },1000);
        },
        error:function(xhr,type,errorThrown){
            mui.toast('鏈嶅姟绻佸繖');
            options.error && options.error({xhr:xhr,type:type,errorThrown:errorThrown});
        }
    });
};
/*
 * 鑾峰彇褰撳墠椤甸潰鐨剈rl鏁版嵁鏍规嵁key
 * */
LeTao.getUrlParam = function(key){
    var strings = location.search.substr(1).split("&");
    var value = null;
    for(var i = 0; i < strings.length; i ++) {
        var arr = strings[i].split("=");
        if(arr[0] == key){
            /*urlcode 杞爜*/
            value = decodeURI(arr[1]);
            break;
        }
    }
    return value;
};
/*
 * 鏍规嵁鏁扮粍涓璞℃暟鎹幏鍙栫储寮�
 * */
LeTao.getIndexFromId = function(arr,id){
    var index = null;
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i];
        if(item && item.id == id){
            index = i;
            break;
        }
    }
    return index;
};
/*
 * 鏍规嵁鏁扮粍涓璞℃暟鎹甀D鑾峰彇绱㈠紩
 * */
LeTao.getObjectFromId = function(arr,id){
    var object = null;
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i];
        if(item && item.id == id){
            object = item;
            break;
        }
    }
    return object;
};