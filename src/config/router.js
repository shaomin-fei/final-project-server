//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:47:03
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-16 15:46:22
 */
//@ts-check
const MethodEnum={
    GET:"get",
    POST:"post",
    PUT:"put",
    DELETE:"delete",
}
class RouterInfo{
    constructor(method,path,func){
        this.method=method;
        this.path=path;
        this.func=func;
    }
    
}
  /**
      * @Date: 2020-08-16 16:01:41
      * @Description: 
      * @typedef {import('../common/interfaces/base-manage')} BaseManage
      * @type {Array<BaseManage>}  
      */
const moudles=[];
const StationManage=require("../components/stations-manage/station-manage")
const stationManage=new StationManage.StationManage();
moudles.push(stationManage);
// const sta2=new StationManage.StationManage();
// if(stationManage===sta2){
// console.log("single success");
// }
/**
 * @type {Map<string,RouterInfo>}
 */
const routers=new Map();

routers.set("/getStations",new RouterInfo(MethodEnum.GET, "/getStations",stationManage.getAllStations));
module.exports={
    MethodEnum,
    RouterInfo,
    routers,
    moudles,
}