import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import "normalize.css"

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft,
  faChevronRight,
  faBars,
  faCog,
  faChartBar,
  faUsers,
  faFutbol
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
library.add(
  faChevronLeft,
  faChevronRight,
  faBars,
  faCog,
  faChartBar,
  faUsers,
  faFutbol
)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
