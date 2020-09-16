//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-19 22:59:13
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-16 00:16:51
 */
const DbStations=require("../dababase/db-stations");
 const BaseManage=require("../../common/interfaces/base-manage");
const { moudles } = require("../../config/router");
 class StaticManage extends BaseManage{
     static instance=null;
     constructor(){
         super();
         if(StaticManage.instance){
             return StaticManage.instance;
         }
         StaticManage.instance=this;
         this.dbStations=new DbStations();
     }
     getStorageInfo=(req,res)=>{
         const info=this.dbStations.getDataStorageInfo();
         const strInfo=JSON.stringify(info);
         res.send(strInfo);
     }
     getDiskUsedTrend=(req,res)=>{
         const info=this.dbStations.getDiskUsedTrend();
         const strInfo=JSON.stringify(info);
         res.send(strInfo);
     }
     getStorageOfEachStation=(req,res)=>{
        const info=this.dbStations.getStorageOfEachStation();
        const strInfo=JSON.stringify(info);
        res.send(strInfo);
     }
     getFoloderInfo=(req,res)=>{
        this.dbStations.getFoloderInfo(req.query.queryPath,(result)=>{
            const strInfo=JSON.stringify(result);
            res.send(strInfo);
        });
       
     }
     downLoad=(req,res)=>{
        this.dbStations.downLoad(req.query.filePath,req.query.fileName,res);
     }
 }
 module.exports=StaticManage;