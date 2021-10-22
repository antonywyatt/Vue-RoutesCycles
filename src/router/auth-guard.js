const isAuthenticatedGuard = async (to, from, next) => {

    return new Promise( () => {

        const random = Math.random() * 100

        if( random > 50 ) {
            console.log('está autenticado')
            next()
        }else{
            console.log('Bloqueado por Guard', random)
            next({ name: 'pokemon-home' })
        }

    })

    //console.log({to, from, next})
}

export default isAuthenticatedGuard