
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap"; // 從nodeModule中載入Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import css file

const app = createApp(App)

app.use(router)

app.mount('#app')
