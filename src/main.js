import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'

import './assets/main.css'
import './assets/index.css'

library.add(faArrowUp, faArrowDown, faUpRightAndDownLeftFromCenter)

const app = createApp(App)

app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
