/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 14:05:48
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-18 12:04:53
 */
const TaskType={
    auto:"Auto",
    fixed:"Fixed",
    scan:"Scan",
}
class RunningTask{
    id="";
    name="";
    param="";
    executeUser="";
    priority=1;
    type=TaskType.auto;
    startTime=Date.now;
}
class TaskInfo{
    name="";
    param="";
}
module.exports={
    RunningTask,
    TaskInfo,
    TaskType,
}
