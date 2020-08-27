/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 13:24:41
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-18 10:34:08
 */

 const DeviceStatusEnum={
    WORKING:"working",
    IDLE:"idle",
    FAULT:"fault",
    SHUTDOWN:"shutdown"
}
const {RunningTask,TaskInfo} = require("./task");

class DeviceInfo{
    stationId="";
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

module.exports={DeviceInfo,DeviceStatusEnum};