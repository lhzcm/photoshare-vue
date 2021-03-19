<template>
    <div class="fileupload" ref="filepanel" @click="selectFile"><input @change="upload" type="file" ref="imgfile"/></div>
</template>


<script>
//import axios from 'axios'
//import config from "./config.js"
import request from "../utility/request.js"

export default {
    props: {
        height: String,
        width: String,
    },
    data: function(){
        return {

        }
    },
    methods: {
        selectFile: function(){
            //this.$emit("fileUpload", "测试")
            this.$refs.imgfile.click()
        },
        upload: function(){
            if(!this.$refs.imgfile.value || this.$refs.imgfile.value == ""){
                return
            }

            var form = new FormData()
            form.append("img", this.$refs.imgfile.files[0])
            // axios.post(config.host + "/messages/uploadimg", form, function(res){
            //     console.log(res)
            // })
            request.post("/messages/uploadimg", form, function(res){
                console.log(res)
            })
        }
    },
    mounted: function(){
        if(this._props.height && this._props.width){
            this.$refs.filepanel.style.height = this._props.height
            this.$refs.filepanel.style.width = this._props.width
            this.$refs.filepanel.style.backgroundSize =  this._props.height + ' ' +  this._props.width
        }
    }
}
</script>

<style scoped>
.fileupload{
    height: 60px;
    width: 60px;
    background-size: 60px 60px;
    background-image: url("../static/img/imgupload.png");   
}
.fileupload input{
    display: none;
}
</style>
