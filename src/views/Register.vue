<template>
    <div class="content">
        <div class="panel">
            <div>
                <span class="iconfont icon-yonghu"></span>
                <input v-model="name" placeholder="请输入用名" type="text"/>
            </div>
            <div>
                <span class="iconfont icon-yonghu"></span>
                <input v-model="phone" placeholder="请输入手机号码" type="text"/>
            </div>
            <!-- <div>
                <span class="iconfont icon-yonghu"></span>
                <input v-model="brithday" placeholder="请输入出生日期" type="date"/>
            </div> -->
            <div>
                <span class="iconfont icon-suo"></span>
                <input v-model="password" placeholder="请输入密码" type="password"/>
            </div>
            <div>
                <span class="iconfont icon-suo"></span>
                <input v-model="passwordAgain" placeholder="请再次输入密码" type="password"/>
            </div>
            <div>
                <button @click="getCode">验证</button>
                <button @click="register" :class="canRegister?'active':''">注册</button>
            </div>
            <div v-if="code > 0 && !canRegister" class="msg"><a :href="'sms:13556000271?body=xin#' + code">请用该手机号发送<span>{{"xin#"+code}}</span>到<span>13556000271</span></a></div>
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
            name: "",           //用户名
            phone: "",          //手机号码
            password:"",        //密码
            passwordAgain: "",  //密码验证
            curphone:"",        //当前手机号码
            code:0,             //验证码
            interval: null,     //定时请求器
            canRegister: false, //是否可以注册
            brithday:"",        //出生日期
        }
    },
    beforeCreate: function(){
        //用户已经登录不允许返回到登录界面
        if(user.userInfo){
            this.$router.push("/friends")
        }
    },
    methods:{
        register: function(){
            if(!this.canRegister){
                return
            }

            var that = this
            var password = this.password.trim()
            var phone = this.phone.trim()
            var passwordAgain = this.passwordAgain.trim()
            var name = this.name.trim()

            if (password == ""){
                alert("密码不能为空")
                return 
            }
            if(phone.length != 11){
                alert("手机好输入不正确")
                return
            }
            if(passwordAgain != password){
                alert("第二次输入的密码与第一次输入的密码不相符")
                return
            }
            if(name == ""){
                alert("用户名不能为空")
                return
            }

            password = common.md5Convert(password)

            request.post("/user",{
                "Name" : name,
                "Phone": this.curphone,
                "Password" : password,
                "City" : 0,
                "Brithday" : "2020-11-11T00:00:00Z",
                "Ismale" : true,
                "Headimg": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1736447247,230581483&fm=11&gp=0.jpg",
                "Code": this.code
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
            request.get("/user/code/"+that.curphone+"/1", "", function(data){
                that.code = data.Id
                clearInterval(that.interval)
                that.interval = setInterval(function(){
                    request.get("/user/register/" + that.curphone + "/" + that.code, "", function(data){
                        if(data.Status == 1){
                            that.canRegister = true
                            clearInterval(that.interval)
                        }
                    },function(){
                        that.code = 0
                       clearInterval(that.interval)
                    })
                },2000)
            })
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
    background-color: gray;
    border-radius: 1rem;
    color: white;
    margin: 0 1rem;
    font-size: 1rem;
    outline: none;
}

.panel div button:first-of-type{
     background-color: burlywood;
}

.panel .msg{
    font-size: 1.2rem;
    margin-top: 1rem;
}
.panel .msg span{
    font-weight: bold;
    font-size: 1.5rem;
    color: black;
}

.panel div .active{
    background-color: #d8544c;
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