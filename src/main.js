import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store/vuex'
import VueResource from "vue-resource"

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.prototype.toLoginPage = function (){
    let loginId = localStorage.getItem("loginId");
    console.log("Login id =" + loginId)
    if ('' === loginId || null === loginId) {
        console.log("=================")
        this.$router.push({path: '/'});
        return true;
    }
};

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
});


