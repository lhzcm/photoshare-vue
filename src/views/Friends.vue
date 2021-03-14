<template>
  <div>
    <div v-for="item in friends" :key="item.Id">
      <router-link :to="'/chat/' + item.Id">
      <div class="friend">
        <div :style="{backgroundImage:'url(' + item.Headimg + ')'}">
          <span v-if="item.Notreadnums > 0">{{item.Notreadnums}}</span>
          <!-- <img :src="item.Headimg" /> -->
        </div>
        <div>{{ item.Name }}</div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import request from "../utility/request.js"
import socket from "../utility/socket.js"

export default {
  data: function () {
    return {
      friends: [],
    };
  },
  methods: {
  },
  created: function(){
      var that = this
      //获取好友列表
      request.get('friend', "", function(data){
          console.log(data)
          data.forEach(function(item){
              that.friends.push({
                  Id: item.Id, 
                  Name: item.Name,
                  Headimg: item.Headimg,
                  Notreadnums: item.Notreadnums
                  })
          })
          that.friends.sort((a,b)=> b.Notreadnums - a.Notreadnums)
          console.log(that.friends)
      })
      //监听消息接收
      socket.onReceiveMessageAfter = function(msg){
        for( var i = 0; i < that.friends.length; i++){
          if(that.friends[i].Id == msg.Senderid){
            that.friends[i].Notreadnums++;
            // var temp = that.friends[0]
            // that.friends[0] =  that.friends[i]
            // that.friends[i] = temp
          }
          that.friends.sort((a,b)=> b.Notreadnums - a.Notreadnums)
        }
      }
  }
};
</script>

<style scoped>
a{
    text-decoration: none;
    color: black;
}
.friend{
    display:flex;
    flex-direction: row;
    justify-items: left;
    height: 60px;
    background-color: #EEEEEE;
    margin-bottom: 1px;
    font-size: 16px;
}
.friend div:first-of-type {
    width: 60px;
    height: 60px;
    margin: 0 20px 0 5px;
    background-size: 60px 60px;
    border-radius: 5px;
}
.friend div span{
    background-color: red;
    color: white;
    padding: 1px 4px;
    border-radius: 7px;
    font-size: 12px;
    position: relative;
    left: 28px;
}
</style>