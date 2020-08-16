/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 10:51:16
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-15 11:12:14
 */
class StationManage{
    
    static getAllStations(res,req){
        return req.send("hello stations");
    }
}

exports.StationManage=StationManage;