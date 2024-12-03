import { createRouter, createWebHistory } from "vue-router";
import LayoutMain from '../components/LayoutMain.vue'

import Asistencia from '../views/asistencia/asistencia.vue'
import Empleado from '../views/empleado/empleado.vue'
import Contrato from '../views/contrato/contrato.vue'
import Prestacion from '../views/prestacion/prestacion.vue'
import Beneficio from '../views/beneficio/beneficio.vue'
import TipoContrato  from '../views/tipoContrato/tipoContrato.vue'
import TipoPrestacion  from '../views/tipoPrestacion/tipoPrestacion.vue'
import TipoBeneficio from '../views/tipoBeneficio/tipoBeneficio.vue'

const routes =[

    {
        path:'/',
        name:'home',
        component: LayoutMain,
    },

    {
        path:'/empleado',
        name:'empleado',
        component: Empleado,
    },

    {
        path:'/asistencia',
        name:'asistencia',
        component: Asistencia,
    },
    
    {
        path:'/contrato',
        name:'contrato',
        component: Contrato,
    },

    {
        path:'/prestacion',
        name:'prestacion',
        component: Prestacion,
    },
    {
        path:'/beneficio',
        name:'beneficio',
        component: Beneficio,
    },

    {
        path:'/tipoContrato',
        name:'tipoContrato',
        component: TipoContrato,
    },
    {
        path:'/tipoPrestacion',
        name:'tipoPrestacion',
        component: TipoPrestacion,
    },

    {
        path:'/tipoBeneficio',
        name:'tipoBeneficio',
        component: TipoBeneficio,
    }
]

const router= createRouter({
    history:createWebHistory(),
    routes,
})

export default router;