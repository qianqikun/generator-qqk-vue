import Vue from 'vue'
import App from './App.vue'
import router from './router'
<% if (depend.indexOf('vuex')!=-1) { %>
import store from './store'
<% } %>
<% if (depend.indexOf('element-ui')!=-1) { %>
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
<% } %>
import './styles/index.scss'
/* utils */

<% if (depend.indexOf('axios')!=-1) { %>
import axios from "axios"
Vue.prototype.$axios = axios
<% } %>


import $tool from './utils/tool'
Vue.prototype.$tool = $tool

Vue.config.productionTip = false


<% if (depend.indexOf('element-ui')!=-1) { %>
Vue.use(ElementUI);
<% } %>

new Vue({
  router,
  <% if (depend.indexOf('vuex')!=-1) { %>
    store,
  <% } %>
  render: h => h(App)
}).$mount('#app')
