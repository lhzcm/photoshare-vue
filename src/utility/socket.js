//var url= " ws://www.onlinemusic.top:9090/message/ws"
import config from "./config.js"

var url = config.ws + "/message/ws"

const socket = {
    //判断是否有连接
    hasConnection : false,
    //连接对象
    connection : null,
    //消息缓存
    messagesCache:[],
    //消息接收事件
    onReceiveMessageAfter : function() {
    },
    connect: function() {
        if(this.hasConnection){
            return
        }
        this.openConnection()
    },
    //打开websocket连接
    openConnection: function () {
        var that = this

        that.hasConnection = true
        if (window["WebSocket"]) {
            this.connection = new WebSocket(url);
            this.connection.onclose = function (evt) {
                alert("与服务器连接中断")
                setTimeout(function(){socket.openConnection()}, 5000)
                console.log(evt)
            }

            this.connection.onopen = function(e){
                console.log("websocket 连接成功")
                console.log(e)
            }
            
            this.connection.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                    if(messages[i] == "") {
                        continue
                    }
                   try{
                    var msgObj = JSON.parse(messages[i])
                    if(msgObj.Code == 1){
                        console.log(messages[i], msgObj)
                        that.messagesCache.push(msgObj.Data)
                        if(that.onReceiveMessageAfter){
                            that.onReceiveMessageAfter(msgObj.Data)
                        }
                    }}catch(err){
                       alert("获取消息出错")
                       console.log(err)
                       continue;
                   }
                }
            }

        } else {
            alert("你的浏览器不支持聊天室功能")
        }
    },
    //发送消息
    sendMessage: function(revId, msg, type = 1){
        if (!this.connection) {
            alert("发送失败，服务器连接失败")
            return false;
        }
        if (!msg) {
            alert("发送失败，发送内容有误")
            return false;
        }
        var message = {
            Code : 2,
            Data : {
                Receiverid : revId,
                Content : msg,
                Type : type
            }
        }
        this.connection.send(JSON.stringify(message))
        return true;
    },
    //清除未读消息
    clearNotreadnums:function(friendid){
        var message = {
            Code : 3,
            Data : friendid
        }
        if(this.connection){
            this.connection.send(JSON.stringify(message))
        }
    }
}

export default socket