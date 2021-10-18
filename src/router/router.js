import { createRouter, createWebHashHistory } from 'vue-router'

import NotFoundPage from '../modules/shared/pages/NotFoundPage.vue'

const routes = [
    {
        patch: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import('../modules/pokemon/layouts/PokemonLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'pokemon-home',
                component: () => import('../modules/pokemon/pages/ListPage.vue'),
            },
            {
                path: 'about', 
                name: 'pokemon-about',
                component: () => import('../modules/pokemon/pages/AboutPage.vue'),
            },
            {
                path: 'pokemonid/:id', 
                component: () => import('../modules/pokemon/pages/PokemonPage.vue'),
                name: 'pokemon-id',
                props: ( route ) => {
                    const  id  = Number(route.params.id)
                    return isNaN( id ) ? { id: 1  } : {id: Number(id)}
                }
            },
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },

    //DBZ layout
    {
        path: '/dbz',
        component: () => import('../modules/dbz/layouts/DragonBallLayout.vue'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import('../modules/dbz/pages/Characters.vue'),
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import('../modules/dbz/pages/About.vue'),
            },
            {
                path: '',
                redirect: { name: 'dbz-characters' }
            }
        ]
    },

    {
        path: '/:pathMatch(.*)*', 
        component: NotFoundPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router