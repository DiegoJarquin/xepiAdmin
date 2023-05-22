import { createApp } from 'vue'
// import { Vue } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './components/ListaInventario.vue'
import Create from './components/AgregarInventario.vue'
import Edit from './components/EditarInventario.vue'
import Menu from './components/barraMenu.vue'
import EditarEmpleado from "@/components/EditarEmpleado.vue";

createApp().config.productionTip = false

import './assets/main.css'

const routes = [
    {
        name: 'Menu',
        path: '/',
        component: Menu,

    },
    {
        name: 'Index',
        path: '/index',
        component: Index,

    },
    {
        name: 'Create',
        path: '/create',
        component: Create,
    },
    {
        name: 'Edit',
        path: '/edit/:id',
        component: Edit,
    },
    {
        name: 'EditEmpleado',
        path: '/editempleado/:id',
        component: EditarEmpleado,
    }
]

const router = new createRouter({history: createWebHistory(), routes: routes})

export default router

createApp(App).use(router).mount('#app')