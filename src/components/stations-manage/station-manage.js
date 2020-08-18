/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:51:16
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-17 10:03:27
 */


 const DbStations=require("../dababase/db-stations");
 const BaseManage=require("../../common/interfaces/base-manage");
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
            const result=JSON.stringify(this.dbStations.getStations(),(key,value)=>{
                if(key==="param"){
                    value="";
                }
                return value;
            }) ;
            return res.send(result);
        }
        
    }
    return StationManage;
 })();

exports.StationManage=getSingletonStationManage;