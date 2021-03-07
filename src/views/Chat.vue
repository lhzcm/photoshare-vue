<template>
    <div>
        <div class="msgcontent" ref="content">
            <div v-for="(item, index) in msgs" :key="index" :class="item.Senderid ? 'friendmsg' : 'friendmsg transform'">
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
            isScroll: false,
            userInfo:{}
        }
    },
    updated:function(){
        if(this.isScroll){
            this.$refs.content.scrollTop = this.$refs.content.scrollHeight
            this.isScroll = false
        }
    },
    methods:{
        send: function(){
            socket.sendMessage(this._props.id, this.msg)
        },
        reloadMsg: function(data){
            for(this.curindex; this.curindex < data.length; this.curindex++){
                if(data[this.curindex].Senderid == this._props.id || data[this.curindex].Receiverid == this._props.id  ){
                    this.msgs.push(data[this.curindex])
                }
            }
            this.isScroll = true 
        }
    },
    created: async function(){
        var that = this
        socket.onReceiveMessageAfter = function(data){that.reloadMsg(data)}
        this.reloadMsg(socket.messagesCache)
        this.userInfo = await user.getUserInfo()
        console.log(this.userInfo)
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

