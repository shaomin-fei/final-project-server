/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-18 20:41:52
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-18 23:14:05
 */
const DbStations=require("../dababase/db-stations");
const BaseManage=require("../../common/interfaces/base-manage");
class SignalManage extends BaseManage{
    dbStations=new DbStations();
    start(){
        //this.centerTree=this.dbStations.getStations()||null;
        this.dbStations.start();
    }
    stop(){
        this.dbStations.stop();
    }
    getSignalStaticByReason=(req,res)=>{
        const signal=this.dbStations.getSignalStaticByReason();
        const result=JSON.stringify(signal);
        res.send(result);
    }

}
module.exports=SignalManage;