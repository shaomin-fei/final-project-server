/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 13:24:41
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-16 13:33:17
 */
const DeviceStatusEnum={
    WORKING:"working",
    FAULT:"fault",
    IDLE:"idle",
    SHUTDOWN:"shutdown",
}
class DeviceInfo{
    id="";
    name="";
    status=DeviceStatusEnum.WORKING;
    /**
     * the key is the ability name, the value is the param that the task needs when it runs.
     * @type {Map<string,string>}
     */
    abilities=new Map();
}

module.exports={
    DeviceStatusEnum,
    DeviceInfo,
}