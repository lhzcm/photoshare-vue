<template>
    <div><h1>动态页面开发中....</h1></div>
</template>


<script>
import request from "../utility/request.js"
export default {
    created:function(){
        request.get("/publish/1/10","",function(res){
            console.log(res)
        })
    }
}
</script>