/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 13:24:41
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-17 06:24:00
 */

const {RunningTask,TaskInfo} = require("./task");

class DeviceInfo{
    id="";
    name="";
    status=DeviceStatusEnum.WORKING;
    /**
     * the key is the ability name, the value is the param that the task needs when it runs.
     * @type {Array<TaskInfo>}
     */
    abilities=[];

    /**
     * @typedef {imort ("./task")} RunningTask
     * @type {Array<RunningTask>} 
     */
    runningTasks=[];
}

module.exports=DeviceInfo;