<template>
    <div class="fileupload" ref="filepanel" @click="selectFile">
        <input @change="upload" type="file" accept=".jpg, .jpeg, .png, .gif" ref="imgfile" width="60px"/>
    </div>
</template>


<script>
//import axios from 'axios'
//import config from "./config.js"
import request from "../utility/request.js"

export default {
    props: {
        url: String,
        height: String,
        width: String,
    },
    data: function(){
        return {
            uploadurl: "",
        }
    },
    created:function(){
        console.log(this._props)
        this.uploadUrl = this._props.url ? this._props.url : "/messages/uploadimg"
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
            var that = this

            that.bus.$emit("loading",true)
            request.post(this.uploadUrl, form, function(res){
                that.$emit("fileUpload", res)
                that.bus.$emit("loading", false)
                that.$refs.imgfile.value=""
            },function(){
                that.bus.$emit("loading", false)
                that.$refs.imgfile.value=""
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
