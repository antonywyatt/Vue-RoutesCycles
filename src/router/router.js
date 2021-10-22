import { createRouter, createWebHashHistory } from 'vue-router'

import NotFoundPage from '../modules/shared/pages/NotFoundPage.vue'

const routes = [
    {
        patch: '/',
        redirect: '/pokemon'
    },

    //Pokemon Layout
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
        name: 'dbz',
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

/*// Guard Global - Síncrono
router.beforeEach(( to, from, next ) => {
    console.log({to, from, next})
    //next()

    const random = Math.random() * 100
    if ( random > 50 ) {
        console.log('auntenticado')
        next()
    } else {
        console.log(random, 'bloqueado por el breforEach Guard')
        next({name: 'pokemon-home'})
    }
})
*/

const canAccess = () => {
    return new Promise( resolve => {

        const random = Math.random() * 100
        if ( random > 50 ) {
            console.log('auntenticado - can Access')
            resolve(true)
        } else {
            console.log(random, 'bloqueado por el breforEach Guard - canAccess')
            resolve(false)
        }
    } )
}

router.beforeEach( async (to, from, next) => {
    const authorized = await canAccess()
    
    authorized 
        ? next()
        : next({ name: 'pokemon-home' })
})


export default router