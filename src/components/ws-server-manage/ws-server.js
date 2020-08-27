//@ts-check
/*
 * @Description: 
 * @version: 1.0
 //@ts-check
 * @Author: shaomin fei
 * @Date: 2020-08-26 10:40:02
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-26 16:27:33
 */

const socketIO=require("socket.io");
const BaseManage=require("../../common/interfaces/base-manage");
const TaskManage=require("../../components/task-manage/task-manage");

//const NetConfig=require("../../config/netconfig");


class WSServerManage extends BaseManage{
    options={};
    socket=null;
    taskManage=new TaskManage();
    constructor(){
        super();
    }
    
    start(httpServer){
        this.socket=socketIO(httpServer,this.options);
        this.socket.on("connection",this.newConnection);
    }
    /**
     * @Date: 2020-08-26 11:18:44
     * @Description: 
     * @param {import("socket.io").Socket}  newSocket
     * @return {void} 
     */
    newConnection=(newSocket)=>{
        //  客户端在emit的时候，要求回执，则服务端响应的时候，传回调，在回调里面，将要回执的参数发回客户端
        newSocket.on("startTask",(data,fn)=>this.startTask(newSocket,data,fn));
        newSocket.on("stopTask",(data,fn)=>this.stopTask(newSocket,data,fn))
        newSocket.on("disconnect",(data)=>this.disconnected(newSocket,data));
    }
    startTask=(soc,data,fn)=>{  
        console.log("starttask",soc,data);
        this.taskManage.startTask(data,soc,fn);
       
    }
    send=(data,soc)=>{
        try {
            soc.send(data);
        }catch(e){
            console.log("send error",e)
        }
    }
    disconnected=(soc,data)=>{
        console.log("disconneced");
    }
    stopTask=(soc,{taskId},fn)=>{
        console.log("stop",taskId);
        this.taskManage.stopTask(taskId,fn);
    }
    stop(){
        
    }
}
module.exports=WSServerManage;
