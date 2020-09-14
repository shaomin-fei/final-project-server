//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 15:08:26
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-13 22:56:44
 */

const BaseManage=require("../../common/interfaces/base-manage");
const CenterInfo = require("../../common/data/center");
const { json } = require("express");
const { ENETDOWN } = require("constants");
class DbStations extends BaseManage{
    /**
     * @type {CenterInfo}
     */
    centerTree=null;
    /**
     * @type {[]}
     */
    signals=null;
    constructor(){
        super();
    }
    start(params){
// todo get stations from db
    }
    stop(){
        
    }
    getStations(){
        // mock data
        if(!this.centerTree){
            this.mockData();
        }
        return this.centerTree;
    }
    getSignalStaticByReason(){

        return this.mockSigalStatic();
    }
    getSignalInfoByTime=(startTime,stopTime)=>{
        if(this.signals===null){
            this.signals=this.mockSignals();
        }
        const start=Date.parse(startTime);
        const end=Date.parse(stopTime);
        const filterSignals= this.signals.filter(signal=>{
            // @ts-ignore
            const time=Date.parse(signal.findTime);
            return (time>=start)&&(time<=end)
        });
        return filterSignals?filterSignals:[];
    }
    getDataStorageInfo(){
        return this.mockDataStorageInfo();
    }
    mockSignals=()=>{
        const path=require("path");
        const fs=require("fs");
        const content=fs.readFileSync(path.join(__dirname,"signals.json"),
        {
            encoding:"utf-8",
            flag:"r"
        }
        );
        return JSON.parse(content);
    }
    mockDataStorageInfo(){
        const path=require("path");
        const fs=require("fs");
        const content=fs.readFileSync(path.join(__dirname,"data-storage.json"),{
            encoding:"utf-8",
            flag:"r",
        });
        return JSON.parse(content);
    }
    mockSigalStatic(){
        const fs=require("fs");
        const path=require("path");
        const content=fs.readFileSync(path.join(__dirname,"signal-warn.json"),{
            encoding:"utf-8",
            flag:"r",
        });
        return JSON.parse(content);

    }
    /**
     * @Date: 2020-08-16 16:19:05
     * @Description: 
   
     * @return {void} 
     */
    mockData(){
        const fs=require("fs");
        const path=require("path");
        const content=fs.readFileSync(path.join(__dirname,"center.json") ,{
            encoding:"utf-8",
            flag:"r"
        });
        this.centerTree=JSON.parse(content);
        
    }
}

module.exports=DbStations;