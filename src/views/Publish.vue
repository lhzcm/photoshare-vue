<template>
    <div class="publish">
        <textarea rows="3" placeholder="分享所见..." v-model="content"></textarea>
        <div>
            <img v-for="item in imgs" :key="item.Id" :src="item.Imgurl" />
            <upload-file @fileUpload="imgUpload" width="60px" url="/publish/uploadimg"></upload-file>
        </div>
        <div id="allmap" class=".allmap"></div>
        <div class="position" @click="getPosition">
            <span>获取所在位置:</span>
            <span v-if="position">{{position}}</span>
            <span class="error" v-if="positionerr">{{positionerr}}</span>
        </div>
        <div class="watch">
            <span>谁可以看:</span>
            
            <!-- <span v-if="type==0">仅自己可见</span>
            <span v-else-if="type==1">好友可见</span>
            <span v-else>所有人可见</span> -->
            <div @click="changeType(0)">
                <input type="radio" name="watch"/>
                <span>仅自己可见</span>
            </div>
            <div @click="changeType(1)">
                <input type="radio" checked="checked" name="watch"/>
                <span>好友可见</span>
            </div>
            <div @click="changeType(2)"> 
                <input type="radio" name="watch"/>
                <span>所有人可见</span>
            </div>
        </div>
        <button @click="publish">确定发布</button>
    </div>
</template>

<script>
import UploadFile from '../components/UploadFile.vue'
import Config from '../utility/config.js'
import BMap from 'BMap'
//import BMAPSTATUSSUCCESS  from 'BMAPSTATUSSUCCESS'
import request from '../utility/request.js'

export default {
    components:{
        UploadFile
    },
    data: function(){
        return{
            content: "",
            imgs:[],
            position: null,
            positionerr: null,
            lng: 0,
            lat: 0,
            type: 1,
        }
    },
    methods:{
        imgUpload:function(res){
            res.Imgurl = Config.publishImgUrl + res.Imgurl
            this.imgs.push(res)
        },
        getPosition: function(){
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,12);

            var geolocation = new BMap.Geolocation();
            // 开启SDK辅助定位
            geolocation.enableSDKLocation();
            var that = this
            geolocation.getCurrentPosition(function(r){
                that.bus.$emit("loading",true)
                if(this.getStatus() == 0){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    point = r.point
                    //获取定位地址
                    var gc = new BMap.Geocoder();
                    that.lng = parseFloat(r.point.lng)
                    that.lat = parseFloat(r.point.lat)
                    gc.getLocation(point, function(rs){
                        that.bus.$emit("loading",false)
                        var addComp = rs.addressComponents;
                        that.position =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
                    });
                that.positionerr = null;
                } else {
                    that.bus.$emit("loading",false)
                    that.positionerr = "获取定位失败"
                    that.position = null
                }
            });
        },
        changeType: function(type){
            this.type = type
        },
        publish: function(){
            var that = this
            var imgsStr = [];
            that.imgs.forEach((item)=>{
                imgsStr.push(item.Id.toString())
            })
            that.bus.$emit("loading", true)
            request.post("/publish",{
                "content": that.content,
                "imgs": imgsStr.join(","),
                "type": that.type,
                "lng": that.lng,
                "lat": that.lat,
                "position": that.position ? that.position : ""
            },function(){
                that.bus.$emit("loading", false)
                alert("发布成功")
                that.$router.push("/dynamic")
            },function(){
                that.bus.$emit("loading", false)
            })
        }
    }
}
</script>

<style scoped>
.publish{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.publish textarea{
    width: 96%;
    height: 13rem;
    font-size: 1.6rem;
    border: none;
    margin-top: 10px;
    resize: none;
}
.publish > div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
}

.publish > div > img{
    height: 12rem;
    margin: 4px 5px;
}

.publish .allmap{
    display: none;
}
.publish .position {
    height: 4rem;
    line-height: 4rem;
    font-size: 1.3rem;
    border-top: 1px rgb(225, 225, 225) solid;
    border-bottom: 1px rgb(225, 225, 225) solid;
}
.publish .position span{
    margin: 0 10px 0 10px;
}
.publish .position span:nth-child(2){
   font-size: 1rem;
}
.publish .position .error{
    color: red;
    font-size: 1rem;
}

.publish .watch{
    height: 4rem;
    line-height: 4rem;
    font-size: 1.3rem;
    border-bottom: 1px rgb(225, 225, 225) solid;
}
.publish .watch span{
    margin: 0 10px 0 10px;
}
.publish .watch div{
    font-size: 1rem;
}
.publish .watch div span{
    font-size: 1rem;
    margin-left: 0 ;
}

.publish button{
    margin-top: 10px;
    width: 10rem;
    height: 4rem;
    font-size: 1.6rem;
    border:none;
    border-radius: 1rem;
    font-weight: bold;
    color:white;
    line-height: 4rem;
    background-color: rgb(7 193 96)
}


</style>