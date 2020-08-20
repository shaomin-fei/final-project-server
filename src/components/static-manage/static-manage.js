//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-19 22:59:13
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-20 01:40:05
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
 }
 module.exports=StaticManage;