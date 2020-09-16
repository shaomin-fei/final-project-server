//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:29:11
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-09-16 00:03:59
 */
// const NetSpeed=require("./common/net/net-speed");
// NetSpeed.ping("https://inews.gtimg.com/newsapp_bt/0/12297493709/1000",({timeCost,speed})=>{
//   console.log(timeCost,speed);
// });



const http = require('http')
  , https = require('https')
  , express = require('express')
  , app = express();
// 跨域
const cors=require("cors");
  // app.use((req,res,next)=>{
  //   // 跨域访问，*表示每个接口，这样客户端不需要设置代理
  //   res.setHeader("Access-Control-Allow-Origin","*");
  //   next();
  // });
  app.use(cors());
  const bodyParser=require("body-parser")
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const port=3005;


const routers=require("./config/router");
const Boot=require("./boot");

const httpServer=http.createServer(app);
const options={};


httpServer.listen(port);
//const socketIO=require("socket.io");
//const tt=socketIO(httpServer,options);
//https.createServer({ ... }, app).listen(port+1);
const httpsServer=https.createServer(null, app).listen(port+1);

routers.routers.forEach((value,key)=>{
  switch(value.method){
    case routers.MethodEnum.GET:{
      app.get(key,value.func);
      break;
    }
    case routers.MethodEnum.POST:{
      app.post(key,value.func);
      break;
    }
    case routers.MethodEnum.PUT:{
      app.put(key,value.func);
      break;
    }
    case routers.MethodEnum.DELETE:{
      app.delete(key,value.func);
      break;
    }

  }
  
})

const boot=new Boot();
boot.start(routers.moudles,httpServer);
process.on("exit",()=>{
  boot.stop(routers.moudles);
});
// httpServer.on("close",()=>{
// boot.stop();
// });
// httpServer.on("error",()=>{
//   boot.stop();
// })
// app.on("close",()=>{
//   boot.stop();
// })

