<template>
  <div>
    <div v-for="item in friends" :key="item.Id">
      <router-link :to="'/chat/' + item.Id">
      <div class="friend">
        <img :src="item.Headimg" />
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
.friend{
    display:flex;
    flex-direction: row;
    justify-items: left;
    height: 60px;
    background-color: #EEEEEE;
    margin-bottom: 1px;
    font-size: 16px;
}
.friend img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 20px;
    margin-left: 10px;
}
</style>