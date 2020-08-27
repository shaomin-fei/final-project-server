/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-26 16:05:39
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-26 16:31:57
 */
const BaseTask=require("./base-task");

class VirtualTask extends BaseTask{
    interval=null;
   /**
     * @param {ExecuteParam} executeParam
     * @returns {boolean}
     */
    start(executeParam){

        return true;
    }
    stop(){
        
    }
}
module.exports=VirtualTask;