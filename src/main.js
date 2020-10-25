import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import "normalize.css"

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faChevronLeft
)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
