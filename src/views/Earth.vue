<template>
    <div>
        <!-- <h1>星球页面开发中....</h1> -->
        <upload-file height="20px" width="20px" @fileUpload="fileUpload"></upload-file>
    </div>
</template>

<script>
import UploadFile from "../components/UploadFile.vue"
export default {
    components:{
        UploadFile
    },
    methods:{
        fileUpload: function(e){
            console.log(e)
        }
    }
}
</script>