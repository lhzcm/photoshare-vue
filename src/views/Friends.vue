<template>
  <div>
    <div v-for="item in friends" :key="item.Id">
      <router-link :to="'/chat/' + item.Id">
      <div class="friend">
        <div :style="{backgroundImage:'url(' + item.Headimg + ')'}">
          <span>6</span>
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
      request.get('friend', "", function(data){
          console.log(data)
          data.forEach(function(item){
              that.friends.push({
                  Id: item.Id, 
                  Name: item.Name,
                  Headimg: item.Headimg,
                  })
          })
           console.log(that.friends)
      })
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
    font-size: 1px;
    position: relative;
    left: 28px;
}
</style>