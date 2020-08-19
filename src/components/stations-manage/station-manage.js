//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:51:16
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-18 11:09:04
 */


 const DbStations=require("../dababase/db-stations");
 const BaseManage=require("../../common/interfaces/base-manage");
const Station = require("../../common/data/station");
const {DeviceInfo,DeviceStatusEnum}=require("../../common/data/device");
 const getSingletonStationManage=(function(){
     let instance=null;
     class StationManage extends BaseManage{
        dbStations=new DbStations();
        //centerTree=null;
        constructor(){
            super();
            if(!instance){
                instance=this;
            }
            return instance;
        }
        start(){
            //this.centerTree=this.dbStations.getStations()||null;
            this.dbStations.start();
        }
        stop(){
            this.dbStations.stop();
        }
        /**
         * not call by object,we just register the function address to routers, so here we must use arrow functon,or this is null
         */
        getAllStations=(req,res)=>{
            this.modifyStationStatus(this.dbStations.getStations().stations);
            const result=JSON.stringify(this.dbStations.getStations(),(key,value)=>{
                if(key==="param"){
                    value="";
                }
                return value;
            }) ;
            return res.send(result);
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
        
    }
    return StationManage;
 })();

exports.StationManage=getSingletonStationManage;