<template>
  <div class="marsk" v-if="loading">
    <img ref="img" src="../static/img/loading.png" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loading: false,
      deg: 0,
      interval: {},
    };
  },
  watch: {
    "loading": "animationLoad",
  },
  created: function () {
    var that = this;
    this.bus.$on("loading", function (isLoding) {
      console.log(isLoding);
      if (isLoding) {
        that.loading = true;
      } else {
        that.loading = false;
      }
    });
  },
  methods: {
    animationLoad: function (newvaule) {
      if (newvaule) {
        var that = this;
        //加载动画
        this.interval = setInterval(function () {
          that.$refs.img.style.transform = "rotate(" + that.deg + "deg)";
          that.deg += 30;
          that.deg = that.deg > 360 ? 0 : that.deg;
        }, 80);
      }else{
          clearInterval(this.interval)
      }
    },
  }
};
</script>

<style scoped>
.marsk {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1000;
  background-color: #0000007d;
}
.marsk img {
  margin-top: 50%;
  width: 6rem;
  height: 6rem;
  /* animation: myloading 5s cubic-bezier(1,1,1,1) 0s infinite; */
}

/* @keyframes myloading {
    0% {transform: rotate(0deg);}   
    8.33% {transform: rotate(30deg);}
    16.6% {transform: rotate(60deg);}
    25% {transform: rotate(90deg);}
    33.33% {transform: rotate(120deg);}
    41.66% {transform: rotate(150deg);}
    50% {transform: rotate(180deg);}
    58.33% {transform: rotate(210deg);}
    66.6% {transform: rotate(240deg);}
    75% {transform: rotate(270deg);}
    83.33% {transform: rotate(300deg);}
    91.66% {transform: rotate(330deg);} 
    100% {transform: rotate(360deg);} 
} */
</style>
