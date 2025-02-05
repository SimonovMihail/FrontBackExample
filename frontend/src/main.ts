import './assets/main.css';
import { createApp } from 'vue'
import type { Component } from 'vue'

import App from './views/App.vue'

// Импортируем CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Подключаем стили Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Если нужно подключить JS Bootstrap (например, для модальных окон, тултипов и т.д.)
import 'bootstrap'

const app = createApp(App)

// ЭЛЕМЕНТ ПЛЮС
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/dist/index.css'



// ТУТ СТРАНИЧКИ ПОДКЛЮЧАТЬ БУДЕМ
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import ChangeParticipantEntry from "@/views/ChangeParticipantEntry.vue";
import ParticipantEntry from "@/views/ParticipantEntry.vue";
import Registration from "@/views/Registration.vue";
import Admin from "@/views/Admin.vue";
import Information from "@/views/Information.vue";
import Lk from "@/views/Lk.vue";
import Judge from "@/views/Judge.vue";
import LkUserdataEdit from "@/views/LkUserdataEdit.vue";

const routes = [
    {
        path: '/',
        component: Information,
        meta: { title: 'Главная страница' },
    },
    {
        path: '/lk',
        component: Lk,
        meta: { title: 'Личный кабинет' },
    },
    {
        path: '/lk_userdata_edit',
        component: LkUserdataEdit,
        meta: { title: 'Редактировать профиль' },
    },  
    {
        path: '/judge',
        component: Judge,
        meta: { title: 'Страница жюри' },
    },
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

// С помощью этой штуки меняется имя страницы
router.afterEach((to, from) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title as string;
    }
});

// ДЛЯ ИКОНОК
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component as Component)
}

// ВАЖНОЕ
app.use(router)
app.mount('#app')
app.use(ElementPlus)