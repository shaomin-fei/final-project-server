//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-16 15:08:26
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-17 17:19:39
 */

const BaseManage=require("../../common/interfaces/base-manage");
const CenterInfo = require("../../common/data/center");
const { json } = require("express");
const { ENETDOWN } = require("constants");
const Utils=require("../../common/Utils");
const Station = require("../../common/data/station");
class DbStations extends BaseManage{
    /**
     * @type {CenterInfo}
     */
    centerTree=null;
    /**
     * @type {Array<object>}
     */
    signals=null;

    environWarning=null;

    constructor(){
        super();
    }
    start(params){
// todo get stations from db
    }
    stop(){
        
    }
    addStation(stationInfo){
        const sta=new Station();
        if(!stationInfo.id){
            sta.id=Date.now().toString();
        }
        sta.lat=stationInfo.lat;
        sta.name=stationInfo.name;
        sta.lon=stationInfo.lon;
        sta.url=stationInfo.url;
        sta.netSpeed=1000;
        sta.netband=20;
        sta.devicesUrl=stationInfo.devicesUrl;
        sta.environment={
            Temperature:{
                value:43,
                unit:"°C",
                warnning:0
            },
            Humidity:{
                value:53,
                unit:"%",
                warnning:0
            },
            Smoke:{
                value:"No",
                unit:"",
                warnning:0
            },
            Access:{
                value:"No",
                unit:"",
                warnning:0
            },
            Voltage:{
                value:223,
                unit:"V",
                warnning:0
            },
            Current:{
                value:2.3,
                unit:"A",
                warnning:0
            }
        };
        sta.devices=[{
            stationId:sta.id,
            id:"device_"+sta.id,
            name:"DDF255",
            status:"idle",
            runningTasks:[],
            url:stationInfo.devicesUrl[0],
            abilities:[
                {
                    name:"FIXFQ",
                    param:"<Params Type=\"0\"><Param><Name>CenterFreq</Name><ShowName>Frequency</ShowName><MaxValue>6000.000000</MaxValue><MinValue>20.000000</MinValue><Type>Number</Type><Unit>MHz</Unit><Advanced>False</Advanced><SelectOnly>False</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>101.7</DefaultValue><Value>101.7</Value><Helper>中心频率设置,单位:MHz</Helper></Param><Param><Name>FilterSpan</Name><ShowName>滤波带宽</ShowName><EnumString>0.15|0.3|0.6|1.0|1.5|2.4|6|9|15|30|50|120|150|250|300|500</EnumString><ShowString></ShowString><Type>Enum</Type><Unit>KHz</Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>120</DefaultValue><Value>120</Value><Helper>设置滤波器解调带宽,单位:KHz</Helper></Param><Param><Name>SpectrumSpan</Name><ShowName>频谱带宽</ShowName><EnumString>1|2|5|10|20|50|100|200|500|1000|2000|5000|10000|20000|40000|80000</EnumString><ShowString></ShowString><Type>Enum</Type><Unit>KHz</Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>100</DefaultValue><Value>100</Value><Helper>设置频谱的视距带宽,单位:KHz</Helper></Param><Param><Name>Demodulation</Name><ShowName>解调制式</ShowName><EnumString>FM|AM|IQ|LSB|USB|CW</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>FM</DefaultValue><Value>FM</Value><Helper>设置接收机解调方式</Helper></Param><Param><Name>RFMode</Name><ShowName>射频模式</ShowName><EnumString>LOWN|LOWD|NORM</EnumString><ShowString>低噪声|低失真|正常</ShowString><Type>Enum</Type><Unit></Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>NORM</DefaultValue><Value>NORM</Value><Helper>射频模式，分为低噪声|低失真|正常</Helper></Param><Param><Name>MeasureTime</Name><ShowName>测量时间</ShowName><EnumString>DEF|0.0005|0.001|0.01|0.1</EnumString><ShowString></ShowString><Type>Enum</Type><Unit>s</Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>DEF</DefaultValue><Value>DEF</Value><Helper>测量时间,单位:秒</Helper></Param><Param><Name>DetectType</Name><ShowName>检波方式</ShowName><EnumString>PEAK|AVG|FAST|RMS</EnumString><ShowString>峰值检波|均值检波|快速检波|均方根检波</ShowString><Type>Enum</Type><Unit></Unit><Advanced>True</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>AVG</DefaultValue><Value>AVG</Value><Helper>设置检波方式，峰值|均值|快速|均方值</Helper></Param><Param><Name>SQU</Name><ShowName>静噪门限</ShowName><EnumString>OFF|-30|-20|-10|0|10|20|30|40|50|60|70|80|90|100|110|120|130</EnumString><ShowString></ShowString><Type>Enum</Type><Unit>dBuV</Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>OFF</DefaultValue><Value>OFF</Value><Helper>静噪门限,单位:dBuV</Helper></Param><Param><Name>AFC</Name><ShowName>自动频率控制</ShowName><EnumString>OFF|ON</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>True</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>OFF</DefaultValue><Value>OFF</Value><Helper>自动频率控制</Helper></Param><Param><Name>ATT</Name><ShowName>衰减控制</ShowName><EnumString>OFF|ON|AUTO</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>True</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>AUTO</DefaultValue><Value>AUTO</Value><Helper>接收机衰减器控制</Helper></Param><Param><Name>GCType</Name><ShowName>增益控制</ShowName><EnumString>AUTO|-30|-20|-10|0|10|20|30|40|50|60|70|80|90|100</EnumString><ShowString></ShowString><Type>Enum</Type><Unit>dB</Unit><Advanced>True</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>AUTO</DefaultValue><Value>AUTO</Value><Helper>接收机增益控制,单位:dB</Helper></Param><Param><Name>MEABWMode</Name><ShowName>测量带宽模式</ShowName><EnumString>XDB|BETA</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>True</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>XDB</DefaultValue><Value>XDB</Value><Helper>ITU带宽测量方式</Helper></Param><Param><Name>AntennaSelection</Name><ShowName>天线选择</ShowName><EnumString>Monitor|DF</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>Monitor</DefaultValue><Value>Monitor</Value><Helper>天线选择,分为:监测天线|测向天线</Helper></Param><Param><Name>Polarization</Name><ShowName>极化方式</ShowName><EnumString>Horizontal|Vertical</EnumString><ShowString></ShowString><ReliedParams Name=\"AntennaSelection\"><ReliedParam><ReliedParamValue>监测天线</ReliedParamValue><DefaultParamValue>垂直极化</DefaultParamValue><CurrentParamValue>垂直极化</CurrentParamValue></ReliedParam><ReliedParam><ReliedParamValue>测向天线</ReliedParamValue><DefaultParamValue>垂直极化</DefaultParamValue><CurrentParamValue>水平极化|垂直极化</CurrentParamValue></ReliedParam></ReliedParams><Type>Enum</Type><Unit></Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>False</IsSwitch><DefaultValue>垂直极化</DefaultValue><Value>垂直极化</Value><Helper>极化方式,分为:水平极化|垂直极化</Helper></Param><Param><Name>AudioType</Name><ShowName>声音开关</ShowName><EnumString>OFF|ON</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>True</IsSwitch><DefaultValue>OFF</DefaultValue><Value>OFF</Value><Helper>设置是否打开声音通道</Helper></Param><Param><Name>SpectrumSwitch</Name><ShowName>频谱开关</ShowName><EnumString>OFF|ON</EnumString><ShowString></ShowString><Type>Enum</Type><Unit></Unit><Advanced>False</Advanced><SelectOnly>True</SelectOnly><IsSwitch>True</IsSwitch><DefaultValue>ON</DefaultValue><Value>ON</Value><Helper>设置是否打开频谱数据通道</Helper></Param></Params>"
            }
        ]
        }];
        if(!this.centerTree){
            this.mockData();
        }
        this.centerTree.stations.push(sta);
        return {success:true}
    }
    updateStation(stationInfo){
        if(!this.centerTree){
            this.mockData();
        }
        const index=this.centerTree.stations.findIndex(sta=>{
            return sta.id===stationInfo.id;
        });
        if(index<0){
            return {success:false,errorInfo:"Station Not Exist"};
        }
        const newStation={...this.centerTree.stations[index],...stationInfo};
        this.centerTree.stations[index]=newStation;
        return {success:true};
    }
    deleteStation(key){
        if(!this.centerTree){
            this.mockData();
        }
        const index=this.centerTree.stations.findIndex(sta=>{
            return sta.id===key;
        });
        if(index<0){
            return {success:false,errorInfo:"Station Not Exist"};
        }
        this.centerTree.stations.splice(index,1);
        return {success:true};
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
    getEnvStaticByLevel(){
        if(!this.environWarning){
            this.environWarning=this.mockEnvironWarning();
        }
        const result={
            Fatal:0,
            Serious:0,
            General:0
        };
        this.environWarning.forEach(element => {
            if(!element.needCancel){
                return;
            }
            if(element.warningLevel==="Fatal"){
                result.Fatal++;
            }else if(element.warningLevel==="Serious"){
                result.Serious++;
            }else if(element.warningLevel==="General"){
                result.General++;
            }
        });
        return result;
    }
    getEnvWarning(queryCondition){
        if(!this.environWarning){
            this.environWarning=this.mockEnvironWarning();
        }
        const startTime=queryCondition.startTime,
        stopTime=queryCondition.endTime,
        type=queryCondition.type,
        warningLevel=queryCondition.warningLevel,
        stationsName=queryCondition.stationsName;
        const queryStart=Date.parse(startTime);
        const queryStop=Date.parse(stopTime);
        let result=this.environWarning.filter(info=>{
           
            const infoStartTime= Date.parse(info.StartTime);
            const infoStopTime=Date.parse(info.EndTime);
            
            if(infoStartTime>=queryStart&&infoStartTime<=queryStop){
                // time is ok
                let infoType="Unhandled";
                if(!info.needCancel){
                    infoType="Handled";
                }
                if(type.find(ty=>{
                    return ty===infoType;
                })){//type is ok
                    if(stationsName.find(sta=>{
                     return sta===info.Station;
                    })){//station is ok
                        if(warningLevel.find(level=>
                            {
                                return level===info.warningLevel;
                            })){
                            return true;
                        }
                        
                    }
                }
            }
            return false;
        });
        if(!result){
            result=[];
        }
        
        return result;

       
    }
    cancelEnvironWarning(key){
        if(!this.environWarning){
            this.environWarning=this.mockEnvironWarning();
        }
        const index=this.environWarning.findIndex(env=>{
            return key===env.key;
        });
        if(index>=0){
            this.environWarning[index].needCancel=0;
        }
        return {success:true}
    }
    getStationLogInfo(queryCondition){
        const station=queryCondition.stationName;
        const startTime=queryCondition.startTime;
        const stopTime=queryCondition.stopTime;
        const queryStart=Date.parse(startTime);
        const queryStop=Date.parse(stopTime);
        if(!this.environWarning){
            this.environWarning=this.mockEnvironWarning();
        }
        let stationWarnings=this.environWarning.filter(warning=>{
            const infoStartTime= Date.parse(warning.StartTime);
            const infoStopTime=Date.parse(warning.EndTime);
            if(infoStartTime>=queryStart&&infoStartTime<=queryStop){
                //time ok
                if(warning.Station===station){
                    return true;
                }
            }
        });
        if(!stationWarnings){
            stationWarnings=[];
        }
        const latestTime="1970-01-01 00:00:00";
        let latest=Date.parse(latestTime);
        stationWarnings.forEach(sta=>{
            const warningTime= Date.parse(sta.StartTime);
            if(warningTime>latest){
                latest=warningTime;
            }
        });
        const pieData=this.mockTimePieData();
        const temp={
            totalWarning:stationWarnings.length,
            latestWarning:Utils.dateFormat("YYYY-MM-DD HH:mm:ss",new Date(latest)),
        }
        const daily=this.mockDailyWarning();
        const dailyTemp=daily.filter(dl=>{
            return dl[1]>0;
        })
        temp.totalWarning=dailyTemp.length;
        temp.latestWarning=dailyTemp[dailyTemp.length-1][0];
        const result={...pieData,...temp,dailyData:daily};
        return result;
    }
    mockTimePieData(){
        return {
            warningTime:15,
            workingTime:65,
            idleTime:12,
            shutdownTime:8,
        }
    }
    mockDailyWarning(){
        return this.mockVirtulData(2020);
    }
     mockVirtulData(year) {
         //get date from now back to half year
         const dateNow=new Date();
         const dateHalfBefore=new Date();
         dateHalfBefore.setMonth(dateHalfBefore.getMonth()-6);
        year = year || '2020';
        var date = dateHalfBefore.getTime();
        var end = new Date(dateNow).getTime();
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
           let lastTime= Math.floor(Math.random() *60*24);
           if(lastTime<60){
               lastTime=0;
           }
           lastTime=lastTime/60;//convert to hour
           lastTime = parseFloat(lastTime.toFixed(2));
            data.push([
                Utils.dateFormat('YYYY-MM-DD', new Date(time)),
                lastTime
            ]);
        }
        return data;
    }
    
    mockEnvironWarning=()=>{
        const path=require("path");
        const fs=require("fs");
        const content=fs.readFileSync(path.join(__dirname,"environ-warning.json"),{
            encoding:"utf-8",
            flag:"r"
        });
        /**
         * @type {Array<object>}
         */
        const waringInfo=JSON.parse(content);
        return waringInfo;
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