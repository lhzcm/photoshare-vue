<template>
    <div class="pannel">
        <div v-for="item in publishes" :key="item.Id" class="publish">
            <img :src="item.Headimg"/>
            <div>
                <div class="nick">{{item.Name}}</div>
                <div class="content">{{item.Content}}</div>
                <div class="photos">
                    <img  v-for="item2 in item.Photos" :key="item2.Id" :src="item2.Imgurl"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import request from "../utility/request.js"
export default {
    data: function(){
        return {
            publishes: []
        }
    },
    created:function(){
        var that = this
        request.get("/publish/1/10","",function(res){
            that.publishes = res
        })
    }
}
</script>

<style scoped>
.publish{
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px #e4e4e4 solid;
}
.publish > img{
    width: 5rem;
    height: 5rem;
    margin-left: .4rem;
    border-radius: .4rem;
}
.publish > div {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
    width: calc(100% - 6.4rem);
}
.publish .nick{
    margin-top: 1rem;
    color: #003e62;
    font-weight: bold;
    font-size: 1.4rem;
}

.publish > div .photos{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

}

.publish .photos img{
    width: 10rem;
    height: 10rem;
    margin-right: .6rem;
    margin-top: .6rem;
}
.publish .content {
    margin: .6rem 0 .6rem 0;
    font-size: 1.2rem;
}
</style>