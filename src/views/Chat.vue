<template>
    <div>
        <div :class="isInputWord ? 'msgcontent' : 'msgcontent msgcontentInputEmoji'" ref="content"  @scroll="onScroll">
            <div v-for="item in msgs" :key="item.Id" :class="item.Senderid == id ? 'friendmsg ' : 'friendmsg transform '">
                <!-- <img :src="img"/> -->
                <img :src="userInfo.Headimg" />
                <div :class="item.Type == 1 ? '': ' whiteBackgroundColor'">
                    <p v-if="item.Type == 1 ">{{item.Content}}</p>
                    <img v-else :src="getImgUrl(item.Content)"/>
                </div>
            </div>
        </div>
        <div class="control">
           
            <input @keydown="send" type="text" v-model="msg" @focus="wordInput" ref="msgInput" />
            <span :class="isInputWord ? 'iconfont icon-biaoqing' : 'iconfont icon-jianpanTalk-keyboard'" @click="switchInput"></span>
            <upload-file height="30px" width="30px" @fileUpload="fileUpload"></upload-file>
            <button @click="send">发送</button>
        </div>
        <div v-if="!isInputWord" class="emoji">
            <div v-for="(item, index) in emojis" :key="index">
                <div v-for="(item2, index2) in item" @click="inputEmoji(item2.emoji)" :key="index2">
                    {{item2.emoji}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import socket from '../utility/socket.js'
import user from '../utility/user.js'
import request from '../utility/request.js'
import emoji from '../utility/emoji.js'
import common from '../utility/common.js'
import UploadFile from '../components/UploadFile.vue'
import config from '../utility/config.js'

export default {
    props:{
        id: Number,
        img: String,
        name: String,
    },
    components:{
        UploadFile
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
            emojis: common.arrayChunk(emoji.emojis, 9),  //表情列表
            isInputWord: true,      //是否文字输入
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
        send: function(e){
            //判断是否是回车发送
            if(e.type == 'keydown' && e.keyCode != 13){
                return
            }
            if(socket.sendMessage(this._props.id, this.msg)){
                this.msg = ""
            }
        },
        //获取消息列表
        getMsgList: function(){
            var that = this
            request.get("/messages/" + this._props.id + "/" + this.curid, "", function(data){
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
        },
        //输入表情
        inputEmoji: function(emoji){
            this.msg = this.msg + emoji
        },
        //输入文字
        wordInput: function(){
            this.isInputWord = true
        },
        switchInput: function(){
            this.isInputWord = !this.isInputWord
            if(this.isInputWord){
                this.$refs.msgInput.focus()
            }
        },
        //发图片
        fileUpload: function(url){
            socket.sendMessage(this._props.id, url, 2)
        },
        //获取转换图片链接
        getImgUrl: function(content){
            return config.host + "/static/image/" + content
        }
    },
    created: async function(){
        console.log(this.emojis)
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
.msgcontentInputEmoji{
     height: calc(100% - 58px - 14rem);
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
    width: calc(100% - 110px);
    height: 30px;
    border: 1px gray solid;
    border-radius: 8px;
    margin-top: 8px;
}
.control span{
    font-size: 30px;
    line-height: 48px;
}
.control div{
    margin-top: 9px;
}
.control button{
    width: 50px;
    height: 30px;
    background-color: blue;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    margin-top: 9px;
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
.friendmsg .whiteBackgroundColor{
    background-color: white;
}
.friendmsg .whiteBackgroundColor img{
    width: auto;
    max-width: 60%;
    height: auto;
    margin-left: auto;
    border-radius: 5px;
}
.emoji{
    height: 14rem;
    overflow: hidden;
}
.emoji div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 2rem;
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

<style src="../static/icon/iconfont.css" scoped>

</style>