import { createRouter, createWebHistory } from "vue-router";
import Empleado from '../views/empleado.vue'
import Asistencia from '../views/asistencia.vue'
import Contrato from '../views/contrato.vue'
import Prestacion from '../views/prestacion.vue'
import Beneficio from '../views/beneficio.vue'
import TipoContrato  from '../views/tipoContrato.vue'
import TipoPrestacion  from '../views/tipoPrestacion.vue'
import TipoBeneficio from '../views/tipoBeneficio.vue'

const routes =[

    {
        path:'/empleados',
        name:'empleado',
        component: Empleado,
    },

    {
        path:'/asistencias',
        name:'asistencia',
        component: Asistencia,
    },
    
    {
        path:'/contratos',
        name:'contrato',
        component: Contrato,
    },

    {
        path:'/prestaciones',
        name:'prestacion',
        component: Prestacion,
    },
    {
        path:'/beneficios',
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