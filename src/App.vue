<template>
 <div class="main">
    <div id="app">
      <title-component titlename="主页"></title-component>
      <!-- <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <router-view class="view"/>
      <tab-bar></tab-bar>
      <loading></loading>
    </div>
  </div>
</template>

<script>
import TitleComponent from './components/Title.vue'
import TabBar from './components/TabBar.vue'
import autoSize from './utility/autosize.js'
import socket from './utility/socket.js'
import user from './utility/user.js'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    TitleComponent,
    TabBar,
    Loading
  },
  created: async function(){
    autoSize('app', 800);

    //连接webSocket
    var userinfo = await user.getUserInfo()
    if(userinfo){
        socket.connect()
    }else{
      this.$router.push('/login')
    }
  }
}
</script>

<style>
html {
    width:100%;
    height: 100%;
}
body {
    width:100%;
    height: 100%;
    margin: 0px;
}
.main {
  /* background-color: antiquewhite; */
  width:100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  max-width: 800px;
  width: 100%;
  background-color: white;
  /* margin-left: calc((100% - 800px)/2); */
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  box-shadow: 0 0 15px #ccc;
}
.view{
  height: calc(100% - 88px);
  width: 100%;
  overflow-y: scroll;
}
::-webkit-scrollbar {/*隐藏滚轮*/
display: none;
}

</style>
