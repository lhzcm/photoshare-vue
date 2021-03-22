<template>
    <div class="pannel">
        <div class="list">
            <button @click="switchSearch">查找好友</button>
            <div v-for="item in invitedList" :key="item.Id" class="invitedInfo">
                <div>
                    <img :src="item.Headimg" />
                    <div>{{item.Name}}</div>
                </div>
                <button @click="add(item.Id)">添加</button>
            </div>
        </div>
        <div v-show="isSearch" @click="switchSearch" class="mark">
            <div @click.stop><input type="text" ref="search" v-model="id" @keydown="onSearch" placeholder="请输入用户ID或手机号码" /></div>
            <div v-if="userInfo" @click.stop class="user">
                <div>
                    <img :src="userInfo.Headimg" />
                    <div>{{userInfo.Name}}</div>
                </div>
                <button @click="add(userInfo.Id)">添加</button>
            </div>
        </div>
    </div>    
</template>

<script>
import request from '../utility/request.js'
export default {
    data: function(){
        return {
            isSearch: false,
            id:"",
            userInfo: null,

            invitedList: [],
            page: 1,
            pagesize: 20,
            status: 0,
        }
    },
    created: function(){
        var that = this
        request.get("/invite/"+that.page+"/"+that.pagesize+"/"+that.status+"","",function(res){
            that.invitedList = res.list
        })
    },
    methods:{
        switchSearch: function(){
            this.isSearch = !this.isSearch;
            if(this.isSearch){
                 this.$refs.search.focus()
            }
        },
        onSearch: function(e){
            var that = this
            //判断是否是回车发送
            if(e.type == 'keydown' && e.keyCode == 13){
                request.get("/friend/search/" + this.id, "", function(res){
                    that.userInfo = res
                })
            }
        },
        add: function(id){
            request.post("/invite",{
                "invitedid" : id,
                "message" : "邀请你为好友"
            },function(res){
                alert(res)
            })
        }
    }
}
</script>

<style scoped>

.pannel{
    position: relative;
    overflow: hidden;
}
.list button{
    position: absolute;
    right: 0px;
    z-index: 8;
}

.invitedInfo{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    background-color: #00000075;
    margin-bottom: 1px;
    font-size: 16px;
    margin-top: 10px;
}
.invitedInfo > div {
    display:flex;
    flex-direction: row;
}
.invitedInfo > div img{
    width: 60px;
    height: 60px;
    margin: 0 10px 0 5px;
    background-size: 60px 60px;
    border-radius: 60px;
}

.invitedInfo > div > div:first-of-type{
    font-weight: bold;
    color: white;
    text-align: 60px;
    line-height: 60px;
}

.invitedInfo button{
    height: 26px;
    border-radius: 26px;
    width: 50px;
    background-color: #1fd841cf;
    color: white;
    border: none;
    margin-top: 17px;
    outline: none;
}


.mark{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    background-color: #000000b0;
    animation: show 1s cubic-bezier(1,0,0.38,0.96);
    top: 0%;
}
.mark input{
    background-color: #00000073;
    height: 30px;
    width: 38rem;
    border: 2px #bfbfbf solid;
    border-radius: 30px;
    margin-top: 20px;
    color: white;
    outline: none;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
}

.user{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    background-color: #00000075;
    margin-bottom: 1px;
    font-size: 16px;
    margin-top: 10px;
}
.user > div {
    display:flex;
    flex-direction: row;
}
.user > div img{
    width: 60px;
    height: 60px;
    margin: 0 10px 0 5px;
    background-size: 60px 60px;
    border-radius: 60px;
}

.user > div > div:first-of-type{
    font-weight: bold;
    color: white;
    text-align: 60px;
    line-height: 60px;
}

.user button{
    height: 26px;
    border-radius: 26px;
    width: 50px;
    background-color: #1fd841cf;
    color: white;
    border: none;
    margin-top: 17px;
    outline: none;
}

@keyframes show {
    0% {top: 100%;}   
    100% {top: 0%;} 
}


input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
color: #666;font-size:20px;
}
input:-moz-placeholder, textarea:-moz-placeholder {
color:#666;font-size:20px;
}
input::-moz-placeholder, textarea::-moz-placeholder {
color:#666;font-size:20px;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
color:#666;font-size:20px;
}
</style>