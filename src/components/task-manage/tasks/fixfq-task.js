//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-26 16:01:19
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-31 11:18:55
 */
const BaseTask=require("./base-task");

const ExecuteParam=require("../../../common/data/execute-task-param");
const { read } = require("fs");
const path=require("path");

class FixfqTask extends BaseTask{

     interval=null;
     /**
     * @param {ExecuteParam} executeParam
     * @returns {boolean}
     */
    start(executeParam){
        super.start(executeParam);
        this.startVirtual(executeParam);
        return true;
    }
    stop(){
        this.stopVirtual();
    }



    stopVirtual(){
        this.interval&&clearInterval(this.interval);
        this.fileFd&&this.fs.close(this.fileFd,(err)=>{
            console.log("close file error:",err);
        });
       
    }
    fs=require("fs");
     fileFd=null;
    /**
     * @param {ExecuteParam} executeParam
     * @returns {void}
     */
     
    startVirtual(executeParam){
        let filePath="";

        const param=executeParam.params;
        const szParam=param.split(";");
        const freqParam=szParam.find(pa=>{
            if(pa.indexOf("CenterFreq")!=-1){
                return true;
            }
            return false;
        })
        let freq=0;
        if(!freqParam){
            const szFreq=freqParam.split("=");
            freq=parseFloat(szFreq[1]);
        }
        if(freq>95){
            filePath=path.join(path.resolve()+"/src/data/FIXFQ/101700000_120000_20200731_172353_0000.FIXFQ") ;
        }else{
            filePath=path.join(path.resolve()+"/src/data/FIXFQ/90000000_120000_20200731_172741_0000.FIXFQ") ;
           
        }
        console.log(filePath,__dirname);
        
        this.fileFd=this.fs.openSync(filePath,"r");
        let fileLen=0;
        fileLen=this.fs.statSync(filePath).size;
        let readIndex=0;
        let bufHead=Buffer.alloc(4);
        this.interval=setInterval(() => {
            if(!this.fileFd){
                return;
            }
            this.fs.readSync(this.fileFd,bufHead,0,bufHead.length,readIndex);
            const packageLen=bufHead.readInt32LE(0);
            let byContent=Buffer.alloc(packageLen);
            const read=this.fs.readSync(this.fileFd,byContent,0,byContent.length,readIndex);
            readIndex+=read;
            this.sendTaskData(byContent);
            if(readIndex>=fileLen){
                readIndex=0;
            }

        }, 18);
    }
    
}
module.exports=FixfqTask;