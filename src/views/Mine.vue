<template>
    <div class="pannel">
        <div class="mine">
            <img :src="userInfo.Headimg" />
            <div>
                <div>{{userInfo.Name}}</div>
                <div>ID:{{userInfo.Id}}</div>
            </div>
        </div>
        <div class="addfriend">
            <span class="iconfont icon-haoyoutuijie"></span>
            <div>好友添加</div>
        </div>
    </div>
</template>

<script>
import user from '../utility/user.js'
export default {
    data: function() {
        return{
            userInfo: {}
        }
    },
    created :function(){
        var that = this
        user.getUserInfoCallBack(function(userinfo){
            that.userInfo = userinfo
        })
    }
}
</script>

<style scoped>
.pannel{
    background-color: whitesmoke;
    overflow-y: scroll;
}
.pannel > div{
    background-color: white;
}

.mine{
    height: 80px;
    width: 100%;
    display:flex;
    flex-direction: row;
    border-bottom: 1px #00000026 solid;
    text-align: left;
}
.mine img{
    height: 80px;
    width: 80px;
}

.mine > div{
    margin-left: 10px;
}

.mine > div > div:first-of-type{
    font-size: 20px;
    font-weight: bold;
    height: 50px;
    line-height: 60px;
}

.addfriend{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    height: 48px;
    border-top: 1px #00000026 solid;
    border-bottom: 1px #00000026 solid;
}
.addfriend span{
    font-size: 30px;
    color: #34b10b;
    margin-left: 5px;
    line-height: 44px;
}
.addfriend div{
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
    line-height: 48px;
    color: #6c6c6c;
}
</style>

<style src="../static/icon/iconfont.css" scoped>
</style>