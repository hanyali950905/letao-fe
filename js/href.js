/*
* @Author: evanl
* @Date:   2017-11-27 20:08:04
* @Last Modified by:   evanl
* @Last Modified time: 2017-11-27 20:08:29
*/

		mui('body').on('tap','a',function(){
   			 window.top.location.href=this.href;
		});
