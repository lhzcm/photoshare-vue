<template>
    <div>
        <h1>星球页面开发中....</h1> 
        <div id="container"></div>
        <div ref="pannel"></div>
    </div>

</template>

<script>
export default {
    mounted:function(){
        this.$refs.pannel.innerHTML = "<script src='//api.map.baidu.com/api?v=2.0&ak=w0i7m5pxg8VFkarU5Tmu9gi9j2VDggEY'>var map = new BMap.Map('container')"
        +`var map = new BMap.Map("container");    
var point = new BMap.Point(116.404, 39.915);    
map.centerAndZoom(point, 15);    
window.setTimeout(function(){  
    map.panTo(new BMap.Point(116.409, 39.918));    
}, 2000);`
    }
}
</script>