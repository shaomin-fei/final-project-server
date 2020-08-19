//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 15:08:26
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-18 20:41:12
 */

const BaseManage=require("../../common/interfaces/base-manage");
const CenterInfo = require("../../common/data/center");
const { json } = require("express");
class DbStations extends BaseManage{
    /**
     * @type {CenterInfo}
     */
    centerTree=null;
    constructor(){
        super();
    }
    start(){
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