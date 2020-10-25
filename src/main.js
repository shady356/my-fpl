import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import "normalize.css"

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faChevronLeft,
  faBars
)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
