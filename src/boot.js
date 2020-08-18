//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 14:15:38
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-16 16:06:19
 */
const BaseManage=require('./common/interfaces/base-manage');
class Boot{
    /**
      * @Date: 2020-08-16 16:01:41
      * @Description: 
      * @typedef {import('./common/interfaces/base-manage')} BaseManage
      * @param {Array<BaseManage>}  moudles
      * @return {void} 
      */
     start(moudles){
        moudles.forEach(element => {
             if(element instanceof BaseManage){
                 element.start();
             }else{
                console.log("not a basemanage",element);
             }
         });
            console.log("start");
    }
      /**
      * @Date: 2020-08-16 16:01:41
      * @Description: 
      * 
      * @param {Array<BaseManage>}  moudles
      * @return {void} 
      */
   stop(moudles){
    moudles.forEach(element => {
        if(element instanceof BaseManage){
            element.stop();
        }else{
           console.log("not a basemanage",element);
        }
    });
       console.log("stop");
   }
}
module.exports=Boot;