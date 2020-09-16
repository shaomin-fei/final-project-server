//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 15:08:26
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-16 00:25:32
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
     * @type {Array<object>}
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
  
    addSingnalInfo(signal){
        if(!this.signals){
            this.signals=this.mockSignals();
        }
        if(!signal.key){
            signal.key=Date.now().toString();
        }
        this.signals&&this.signals.push(signal);
        return {success:true};
    }
    updateSingnalInfo(signal){
        if(!this.signals){
            this.signals=this.mockSignals();
        }
        const sigToUpdateIndex=this.signals.findIndex(sig=>{
           return sig.key===signal.key;
        });
        if(sigToUpdateIndex>=0){
            this.signals[sigToUpdateIndex]=signal;
            return {success:true};
        }else{
            return {success:false,errorInfo:"Signal not found"};
        }
        
    }
    deleteSingnalInfo(key){
        if(!this.signals){
            this.signals=this.mockSignals();
        }
        const index=this.signals.findIndex(sig=>{
            return sig.key===key;
        })
        if(index>=0){
            this.signals.splice(index,1);
        }
        return {success:true};
    }
    getDataStorageInfo(){
        return this.mockDataStorageInfo();
    }
    getDiskUsedTrend(){
        return this.mockDiskUsedTrend();
    }
    getStorageOfEachStation(){
        return this.mockStorageOfEachStation();
    }
    getFoloderInfo(queryPath,callback){
        const path=require("path");
        const fs=require("fs");
        let root=path.join(path.resolve()+"/src/dataforquery") ;
        let findPath="";
        if(queryPath==="root"){
            findPath=root;
        }else{
            findPath=root+queryPath;
        }
        const result=[];
        fs.readdir(findPath,(err,files)=>{
            if(err){
                console.log("read file error");
                return;
            }
            files.forEach(fileName=>{
                let pathname = path.join(findPath, fileName);
                const sta=fs.statSync(pathname);
                if(sta.isDirectory()){
                    result.push({
                        name:fileName,
                        type:"folder",
                    });
                }else if(sta.isFile()){
                    result.push({
                        name:fileName,
                        type:"file",
                    });
                }

            });
            callback(result);
        });
        //return result;
    }
    downLoad(filePath,fileName,res){
        const path=require("path");
        const fs=require("fs");
        let root=path.join(path.resolve()+"/src/dataforquery") ;
        const file=root+filePath+"/"+fileName;
        if(!fs.existsSync(file)){
            res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }else{
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+encodeURI(fileName)
            });
            const fReadStream = fs.createReadStream(file);
            fReadStream.on("data",function(chunk){res.write(chunk,"binary")});
            fReadStream.on("end",function () {
                res.end();
            });
        }
    }

    mockStorageOfEachStation=()=>{
        const fs=require("fs");
        const path=require("path");
        const content=fs.readFileSync(path.join(__dirname,"data-storage-station.json"),{
            encoding:"utf-8",
            flag:"r"
        });
        return JSON.parse(content);
    }
    mockDiskUsedTrend=()=>{
        const fs=require("fs");
        const path=require("path");
        const content=fs.readFileSync(path.join(__dirname,"data-storage-trend.json"),{
            encoding:"utf-8",
            flag:"r"
        });
        return JSON.parse(content);
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