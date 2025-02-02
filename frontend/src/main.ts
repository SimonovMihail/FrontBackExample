import { createApp } from 'vue'

import App from './views/App.vue'
import router from './router'
import './assets/main.css'

// Импортируем CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Подключаем стили Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Если нужно подключить JS Bootstrap (например, для модальных окон, тултипов и т.д.)
import 'bootstrap'

const app = createApp(App)

app.use(router)

app.mount('#app')
