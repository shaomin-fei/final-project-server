//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:29:11
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-15 11:11:26
 */

const http = require('http')
  , https = require('https')
  , express = require('express')
  , app = express();

  const port=3005;
const routers=require("./config/router");

http.createServer(app).listen(port);
//https.createServer({ ... }, app).listen(port+1);
https.createServer(null, app).listen(port+1);

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
