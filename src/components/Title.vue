<template>
    <div class="title">
        <span @click="gotoBack" class="iconfont icon-fanhui"></span>
        <div>{{titlename}}</div>
    </div>
</template>

<script>
export default {
    name : "titlecomponents",
    props : {
        titlename : String
    },
    methods : {
        gotoBack : function() {
            console.log(1)
            window.history.back()
        }
    }
}
</script>

<style scoped src="../static/icon/iconfont.css">

</style>

<style scoped>
.title{
    width: 100%;
    height: 44px;
    background: tomato;
    text-align: left;
}
.title span{
    font-size: 30px;
    line-height: 44px;
    color: white;
}
</style>
