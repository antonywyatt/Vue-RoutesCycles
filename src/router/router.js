import { createRouter, createWebHashHistory } from 'vue-router'

import ListPage from '../modules/pokemon/pages/ListPage.vue'
import AboutPage from '../modules/pokemon/pages/AboutPage.vue'
import PokemonPage from '../modules/pokemon/pages/PokemonPage.vue'

//import NotFoundPage from '../modules/shared/pages/NotFoundPage.vue'

const routes = [
    {
        patch: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: ListPage
    },
    {
        path: '/about', 
        name: 'about',
        component: AboutPage
    },
    {
        path: '/pokemonid/:id', 
        component: PokemonPage,
        name: 'PokemonId',
        props: ( route ) => {
            const  id  = Number(route.params.id)
            return isNaN( id ) ? { id: 1  } : {id: Number(id)}
        }
    },
    {
        path: '/:pathMatch(.*)*', 
        //component: NotFoundPage
        redirect: '/home'
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router