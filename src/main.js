import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import i18n from './i18n'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.vue';
import TopMenu from './pages/topMenu.vue'
import ProductDetail from './pages/productDetail.vue'
import CartList from './pages/cartList.vue'

// Firenbaseの初期化
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDPb8R-aWHkcbYVE41JcDw9M5iCk4uhQB8",
  authDomain: "sample-barcodereader-app.firebaseapp.com",
  databaseURL: "https://sample-barcodereader-app.firebaseio.com",
  projectId: "sample-barcodereader-app",
  storageBucket: "sample-barcodereader-app.appspot.com",
  messagingSenderId: "1030196124685"
}
firebase.initializeApp(config);

// Vuetifyの初期化
// Initialize Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: "#4DB6AC",
    secondary: "#80CBC4",
    accent: "#E57373",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  },
  iconfont: 'fa',
})

// Vue Routerの初期化
// Initialize Vue Router
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', name: 'topmenu', component: TopMenu },
    { path: '/product_detail/', name: 'product_detail', component: ProductDetail, props: true },
    { path: '/cart_list/', name: 'cart_list', component: CartList },
  ]
})

new Vue({
  el: '#app',
  template:'<app></app>',
  components: { App },
  router,
  i18n,
});
