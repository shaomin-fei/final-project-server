//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:47:03
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-15 21:11:36
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
const StationManage=require("../components/stations-manage/station-manage");
const SignalManage=require("../components/signal-manage/signal-manage");
const StaticManage=require("../components/static-manage/static-manage");
const WSServerManage=require("../components/ws-server-manage/ws-server");
const stationManage=new StationManage.StationManage();
const signalManage=new SignalManage();
const staticManage=new StaticManage();
const wsServerManage=new WSServerManage();
moudles.push(stationManage);
moudles.push(signalManage);
moudles.push(stationManage);
moudles.push(wsServerManage);
// const sta2=new StationManage.StationManage();
// if(stationManage===sta2){
// console.log("single success");
// }
/**
 * @type {Map<string,RouterInfo>}
 */
const routers=new Map();

routers.set("/getStations",new RouterInfo(MethodEnum.GET, "/getStations",stationManage.getAllStations));
routers.set("/getSignalStaticByReason",new RouterInfo(MethodEnum.GET, "/getSignalStaticByReason",signalManage.getSignalStaticByReason));
routers.set("/getSignalInfoByTime",new RouterInfo(MethodEnum.GET, "/getSignalInfoByTime",signalManage.getSignalInfoByTime));
routers.set("/addSingnalInfo",new RouterInfo(MethodEnum.POST, "/addSingnalInfo",signalManage.addSingnalInfo));
routers.set("/updateSingnalInfo",new RouterInfo(MethodEnum.PUT, "/updateSingnalInfo",signalManage.updateSingnalInfo));
routers.set("/deleteSingnalInfo",new RouterInfo(MethodEnum.DELETE, "/deleteSingnalInfo",signalManage.deleteSingnalInfo));
routers.set("/getStorageInfo",new RouterInfo(MethodEnum.GET, "/getStorageInfo",staticManage.getStorageInfo));
routers.set("/getDiskUsedTrend",new RouterInfo(MethodEnum.GET, "/getDiskUsedTrend",staticManage.getDiskUsedTrend));
routers.set("/getStorageOfEachStation",new RouterInfo(MethodEnum.GET, "/getStorageOfEachStation",staticManage.getStorageOfEachStation));
routers.set("/getFoloderInfo",new RouterInfo(MethodEnum.GET, "/getFoloderInfo",staticManage.getFoloderInfo));
routers.set("/downLoad",new RouterInfo(MethodEnum.GET, "/downLoad",staticManage.downLoad));

routers.set("/getTaskParam",new RouterInfo(MethodEnum.GET,"/getTaskParam",stationManage.getTaskParam))
routers.set("/powerOperation",new RouterInfo(MethodEnum.PUT,"/powerOperation",stationManage.powerOperation));

module.exports={
    MethodEnum,
    RouterInfo,
    routers,
    moudles,
}