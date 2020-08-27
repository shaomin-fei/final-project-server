//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-26 15:40:53
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-26 16:27:05
 */
const uuid=require("uuid");

const ExecuteParam=require("../../common/data/execute-task-param");

const VirtualTask=require("./tasks/virtual-task");
const ScanTask=require("./tasks/scan-task");
const FixfqTask = require("./tasks/fixfq-task");

class RunningInfo{
    /**
     * @type {ExecuteParam}
     */
    executeParam=null;
    /**
     * @typedef {import("./tasks/base-task")} BaseTask
     * @type {BaseTask}
     */
    task=null;
    
}
class TaskManage{
    /**
     * @type {Map<string,RunningInfo>}
     */
    mapTasks=new Map();
    /**
     * @Date: 2020-08-26 15:44:59
     * @Description: 
     * @param {ExecuteParam} executeParam
     * @param {import("socket.io").Socket} soc
     * @return {void} 
     */
    startTask(executeParam,soc,taskidCallback){
        const taskid=uuid.v1();
        taskidCallback(taskid);
        executeParam.taskid=taskid;
        const running=new RunningInfo();
        running.executeParam=executeParam;
        const task=this.createTask(executeParam.taskName);
       
        task.socket=soc;
        running.task=task;
       
        if(task.start(executeParam)){
            this.mapTasks.set(executeParam.taskid,running);
        }else{
            //todo send error msg
            
        }
    }
    stopTask(taskid,stopCallback){
        if(this.mapTasks.has(taskid)){
            this.mapTasks.get(taskid).task.stop();
            this.mapTasks.delete(taskid);
            stopCallback("stop success");
            return;
        }
        stopCallback("no such task");
       
    }
    /**
     * 
     * @param {string} taskName 
     * @return {BaseTask}
     */
    createTask(taskName){
        let task=null;
        if(taskName.toLocaleLowerCase()==="FIXFQ".toLocaleLowerCase()){

            task=new FixfqTask();

        }else if(taskName.toLocaleLowerCase()==="Scan".toLocaleLowerCase()){
            task=new ScanTask();
        }
        
        return task;
    }
}
module.exports=TaskManage;