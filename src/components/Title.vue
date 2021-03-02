<template>
  <div class="title">
    <span @click="gotoBack" class="iconfont icon-fanhui"></span>
    <div>{{ titlename }}</div>
  </div>
</template>

<script>

export default {
  name: "titlecomponents",
  props: {
    link: String
  },
  data: function(){
      return{
          titlename : ""
      }
  },
  created : function(){
      this.$router.afterEach((to) => {
          console.log(this.$router.getRoutes())
          this.$router.getRoutes().forEach(element => {
          if (element.path == to.path){
              console.log( element.name)
              this.titlename = element.name
          }
      });
})
  },
  methods: {
    gotoBack: function () {
        console.log(this.$route)
      if (this._props.link) {
        console.log(this._props.link);
        this.$router.push({ path: this._props.link });
      } else {
        window.history.back();
      }
    },
  },
};
</script>

<style scoped src="../static/icon/iconfont.css">
</style>

<style scoped>
.title {
  width: 100%;
  height: 44px;
  background: tomato;
  text-align: left;
}
.title span {
  font-size: 30px;
  line-height: 44px;
  color: white;
}
.title div {
  width: calc(100% - 60px);
  text-align: center;
  display: inline-block;
  font-size: 22px;
  color: white;
  line-height: 44px;
}
</style>
