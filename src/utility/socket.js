const url = "ws://127.0.0.1:9090/message/ws"

const socket = {
    //连接对象
    connection : null,
    //消息缓存
    messagesCache:[],
    //消息接收事件
    onReceiveMessage : function() {
    },
    //消息接收事件
    onReceiveMessageAfter : function() {
    },
    //打开websocket连接
    openConnection: function () {
        if (window["WebSocket"]) {
            this.connection = new WebSocket(url);
            this.connection.onclose = function (evt) {
                alert("与服务器连接中断")
                setTimeout(socket.connection, 20000)
                console.log(evt)
            }

            var that = this
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
                        that.onReceiveMessage(that.messagesCache)
                        that.onReceiveMessageAfter(that.messagesCache)
                    }
                   
                   }catch(err){
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
    sendMessage: function(revId, msg){
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
                Type : 1
            }
        }
        this.connection.send(JSON.stringify(message))
        this.messagesCache.push(message.Data)
        this.onReceiveMessageAfter(this.messagesCache)
        return true;
    }
}

export default socket