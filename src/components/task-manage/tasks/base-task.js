//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-26 16:00:49
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-26 19:28:57
 */

const ExecuteParam=require("../../../common/data/execute-task-param");
class BaseTask{

    taskId="";
    /**
     * @type {import("socket.io").Socket} soc
     */
    /**
     * FIXFQ,SCan
     * @type {ExecuteParam}
     */
    param=null;
    /**
     * @type {import("socket.io").Socket} 
     */
    socket=null;
    /**
     * @param {ExecuteParam} executeParam
     * @returns {boolean}
     */
    start(executeParam){
        this.param=executeParam;
        return true;
    }
    stop(){

    }
    sendTaskData(data){
        try{
            if(this.socket&&this.socket.connected){
                this.socket.emit("realtime_task_data",data);
            }
        }catch(e){
            console.log("send task data error",e);
        }
        
    }
}
module.exports=BaseTask;