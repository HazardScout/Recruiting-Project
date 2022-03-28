import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        name:'Home',
        path:'/',
        component:()=>import('../components/ReservationEntry.vue')
    },
    {
        name:'View Reservations',
        path:'/view-reservations',
        component:()=>import('../components/ViewReservations.vue')
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router