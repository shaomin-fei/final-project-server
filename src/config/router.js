//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:47:03
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-15 11:14:20
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
const StationManage=require("../stations/station-manage")
/**
 * @type {Map<string,RouterInfo>}
 */
const routers=new Map();

routers.set("/getStations",new RouterInfo(MethodEnum.GET, "/getStations",StationManage.StationManage.getAllStations));
module.exports={
    MethodEnum,
    RouterInfo,
    routers,
}