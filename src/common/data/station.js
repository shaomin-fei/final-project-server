/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 11:17:58
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-01 20:22:22
 */
const {DeviceInfo,DeviceStatusEnum}=require("./device");

class Environment{
    Temperature={
        value:43,
        unit:"°C",
       warnning:0
    };
    Humidity={
        value:53,
        unit:"%",
        warnning:0
    };
    Smoke={
        value:"No",
        unit:"",
        warnning:0
    };
    Access={
        value:"No",
        unit:"",
        warnning:0
    };
    Voltage={
        value:223,
        unit:"V",
        warnning:0
    };
    Current={
        value:2.3,
        unit:"A",
        warnning:0
    };
}
class Station{
    id="";
    name="";
    lon=0;
    lat=0;
    status=DeviceStatusEnum.WORKING;
    /**
     * net band from center to station,MB/s
     */
    netband=10;
    /**
     * realtime speed from station to center,usually test five times and calculate the average.,KB/s
     */
    netSpeed=500

    /**
     * @type {Environment}
     */
    environment=null;
    /**
     * websocket address
     */
    url="";

    devicesUrl=[];
    /**
    *@type {Array<DeviceInfo>}
     * 
     */
    devices=[];

}

module.exports=Station;