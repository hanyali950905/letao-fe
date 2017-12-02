/**
 * Created by Administrator on 2017/11/27 0027.
 */
/**
 * ITCAST WEB
 * Created by zhousg on 2017/1/2.
 */
$(function(){
    /*娓叉煋*/
    var cityPicker = new mui.PopPicker({layer:3});
    cityPicker.setData(cityData);

    var addressId = location.search;
    addressId = addressId && addressId.split('=');
    addressId = addressId && addressId[1];
    if(addressId){
        $('header .title').html('淇敼鏀惰揣鍦板潃');
        getAddressData(function(data){
            var detail = LeTao.getObjectFromId(data,addressId);
            $('[name="recipients"]').val(detail.recipients);
            $('[name="postCode"]').val(detail.postCode);
            $('[name="address"]').val(detail.address);
            $('[name="addressDetail"]').val(detail.addressDetail);
        });
    }else{
        $('header .title').html('娣诲姞鏀惰揣鍦板潃');
    }


    $('body').on('click','.btn_submit',function(){
        var data = {
            recipients: $.trim($('[name="recipients"]').val()),
            postcode: $.trim($('[name="postCode"]').val()),
            address: $.trim($('[name="address"]').val()),
            addressDetail: $.trim($('[name="addressDetail"]').val())
        };

        if(!data.recipients){
            mui.toast('璇疯緭鍏ユ敹璐т汉');
            return false;
        }

        if(!data.postcode){
            mui.toast('璇疯緭鍏ラ偖缂�');
            return false;
        }

        if(!/^\d{6}$/.test(data.postcode)){
            mui.toast('璇疯緭鍏ュ悎娉曢偖缂�');
            return false;
        }

        if(!data.address){
            mui.toast('璇烽€夋嫨鐪佸競鍖�');
            return false;
        }

        if(!data.addressDetail){
            mui.toast('璇疯緭鍏ヨ缁嗗湴鍧€');
            return false;
        }

        var editUrl = '/address/addAddress';
        var tip = '娣诲姞';
        if(addressId){
            editUrl = '/address/updateAddress';
            tip = '淇敼';
            data.id = addressId;
        }
        editAddress(data,editUrl,function(){
            mui.toast(tip+'鎴愬姛锛�');
            location.href = 'address.html';
        });
    }).on('click','[name="address"]',function(){
        cityPicker.show(function(items) {
            if(items[0].text == items[1].text){
                items[0].text = '';
            }
            $('[name="address"]').val(items[0].text+items[1].text+(items[2].text||''));
            //杩斿洖 false 鍙互闃绘閫夋嫨妗嗙殑鍏抽棴
        });
    });
});
var editAddress = function(data,url,callback){
    LeTao.ajax({
        type:'post',
        url:url,
        data:data,
        dataType:'json',
        beforeSend:function(){
            $('.btn_submit').html('姝ｅ湪鎻愪氦...');
        },
        success:function(data){
            callback && callback(data);
        },
        error:function(){
            $('.btn_submit').html('鎻愪氦');
        }
    });
};
var getAddressData = function(callback){
    LeTao.ajax({
        type:'get',
        url:'/address/queryAddress',
        data:{},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};