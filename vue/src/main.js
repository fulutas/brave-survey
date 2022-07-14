import { createApp } from 'vue'
import store from './store'
import router from './router'
import './index.css'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'

import loadimage from './assets/lazy-loading-spin.svg'
import errorimage from './assets/lazy-load-error.jpg'

const app = createApp(App)

app.use(VueLazyLoad, {
    preLoad: 1.3,   
    error: errorimage,
    loading: loadimage,
    attempt: 1,
    listenEvents: [ 'scroll' ]
  })

app.use(store)
app.use(router)
app.mount('#app')  

