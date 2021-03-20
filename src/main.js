import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VConsole from 'vconsole'
import loading from './components/Loading.vue'

Vue.config.productionTip = false
Vue.prototype.bus = new Vue({})

new Vue({
  VConsole: new VConsole(),
  loading,
  router,
  render: h => h(App)
}).$mount('#app')