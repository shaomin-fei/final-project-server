//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:51:16
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-02 16:36:13
 */


 const DbStations=require("../dababase/db-stations");
 const BaseManage=require("../../common/interfaces/base-manage");
const Station = require("../../common/data/station");
const http=require("http");
const {DeviceInfo,DeviceStatusEnum}=require("../../common/data/device");
const CenterInfo = require("../../common/data/center");
const { stat } = require("fs");
 const getSingletonStationManage=(function(){
     let instance=null;
     class StationManage extends BaseManage{
        dbStations=new DbStations();
        /**
         * @type {CenterInfo}
         */
        center=null;
        //centerTree=null;
        constructor(){
            super();
            if(!instance){
                instance=this;
            }
            return instance;
        }
        start(params){
            //this.centerTree=this.dbStations.getStations()||null;
            this.dbStations.start(null);
        }
        stop(){
            this.dbStations.stop();
        }
        /**
         * not call by object,we just register the function address to routers, so here we must use arrow functon,or this is null
         */
        getAllStations=(req,res)=>{
            if(!this.center){
                this.center=this.dbStations.getStations();
            }
            this.modifyStationStatus(this.center.stations);
            const result=JSON.stringify(this.center,(key,value)=>{
                if(key==="param"){
                    value="";
                }
                return value;
            }) ;
            return res.send(result);
        }
        /**
         * @Date: 2020-08-30 10:00:50
         * @Description: 
        
         */
        getTaskParam=(req,res)=>{
            let param="";
            const {
                stationid,
                deviceid,
                taskname}=req.query;
            const stations=this.dbStations.getStations().stations;

            const station=stations.find((sta)=>{
                return sta.id===stationid;
            });
            if(station){
                const device=station.devices.find((dev)=>{
                    return dev.id===deviceid;
                });
                if(device){
                   const ability= device.abilities.find(abi=>{
                        return abi.name===taskname;
                    });
                    if(ability){
                        param=ability.param;
                    }
                }
            }
            return res.send(param);
        }
        /**
         * @Date: 2020-08-18 10:24:17
         * @Description: 
         * @param {Array<Station>} stations
         * @return {void} 
         */
        modifyStationStatus(stations){
            if(!stations){
                return;
            }
            stations.forEach(station=>{
                let haveFaultDev=0,haveWorkingDev=0,haveShutdownDev=0,haveIdleDev=0;;
                station.devices&&station.devices.forEach(dev=>{
                    if(dev.status===DeviceStatusEnum.FAULT){
                        station.status=DeviceStatusEnum.FAULT;
                        haveFaultDev++;
                    }else if(dev.status===DeviceStatusEnum.WORKING){
                        haveWorkingDev++;
                    }else if(dev.status===DeviceStatusEnum.IDLE){
                        haveIdleDev++;
                    }else if(dev.status===DeviceStatusEnum.SHUTDOWN){
                        haveShutdownDev++;
                    }
                });
                if(haveFaultDev>0){
                    station.status=DeviceStatusEnum.FAULT;
                    
                }
                else if(haveWorkingDev>0){
                    station.status=DeviceStatusEnum.WORKING;
                   
                }
                else if(haveIdleDev>0){
                    station.status=DeviceStatusEnum.IDLE;
                    
                }else if(haveShutdownDev){
                    station.status=DeviceStatusEnum.SHUTDOWN;
                }
                
               
            });
        }
        powerOperation=(req,res)=>{

            const {stationid,value}=req.body;
            const station=this.getStationByID(stationid);
            if(!station){
                console.log("station not found,id=",stationid);
                return res.send("station not found");
            }
            
            setTimeout(() => {
                if(value==="off"){
                    station.status=DeviceStatusEnum.SHUTDOWN;
                    if(station.devices&&station.devices.length>0){
                        station.devices.forEach(dev=>{
                            dev.status=DeviceStatusEnum.SHUTDOWN;
                            dev.runningTasks=[];
                        })
                    }
                }else if(value==="on"){
                    station.status=DeviceStatusEnum.IDLE;
                    if(station.devices&&station.devices.length>0){
                        station.devices.forEach(dev=>{
                            dev.status=DeviceStatusEnum.IDLE;
                            dev.runningTasks=[];
                        })
                    }
                }
                res.send("ok");
            }, 3000);
            //console.log(req);
        }
        getStationByID=(stationid)=>{
            if(!this.center){
                this.center=this.dbStations.getStations();
               
            }
            if(this.center&&this.center.stations&&this.center.stations.length>0){
                return this.center.stations.find((sta)=>{
                    return sta.id===stationid;
                })
            }
            return null;
        }
    }
    return StationManage;
 })();

exports.StationManage=getSingletonStationManage;