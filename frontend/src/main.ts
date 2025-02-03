import { createApp } from 'vue'

import App from './views/App.vue'
import './assets/main.css'

// Импортируем CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Подключаем стили Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Если нужно подключить JS Bootstrap (например, для модальных окон, тултипов и т.д.)
import 'bootstrap'

const app = createApp(App)

app.mount('#app')


// ТУТ СТРАНИЧКИ ПОДКЛЮЧАТЬ БУДЕМ
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import ChangeParticipantEntry from "@/views/ChangeParticipantEntry.vue";
import ParticipantEntry from "@/views/ParticipantEntry.vue";
import Registration from "@/views/Registration.vue";
import Admin from "@/views/Admin.vue";

const routes = [
    {
        path: '/participantEntry',
        component: ParticipantEntry,
        meta: { title: 'Подача заявки' },
    },
    {
        path: '/changeParticipantEntry',
        component: ChangeParticipantEntry,
        meta: { title: 'Редактирование заявки' },
    },
    {
        path: '/login',
        component: Login,
        meta: { title: 'Вход' },
    },
    {
        path: '/registration',
        component: Registration,
        meta: { title: 'Регистрация' },
    },
    {
        path: '/admin',
        component: Admin,
        meta: { title: 'Страница Администратора' },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)