//@ts-check
/*
 * @Description: 
 * @version: 1.0
 * @Author: shaomin fei
 * @Date: 2020-08-17 07:47:38
 * @LastEditors: shaomin fei
 * @LastEditTime: 2020-08-17 08:23:10
 */
const axios =require("axios").default;

class NetSpeed{

    static async ping(url,callBack){
        let startDate=Date.now();
        const res=await axios({
            method:"GET",
            url:url,
            responseType: "stream",
        });
        let endDate=Date.now();
        let timeCost=endDate-startDate;
        let speed=0;
        if(res.status===200){
            res.data.readableLength
            speed=Math.round((res.data.readableLength/timeCost));
        }
        callBack({timeCost,speed});
        console.log("time",timeCost);
        //let speed=res.data
    }
}
module.exports=NetSpeed;
