import Vue from 'vue'
import App from './App.vue'

// router setup import
import VueRouter from 'vue-router'
import routes from './routes/routes'

// framework design
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

// vue initial configuration
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuetify)

// vuetify configuration
const vuetifyTheme = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.blue.darken3,
        secondary: colors.grey.lighten2,
        accent: '#8c9eff',
        error: '#b71c1c',
        info: '#042c78',
        success: '#84d850',
        warning: colors.orange.darken1,
        anchor: '#8c9eff',
      },
      dark: {
        primary: colors.blue.lighten4,
        secondary: colors.grey.darken2,
        success: colors.blueGrey,
        error: colors.purple.darken1,
        warning: colors.orange.darken1
      }
    },
  },
})

// routing configuration
const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item-active'
})

new Vue({
  el: '#app',
  vuetify: vuetifyTheme,
  render: h => h(App),
  router
}).$mount('#app')
