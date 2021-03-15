<template>
    <div class="content">
        <div class="panel">
            <div>
                <span class="iconfont icon-yonghu"></span>
                <input v-model="account" type="text"/>
            </div>
            <div>
                <span class="iconfont icon-suo"></span>
                <input v-model="password" type="password"/>
            </div>
            <div>
                <button>注册</button>
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../utility/request.js'
import user from '../utility/user.js'
import md5 from '../utility/md5.js'

export default {
    data:function(){
        return{
            account: "",
            password:""
        }
    },
    methods:{
        login: function(){
            var that = this
            request.post("user/login",{
                "Id" : parseInt(this.account),
                "Password" : this.password
            },
            function(data){
                user.userInfo = data
                console.log(user)
                that.$router.push("/friends")
            })
            console.log(md5)
        }
    }
}
</script>

<style scoped src="../static/icon/iconfont.css">
</style>

<style scoped>

.content{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.panel{
    width: 30rem;
    height: 30rem;
    border: 1px aliceblue solid;
    background-color:#f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2rem;
}
.panel div{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.panel div span{
    color:gray;
    margin-right: 5px;
    font-size: 1.8rem;
}
.panel div input{
    width: 16rem;
    height: 2rem;
    border: 1px grey solid;
    font-size: 1rem;
    border-radius: .5rem;
    outline: none;
}
.panel div input:first-of-type{
        margin-bottom: 2rem;
       
}

.panel div button{
    width: 6rem;
    height: 2.4rem;
    border: 1px grey solid;
    background-color: #d8544c;
    border-radius: 1rem;
    color: white;
    margin: 0 1rem;
    font-size: 1rem;
    outline: none;
}

.panel div button:first-of-type{
     background-color: burlywood;
}


input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
color: #666;font-size:2rem;
}
input:-moz-placeholder, textarea:-moz-placeholder {
color:#666;font-size:2rem;
}
input::-moz-placeholder, textarea::-moz-placeholder {
color:#666;font-size:2rem;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
color:#666;font-size:2rem;
}
</style>