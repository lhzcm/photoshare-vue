<template>
    <div>
        <div class="msgcontent" ref="content"  @scroll="onScroll">
            <div v-for="item in msgs" :key="item.Id" :class="item.Senderid == id ? 'friendmsg' : 'friendmsg transform'">
                <!-- <img :src="img"/> -->
                <img :src="userInfo.Headimg" />
                <div><p>{{item.Content}}</p></div>
            </div>
            <!-- <div class="friendmsg transform">
                <img src='https://pic1.zhimg.com/80/v2-de613dda71d9f958c4a71d57fd59d370_720w.jpg?source=1940ef5c'/>
                <div><p>sfsdflsjdflkjsdksdlfjkssfsdfl</p></div>
            </div> -->
        </div>
        <div class="control">
            <input type="text" v-model="msg"/>
            <button @click="send">发送</button>
        </div>
    </div>
</template>

<script>
import socket from '../utility/socket.js'
import user from '../utility/user.js'
import request from '../utility/request.js'

export default {
    props:{
        id: Number,
        img: String,
        name: String,
    },
    data: function(){
        return{
            msg : "",
            msgs:[],
            curindex: 0,
            
            isScroll: true,         //是否需要滚动到最底部

            userInfo: {},           //用户信息
            curid : 1000000000,     //当前最小的聊天id

            isLoading : false,      //是否真正加载聊天记录

            lastScrollTop: 0,       //记录上次滚动位置
            lastScrollHeight: 0,    ////记录上次滚动高度
        }
    },
    beforeUpdate:function(){
        console.log(this.$refs.content.scrollHeight)
        this.lastScrollTop = this.$refs.content.scrollTop
        this.lastScrollHeight = this.$refs.content.scrollHeight
    },
    updated:function(){
        console.log(this.$refs.content.scrollHeight)
        if(this.isScroll){
            this.$refs.content.scrollTop = this.$refs.content.scrollHeight
            this.isScroll = false
        }else{
            this.$refs.content.scrollTop = this.$refs.content.scrollHeight - this.lastScrollHeight  + this.lastScrollTop
        }
    },
    methods:{
        //发送消息
        send: function(){
            if(socket.sendMessage(this._props.id, this.msg)){
                this.msg = ""
            }
        },
        //获取消息列表
        getMsgList: function(){
            var that = this
            request.get("messages/" + this._props.id + "/" + this.curid, "", function(data){
                that.msgs = data.reverse().concat(that.msgs)
                if(that.msgs[0]) {
                    that.curid = that.msgs[0].Id
                }
                that.isLoading = false;
            },function(){that.isLoading = false})
        },
        onScroll: function(){
            if(this.$refs.content.scrollTop <= 20 && !this.isLoading) {
                this.isLoading = true;
                this.getMsgList()
            } 
        }
    },
    created: async function(){
        var that = this
        //监听消息接收
        socket.onReceiveMessageAfter = function(data){
             that.msgs.push(data)
             that.isScroll = true 
             if(data.Senderid == that._props.id){
                socket.clearNotreadnums(data.Senderid)
             }
        }
        //this.reloadMsg(socket.messagesCache)
        //获取消息列表
        this.getMsgList()
        //获取用户信息
        this.userInfo = await user.getUserInfo()
        //console.log(this.userInfo)
    },
    mounted:function(){
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight
    }
}
</script>

<style scoped>
.msgcontent{
    height: calc(100% - 58px);
    width: 100%;
    padding-top:10px;
    overflow-y:scroll;
}
.control{
    height: 48px;
    width:100%;
    background-color: gainsboro;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
}
.control input{
    width: calc(100% - 80px);
    height: 30px;
    border: 1px gray solid;
    border-radius: 8px;
    margin-top: 8px;
}
.control button{
    width: 60px;
    height: 34px;
    background-color: blue;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
}
.friendmsg{
    display:flex;
    flex-direction: row;
    margin-bottom: 10px;
}
.friendmsg img{
    width: 48px;
    height: 48px;
    margin-left: 10px;
    border-radius: 5px;
}
.friendmsg div{
    font-size: 20px;
    background-color: blue;
    margin-left: 10px;
    border-radius: 10px;
    max-width: 60%;
    word-break: break-word;
    padding: 0 10px;
    color: white;
}

.transform {
    transform: scaleX(-1);
}
.transform img{
    transform: scaleX(-1);
}
.transform div{
    transform: scaleX(-1);
    background-color: green;
}

</style>

