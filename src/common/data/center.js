/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-15 11:18:42
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-15 11:24:03
 */
//@ts-check
class CenterInfo{
    name="";
    lon="";
    lat="";
    id="";
    /**
     *@typedef {import('./station')} Station
     @type {Array<Station>}
     */
    stations=[];
}
module.exports=CenterInfo;