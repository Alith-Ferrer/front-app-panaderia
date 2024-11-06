import { createRouter, createWebHistory } from "vue-router";
import Ejemplo from '../views/ejemplo.vue'

const routes =[

    {
        path:'/Empleados',
        name:'Empleados',
        component: Ejemplo,
    },

    {
        path:'/Empleados',
        name:'Empleados',
        component: Ejemplo2,
    }

]

const router= createRouter({
    history:createWebHistory(),
    routes,
})

export default router;