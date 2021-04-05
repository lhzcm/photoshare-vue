<template>
    <div class="publish">
        <textarea rows="3" placeholder="分享所见..."></textarea>
        <div>
            <img v-for="item in imgs" :key="item.Id" :src="item.Imgurl" />
            <upload-file @fileUpload="imgUpload" width="60px" url="/publish/uploadimg"></upload-file>
        </div>
    </div>
</template>

<script>
import UploadFile from '../components/UploadFile.vue'
import Config from '../utility/config.js'
export default {
    components:{
        UploadFile
    },
    data: function(){
        return{
            imgs:[],
        }
    },
    methods:{
        imgUpload:function(res){
            res.Imgurl = Config.publishImgUrl + res.Imgurl
            this.imgs.push(res)
        }
    }
}
</script>

<style scoped>
.publish{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center
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
</style>