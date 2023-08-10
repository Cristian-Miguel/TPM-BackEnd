const jwt = require( 'jsonwebtoken' )
const server_config = require( 'config' );

const Obtener_JWT = ( Email = '', idRol = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { Email, idRol }
        jwt.sign( 
            payload,
            server_config.get('security.JWT_SECRET'), 
            { expiresIn: '24h' },
            ( error, token ) => {
                if(error){
                    console.log(error)
                    reject('Problems getting the token')
                } else resolve( token )
            }
        )
    } )
}

module.exports = {
    Obtener_JWT,
}