<template>
    <div class="tabbar">
        <div><span class="iconfont icon-earth-full"></span></div>
        <div><span class="iconfont icon-dongtai"></span></div>
        <div><span class="iconfont icon-fabu"></span></div>
        <div><span class="iconfont icon-liaotian"></span></div>
        <div><span class="iconfont icon-wo"></span></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style src="../static/icon/iconfont.css" scoped></style>
<style scoped>
.tabbar{
    height: 44px;
    width: 100%;
    background-color:red;
    display: flex;
    flex-direction: row;
    justify-items:auto;
}
.tabbar div{
    width: 20%;
    line-height: 44px;
}
.tabbar div span{
    font-size: 24px;
    color:white
}
</style>