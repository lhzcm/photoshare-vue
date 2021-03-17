<template>
    <div class="content">
        <div class="tab">
            <div :class="ispassword?'active':''" @click="tabSwitch(true)">账号登录</div>
            <div :class="ispassword?'':'active'" @click="tabSwitch(false)">手机登录</div>
        </div>
        <div v-if="ispassword" class="panel">
            <div>
                <span class="iconfont icon-yonghu"></span>
                <input v-model="account" placeholder="请输入账号或手机号" type="text"/>
            </div>
            <div>
                <span class="iconfont icon-suo"></span>
                <input v-model="password" placeholder="请输入密码" type="password"/>
            </div>
            <div>
                <button @click="register">注册</button>
                <button @click="login">登录</button>
            </div>
        </div>
        <div v-else class="panel2">
            <div>
                <span class="iconfont icon-yonghu"></span>
                <input v-model="phone" placeholder="请输入手机号码" type="text"/>
                <button @click="getCode">验证</button>
            </div>
            <div v-if="code > 0" class="msg">请用该手机号发送<span>{{"xin#"+code}}</span>到<span>13556000271</span></div>
        </div>
    </div>
</template>

<script>
import request from '../utility/request.js'
import user from '../utility/user.js'
import socket from '../utility/socket.js'
import common from '../utility/common.js'

export default {
    data:function(){
        return{
            ispassword: true, //是否密码登录
            account: "",
            password:"",
            phone: "",
            curphone:"",
            code:0,
            interval: null
        }
    },
    beforeCreate: function(){
        //用户已经登录不允许返回到登录界面
        if(user.userInfo){
            this.$router.push("/friends")
        }
    },
    methods:{
        login: function(){
            var that = this
            var password = that.password.trim()
            var account = that.account.trim()
            var phone = ""

            if (password == ""){
                alert("密码不能为空")
                return 
            }
            if(account == ""){
                alert("账号不能为空")
                return
            }
            //判断是否手机号登录
            if(account.length == 11){
                phone = account;
                account = "0";
            }

            password = common.md5Convert(password)

            request.post("/user/login",{
                "Id" : parseInt(account),
                "Phone": phone,
                "Password" : password
            },
            function(data){
                user.userInfo = data
                console.log(user)
                socket.connect()
                that.$router.push("/friends")
            })

        },
        getCode: function(){
            var that = this
            that.curphone = that.phone
            request.get("/user/code/"+that.curphone+"/0", "", function(data){
                that.code = data.Id
                clearInterval(that.interval)
                that.interval = setInterval(function(){
                    request.get("/user/login/" + that.curphone + "/" + that.code, "", function(data){
                        if(data.User){
                            user.userInfo = data
                            console.log(user)
                            socket.connect()
                            that.$router.push("/friends")
                        }
                    },function(){
                        that.code = 0
                       clearInterval(that.interval)
                    })
                },2000)
            })
        },
        tabSwitch: function(obj){
            this.ispassword = obj
        },
        register: function(){
            this.$router.push("/register")
        }
    },
    destroyed: function(){
        clearInterval(this.interval)
    }
}
</script>

<style scoped src="../static/icon/iconfont.css">
</style>

<style scoped>

.content{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.tab{
    display: flex;
    flex-direction: row;
    width: 25rem;
    justify-content: space-around;
    font-size: 14px;
    color:#666;
    font-weight: bold;
    margin-bottom: 10px;
}
.tab div{
    width:50%;
}
.tab div:first-of-type{
    border-right: 1px rgb(214, 214, 214) solid;
}
.tab .active {
    color:black;
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



.panel2{
    width: 30rem;
    height: 30rem;
    border: 1px aliceblue solid;
    background-color:#f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 2rem;
}
.panel2 div:first-of-type{
    margin-bottom: 2rem;
}
.panel2 div{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.panel2 div:first-of-type span{
    color:gray;
    margin-right: 5px;
    font-size: 1.8rem;
}
.panel2 div input{
    width: 16rem;
    height: 2rem;
    border: 1px grey solid;
    font-size: 1rem;
    border-radius: .5rem;
    outline: none;
}
.panel2 div button{
    width: 4rem;
    height: 2.4rem;
    border: 1px grey solid;
    background-color: #d8544c;
    border-radius: 1rem;
    color: white;
    margin: 0 1rem;
    font-size: 1rem;
    outline: none;
}
.msg{
    font-size: 1.2rem;
}
.msg span{
    font-weight: bold;
    font-size: 1.5rem;
    color: black;
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
color: #666;font-size:1rem;
}
input:-moz-placeholder, textarea:-moz-placeholder {
color:#666;font-size:1rem;
}
input::-moz-placeholder, textarea::-moz-placeholder {
color:#666;font-size:1rem;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
color:#666;font-size:1rem;
}
</style>