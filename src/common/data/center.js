/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 11:18:42
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-16 16:22:07
 */
//@ts-check
class CenterInfo{
    name="";
    lon=0;
    lat=0;
    id="";
    /**
     *@typedef {import('./station')} Station
     @type {Array<Station>}
     */
    stations=[];
}
module.exports=CenterInfo;